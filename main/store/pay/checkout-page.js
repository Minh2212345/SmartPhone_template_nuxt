import axios from 'axios'

export default {
  data() {
    return {
      currentStep: 1,
      steps: [
        { label: 'Thông tin giao hàng' },
        { label: 'Xác nhận đơn hàng' },
        { label: 'Thanh toán' }
      ],
      showVoucherModal: false,
      activeTab: 0,
      deliveryMethod: 'delivery',
      discountCode: '',
      appliedDiscount: null,
      calculatedDiscount: 0,
      showConfirmationModal: false,
      isLoading: false,
      isProcessingPayment: false,
      emailSent: false,
      selectedStoreIndex: null,
      toasts: [],
      toastIdCounter: 0,
      provinces: [],
      districts: [],
      wards: [],
      delivery: {
        ten: localStorage.getItem('customerName') || '',
        soDienThoai: localStorage.getItem('phoneNumber') || '',
        email: localStorage.getItem('email') || '',
        thanhPho: '',
        quan: '',
        phuong: '',
        soNha: '',
        ghiChu: ''
      },
      pickup: {
        store: '',
        soDienThoai: '',
        email: ''
      },
      addresses: [],
      selectedAddressId: null,
      selectedAddress: {},
      stores: [{ name: 'Cửa hàng 1', address: 'Số 13 phố Trịnh Văn Bô, Phường Nam Từ Liêm, Hà Nội' }],
      order: {
        items: [],
        subtotal: 0,
        total: 0
      },
      invoiceId: null,
      paymentMethod: '',
      cardDetails: {
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      }
    }
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get('https://provinces.open-api.vn/api/p/')
      return { provinces: response.data }
    } catch (error) {
      console.error('Lỗi khi tải danh sách tỉnh/thành phố:', error)
      return { provinces: [] }
    }
  },
  async mounted() {
    try {
      this.invoiceId = this.$route.query.invoiceId || localStorage.getItem('invoiceId');
      if (!this.invoiceId) {
        await this.createNewInvoice();
      }
      await this.fetchCart();
      const customerId = localStorage.getItem('customerId');
      if (customerId) {
        await this.fetchAddresses();
        if (this.addresses.length > 0) {
          this.selectAddress(this.addresses[0]);
        }
      }

      const urlParams = new URLSearchParams(window.location.search);

      // Handle MoMo callback
      if (urlParams.has('resultCode')) {
        const resultCode = urlParams.get('resultCode');
        if (resultCode === '0') {
          const pendingHoaDon = JSON.parse(localStorage.getItem('pendingHoaDon') || '{}');
          if (pendingHoaDon && pendingHoaDon.idHD && pendingHoaDon.hoaDonRequest) {
            this.invoiceId = pendingHoaDon.idHD;
            this.currentStep = 3;
            this.showConfirmationModal = false;
            this.isLoading = false;
            this.$router.replace({ path: '/checkout-page', query: {} });
            await this.submitForm(pendingHoaDon.hoaDonRequest);
          } else {
            console.error('Invalid pendingHoaDon for MoMo:', pendingHoaDon);
            this.$refs.toastNotification.addToast({
              type: 'error',
              message: 'Không tìm thấy thông tin hóa đơn để hoàn tất thanh toán MoMo',
              duration: 5000
            });
            this.$router.replace({ path: '/checkout-page', query: {} });
          }
        } else {
          this.$refs.toastNotification.addToast({
            type: 'error',
            message: `Thanh toán MoMo thất bại. Lỗi: ${urlParams.get('message') || 'Unknown error'}`,
            duration: 5000
          });
          this.$router.replace({ path: '/checkout-page', query: {} });
        }
      }
      // Handle VNPay callback
      else if (urlParams.has('vnp_TransactionStatus')) {
        const vnpayParams = Object.fromEntries(urlParams);
        console.log('VNPAY URL Params:', vnpayParams);

        const retry = async (fn, retries = 3, delay = 1000) => {
          for (let i = 0; i < retries; i++) {
            try {
              return await fn();
            } catch (error) {
              if (i === retries - 1) throw error;
              console.warn(`Retry ${i + 1} failed: ${error.message}`);
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          }
        };

        try {
          console.log('Calling /api/payment/vnpay-payment with params:', vnpayParams);
          const response = await retry(() => axios.get('http://localhost:8080/api/client/vnpay/return', {
            params: vnpayParams,
            timeout: 30000
          }));
          console.log('VNPAY Response:', response.data);
          if (response.data.status === 'success') {
            const pendingHoaDon = JSON.parse(localStorage.getItem('pendingHoaDon') || '{}');
            console.log('Retrieved pendingHoaDon:', pendingHoaDon);
            if (pendingHoaDon && pendingHoaDon.idHD && pendingHoaDon.hoaDonRequest) {
              this.invoiceId = pendingHoaDon.idHD;

              // Set step to 3 (payment completed) and hide modal
              this.currentStep = 3;
              this.showConfirmationModal = false;
              this.isLoading = false;

              // Clean up URL params without redirecting
              this.$router.replace({ path: '/checkout-page', query: {} });

              // Submit the form and let submitForm handle the toast and redirect
              await this.submitForm(pendingHoaDon.hoaDonRequest);

            } else {
              console.error('Invalid pendingHoaDon:', pendingHoaDon);
              this.$refs.toastNotification.addToast({
                type: 'error',
                message: 'Không tìm thấy thông tin hóa đơn để hoàn tất thanh toán',
                duration: 5000
              });
              this.$router.replace({ path: '/checkout-page', query: {} });
            }
          } else {
            console.error('VNPAY Payment Failed:', response.data);
            this.$refs.toastNotification.addToast({
              type: 'error',
              message: response.data.message || 'Thanh toán VNPay thất bại!',
              duration: 5000
            });
            this.$router.replace({ path: '/checkout-page', query: {} });
          }
        } catch (error) {
          console.error('VNPAY Callback Error:', error);
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Error setting up request:', error.message);
          }
          this.$refs.toastNotification.addToast({
            type: 'error',
            message: 'Lỗi khi kiểm tra trạng thái thanh toán VNPay: ' + error.message,
            duration: 5000
          });
          this.$router.replace({ path: '/checkout-page', query: {} });
        }
      }
    } catch (error) {
      console.error('Mounted Error:', error);
    }
  },
  watch: {
    activeTab(newVal) {
      // Khi người dùng chuyển sang tab "Thêm địa chỉ mới" (index = 0),
      // chúng ta cần xóa lựa chọn địa chỉ hiện tại để đảm bảo đây là thao tác THÊM MỚI.
      if (newVal === 0) {
        this.clearSelectedAddress();
      }
    },
    currentStep(newVal) {
      if (newVal === 2) { // When navigating to the "Order Summary" step
        this.applyBestDiscount();
      }
    }
  },
  methods: {
    async createNewInvoice() {
      try {
        const customerId = localStorage.getItem('customerId');
        const params = customerId ? { khachHangId: customerId } : {};
        const response = await axios.post('http://localhost:8080/api/client/hoa-don-cho', {}, { params });
        this.invoiceId = response.data.id;
        localStorage.setItem('invoiceId', this.invoiceId);
        this.$refs.toastNotification.addToast({
          type: 'success',
          message: 'Tạo hóa đơn mới thành công!',
          duration: 3000
        });
      } catch (error) {
        this.handleError(error, 'Lỗi khi tạo hóa đơn mới');
        this.$router.push('/cart-page');
      }
    },
    async fetchCart() {
      try {
        const response = await axios.get(`http://localhost:8080/api/client/gio-hang/${this.invoiceId}`);
        if (!response.data || !response.data.chiTietGioHangDTOS) {
          throw new Error('Dữ liệu giỏ hàng không hợp lệ');
        }
        this.order.items = response.data.chiTietGioHangDTOS.map(item => ({
          name: `${item.tenSanPham} - ${item.mauSac} - ${item.ram} - ${item.boNhoTrong}`,
          quantity: item.soLuong || 1,
          price: item.giaBan || 0
        }));
        this.order.subtotal = response.data.tongTien || 0;
        this.order.total = this.order.subtotal - (this.appliedDiscount?.amount || 0);
      } catch (error) {
        console.error('Lỗi fetchCart:', error.message, error.response?.data);
        throw new Error('Không tìm thấy hóa đơn hoặc giỏ hàng không hợp lệ');
      }
    },
    async fetchAddresses() {
      try {
        const idKhachHang = localStorage.getItem('customerId');
        if (!idKhachHang) {
          console.error('Không tìm thấy ID khách hàng trong localStorage');
          return;
        }
        const response = await axios.get(`http://localhost:8080/khach-hang/getByKhachHang/${idKhachHang}`);
        this.addresses = response.data;
        if (this.addresses.length > 0 && !this.selectedAddressId) {
          await this.selectAddress(this.addresses[0]);
        }
      } catch (error) {
        this.handleError(error, 'Lỗi khi lấy danh sách địa chỉ');
      }
    },
    async selectAddress(address) {
      this.selectedAddressId = address.id;
      this.selectedAddress = { ...address };
      this.delivery.ten = address.ten || localStorage.getItem('customerName') || '';
      this.delivery.soDienThoai = address.soDienThoai || localStorage.getItem('phoneNumber') || '';
      this.delivery.email = address.email || localStorage.getItem('email') || '';
      this.delivery.thanhPho = address.thanhPho || '';
      this.delivery.soNha = address.diaChiCuThe || '';
      this.delivery.ghiChu = address.ghiChu || '';
      if (address.thanhPho) {
        await this.fetchDistricts();
        this.delivery.quan = address.quan || '';
        if (address.quan) {
          await this.fetchWards();
          this.delivery.phuong = address.phuong || '';
        }
      }
    },
    editSelectedAddress() {
      this.activeTab = 0;
      // Tái sử dụng hàm selectAddress để đảm bảo ID được gán chính xác
      this.selectAddress(this.selectedAddress);
    },
    clearSelectedAddress() {
      this.selectedAddressId = null;
      this.selectedAddress = {};
      this.delivery = {
        ten: localStorage.getItem('customerName') || '',
        soDienThoai: localStorage.getItem('phoneNumber') || '',
        email: localStorage.getItem('email') || '',
        thanhPho: '',
        quan: '',
        phuong: '',
        soNha: '',
        ghiChu: ''
      };
    },
    async saveAddress() {
      if (!this.validateDelivery()) return;
      try {
        const idKhachHang = localStorage.getItem('customerId');
        const addressData = {
          idKhachHang: idKhachHang,
          ten: this.delivery.ten,
          soDienThoai: this.delivery.soDienThoai,
          email: this.delivery.email,
          thanhPho: this.delivery.thanhPho,
          quan: this.delivery.quan,
          phuong: this.delivery.phuong,
          diaChiCuThe: this.delivery.soNha,
          ghiChu: this.delivery.ghiChu
        };
        if (this.selectedAddressId) {
          await axios.put(`http://localhost:8080/khach-hang/client/updateDiaChi/${this.selectedAddressId}`, addressData);
        } else {
          await axios.post(`http://localhost:8080/khach-hang/addDchiKhachHang`, addressData);
        }
        await this.fetchAddresses();
        this.$refs.toastNotification.addToast({
          type: 'success',
          message: 'Địa chỉ đã được lưu thành công!',
          duration: 3000
        });
        this.selectedAddressId = null;
        this.selectedAddress = {};
        this.activeTab = 1;
      } catch (error) {
        this.handleError(error, 'Lỗi khi lưu địa chỉ');
      }
    },
    editAddress(address) {
      this.activeTab = 0;
      this.selectAddress(address);
    },
    async confirmDeleteAddress(addressId) {
      if (confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
        try {
          await axios.delete(`http://localhost:8080/khach-hang/client/deleteDiaChi/${addressId}`);
          this.$refs.toastNotification.addToast({
            type: 'success',
            message: 'Đã gửi yêu cầu xóa địa chỉ!',
            duration: 3000
          });

          // Nếu địa chỉ bị xóa là địa chỉ đang được chọn, hãy xóa lựa chọn đó đi
          if (this.selectedAddressId === addressId) {
            this.clearSelectedAddress();
          }

          // Tải lại danh sách địa chỉ từ server để lấy trạng thái đúng nhất
          await this.fetchAddresses();
        } catch (error) {
          this.handleError(error, 'Lỗi khi xóa địa chỉ. Vui lòng kiểm tra lại backend.');
        }
      }
    },
    async fetchDistricts() {
      this.districts = [];
      this.wards = [];
      this.delivery.quan = '';
      this.delivery.phuong = '';
      const selectedProvince = this.provinces.find((p) => p.name === this.delivery.thanhPho);
      if (selectedProvince) {
        try {
          const response = await axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`);
          this.districts = response.data.districts;
        } catch (error) {
          this.handleError(error, 'Lỗi khi tải danh sách quận/huyện');
        }
      }
    },
    async fetchWards() {
      this.wards = [];
      this.delivery.phuong = '';
      const selectedDistrict = this.districts.find((d) => d.name === this.delivery.quan);
      if (selectedDistrict) {
        try {
          const response = await axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`);
          this.wards = response.data.wards;
        } catch (error) {
          this.handleError(error, 'Lỗi khi tải danh sách xã/phường');
        }
      }
    },
    async submitForm(hoaDonRequest = null) {
      this.isLoading = true;
      this.isProcessingPayment = true;
      this.emailSent = false;
      try {
        const customerId = localStorage.getItem('customerId');
        const paymentMethod = hoaDonRequest?.hinhThucThanhToan?.[0]?.phuongThucThanhToanId === 2 ? 'VNPay'
          : hoaDonRequest?.hinhThucThanhToan?.[0]?.phuongThucThanhToanId === 3 ? 'MOMO'
          : this.paymentMethod;

        const requestBody = hoaDonRequest || {
          idKhachHang: customerId ? parseInt(customerId) : 1,
          tenKhachHang: this.delivery.ten,
          soDienThoaiKhachHang: this.delivery.soDienThoai,
          email: this.delivery.email,
          diaChiKhachHang: {
            diaChiCuThe: this.delivery.soNha,
            phuong: this.delivery.phuong,
            quan: this.delivery.quan,
            thanhPho: this.delivery.thanhPho
          },
          loaiDon: this.deliveryMethod === 'delivery' ? 'online' : 'offline',
          idPhieuGiamGia: this.appliedDiscount ? this.appliedDiscount.id : null,
          hinhThucThanhToan: [{
            phuongThucThanhToanId: paymentMethod === 'VNPay' ? 2 : (paymentMethod === 'MOMO' ? 3 : 1),
            tienChuyenKhoan: (paymentMethod === 'VNPay' || paymentMethod === 'MOMO') ? this.order.total : 0,
            tienMat: paymentMethod === 'COD' ? this.order.total : 0
          }]
        };

        console.log('Submitting HoaDonRequest:', requestBody);
        const response = await axios.post(`http://localhost:8080/api/client/thanh-toan/${this.invoiceId}`, requestBody, {
          timeout: 30000
        });
        console.log('Submit Response:', response.data);
const orderId = response.data.id;

this.$refs.toastNotification.addToast({
  type: 'info',
  message: `⏳ Đang xử lý đơn hàng #${response.data.maHoaDon}... Vui lòng chờ email xác nhận.`,
  duration: 3000
});

// Send email notification
try {
  await this.sendEmailNotification(orderId);
  this.emailSent = true;
  
  // Show success toast after email sent
  this.$refs.toastNotification.addToast({
    type: 'success',
    message: `🎉 Đặt hàng thành công! Đơn hàng #${response.data.maHoaDon} đã được xác nhận. Email thông báo đã được gửi.`,
    duration: 4000
  });
  
} catch (emailError) {
  console.error('Email sending failed:', emailError);
  // Still show success but mention email issue
  this.$refs.toastNotification.addToast({
    type: 'warning',
    message: `✅ Đặt hàng thành công! Đơn hàng #${response.data.maHoaDon} đã được xác nhận. Tuy nhiên có lỗi khi gửi email thông báo.`,
    duration: 4000
  });
}

// Clear cart and update navbar
await this.clearCartAndUpdateNavbar();

// Delay redirect to allow toast to show

        setTimeout(() => {
          localStorage.removeItem('invoiceId');
          localStorage.removeItem('pendingHoaDon');
          localStorage.removeItem('pendingInvoiceId');
          this.invoiceId = null;
          this.$router.push(`/invoice-status?orderId=${orderId}`);
        }, 4000);

      } catch (error) {
        console.error('Submit Error:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
        this.$refs.toastNotification.addToast({
          type: 'error',
          message: 'Lỗi khi hoàn tất hóa đơn: ' + (error.response?.data?.message || error.message),
          duration: 5000
        });
      } finally {
        this.isLoading = false;
        this.isProcessingPayment = false;
      }
    },
    
    async sendEmailNotification(hoaDonId) {
      try {
        console.log('Sending email notification for invoice:', hoaDonId);
        const response = await axios.post(`http://localhost:8080/api/email/send-invoice-status/${hoaDonId}`);
        console.log('Email sent successfully:', response.data);
        return response.data;
      } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
      }
    },
    
    async clearCartAndUpdateNavbar() {
      try {
        // Clear local cart data
        localStorage.removeItem('invoiceId');
        
        // Emit event to update navbar cart count
        this.$nuxt.$emit('cart-updated');
        
        // If there's a global cart store, update it
        if (this.$store && this.$store.dispatch) {
          await this.$store.dispatch('cart/clearCart');
        }
        
        console.log('Cart cleared and navbar updated');
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    },
    
    validateDelivery() {
      console.log('Validating delivery:', this.delivery);
      if (!this.delivery.ten) {
        this.showToast('error', 'Vui lòng nhập tên!');
        return false;
      }
      if (!this.delivery.soDienThoai) {
        this.showToast('error', 'Vui lòng nhập số điện thoại!');
        return false;
      }
      if (!this.delivery.email) {
        this.showToast('error', 'Vui lòng nhập email!');
        return false;
      }
      if (!this.delivery.thanhPho) {
        this.showToast('error', 'Vui lòng chọn tỉnh/thành phố!');
        return false;
      }
      if (!this.delivery.quan) {
        this.showToast('error', 'Vui lòng chọn quận/huyện!');
        return false;
      }
      if (!this.delivery.phuong) {
        this.showToast('error', 'Vui lòng chọn xã/phường!');
        return false;
      }
      if (!this.delivery.soNha) {
        this.showToast('error', 'Vui lòng nhập số nhà, tên đường!');
        return false;
      }
      return true;
    },
    validatePickup() {
      if (!this.pickup.soDienThoai) {
        this.showToast('error', 'Vui lòng nhập số điện thoại!');
        return false;
      }
      if (!this.pickup.email) {
        this.showToast('error', 'Vui lòng nhập email!');
        return false;
      }
      if (!this.pickup.store) {
        this.showToast('error', 'Vui lòng chọn cửa hàng!');
        return false;
      }
      return true;
    },
    handleError(error, defaultMessage) {
      const message = error.response?.data || error.message || defaultMessage || 'Đã xảy ra lỗi không xác định';
      this.$refs.toastNotification.addToast({
        type: 'error',
        message: message,
        duration: 5000
      });
    },
    setDeliveryMethod(method) {
      this.deliveryMethod = method;
    },
    selectStore(index) {
      this.selectedStoreIndex = index;
      this.pickup.store = this.stores[index].address;
    },
    async applyDiscount() {
      try {
        const customerId = localStorage.getItem('customerId');
        const response = await axios.get('http://localhost:8080/api/phieu-giam-gia/validate-at-checkout', {
          params: {
            ma: this.discountCode,
            totalPrice: this.order.subtotal,
            khachHangId: customerId
          }
        });
        this.appliedDiscount = response.data;
        if (this.appliedDiscount.loaiPhieuGiamGia === 'Phần trăm') {
          let discountAmount = (this.order.subtotal * this.appliedDiscount.phanTramGiamGia) / 100;
          if (discountAmount > this.appliedDiscount.soTienGiamToiDa) {
            discountAmount = this.appliedDiscount.soTienGiamToiDa;
          }
          this.calculatedDiscount = discountAmount;
        } else { // Tiền mặt
          this.calculatedDiscount = this.appliedDiscount.soTienGiamToiDa;
        }
        this.order.total = this.order.subtotal - this.calculatedDiscount;
        this.$refs.toastNotification.addToast({
          type: 'success',
          message: 'Mã giảm giá đã được áp dụng!',
          duration: 3000
        });
      } catch (error) {
        this.handleError(error, 'Mã giảm giá không hợp lệ');
      }
    },
    showToast(type, message) {
      // Use the ToastNotification component
      this.$refs.toastNotification.addToast({
        type: type,
        message: message,
        duration: type === 'error' ? 5000 : 3000
      });
    },

    removeToast(toastId) {
      const index = this.toasts.findIndex(toast => toast.id === toastId);
      if (index > -1) {
        this.toasts.splice(index, 1);
      }
    },
    nextStep() {
      console.log('Nút Tiếp tục được nhấn, currentStep:', this.currentStep);
      if (this.order.items.length === 0) {
        console.log('Giỏ hàng trống');
        this.$refs.toastNotification.addToast({
          type: 'error',
          message: 'Giỏ hàng trống, vui lòng kiểm tra lại!',
          duration: 4000
        });
        return;
      }
      if (this.currentStep < this.steps.length) {
        this.currentStep++;
        console.log('Chuyển sang bước:', this.currentStep);
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        console.log('Quay lại bước:', this.currentStep);
      }
    },
    async confirmOrder() {
      if (!this.paymentMethod) {
        this.$refs.toastNotification.addToast({
          type: 'error',
          message: 'Vui lòng chọn phương thức thanh toán!',
          duration: 4000
        });
        return;
      }
      this.showConfirmationModal = true;
    },
    async submitOrder() {
      this.isLoading = true;
      try {
        const customerId = localStorage.getItem('customerId');
        const hoaDonRequest = {
          idKhachHang: customerId ? parseInt(customerId) : 1,
          tenKhachHang: this.delivery.ten,
          soDienThoaiKhachHang: this.delivery.soDienThoai,
          email: this.delivery.email,
          diaChiKhachHang: {
            diaChiCuThe: this.delivery.soNha,
            phuong: this.delivery.phuong,
            quan: this.delivery.quan,
            thanhPho: this.delivery.thanhPho
          },
          loaiDon: this.deliveryMethod === 'delivery' ? 'online' : 'offline',
          idPhieuGiamGia: this.appliedDiscount ? this.appliedDiscount.id : null,
          hinhThucThanhToan: [{
            phuongThucThanhToanId: this.paymentMethod === 'VNPay' ? 2 : (this.paymentMethod === 'MOMO' ? 3 : 1),
            tienChuyenKhoan: (this.paymentMethod === 'VNPay' || this.paymentMethod === 'MOMO') ? this.order.total : 0,
            tienMat: this.paymentMethod === 'COD' ? this.order.total : 0
          }]
        };

        const pendingHoaDon = { idHD: this.invoiceId, hoaDonRequest };
        localStorage.setItem('pendingHoaDon', JSON.stringify(pendingHoaDon));

        if (this.paymentMethod === 'VNPay') {
          const params = new URLSearchParams();
          params.append('amount', this.order.total);
          params.append('orderInfo', `Thanh toan don hang #${this.invoiceId}`);
          params.append('invoiceId', this.invoiceId);
          params.append('returnUrl', window.location.origin + '/checkout-page');

          const response = await axios.post('http://localhost:8080/api/client/vnpay/create', params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });

          if (response.data) {
            window.location.href = response.data;
          } else {
            throw new Error('Không nhận được URL thanh toán từ VNPAY!');
          }
        } else if (this.paymentMethod === 'MOMO') {
          const params = new URLSearchParams();
          params.append('amount', String(this.order.total));
          params.append('orderInfo', `Thanh toan hoa don ${this.invoiceId}`);

          const response = await axios.post('http://localhost:8080/api/client/momo/create-payment', params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });

          if (response.data && response.data.payUrl) {
            window.location.href = response.data.payUrl;
          } else {
            throw new Error('Không nhận được URL thanh toán từ MoMo!');
          }
        } else if (this.paymentMethod === 'COD') {
          this.showConfirmationModal = false;
          await this.submitForm();
        } else {
          throw new Error('Phương thức thanh toán không hợp lệ!');
        }
      } catch (error) {
        console.error('Submit Order Error:', error);
        this.$refs.toastNotification.addToast({
          type: 'error',
          message: 'Lỗi khi thực hiện thanh toán: ' + error.message,
          duration: 5000
        });
        this.showConfirmationModal = false;
      } finally {
        this.isLoading = false;
      }
    },
    setPaymentMethod(method) {
      this.paymentMethod = method;
      console.log('Phương thức thanh toán được chọn:', method);
    },
    getStepDescription(stepIndex) {
      const descriptions = [
        'Nhập thông tin giao hàng và địa chỉ nhận hàng',
        'Kiểm tra lại thông tin đơn hàng và xác nhận',
        'Chọn phương thức thanh toán và hoàn tất đơn hàng'
      ];
      return descriptions[stepIndex] || '';
    },
    openVoucherModal() {
      this.showVoucherModal = true;
    },
    onVoucherSelected(voucherCode) {
      this.discountCode = voucherCode;
      this.applyDiscount();
      this.showVoucherModal = false; // Close modal after selection
    },
    async applyBestDiscount() {
      try {
        const customerId = localStorage.getItem('customerId');
        const params = {
          totalPrice: this.order.subtotal,
        };
        if (customerId) {
          params.khachHangId = customerId;
        }
        const response = await axios.get('http://localhost:8080/api/phieu-giam-gia/best-applicable-voucher', { params });
        const bestVoucher = response.data;

        if (bestVoucher) {
          this.discountCode = bestVoucher.ma;
          this.applyDiscount();
          this.$refs.toastNotification.addToast({
            type: 'success',
            message: `Đã áp dụng mã giảm giá tốt nhất: ${bestVoucher.tenPhieuGiamGia}!`, 
            duration: 3000
          });
        } else {
          this.$refs.toastNotification.addToast({
            type: 'info',
            message: 'Không tìm thấy mã giảm giá tốt nhất phù hợp.',
            duration: 3000
          });
        }
      } catch (error) {
        this.handleError(error, 'Lỗi khi tự động áp dụng mã giảm giá tốt nhất');
      }
    }
  }
}
