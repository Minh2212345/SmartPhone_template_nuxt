<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <NuxtLink to="/">Trang chủ</NuxtLink>
          </li>
          <li class="breadcrumb-item">
            <NuxtLink to="/cart-page">Giỏ hàng</NuxtLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <NuxtLink to="/checkout-page">Thanh toán</NuxtLink>
          </li>
        </ol>
      </div>
    </nav>

    <div class="page-content">
      <div class="checkout">
        <div class="container">
          <ul class="nav nav-tabs" id="mainTab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: activeMainTab === 'info' }"
                id="info-tab"
                href="#info"
                role="tab"
                aria-controls="info"
                :aria-selected="activeMainTab === 'info'"
                @click.prevent="activeMainTab = 'info'"
              >Thông tin nhận hàng</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: activeMainTab === 'summary' }"
                id="summary-tab"
                href="#summary"
                role="tab"
                aria-controls="summary"
                :aria-selected="activeMainTab === 'summary'"
                @click.prevent="activeMainTab = 'summary'"
              >Tóm tắt đơn hàng</a>
            </li>
          </ul>

          <div class="tab-content" id="mainTabContent">
            <!-- Main Tab 1: Customer Info and Delivery/Pickup -->
            <div class="tab-pane fade" :class="{ 'show active': activeMainTab === 'info' }" id="info" role="tabpanel"
              aria-labelledby="info-tab">
              <h2 class="checkout-title">Chi tiết hóa đơn</h2>
              
              <!-- Customer Information Section -->
<div class="customer-info mb-4">
  <h3 class="mb-3">Thông tin khách hàng</h3>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="col-sm-6 mb-3">
        <label>Tên *</label>
        <input type="text" class="form-control" v-model="delivery.ten" required />
      </div>
      <div class="col-sm-6 mb-3">
        <label>Số điện thoại *</label>
        <input type="tel" class="form-control" v-model="delivery.soDienThoai" required />
      </div>
    </div>
    <div class="mb-3">
      <label>Địa chỉ Email *</label>
      <input type="email" class="form-control" v-model="delivery.email" required />
    </div>
  </form>
</div>

              <h3 class="mb-3">Phương thức nhận hàng</h3>
              <ul class="nav nav-tabs mb-3" id="deliveryTab" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :class="{ active: deliveryMethod === 'pickup' }"
                    id="pickup-tab"
                    href="#pickup"
                    role="tab"
                    aria-controls="pickup"
                    :aria-selected="deliveryMethod === 'pickup'"
                    @click="setDeliveryMethod('pickup')"
                  >Nhận tại cửa hàng</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    :class="{ active: deliveryMethod === 'delivery' }"y
                    id="delivery-tab"
                    href="#delivery"
                    role="tab"
                    aria-controls="delivery"
                    :aria-selected="deliveryMethod === 'delivery'"
                    @click="setDeliveryMethod('delivery')"
                  >Giao hàng tận nơi</a>
                </li>
              </ul>

              <div class="tab-content" id="deliveryTabContent">
                <!-- Delivery Tab -->
                <div
                  class="tab-pane fade"
                  :class="{ 'show active': deliveryMethod === 'delivery' }"
                  id="delivery"
                  role="tabpanel"
                  aria-labelledby="delivery-tab"
                >
                  <form @submit.prevent="submitForm">
                    <div class="row">
                      <div class="col-sm-6 mb-3">
                        <select class="form-control" v-model="delivery.thanhPho" @change="fetchDistricts" required>
                          <option value="" disabled>Chọn tỉnh/thành phố</option>
                          <option v-for="(province, index) in provinces" :key="index" :value="province.name">
                            {{ province.name }}
                          </option>
                        </select>
                      </div>
                      <div class="col-sm-6 mb-3">
                        <select class="form-control" v-model="delivery.quan" @change="fetchWards" required>
                          <option value="" disabled>Chọn quận/huyện</option>
                          <option v-for="(district, index) in districts" :key="index" :value="district.name">
                            {{ district.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6 mb-3">
                        <select class="form-control" v-model="delivery.phuong" required>
                          <option value="" disabled>Chọn xã/phường</option>
                          <option v-for="(ward, index) in wards" :key="index" :value="ward.name">
                            {{ ward.name }}
                          </option>
                        </select>
                      </div>
                      <div class="col-sm-6 mb-3">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Địa chỉ cụ thể"
                          v-model="delivery.soNha"
                          required
                        />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label>Ghi chú</label>
                      <input type="text" class="form-control" v-model="delivery.ghiChu" />
                    </div>
                  </form>
                </div>

                <!-- Pickup Tab -->
                <div
                  class="tab-pane fade"
                  :class="{ 'show active': deliveryMethod === 'pickup' }"
                  id="pickup"
                  role="tabpanel"
                  aria-labelledby="pickup-tab"
                >
                  <form @submit.prevent="submitForm">
                    <label>Địa chỉ cửa hàng *</label>
                    <select class="form-control mb-3" v-model="pickup.store" required>
                      <option value="" disabled>Chọn cửa hàng</option>
                      <option v-for="(store, index) in stores" :key="index" :value="store.address">
                        {{ store.name }} - {{ store.address }}
                      </option>
                    </select>
                    <div class="mb-3">
                      <label>Ghi chú</label>
                      <input type="text" class="form-control" v-model="pickup.ghiChu" />
                    </div>
                  </form>
                </div>
              </div>

              <button
                class="btn btn-primary btn-block btn-hover-text mt-4"
                @click="activeMainTab = 'summary'"
              >Tiếp tục</button>
            </div>

            <!-- Main Tab 2: Order Summary and Payment -->
            <div
              class="tab-pane fade"
              :class="{ 'show active': activeMainTab === 'summary' }"
              id="summary"
              role="tabpanel"
              aria-labelledby="summary-tab"
            >
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
                      <td style="color: #dc3545;">{{ order.subtotal.toLocaleString() }} VND</td>
                    </tr>
                    <tr class="summary-subtotal">
                      <td>Tổng tiền giảm:</td>
                      <td></td>
                      <td style="color: #28a745;">0 VND</td>
                    </tr>
                    <tr>
                      <td>Phí vận chuyển:</td>
                      <td></td>
                      <td>{{ order.shipping.toLocaleString() }} VND</td>
                    </tr>
                    <tr class="summary-total">
                      <td>Tổng tiền sau giảm:</td>
                      <td></td>
                      <td style="color: #dc3545;">{{ order.total.toLocaleString() }} VND</td>
                    </tr>
                  </tbody>
                </table>

                <div class="checkout-discount mb-4">
                  <form @submit.prevent="applyDiscount">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        v-model="discountCode"
                        id="checkout-discount-input"
                        placeholder="Nhập mã giảm giá"
                      />                      
                    </div>
                  </form>
                </div>

                <div class="accordion-summary" id="accordion-payment">
                  <div class="card">
                    <div class="card-header" id="heading-1">
                      <h2 class="card-title">
                        <a
                          role="button"
                          :class="{ 'active': paymentMethod === 'VNPay' }"
                          data-toggle="collapse"
                          href="#collapse-1"
                          aria-expanded="true"
                          aria-controls="collapse-1"
                          @click="setPaymentMethod('VNPay')"
                        >
                          Thanh toán bằng VNPay
                        </a>
                      </h2>
                    </div>
                    <div
                      id="collapse-1"
                      class="collapse"
                      :class="{ show: paymentMethod === 'VNPay' }"
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
                          :class="{ 'active': paymentMethod === 'Tiền mặt' }"
                          role="button"
                          data-toggle="collapse"
                          href="#collapse-3"
                          aria-expanded="false"
                          aria-controls="collapse-3"
                          @click="setPaymentMethod('Tiền mặt')"
                        >
                          Hình thức COD (Cash on delivery)
                        </a>
                      </h2>
                    </div>
                    <div
                      id="collapse-3"
                      class="collapse"
                      :class="{ show: paymentMethod === 'Tiền mặt' }"
                      aria-labelledby="heading-3"
                      data-parent="#accordion-payment"
                    >
                      <div class="card-body">Thanh toán khi nhận hàng</div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  class="btn btn-primary btn-order btn-block btn-hover-text mt-4"
                  @click="submitForm"
                >
                  Đặt hàng
                </button>
                <NuxtLink class="btn btn-outline-danger btn-order btn-block btn-hover-text mt-3" to="/cart-page">
                  Hủy
                </NuxtLink>
                <button
                  class="btn btn-outline-secondary btn-block btn-hover-text mt-3"
                  @click="activeMainTab = 'info'"
                >
                  Quay lại
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import checkoutPage from '../store/pay/checkout-page'

export default {
  ...checkoutPage,
  data() {
    return {
      ...checkoutPage.data(),
      activeMainTab: 'info',
      deliveryMethod: 'delivery',
      customer: {
        ten: '',
        soDienThoai: '',
        email: ''
      }
    }
  },
  methods: {
    ...checkoutPage.methods,
    setDeliveryMethod(method) {
      this.deliveryMethod = method
      this.order.shipping = method === 'delivery' ? 30000 : 0
    }
  }
}
</script>

<style scoped>
.main {
  padding: 40px 0;
  background-color: #f8f9fa;
}

.checkout {
  max-width: 900px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.nav-tabs {
  border-bottom: 2px solid #e9ecef;
  margin-bottom: 20px;
}

.nav-tabs .nav-link {
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: 500;
  color: #495057;
  border: none;
  border-radius: 8px 8px 0 0;
  transition: all 0.3s ease;
}

.nav-tabs .nav-link.active {
  color: #007bff;
  border-bottom: 3px solid #007bff;
  background-color: #f1f5f9;
}

.checkout-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #343a40;
  margin-bottom: 24px;
}

.customer-info h3,
.summary-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #343a40;
}

.form-control {
  border: 1px solid #ced4da;
  border-radius: 6px;
  padding: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #fff;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  outline: none;
}

select.form-control {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}

label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #495057;
  margin-bottom: 8px;
}

.btn {
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
  transform: translateY(-1px);
}

.btn-outline-danger {
  border-color: #dc3545;
  color: #dc3545;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: #fff;
  transform: translateY(-1px);
}

.btn-outline-secondary {
  border-color: #6c757d;
  color: #6c757d;
}

.btn-outline-secondary:hover {
  background-color: #6c757d;
  color: #fff;
  transform: translateY(-1px);
}

.btn-hover-text {
  display: block;
  margin-top: 10px;
}

.table-summary {
  width: 100%;
  margin-bottom: 24px;
  border-collapse: separate;
  border-spacing: 0;
}

.table-summary th,
.table-summary td {
  padding: 14px;
  vertical-align: middle;
  border-bottom: 1px solid #e9ecef;
}

.table-summary th {
  background-color: #f1f5f9;
  font-weight: 600;
  color: #343a40;
}

.table-summary td a {
  color: #007bff;
  text-decoration: none;
}

.table-summary td a:hover {
  text-decoration: underline;
}

.checkout-discount .input-group {
  display: flex;
  gap: 10px;
}

.checkout-discount .form-control {
  flex: 1;
}

.accordion-summary .card {
  border: none;
  margin-bottom: 12px;
  border-radius: 8px;
  overflow: hidden;
}

.accordion-summary .card-header {
  background-color: #f1f5f9;
  padding: 0;
}

.accordion-summary .card-title a {
  display: block;
  padding: 14px 20px;
  font-size: 1.1rem;
  font-weight: 500;
  color: #343a40;
  text-decoration: none;
  transition: all 0.3s ease;
}

.accordion-summary .card-title a.active {
  color: #007bff;
  background-color: #e9ecef;
}

.accordion-summary .card-body {
  padding: 20px;
  background-color: #fff;
  border-top: 1px solid #e9ecef;
}
</style>