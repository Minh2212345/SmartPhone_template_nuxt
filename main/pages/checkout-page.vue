<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><NuxtLink to="/">Trang chủ</NuxtLink></li>
          <li class="breadcrumb-item"><NuxtLink to="/cart-page">Giỏ hàng</NuxtLink></li>
          <li class="breadcrumb-item active" aria-current="page">
            <NuxtLink to="/checkout-page">Thanh toán</NuxtLink>
          </li>
        </ol>
      </div>
    </nav>

    <div class="page-content">
      <div class="checkout">
        <div class="container">
          <div class="checkout-discount">
            <form action="#">
              <input type="text" class="form-control" required id="checkout-discount-input" />
              <label for="checkout-discount-input" class="text-truncate">
                Bạn có mã giảm giá? <span>Click để nhập mã</span>
              </label>
            </form>
          </div>

          <div class="row">
            <div class="col-lg-7">
              <ul class="nav nav-tabs" id="deliveryTab" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="pickup-tab"
                    data-toggle="tab"
                    href="#pickup"
                    role="tab"
                    aria-controls="pickup"
                    aria-selected="true"
                    >Nhận tại cửa hàng</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    id="delivery-tab"
                    data-toggle="tab"
                    href="#delivery"
                    role="tab"
                    aria-controls="delivery"
                    aria-selected="false"
                    >Giao hàng tận nơi</a
                  >
                </li>
              </ul>

              <div class="tab-content" id="deliveryTabContent">
                <!-- Delivery Tab -->
                <div class="tab-pane fade show active" id="delivery" role="tabpanel" aria-labelledby="delivery-tab">
                  <form @submit.prevent="submitForm">
                    <h2 class="checkout-title">Chi tiết hóa đơn</h2>
                    <div class="row">
                      <div class="col-sm-6">
                        <label>Tên *</label>
                        <input type="text" class="form-control" v-model="delivery.ten" required />
                      </div>
                      <div class="col-sm-6">
                        <label>Số điện thoại *</label>
                        <input type="tel" class="form-control" v-model="delivery.soDienThoai" required />
                      </div>
                    </div>
                    <div>
                      <label>Địa chỉ Email *</label>
                      <input type="email" class="form-control" v-model="delivery.email" required />
                    </div>
                    <div class="row">
                      <div class="col-sm-6 mt-1">                        
                        <select class="form-control" v-model="delivery.thanhPho" @change="fetchDistricts">
                          <option value="" disabled>Chọn tỉnh/thành phố</option>
                          <option v-for="(province, index) in provinces" :key="index" :value="province.name">
                            {{ province.name }}
                          </option>
                        </select>
                      </div>
                      <div class="col-sm-6 mt-1">                        
                        <select class="form-control" v-model="delivery.quan" @change="fetchWards">
                          <option value="" disabled>Chọn quận/huyện</option>
                          <option v-for="(district, index) in districts" :key="index" :value="district.name">
                            {{ district.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6 mt-1">                        
                        <select class="form-control" v-model="delivery.phuong">
                          <option value="" disabled>Chọn xã/phường</option>
                          <option v-for="(ward, index) in wards" :key="index" :value="ward.name">
                            {{ ward.name }}
                          </option>
                        </select>
                      </div>
                      <div class="col-sm-6 mt-1">                        
                        <input type="text" class="form-control" placeholder="Địa chỉ cụ thể" style="font-size: 14px;" v-model="delivery.soNha" required />
                      </div>
                    </div>
                    <div class="mt-1">
                      <label>Ghi chú</label>
                      <input type="text" class="form-control" />
                    </div>
                  </form>
                </div>

                <!-- Pickup Tab -->
                <div class="tab-pane fade" id="pickup" role="tabpanel" aria-labelledby="pickup-tab">
                  <form @submit.prevent="submitForm">
                    <h2 class="checkout-title">Chi tiết hóa đơn</h2>
                    <label>Địa chỉ cửa hàng *</label>
                    <select class="form-control" v-model="pickup.store">
                      <option value="" disabled>Chọn cửa hàng</option>
                      <option v-for="(store, index) in stores" :key="index" :value="store.address">
                        {{ store.name }} - {{ store.address }}
                      </option>
                    </select>
                    <div class="row">
                      <div class="col-sm-12">
                        <label>Số điện thoại</label>
                        <input type="tel" class="form-control" v-model="pickup.soDienThoai" required />
                      </div>
                      <div class="col-sm-12">
                        <label>Email</label>
                        <input type="email" class="form-control" v-model="pickup.email" required />
                      </div>
                    </div>
                    <div class="mt-1">
                      <label>Ghi chú</label>
                      <input type="text" class="form-control" />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Shared Order Summary -->
            <aside class="col-lg-5">
              <div class="summary">
                <h3 class="summary-title">Đơn hàng của bạn</h3>
                <table class="table table-summary">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Giá trị</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in order.items" :key="index">
                      <td>
                        <a href="#">{{ item.name }}</a>
                      </td>
                      <td>{{ item.quantity }}</td>
                      <td>{{ item.price.toLocaleString() }} VND</td>
                    </tr>
                    <tr class="summary-subtotal">
                      <td>Tổng tiền sản phẩm:</td>
                      <td></td>
                      <td style="color: red">{{ order.subtotal.toLocaleString() }} VND</td>
                    </tr>
                    <tr>
                      <td>Phí vận chuyển:</td>
                      <td></td>
                      <td>{{ order.shipping.toLocaleString() }}</td>
                    </tr>
                    <tr class="summary-total">
                      <td>Tổng tiền:</td>
                      <td></td>
                      <td style="color: red">{{ order.total.toLocaleString() }} VND</td>
                    </tr>
                  </tbody>
                </table>

                <div class="accordion-summary" id="accordion-payment">
                  <div class="card">
                    <div class="card-header" id="heading-1">
                      <h2 class="card-title">
                        <a
                          role="button"
                          data-toggle="collapse"
                          href="#collapse-1"
                          aria-expanded="true"
                          aria-controls="collapse-1"
                        >
                          Thanh toán bằng VNPay
                        </a>
                      </h2>
                    </div>
                    <div
                      id="collapse-1"
                      class="collapse show"
                      aria-labelledby="heading-1"
                      data-parent="#accordion-payment"
                    >
                      <div class="card-body">Thanh toán bằng mã QR từ tài khoản ngân hàng</div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="heading-3">
                      <h2 class="card-title">
                        <a
                          class="collapsed"
                          role="button"
                          data-toggle="collapse"
                          href="#collapse-3"
                          aria-expanded="false"
                          aria-controls="collapse-3"
                        >
                          Hình thức COD (Cash on delivery)
                        </a>
                      </h2>
                    </div>
                    <div id="collapse-3" class="collapse" aria-labelledby="heading-3" data-parent="#accordion-payment">
                      <div class="card-body">Thanh toán khi nhận hàng</div>
                    </div>
                  </div>
                </div>

                <button type="submit" class="btn btn-outline-primary-2 btn-order btn-block btn-hover-text" @click="submitForm">
                  Đặt hàng
                </button>
                <NuxtLink class="btn btn-outline-danger btn-order btn-block btn-hover-text" to="/qr-page">
                  Hủy
                </NuxtLink>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
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
</script>

<style scoped>
.col-lg-7 {
  flex: 0 0 55%;
  max-width: 55%;
}
.col-lg-5 {
  flex: 0 0 45%;
  max-width: 45%;
}
.btn-hover-text {
  display: block;
  margin-top: 10px;
}

/* Tùy chỉnh input và select để chỉ có border-bottom */
.form-control {  
  border-radius: 0;
  background: transparent;
  padding: 1rem;
  transition: border-color 0.3s ease;
  border-radius: 8px 8px;
}

.form-control:focus {
  outline: none;
  border-bottom: 2px solid #007bff; /* Màu viền khi focus */
  box-shadow: none;
}

/* Tùy chỉnh textarea */
textarea.form-control {
  border: none;
  border-bottom: 1px solid #000;
  border-radius: 0;
  background: transparent;
  resize: vertical; /* Chỉ cho phép resize theo chiều dọc */
}

textarea.form-control:focus {
  outline: none;
  border-bottom: 2px solid #007bff;
  box-shadow: none;
}

.form-control {
  background-color: #ffffff !important;
}
</style>
