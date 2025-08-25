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
      activeTab: 0,
      deliveryMethod: 'delivery',
      discountCode: '',
      appliedDiscount: null,
      calculatedDiscount: 0,
      showConfirmationModal: false,
      isLoading: false,
      selectedStoreIndex: null,
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

      // Kiểm tra trạng thái thanh toán VNPay từ URL params
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('vnp_TransactionStatus')) {
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
          const response = await retry(() => axios.get('http://localhost:8080/api/payment/vnpay-payment', {
            params: vnpayParams,
            timeout: 30000
          }));
          console.log('VNPAY Response:', response.data);
          if (response.data.status === 'success') {
            const pendingHoaDon = JSON.parse(localStorage.getItem('pendingHoaDon') || '{}');
            console.log('Retrieved pendingHoaDon:', pendingHoaDon);
            if (pendingHoaDon && pendingHoaDon.idHD && pendingHoaDon.hoaDonRequest) {
              this.invoiceId = pendingHoaDon.idHD;
              await this.submitForm(pendingHoaDon.hoaDonRequest);
              this.showToast('success', `Thanh toán VNPAY thành công! Đơn hàng #${this.invoiceId} đã được xác nhận.`);
              localStorage.removeItem('pendingHoaDon');
              localStorage.removeItem('invoiceId');
              localStorage.removeItem('pendingInvoiceId');
              this.invoiceId = null;
              this.$router.replace({ path: '/cart-page', query: {} }); // Xóa query params
            } else {
              console.error('Invalid pendingHoaDon:', pendingHoaDon);
              this.showToast('error', 'Không tìm thấy thông tin hóa đơn để hoàn tất thanh toán');
              this.$router.replace({ path: '/cart-page', query: {} });
            }
          } else {
            console.error('VNPAY Payment Failed:', response.data);
            this.showToast('error', response.data.message || 'Thanh toán VNPAY thất bại!');
            this.$router.replace({ path: '/cart-page', query: {} });
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
          this.showToast('error', 'Lỗi khi kiểm tra trạng thái thanh toán VNPAY: ' + error.message);
          this.$router.replace({ path: '/cart-page', query: {} });
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
        this.showToast('success', 'Tạo hóa đơn mới thành công!');
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
        this.showToast('success', 'Địa chỉ đã được lưu thành công!');
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
          this.showToast('success', 'Đã gửi yêu cầu xóa địa chỉ!');

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
    // async submitForm(hoaDonRequest = null) {
    //   try {
    //     let loaiDon = this.deliveryMethod === 'delivery' ? 'online' : 'offline';
    //     const customerId = localStorage.getItem('customerId');

    //     // Ánh xạ paymentMethod sang phuongThucThanhToanId
    //     const paymentMethodMap = {
    //       'COD': 1, // Tiền mặt
    //       'VNPay': 2 // Chuyển khoản
    //     };
    //     const phuongThucThanhToanId = paymentMethodMap[this.paymentMethod];

    //     if (!phuongThucThanhToanId) {
    //       this.showToast('error', 'Phương thức thanh toán không hợp lệ!');
    //       return;
    //     }

    //     const requestBody = hoaDonRequest || {
    //       idKhachHang: customerId ? parseInt(customerId) : 1,
    //       tenKhachHang: this.delivery.ten,
    //       soDienThoaiKhachHang: this.delivery.soDienThoai,
    //       email: this.delivery.email,
    //       diaChiKhachHang: {
    //         diaChiCuThe: this.delivery.soNha,
    //         phuong: this.delivery.phuong,
    //         quan: this.delivery.quan,
    //         thanhPho: this.delivery.thanhPho
    //       },
    //       loaiDon: loaiDon,
    //       idPhieuGiamGia: this.appliedDiscount ? this.appliedDiscount.id : null,
    //       hinhThucThanhToan: [{
    //         phuongThucThanhToanId: phuongThucThanhToanId,
    //         tienChuyenKhoan: this.paymentMethod === 'VNPay' ? this.order.total : 0,
    //         tienMat: this.paymentMethod === 'COD' ? this.order.total : 0
    //       }]
    //     };

    //     const response = await axios.post(`http://localhost:8080/api/client/thanh-toan/${this.invoiceId}`, requestBody);
    //     this.showToast('success', `Đặt hàng thành công! Đơn hàng #${response.data.maHoaDon} đã được xác nhận. Bạn sẽ nhận được email thông báo chi tiết.`);
    //     localStorage.removeItem('invoiceId');
    //     this.invoiceId = null;
    //     this.$router.push('/cart-page');
    //   } catch (error) {
    //     this.handleError(error, 'Lỗi khi thực hiện thanh toán');
    //   }
    // },

    async submitForm(hoaDonRequest = null) {
      this.isLoading = true;
      try {
        const loaiDon = this.deliveryMethod === 'delivery' ? 'online' : 'offline';
        const phuongThucThanhToanId = this.paymentMethod === 'VNPay' ? 2 : 1;
        const customerId = localStorage.getItem('customerId');
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
          loaiDon: loaiDon,
          idPhieuGiamGia: this.appliedDiscount ? this.appliedDiscount.id : null,
          hinhThucThanhToan: [{
            phuongThucThanhToanId: phuongThucThanhToanId,
            tienChuyenKhoan: this.paymentMethod === 'VNPay' ? this.order.total : 0,
            tienMat: this.paymentMethod === 'COD' ? this.order.total : 0
          }]
        };

        console.log('Submitting HoaDonRequest:', requestBody);
        const response = await axios.post(`http://localhost:8080/api/client/thanh-toan/${this.invoiceId}`, requestBody, {
          timeout: 30000
        });
        console.log('Submit Response:', response.data);
        this.showToast('success', `Đặt hàng thành công! Đơn hàng #${response.data.maHoaDon} đã được xác nhận.`);
        localStorage.removeItem('invoiceId');
        this.invoiceId = null;
        this.$router.push('/cart-page');
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
        this.showToast('error', 'Lỗi khi hoàn tất hóa đơn: ' + (error.response?.data?.message || error.message));
      } finally {
        this.isLoading = false;
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
      this.showToast('error', message);
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
        this.showToast('success', 'Mã giảm giá đã được áp dụng!');
      } catch (error) {
        this.handleError(error, 'Mã giảm giá không hợp lệ');
      }
    },
    showToast(type, message) {
      // Replace with your actual toast notification implementation
      if (type === 'success') {
        alert(`SUCCESS: ${message}`);
      } else {
        alert(`ERROR: ${message}`);
      }
    },
    nextStep() {
      console.log('Nút Tiếp tục được nhấn, currentStep:', this.currentStep);
      if (this.order.items.length === 0) {
        console.log('Giỏ hàng trống');
        this.showToast('error', 'Giỏ hàng trống, vui lòng kiểm tra lại!');
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
        this.showToast('error', 'Vui lòng chọn phương thức thanh toán!');
        return;
      }
      this.showConfirmationModal = true;
    },
    async submitOrder() {
      this.isLoading = true;
      try {
        if (this.paymentMethod === 'VNPay') {
          const params = new URLSearchParams();
          params.append('amount', this.order.total);
          params.append('orderInfo', `Thanh toan don hang #${this.invoiceId}`);
          params.append('invoiceId', this.invoiceId);
          params.append('returnUrl', window.location.origin + '/checkout-page'); // Đảm bảo là /checkout-page

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
              phuongThucThanhToanId: 2,
              tienChuyenKhoan: this.order.total,
              tienMat: 0
            }]
          };

          const pendingHoaDon = { idHD: this.invoiceId, hoaDonRequest };
          console.log('Saving pendingHoaDon:', pendingHoaDon);
          localStorage.setItem('pendingHoaDon', JSON.stringify(pendingHoaDon));

          const response = await axios.post('http://localhost:8080/api/payment/create', params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
          if (response.data) {
            localStorage.setItem('pendingInvoiceId', this.invoiceId);
            console.log('Redirecting to VNPay:', response.data);
            window.location.href = response.data;
          } else {
            throw new Error('Không nhận được URL thanh toán từ VNPAY!');
          }
        } else if (this.paymentMethod === 'COD') {
          await this.submitForm();
          this.showConfirmationModal = false;
          this.showToast('success', `Đặt hàng thành công! Bạn sẽ nhận được email xác nhận đơn hàng.`);
          localStorage.removeItem('invoiceId');
          this.invoiceId = null;
          this.$router.push('/cart-page');
        } else {
          throw new Error('Phương thức thanh toán không hợp lệ!');
        }
      } catch (error) {
        console.error('Submit Order Error:', error);
        this.showToast('error', 'Lỗi khi thực hiện thanh toán: ' + error.message);
        this.showConfirmationModal = false;
      } finally {
        this.isLoading = false;
      }
    },
    setPaymentMethod(method) {
      this.paymentMethod = method;
      console.log('Phương thức thanh toán được chọn:', method);
    }
  }
}
