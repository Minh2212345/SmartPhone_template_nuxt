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
        items: [
          { name: 'Iphone 16 - Trắng - 128GB', quantity: 1, price: 19190000 },
          { name: 'Iphone 16e - Trắng - 128GB', quantity: 1, price: 16290000 },
        ],
        subtotal: 35480000,
        shipping: 0,
        total: 35480000,
      },
    }
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get('https://provinces.open-api.vn/api/p/')
      console.log('Dữ liệu tỉnh/thành phố:', response.data)
      return { provinces: response.data }
    } catch (error) {
      console.error('Lỗi khi tải danh sách tỉnh/thành phố:', error)
      return { provinces: [] }
    }
  },
  methods: {
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
          console.log('Quận/huyện:', this.districts)
        } catch (error) {
          console.error('Lỗi khi tải danh sách quận/huyện:', error)
          alert('Không thể tải danh sách quận/huyện!')
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
          console.log('Xã/phường:', this.wards)
        } catch (error) {
          console.error('Lỗi khi tải danh sách xã/phường:', error)
          alert('Không thể tải danh sách xã/phường!')
        }
      }
    },
    submitForm() {
      if (document.querySelector('#delivery-tab').classList.contains('active')) {
        if (!this.delivery.ten) {
          alert('Vui lòng nhập tên!')
          return
        }
        if (!this.delivery.soDienThoai) {
          alert('Vui lòng nhập số điện thoại!')
          return
        }
        if (!this.delivery.email) {
          alert('Vui lòng nhập email!')
          return
        }
        if (!this.delivery.thanhPho) {
          alert('Vui lòng chọn tỉnh/thành phố!')
          return
        }
        if (!this.delivery.quan) {
          alert('Vui lòng chọn quận/huyện!')
          return
        }
        if (!this.delivery.phuong) {
          alert('Vui lòng chọn xã/phường!')
          return
        }
        if (!this.delivery.soNha) {
          alert('Vui lòng nhập số nhà, tên đường!')
          return
        }
        console.log('Gửi dữ liệu giao hàng:', this.delivery)
      } else {
        if (!this.pickup.soDienThoai) {
          alert('Vui lòng nhập số điện thoại!')
          return
        }
        if (!this.pickup.email) {
          alert('Vui lòng nhập email!')
          return
        }
        if (!this.pickup.store) {
          alert('Vui lòng chọn cửa hàng!')
          return
        }
        console.log('Gửi dữ liệu nhận tại cửa hàng:', this.pickup)
      }
    },
  },
}