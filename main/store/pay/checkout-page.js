import axios from 'axios'

export default {
  data() {
    return {
      provinces: [],
      districts: [],
      wards: [],
      delivery: {
        ten: '',
        soDienThoai: '',
        email: '',
        thanhPho: '',
        quan: '',
        phuong: '',
        soNha: '',
      },
      pickup: {
        store: '',
        soDienThoai: '',
        email: '',
      },
      stores: [{ name: 'Cửa hàng 1', address: 'Số 13 phố Trịnh Văn Bô, Phường Nam Từ Liêm, Hà Nội' }],
      order: {
        items: [],
        subtotal: 0,
        shipping: 30000, // Phí vận chuyển mặc định cho giao hàng
        total: 0,
      },
      invoiceId: null,
      paymentMethod: 'Tiền mặt', // Mặc định là COD
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
      this.invoiceId = this.$route.query.invoiceId || localStorage.getItem('invoiceId')
      if (this.invoiceId) {
        await this.fetchCart()
      } else {
        this.$toast.error('Không tìm thấy hóa đơn để thanh toán!')
        this.$router.push('/cart-page')
      }
    } catch (error) {
      this.handleError(error, 'Lỗi khi tải thông tin giỏ hàng')
    }
  },
  methods: {
    async fetchCart() {
      try {
        const response = await axios.get(`http://localhost:8080/api/client/gio-hang/${this.invoiceId}`)
        this.order.items = response.data.chiTietGioHangDTOS.map(item => ({
          name: `${item.tenSanPham} - ${item.mauSac} - ${item.ram} - ${item.boNhoTrong}`,
          quantity: item.soLuong || 1,
          price: item.giaBan || 0
        }))
        this.order.subtotal = response.data.tongTien || 0
        this.order.total = this.order.subtotal + this.order.shipping
      } catch (error) {
        this.handleError(error, 'Lỗi khi tải giỏ hàng')
        this.order.items = []
        this.order.subtotal = 0
        this.order.total = this.order.shipping
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
    let hoaDonRequest = {}
    let loaiDon = 'online'

    if (this.deliveryMethod === 'delivery') {
      if (!this.validateDelivery()) return
      hoaDonRequest = {
        tenKhachHang: this.delivery.ten,
        soDienThoaiKhachHang: this.delivery.soDienThoai,
        email: this.delivery.email,
        diaChiKhachHang: {
          diaChiCuThe: `${this.delivery.soNha}, ${this.delivery.phuong}, ${this.delivery.quan}, ${this.delivery.thanhPho}`
        },
        loaiDon: 'online',
      }
    } else {
      if (!this.validatePickup()) return
      loaiDon = 'offline'
      hoaDonRequest = {
        tenKhachHang: this.delivery.ten || this.stores[this.selectedStoreIndex]?.name || 'Khách hàng nhận tại cửa hàng',
        soDienThoaiKhachHang: this.pickup.soDienThoai,
        email: this.pickup.email,
        diaChiKhachHang: {
          diaChiCuThe: this.pickup.store
        },
        loaiDon: 'offline',
      }
    }

    // Gọi API thanh toán
    const response = await axios.post(`http://localhost:8080/api/client/thanh-toan/${this.invoiceId}`, hoaDonRequest)

    // Xóa invoiceId khỏi localStorage
    localStorage.removeItem('invoiceId')

    // Hiển thị thông báo thành công
    this.$toast.success(`Đặt hàng thành công! Đơn hàng #${response.data.maHoaDon} đã được xác nhận. Bạn sẽ nhận được email thông báo chi tiết.`)

    // Chuyển hướng đến trang tra cứu đơn hàng
    this.$router.push({
      path: '/invoice-status',
      query: { maHoaDon: response.data.maHoaDon }
    })
  } catch (error) {
    this.handleError(error, 'Lỗi khi thực hiện thanh toán')
  }
},
    validateDelivery() {
      if (!this.delivery.ten) {
        this.$toast.error('Vui lòng nhập tên!')
        return false
      }
      if (!this.delivery.soDienThoai) {
        this.$toast.error('Vui lòng nhập số điện thoại!')
        return false
      }
      if (!this.delivery.email) {
        this.$toast.error('Vui lòng nhập email!')
        return false
      }
      if (!this.delivery.thanhPho) {
        this.$toast.error('Vui lòng chọn tỉnh/thành phố!')
        return false
      }
      if (!this.delivery.quan) {
        this.$toast.error('Vui lòng chọn quận/huyện!')
        return false
      }
      if (!this.delivery.phuong) {
        this.$toast.error('Vui lòng chọn xã/phường!')
        return false
      }
      if (!this.delivery.soNha) {
        this.$toast.error('Vui lòng nhập số nhà, tên đường!')
        return false
      }
      return true
    },
    validatePickup() {
      if (!this.pickup.soDienThoai) {
        this.$toast.error('Vui lòng nhập số điện thoại!')
        return false
      }
      if (!this.pickup.email) {
        this.$toast.error('Vui lòng nhập email!')
        return false
      }
      if (!this.pickup.store) {
        this.$toast.error('Vui lòng chọn cửa hàng!')
        return false
      }
      return true
    },
    handleError(error, defaultMessage) {
      const message = error.response?.data?.message || error.message || defaultMessage
      this.$toast.error(message)
      console.error(`${defaultMessage}:`, error)
    },
    setPaymentMethod(method) {
      this.paymentMethod = method
    }
  }
}
