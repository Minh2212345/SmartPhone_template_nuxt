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
                      <td><a href="#">{{ item.name }}</a></td>
                      <td>{{ item.quantity }}</td>
                      <td>{{ item.price.toLocaleString() }} VND</td>
                    </tr>
                    <tr class="summary-subtotal">
                      <td>Tổng tiền sản phẩm:</td>
                      <td></td>
                      <td style="color: red;">{{ order.subtotal.toLocaleString() }} VND</td>
                    </tr>
                    <tr class="summary-subtotal">
                      <td>Tổng tiền giảm:</td>
                      <td></td>
                      <td style="color: green;">0 VND</td>
                    </tr>
                    <tr>
                      <td colspan="3" style="font-size: 15px; text-align: left;">
                        Mua thêm 3.000.000 VND để áp dụng phiếu giảm giá 15%
                      </td>
                    </tr>
                    <tr>
                      <td>Phí vận chuyển:</td>
                      <td></td>
                      <td>{{ order.shipping.toLocaleString() }}</td>
                    </tr>
                    <tr class="summary-total">
                      <td>Tổng tiền sau giảm:</td>
                      <td></td>
                      <td style="color: red;">{{ order.total.toLocaleString() }} VND</td>
                    </tr>
                  </tbody>
                </table>

                <div class="accordion-summary" id="accordion-payment">
                  <div class="card">
                    <div class="card-header" id="heading-1">
                      <h2 class="card-title">
                        <a role="button" data-toggle="collapse" href="#collapse-1" aria-expanded="true" aria-controls="collapse-1">
                          Thanh toán bằng VNPay
                        </a>
                      </h2>
                    </div>
                    <div id="collapse-1" class="collapse show" aria-labelledby="heading-1" data-parent="#accordion-payment">
                      <div class="card-body">Thanh toán bằng mã QR từ tài khoản ngân hàng</div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="heading-3">
                      <h2 class="card-title">
                        <a class="collapsed" role="button" data-toggle="collapse" href="#collapse-3" aria-expanded="false" aria-controls="collapse-3">
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
import checkoutPage from '../store/pay/checkout-page'

export default checkoutPage
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

select{
  border: 1px solid black;
}

.form-control {
  background-color: #ffffff !important;
}
</style>
