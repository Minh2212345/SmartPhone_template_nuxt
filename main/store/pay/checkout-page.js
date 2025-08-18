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
        shipping: 30000,
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
        await this.fetchAddresses();  // Fetch addresses nếu logged in
        // Tự động chọn địa chỉ đầu tiên nếu có (tùy chọn)
        if (this.addresses.length > 0) {
          this.selectAddress(this.addresses[0]);
        }
      }
    } catch (error) {
      this.handleError(error, 'Lỗi khi tải thông tin giỏ hàng');
      // Nếu lỗi do không tìm thấy hóa đơn, thử tạo mới với khachHangId
      if (error.message.includes('Không tìm thấy hóa đơn')) {
        await this.createNewInvoice(); // Đã có khachHangId ở đây
        await this.fetchCart();
        const customerId = localStorage.getItem('customerId');
        if (customerId) {
          await this.fetchAddresses();
        }
      } else {
        this.showToast('error', 'Không thể tải giỏ hàng, vui lòng quay lại trang giỏ hàng!');
        this.$router.push('/cart-page');
      }
    }
  },
  methods: {
    async createNewInvoice() {
      try {
        const customerId = localStorage.getItem('customerId'); // Lấy ID khách hàng nếu đã login
        const params = customerId ? { khachHangId: customerId } : {}; // Truyền params nếu có ID

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
        this.order.total = this.order.subtotal + this.order.shipping;
      } catch (error) {
        console.error('Lỗi fetchCart:', error.message, error.response?.data);
        throw new Error('Không tìm thấy hóa đơn hoặc giỏ hàng không hợp lệ');
      }
    },
    async fetchAddresses() {
      try {
        const idKhachHang = localStorage.getItem('customerId')
        if (!idKhachHang) {
          console.error('Không tìm thấy ID khách hàng trong localStorage')
          return
        }
        const response = await axios.get(`http://localhost:8080/khach-hang/getByKhachHang/${idKhachHang}`)
        this.addresses = response.data
        if (this.addresses.length > 0 && !this.selectedAddressId) {
          await this.selectAddress(this.addresses[0])
        }
      } catch (error) {
        this.handleError(error, 'Lỗi khi lấy danh sách địa chỉ')
      }
    },
    async selectAddress(address) {
      this.selectedAddressId = address.id
      this.selectedAddress = { ...address }
      this.delivery.ten = address.ten || localStorage.getItem('customerName') || ''
      this.delivery.soDienThoai = address.soDienThoai || localStorage.getItem('phoneNumber') || ''
      this.delivery.email = address.email || localStorage.getItem('email') || ''
      this.delivery.thanhPho = address.thanhPho || ''
      this.delivery.soNha = address.diaChiCuThe || ''
      this.delivery.ghiChu = address.ghiChu || ''

      if (address.thanhPho) {
        await this.fetchDistricts()
        this.delivery.quan = address.quan || ''
        if (address.quan) {
          await this.fetchWards()
          this.delivery.phuong = address.phuong || ''
        }
      }
    },
    editSelectedAddress() {
      this.activeTab = 0
      this.delivery = { ...this.selectedAddress }
    },
    clearSelectedAddress() {
      this.selectedAddressId = null
      this.selectedAddress = {}
      this.delivery = {
        ten: localStorage.getItem('customerName') || '',
        soDienThoai: localStorage.getItem('phoneNumber') || '',
        email: localStorage.getItem('email') || '',
        thanhPho: '',
        quan: '',
        phuong: '',
        soNha: '',
        ghiChu: ''
      }
    },
    async saveAddress() {
      if (!this.validateDelivery()) return
      try {
        const idKhachHang = localStorage.getItem('customerId')
        const addressData = {
          ten: this.delivery.ten,
          soDienThoai: this.delivery.soDienThoai,
          email: this.delivery.email,
          thanhPho: this.delivery.thanhPho,
          quan: this.delivery.quan,
          phuong: this.delivery.phuong,
          diaChiCuThe: this.delivery.soNha,
          ghiChu: this.delivery.ghiChu
        }
        if (this.selectedAddressId) {
          await axios.put(`http://localhost:8080/khach-hang/update/${this.selectedAddressId}`, addressData)
        } else {
          await axios.post(`http://localhost:8080/khach-hang/add/${idKhachHang}`, addressData)
        }
        await this.fetchAddresses()
        this.showToast('success', 'Địa chỉ đã được lưu thành công!')
        this.selectedAddressId = null
        this.selectedAddress = {}
        this.activeTab = 1
      } catch (error) {
        this.handleError(error, 'Lỗi khi lưu địa chỉ')
      }
    },
    editAddress(address) {
      this.activeTab = 0
      this.selectAddress(address)
    },
    async confirmDeleteAddress(addressId) {
      if (confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
        try {
          await axios.delete(`http://localhost:8080/khach-hang/delete/${addressId}`)
          this.addresses = this.addresses.filter(a => a.id !== addressId)
          if (this.selectedAddressId === addressId) {
            this.clearSelectedAddress()
          }
          this.showToast('success', 'Địa chỉ đã được xóa!')
        } catch (error) {
          this.handleError(error, 'Lỗi khi xóa địa chỉ')
        }
      }
    },
    async fetchDistricts() {
      this.districts = []
      this.wards = []
      this.delivery.quan = ''
      this.delivery.phuong = ''
      const selectedProvince = this.provinces.find((p) => p.name === this.delivery.thanhPho)
      if (selectedProvince) {
        try {
          const response = await axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`)
          this.districts = response.data.districts
        } catch (error) {
          this.handleError(error, 'Lỗi khi tải danh sách quận/huyện')
        }
      }
    },
    async fetchWards() {
      this.wards = []
      this.delivery.phuong = ''
      const selectedDistrict = this.districts.find((d) => d.name === this.delivery.quan)
      if (selectedDistrict) {
        try {
          const response = await axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`)
          this.wards = response.data.wards
        } catch (error) {
          this.handleError(error, 'Lỗi khi tải danh sách xã/phường')
        }
      }
    },
    async submitForm() {
      try {
        if (this.paymentMethod === 'VNPay') {
          return;
        }
        let hoaDonRequest = {};
        let loaiDon = 'online';
        const customerId = localStorage.getItem('customerId'); // Lấy idKhachHang từ localStorage

        if (this.deliveryMethod === 'delivery') {
          if (!this.validateDelivery()) return;
          hoaDonRequest = {
            idKhachHang: customerId ? parseInt(customerId) : null, // Thêm idKhachHang
            tenKhachHang: this.delivery.ten,
            soDienThoaiKhachHang: this.delivery.soDienThoai,
            email: this.delivery.email,
            diaChiKhachHang: {
              diaChiCuThe: `${this.delivery.soNha}, ${this.delivery.phuong}, ${this.delivery.quan}, ${this.delivery.thanhPho}`,
            },
            loaiDon: 'online',
            idPhieuGiamGia: this.appliedDiscount ? this.appliedDiscount.id : null,
          };
        } else {
          if (!this.validatePickup()) return;
          loaiDon = 'offline';
          hoaDonRequest = {
            idKhachHang: customerId ? parseInt(customerId) : null, // Thêm idKhachHang
            tenKhachHang: this.delivery.ten || this.stores[this.selectedStoreIndex]?.name || 'Khách hàng nhận tại cửa hàng',
            soDienThoaiKhachHang: this.pickup.soDienThoai,
            email: this.pickup.email,
            diaChiKhachHang: {
              diaChiCuThe: this.pickup.store,
            },
            loaiDon: 'offline',
            idPhieuGiamGia: this.appliedDiscount ? this.appliedDiscount.id : null,
          };
        }

        const response = await axios.post(`http://localhost:8080/api/client/thanh-toan/${this.invoiceId}`, hoaDonRequest);
        localStorage.removeItem('invoiceId');
        this.showToast('success', `Đặt hàng thành công! Đơn hàng #${response.data.maHoaDon} đã được xác nhận. Bạn sẽ nhận được email thông báo chi tiết.`);
        this.$router.push('/cart-page');
      } catch (error) {
        this.handleError(error, 'Lỗi khi thực hiện thanh toán');
      }
    },
    validateDelivery() {
      console.log('Validating delivery:', this.delivery)
      if (!this.delivery.ten) {
        this.showToast('error', 'Vui lòng nhập tên!')
        return false
      }
      if (!this.delivery.soDienThoai) {
        this.showToast('error', 'Vui lòng nhập số điện thoại!')
        return false
      }
      if (!this.delivery.email) {
        this.showToast('error', 'Vui lòng nhập email!')
        return false
      }
      if (!this.delivery.thanhPho) {
        this.showToast('error', 'Vui lòng chọn tỉnh/thành phố!')
        return false
      }
      if (!this.delivery.quan) {
        this.showToast('error', 'Vui lòng chọn quận/huyện!')
        return false
      }
      if (!this.delivery.phuong) {
        this.showToast('error', 'Vui lòng chọn xã/phường!')
        return false
      }
      if (!this.delivery.soNha) {
        this.showToast('error', 'Vui lòng nhập số nhà, tên đường!')
        return false
      }
      return true
    },
    validatePickup() {
      if (!this.pickup.soDienThoai) {
        this.showToast('error', 'Vui lòng nhập số điện thoại!')
        return false
      }
      if (!this.pickup.email) {
        this.showToast('error', 'Vui lòng nhập email!')
        return false
      }
      if (!this.pickup.store) {
        this.showToast('error', 'Vui lòng chọn cửa hàng!')
        return false
      }
      return true
    },
    handleError(error, defaultMessage) {
      const message = error.response?.data?.message || error.message || defaultMessage || 'Đã xảy ra lỗi không xác định'
      this.showToast('error', message)
    },
    setDeliveryMethod(method) {
      this.deliveryMethod = method
      if (method === 'pickup') {
        this.order.shipping = 0
        this.order.total = this.order.subtotal
      } else {
        this.order.shipping = 30000
        this.order.total = this.order.subtotal + this.order.shipping
      }
    },
    selectStore(index) {
      this.selectedStoreIndex = index
      this.pickup.store = this.stores[index].address
    },
    async applyDiscount() {
      try {
        const response = await axios.post('http://localhost:8080/api/discount/apply', {
          code: this.discountCode,
          invoiceId: this.invoiceId
        })
        this.appliedDiscount = response.data
        this.order.total = this.order.subtotal + this.order.shipping - (this.appliedDiscount?.amount || 0)
        this.showToast('success', 'Mã giảm giá đã được áp dụng!')
      } catch (error) {
        this.handleError(error, 'Mã giảm giá không hợp lệ')
      }
    },
    showToast(type, message) {
      console.log(`${type}: ${message}`)
      // Thêm logic hiển thị toast nếu cần, ví dụ sử dụng vue-toastification
    },
    nextStep() {
      console.log('Nút Tiếp tục được nhấn, currentStep:', this.currentStep)
      if (this.order.items.length === 0) {
        console.log('Giỏ hàng trống')
        this.showToast('error', 'Giỏ hàng trống, vui lòng kiểm tra lại!')
        return
      }
      if (this.currentStep < this.steps.length) {
        this.currentStep++
        console.log('Chuyển sang bước:', this.currentStep)
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
        console.log('Quay lại bước:', this.currentStep)
      }
    },
    async confirmOrder() {
      if (!this.paymentMethod) {
        this.showToast('error', 'Vui lòng chọn phương thức thanh toán!')
        return
      }
      this.showConfirmationModal = true
    },
    async submitOrder() {
      this.isLoading = true
      try {
        if (this.paymentMethod === 'VNPay') {
          const params = new URLSearchParams()
          params.append('amount', this.order.total)
          params.append('orderInfo', `Thanh toan don hang #${this.invoiceId}`)
          params.append('invoiceId', this.invoiceId)
          params.append('returnUrl', window.location.origin + '/payment-callback')
          const response = await axios.post('http://localhost:8080/api/payment/create', params)
          if (response.data) {
            window.location.href = response.data
          } else {
            throw new Error('Không nhận được URL thanh toán từ VNPAY!')
          }
        } else {
          await this.submitForm()
          this.showConfirmationModal = false
          this.showToast('success', `Đặt hàng thành công! Bạn sẽ nhận được email xác nhận đơn hàng.`)
          this.$router.push('/cart-page')
        }
      } catch (error) {
        this.handleError(error, 'Lỗi khi thực hiện thanh toán')
        this.showConfirmationModal = false
      } finally {
        this.isLoading = false
      }
    },
    setPaymentMethod(method) {
      this.paymentMethod = method
      console.log('Phương thức thanh toán được chọn:', method)
    }
  }
}
