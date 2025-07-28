<template>
  <main class="main">
    <!-- Enhanced Breadcrumb -->
    <div class="breadcrumb-container">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <NuxtLink to="/" class="breadcrumb-link">
                <i class="bi bi-house-door"></i> Trang chủ
              </NuxtLink>
            </li>
            <li class="breadcrumb-item">
              <NuxtLink to="/cart-page" class="breadcrumb-link">Giỏ hàng</NuxtLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Thanh toán</li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="container">
      <!-- Animated Progress Steps -->
      <div class="checkout-progress mb-5">
        <div class="progress-track"></div>
        <div class="row justify-content-between">
          <div v-for="(step, index) in steps" :key="index" class="col-auto">
            <div class="progress-step" :class="{
              'active': currentStep >= index + 1,
              'completed': currentStep > index + 1
            }">
              <div class="step-indicator">
                <div class="step-number">
                  <i v-if="currentStep > index + 1" class="bi bi-check"></i>
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <div class="step-label">{{ step.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <!-- Left Column - Forms -->
        <div class="col-lg-8">
          <div class="checkout-card">
            <!-- Step 1: Shipping Information -->
            <transition name="fade" mode="out-in">
              <div v-if="currentStep === 1" key="step1">
                <div class="step-header">
                  <h2 class="step-title">
                    <i class="bi bi-truck me-2"></i>Thông tin giao hàng
                  </h2>
                  <p class="step-subtitle">Vui lòng nhập thông tin để chúng tôi có thể giao hàng cho bạn</p>
                </div>

                <!-- Customer Info Section -->
                <div class="section-container">
                  <h3 class="section-title">
                    <i class="bi bi-person-circle me-2"></i>Thông tin khách hàng
                  </h3>
                  <form @submit.prevent="submitForm">
                    <div class="row g-3">
                      <div class="col-md-6">
                        <div class="form-floating">
                          <label for="fullName">Họ và tên *</label>
                          <input type="text" class="form-control" id="fullName" v-model="delivery.ten"
                            placeholder="Nhập họ và tên" required />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <label for="phone">Số điện thoại *</label>
                          <input type="tel" class="form-control" id="phone" v-model="delivery.soDienThoai"
                            placeholder="Nhập số điện thoại" required />
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-floating">
                          <label for="email">Email *</label>
                          <input type="email" class="form-control" id="email" v-model="delivery.email"
                            placeholder="Nhập địa chỉ email" required />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <!-- Delivery Method Section -->
                <div class="section-container">
                  <h3 class="section-title">
                    <i class="bi bi-box-seam me-2"></i>Phương thức nhận hàng
                  </h3>
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="delivery-option" :class="{ 'selected': deliveryMethod === 'delivery' }"
                        @click="setDeliveryMethod('delivery')">
                        <div class="option-icon">
                          <i class="bi bi-truck"></i>
                        </div>
                        <div class="option-content">
                          <h4>Giao hàng tận nơi</h4>
                          <p>Phí giao hàng: 30,000 VND</p>
                        </div>
                        <div class="option-radio">
                          <input type="radio" :checked="deliveryMethod === 'delivery'" />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="delivery-option" :class="{ 'selected': deliveryMethod === 'pickup' }"
                        @click="setDeliveryMethod('pickup')">
                        <div class="option-icon">
                          <i class="bi bi-shop"></i>
                        </div>
                        <div class="option-content">
                          <h4>Nhận tại cửa hàng</h4>
                          <p>Miễn phí - Nhận trong 2 giờ</p>
                        </div>
                        <div class="option-radio">
                          <input type="radio" :checked="deliveryMethod === 'pickup'" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Delivery Address Section -->
                <div v-if="deliveryMethod === 'delivery'" class="section-container">
                  <h3 class="section-title">
                    <i class="bi bi-geo-alt me-2"></i>Địa chỉ giao hàng
                  </h3>
                  <form @submit.prevent="submitForm">
                    <div class="row g-3">
                      <div class="col-md-6">
                        <div class="form-floating">
                          <label for="city">Tỉnh/Thành phố *</label>
                          <select class="form-select" id="city" v-model="delivery.thanhPho" @change="fetchDistricts"
                            required>
                            <option value="" disabled selected>Chọn tỉnh/thành phố</option>
                            <option v-for="province in provinces" :key="province.name" :value="province.name">
                              {{ province.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <label for="district">Quận/Huyện *</label>
                          <select class="form-select" id="district" v-model="delivery.quan" @change="fetchWards"
                            required>
                            <option value="" disabled selected>Chọn quận/huyện</option>
                            <option v-for="district in districts" :key="district.name" :value="district.name">
                              {{ district.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <label for="ward">Xã/Phường *</label>
                          <select class="form-select" id="ward" v-model="delivery.phuong" required>
                            <option value="" disabled selected>Chọn xã/phường</option>
                            <option v-for="ward in wards" :key="ward.name" :value="ward.name">
                              {{ ward.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <label for="street">Số nhà, tên đường *</label>
                          <input type="text" class="form-control" id="street" v-model="delivery.soNha"
                            placeholder="Ví dụ: 123 Nguyễn Trãi" required />
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-floating">
                          <label for="notes">Ghi chú</label>
                          <textarea class="form-control" id="notes" v-model="delivery.ghiChu"
                            placeholder="Ghi chú cho shipper (tùy chọn)" style="height: 100px"></textarea>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <!-- Store Pickup Section -->
                <div v-if="deliveryMethod === 'pickup'" class="section-container">
                  <h3 class="section-title">
                    <i class="bi bi-shop-window me-2"></i>Chọn cửa hàng
                  </h3>
                  <form @submit.prevent="submitForm">
                    <div class="row g-3">
                      <div class="col-md-6">
                        <div class="form-floating">
                          <label for="pickupPhone">Số điện thoại *</label>
                          <input type="tel" class="form-control" id="pickupPhone" v-model="pickup.soDienThoai"
                            placeholder="Nhập số điện thoại" required />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <label for="pickupEmail">Email *</label>
                          <input type="email" class="form-control" id="pickupEmail" v-model="pickup.email"
                            placeholder="Nhập địa chỉ email" required />
                        </div>
                      </div>
                    </div>
                    <div class="store-list mt-3">
                      <div v-for="(store, index) in stores" :key="index" class="store-card"
                        :class="{ 'selected': selectedStoreIndex === index }" @click="selectStore(index)">
                        <div class="store-radio">
                          <input type="radio" :checked="selectedStoreIndex === index" />
                        </div>
                        <div class="store-content">
                          <h4>{{ store.name }}</h4>
                          <p class="store-address">{{ store.address }}</p>
                          <p class="store-hours">{{ store.hours || '8:00 - 22:00 (Thứ 2 - Chủ nhật)' }}</p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div class="step-actions">
                  <button class="btn-primary btn-next" @click="nextStep">
                    Tiếp tục <i class="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>

              <!-- Step 2: Order Summary -->
              <div v-else-if="currentStep === 2" key="step2">
                <div class="step-header">
                  <h2 class="step-title">
                    <i class="bi bi-clipboard-check me-2"></i>Xác nhận đơn hàng
                  </h2>
                  <p class="step-subtitle">Kiểm tra lại thông tin đơn hàng của bạn</p>
                </div>

                <!-- Order Items Section -->
                <div class="section-container">
                  <h3 class="section-title">
                    <i class="bi bi-cart-check me-2"></i>Sản phẩm đã chọn
                  </h3>
                  <div class="order-items">
                    <div v-for="(item, index) in order.items" :key="index" class="order-item">
                      <div class="item-details">
                        <h4>{{ item.name }}</h4>
                        <p class="item-quantity">Số lượng: {{ item.quantity }}</p>
                      </div>
                      <div class="item-price">
                        <p class="price-unit">{{ item.price.toLocaleString() }}đ</p>
                        <p class="price-total">{{ (item.price * item.quantity).toLocaleString() }}đ</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Discount Code Section -->
                <div class="section-container">
                  <h3 class="section-title">
                    <i class="bi bi-percent me-2"></i>Mã giảm giá
                  </h3>
                  <form @submit.prevent="applyDiscount">
                    <div class="discount-input">
                      <input type="text" class="form-control" v-model="discountCode" placeholder="Nhập mã giảm giá" />
                      <button class="btn-apply btn-primary" type="submit"
                        style="padding: 0; border-top-left-radius: 0px; border-bottom-left-radius: 0px;">
                        Áp dụng
                      </button>
                    </div>
                    <p v-if="appliedDiscount" class="text-success mt-2">
                      Mã giảm giá {{ appliedDiscount.code }} đã được áp dụng (-{{
                        appliedDiscount.amount.toLocaleString() }}đ)
                    </p>
                  </form>
                </div>

                <div class="step-actions">
                  <button class="btn-outline-secondary btn-prev" @click="prevStep">
                    <i class="bi bi-arrow-left me-2"></i> Quay lại
                  </button>
                  <button class="btn-primary btn-next" @click="nextStep">
                    Tiếp tục thanh toán <i class="bi bi-arrow-right ms-2"></i>
                  </button>
                </div>
              </div>

              <!-- Step 3: Payment -->
              <div v-else key="step3">
                <div class="step-header">
                  <h2 class="step-title">
                    <i class="bi bi-credit-card me-2"></i>Thanh toán
                  </h2>
                  <p class="step-subtitle">Chọn phương thức thanh toán phù hợp</p>
                </div>

                <div class="section-container">
                  <h3 class="section-title">
                    <i class="bi bi-wallet2 me-2"></i>Phương thức thanh toán
                  </h3>
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="payment-option" :class="{ 'selected': paymentMethod === 'VNPay' }"
                        @click="setPaymentMethod('VNPay')">
                        <div class="payment-icon">
                          <i class="bi bi-credit-card-2-front"></i>
                        </div>
                        <div class="payment-content">
                          <h4>VNPay</h4>
                          <p>Thanh toán qua thẻ ATM, Internet Banking, QR Code hoặc thẻ tín dụng</p>
                        </div>
                        <div class="payment-radio">
                          <input type="radio" :checked="paymentMethod === 'VNPay'" />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="payment-option" :class="{ 'selected': paymentMethod === 'Tiền mặt' }"
                        @click="setPaymentMethod('Tiền mặt')">
                        <div class="payment-icon">
                          <i class="bi bi-cash-stack"></i>
                        </div>
                        <div class="payment-content">
                          <h4>Thanh toán khi nhận hàng (COD)</h4>
                          <p>Thanh toán bằng tiền mặt khi nhận hàng</p>
                        </div>
                        <div class="payment-radio">
                          <input type="radio" :checked="paymentMethod === 'Tiền mặt'" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- VNPay Payment Options -->
                  <div v-if="paymentMethod === 'VNPay'" class="vnpay-options mt-4">
                    <div class="row g-3">
                      <div class="col-md-12">
                        <div class="form-floating mb-3">
                          <select class="form-select" id="bank" v-model="selectedBank" required>
                            <option value="" disabled selected>Chọn ngân hàng</option>
                            <option v-for="bank in banks" :key="bank.code" :value="bank.code">
                              {{ bank.name }}
                            </option>
                          </select>
                          <label for="bank">Ngân hàng *</label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="vnpay-qr-section">
                          <div class="vnpay-logo">
                            <img src="/main/static/assets/images/Logo-VNPAY-QR-1.jpg" alt="VNPay Logo"
                              class="vnpay-logo-img" />
                          </div>
                          <div class="qr-code text-center">
                            <img :src="qrCodeUrl" alt="VNPay QR Code" class="qr-code-img" v-if="qrCodeUrl" />
                            <p v-else>Đang tạo mã QR...</p>
                          </div>
                          <p class="text-center mt-2">Quét mã QR để thanh toán qua VNPay</p>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="vnpay-card-section">
                          <h4>Thanh toán bằng thẻ tín dụng</h4>
                          <form @submit.prevent="submitForm">
                            <div class="form-floating mb-3">
                              <input type="text" class="form-control" id="cardNumber" v-model="cardDetails.cardNumber"
                                placeholder="Số thẻ" />
                              <label for="cardNumber">Số thẻ *</label>
                            </div>
                            <div class="row g-3">
                              <div class="col-6">
                                <div class="form-floating">
                                  <input type="text" class="form-control" id="expiryDate"
                                    v-model="cardDetails.expiryDate" placeholder="MM/YY" />
                                  <label for="expiryDate">Ngày hết hạn (MM/YY) *</label>
                                </div>
                              </div>
                              <div class="col-6">
                                <div class="form-floating">
                                  <input type="text" class="form-control" id="cvv" v-model="cardDetails.cvv"
                                    placeholder="CVV" />
                                  <label for="cvv">Mã CVV *</label>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="step-actions">
                  <button class="btn-outline-secondary btn-prev" @click="prevStep">
                    <i class="bi bi-arrow-left me-2"></i> Quay lại
                  </button>
                  <button class="btn-success btn-submit" @click="openConfirmationModal" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    <i v-else class="bi bi-check-circle me-2"></i>
                    {{ isLoading ? 'Đang xử lý...' : 'Đặt hàng' }}
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Right Column - Order Summary -->
        <div class="col-lg-4">
          <div class="summary-card">
            <div class="summary-header">
              <h3 class="summary-title">
                <i class="bi bi-receipt me-2"></i>Tóm tắt đơn hàng
              </h3>
            </div>
            <div class="summary-body">
              <div class="order-products">
                <div v-for="(item, index) in order.items" :key="index" class="product-item">
                  <div class="product-info">
                    <span class="product-name">{{ item.name }}</span>
                    <span class="product-quantity">x{{ item.quantity }}</span>
                  </div>
                  <div class="product-price">
                    {{ (item.price * item.quantity).toLocaleString() }}đ
                  </div>
                </div>
              </div>
              <div class="order-totals">
                <div class="total-row">
                  <span>Tạm tính</span>
                  <span>{{ order.subtotal.toLocaleString() }}đ</span>
                </div>
                <div class="total-row">
                  <span>Phí vận chuyển</span>
                  <span>{{ order.shipping.toLocaleString() }}đ</span>
                </div>
                <div v-if="appliedDiscount" class="total-row discount">
                  <span>Giảm giá ({{ appliedDiscount.code }})</span>
                  <span>-{{ appliedDiscount.amount.toLocaleString() }}đ</span>
                </div>
                <div class="total-row grand-total">
                  <span>Tổng cộng</span>
                  <span>{{ order.total.toLocaleString() }}đ</span>
                </div>
              </div>
            </div>
            <div class="summary-footer">
              <div class="benefit-item">
                <i class="bi bi-truck"></i>
                <span>Giao hàng trong 2-3 ngày</span>
              </div>
              <div class="benefit-item">
                <i class="bi bi-shield-check"></i>
                <span>Bảo hành chính hãng</span>
              </div>
              <div class="benefit-item">
                <i class="bi bi-arrow-return-left"></i>
                <span>Đổi trả trong 7 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Confirmation Modal -->
      <div v-if="showConfirmationModal" class="modal-overlay" :class="{ loading: isLoading }" @click.self="closeConfirmationModal">
        <div class="modal-content" :class="{ loading: isLoading }" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">Xác nhận đặt hàng</h3>
            <button class="modal-close" @click="closeConfirmationModal">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="modal-body">
            <p>Bạn có chắc chắn muốn đặt hàng với tổng cộng <strong>{{ order.total.toLocaleString() }}đ</strong>?</p>
            <p v-if="paymentMethod === 'VNPay' && selectedBank">Bạn sẽ được chuyển hướng đến cổng thanh toán VNPay với
              ngân hàng {{ getBankName(selectedBank) }} để quét mã QR.</p>
            <p v-else-if="paymentMethod === 'VNPay' && cardDetails.cardNumber">Bạn sẽ được chuyển hướng đến cổng thanh
              toán
              VNPay để hoàn tất thanh toán bằng thẻ.</p>
            <p v-else-if="paymentMethod === 'VNPay'">Bạn sẽ được chuyển hướng đến cổng thanh toán VNPay để quét mã QR.
            </p>
            <p v-else>Đơn hàng sẽ được xử lý ngay sau khi xác nhận (Thanh toán khi nhận hàng).</p>
          </div>
          <div class="modal-footer">
            <button class="btn-secondary btn-cancel" @click="closeConfirmationModal">
              Hủy
            </button>
            <button class="btn-success btn-confirm" @click="confirmOrder" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ isLoading ? 'Đang xử lý...' : 'Xác nhận đặt hàng' }}
            </button>
          </div>
        </div>
      </div>
      <ToastNotification ref="toast" />
    </div>
  </main>
</template>

<script>
import checkoutPage from '../store/pay/checkout-page'
import ToastNotification from '../components/base/ToastNotification.vue'
import axios from 'axios'

export default {
  components: {
    ToastNotification,
  },
  ...checkoutPage,
  data() {
    return {
      ...checkoutPage.data(),
      currentStep: 1,
      deliveryMethod: 'delivery',
      paymentMethod: 'Tiền mặt',
      discountCode: '',
      appliedDiscount: null,
      qrCodeUrl: '',
      selectedStoreIndex: 0,
      selectedBank: '',
      isLoading: false,
      banks: [
        { code: 'NCB', name: 'Ngân hàng NCB' },
        { code: 'AGRIBANK', name: 'Ngân hàng Agribank' },
        { code: 'SCB', name: 'Ngân hàng SCB' },
        { code: 'SACOMBANK', name: 'Ngân hàng Sacombank' },
        { code: 'EXIMBANK', name: 'Ngân hàng Eximbank' },
        { code: 'MSBANK', name: 'Ngân hàng MSBank' },
        { code: 'VIETINBANK', name: 'Ngân hàng VietinBank' },
        { code: 'VIETCOMBANK', name: 'Ngân hàng Vietcombank' },
        { code: 'BIDV', name: 'Ngân hàng BIDV' },
        { code: 'TECHCOMBANK', name: 'Ngân hàng Techcombank' },
        { code: 'VPBANK', name: 'Ngân hàng VPBank' },
        { code: 'MBBANK', name: 'Ngân hàng MBBank' },
        { code: 'HDBANK', name: 'Ngân hàng HDBank' },
      ],
      steps: [
        { label: 'Thông tin giao hàng' },
        { label: 'Xác nhận đơn hàng' },
        { label: 'Thanh toán & Xác nhận' }
      ],
      showConfirmationModal: false,
    }
  },
  methods: {
    ...checkoutPage.methods,
    nextStep() {
      if (this.currentStep === 3 && this.paymentMethod === 'VNPay' && !this.selectedBank && !this.cardDetails.cardNumber) {
        this.showToast('error', 'Vui lòng chọn ngân hàng hoặc nhập thông tin thẻ!')
        return
      }
      if (this.currentStep === 3 && this.paymentMethod === 'VNPay' && this.cardDetails.cardNumber && !this.validateCardDetails()) {
        return
      }
      if (this.currentStep < 3) this.currentStep++
    },
    prevStep() {
      if (this.currentStep > 1) this.currentStep--
    },
    setDeliveryMethod(method) {
      this.deliveryMethod = method
      this.order.shipping = method === 'delivery' ? 30000 : 0
      this.calculateTotal()
    },
    setPaymentMethod(method) {
      this.paymentMethod = method
      if (method === 'VNPay') {
        this.generateQRCode()
      } else {
        this.qrCodeUrl = ''
        this.cardDetails = { cardNumber: '', expiryDate: '', cvv: '' }
        this.selectedBank = ''
      }
    },
    selectStore(index) {
      this.selectedStoreIndex = index
      this.pickup.store = this.stores[index].address
    },
    applyDiscount() {
      if (this.discountCode) {
        this.appliedDiscount = {
          code: this.discountCode,
          amount: Math.floor(this.order.subtotal * 0.1),
          id: 1
        }
        this.calculateTotal()
      }
    },
    calculateTotal() {
      let total = this.order.subtotal + this.order.shipping
      if (this.appliedDiscount) total -= this.appliedDiscount.amount
      this.order.total = Math.max(0, total)
    },
    async generateQRCode() {
      try {
        if (!this.invoiceId) {
          throw new Error('Không tìm thấy mã hóa đơn!')
        }
        const hoaDonRequest = {
          tenKhachHang: this.deliveryMethod === 'delivery' ? this.delivery.ten : this.stores[this.selectedStoreIndex]?.name || 'Khách hàng nhận tại cửa hàng',
          soDienThoaiKhachHang: this.deliveryMethod === 'delivery' ? this.delivery.soDienThoai : this.pickup.soDienThoai,
          email: this.deliveryMethod === 'delivery' ? this.delivery.email : this.pickup.email,
          diaChiKhachHang: {
            diaChiCuThe: this.deliveryMethod === 'delivery' ? `${this.delivery.soNha}, ${this.delivery.phuong}, ${this.delivery.quan}, ${this.delivery.thanhPho}` : this.pickup.store
          },
          loaiDon: this.deliveryMethod === 'delivery' ? 'online' : 'offline',
          idPhieuGiamGia: this.appliedDiscount ? this.appliedDiscount.id : null
        }
        const response = await axios.post(`http://localhost:8080/api/client/thanh-toan-vnpay/${this.invoiceId}`, hoaDonRequest, {
          params: { bankCode: this.selectedBank }
        })
        this.qrCodeUrl = response.data.vnpayUrl
      } catch (error) {
        this.handleError(error, 'Lỗi khi tạo mã QR VNPAY')
        this.qrCodeUrl = ''
      }
    },
    showToast(type, message, isLoading = false, duration = 3000) {
      this.$refs.toast.addToast({ type, message, isLoading, duration })
    },
    openConfirmationModal() {
      this.showConfirmationModal = true
    },
    closeConfirmationModal() {
      this.showConfirmationModal = false
    },
    async confirmOrder() {
      try {
        this.isLoading = true
        if (this.paymentMethod === 'VNPay' && this.cardDetails.cardNumber && !this.validateCardDetails()) {
          this.isLoading = false
          return
        }
        if (this.paymentMethod === 'VNPay') {
          const hoaDonRequest = {
            tenKhachHang: this.deliveryMethod === 'delivery' ? this.delivery.ten : this.stores[this.selectedStoreIndex]?.name || 'Khách hàng nhận tại cửa hàng',
            soDienThoaiKhachHang: this.deliveryMethod === 'delivery' ? this.delivery.soDienThoai : this.pickup.soDienThoai,
            email: this.deliveryMethod === 'delivery' ? this.delivery.email : this.pickup.email,
            diaChiKhachHang: {
              diaChiCuThe: this.deliveryMethod === 'delivery' ? `${this.delivery.soNha}, ${this.delivery.phuong}, ${this.delivery.quan}, ${this.delivery.thanhPho}` : this.pickup.store
            },
            loaiDon: this.deliveryMethod === 'delivery' ? 'online' : 'offline',
            idPhieuGiamGia: this.appliedDiscount ? this.appliedDiscount.id : null
          }
          if (this.cardDetails.cardNumber) {
            const response = await axios.post(`http://localhost:8080/api/client/thanh-toan-vnpay-card/${this.invoiceId}`, {
              hoaDonRequest,
              cardDetails: this.cardDetails
            })
            if (response.data.vnpayUrl) {
              window.location.href = response.data.vnpayUrl
            } else {
              throw new Error('Không nhận được URL thanh toán từ VNPAY!')
            }
          } else {
            const response = await axios.post(`http://localhost:8080/api/client/thanh-toan-vnpay/${this.invoiceId}`, hoaDonRequest, {
              params: { bankCode: this.selectedBank }
            })
            if (response.data.vnpayUrl) {
              window.location.href = response.data.vnpayUrl
            } else {
              throw new Error('Không nhận được URL thanh toán từ VNPAY!')
            }
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
    getBankName(code) {
      const bank = this.banks.find(b => b.code === code)
      return bank ? bank.name : ''
    },
    validateCardDetails() {
      if (!this.cardDetails.cardNumber || !/^\d{16}$/.test(this.cardDetails.cardNumber)) {
        this.showToast('error', 'Số thẻ không hợp lệ! Vui lòng nhập 16 chữ số.')
        return false
      }
      if (!this.cardDetails.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(this.cardDetails.expiryDate)) {
        this.showToast('error', 'Ngày hết hạn không hợp lệ! Vui lòng nhập theo định dạng MM/YY.')
        return false
      }
      if (!this.cardDetails.cvv || !/^\d{3,4}$/.test(this.cardDetails.cvv)) {
        this.showToast('error', 'Mã CVV không hợp lệ! Vui lòng nhập 3 hoặc 4 chữ số.')
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>
/* Thêm style cho phần thanh toán bằng thẻ */
.vnpay-options {
  background-color: var(--light);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  border: 1px solid #eee;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
}

.vnpay-card-section {
  padding: 1.5rem;
  background-color: #fff;
  border-radius: var(--border-radius);
  border: 1px solid #eee;
}

.vnpay-card-section h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
}

/* Base Styles */
:root {
  --primary: #3a7bd5;
  --primary-light: #e8f0fe;
  --secondary: #6c757d;
  --success: #28a745;
  --danger: #dc3545;
  --light: #f8f9fa;
  --dark: #212529;
  --border-radius: 12px;
  --box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  --transition: all 0.3s ease;
}

.main {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 2rem 0 4rem;
  font-family: 'Inter', sans-serif;
}

/* Breadcrumb Styles */
.breadcrumb-container {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.breadcrumb {
  padding: 0;
  margin: 0;
  background: transparent;
}

.breadcrumb-item {
  font-size: 1.3rem;
  font-family: 'Inter', sans-serif;
}

.breadcrumb-item.active {
  color: var(--dark);
  font-weight: 500;
}

.breadcrumb-link {
  color: var(--secondary);
  text-decoration: none;
  transition: var(--transition);
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
}

.breadcrumb-link:hover {
  color: var(--primary);
}

/* Progress Steps */
.checkout-progress {
  position: relative;
  margin-bottom: 3rem !important;
}

.progress-track {
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 4px;
  background-color: #e9ecef;
  z-index: 1;
  border-radius: 2px;
}

.progress-track::before {
  content: '';
  position: absolute;
  left: 0;
  height: 100%;
  width: calc((100% / 3) * (v-bind('currentStep') - 1));
  background-color: var(--primary);
  border-radius: 2px;
  transition: var(--transition);
}

.progress-step {
  position: relative;
  z-index: 2;
  text-align: center;
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 2px solid #e9ecef;
  border-radius: 50%;
  font-weight: 600;
  color: var(--secondary);
  margin-bottom: 0.5rem;
  transition: var(--transition);
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
}

.step-label {
  font-size: 1rem;
  color: var(--secondary);
  font-weight: 500;
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
}

.progress-step.active .step-number {
  border-color: var(--primary);
  color: var(--primary);
  box-shadow: 0 0 0 5px rgba(58, 123, 213, 0.2);
}

.progress-step.completed .step-number {
  background-color: var(--primary);
  border-color: var(--primary);
  color: white;
}

.progress-step.active .step-label,
.progress-step.completed .step-label {
  color: var(--primary);
  font-weight: 600;
}

/* Card Styles */
.checkout-card,
.summary-card {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  border: none;
  overflow: hidden;
}

.checkout-card {
  padding: 2rem;
}

.summary-card {
  position: sticky;
  top: 20px;
}

.summary-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.summary-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
}

.summary-body {
  padding: 1.5rem;
}

.summary-footer {
  padding: 1.5rem;
  border-top: 1px solid #eee;
}

/* Step Header */
.step-header {
  margin-bottom: 2rem;
}

.step-title {
  font-size: 2.3rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
}

.step-subtitle {
  color: var(--secondary);
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
}

/* Section Styles */
.section-container {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--dark);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
}

/* Form Styles */
.form-floating {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.form-control,
.form-select {
  border-radius: 8px;
  height: 50px;
  margin: 0 !important;
  border: 1px solid #e0e0e0;
  transition: var(--transition);
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
}

.form-control:focus,
.form-select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 0.25rem rgba(58, 123, 213, 0.15);
}

.form-label {
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
}

/* Delivery Options */
.delivery-option {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  border: 2px solid #eee;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  height: 100%;
}

.delivery-option:hover {
  border-color: var(--primary);
}

.delivery-option.selected {
  border-color: var(--primary);
  background-color: var(--primary-light);
}

.option-icon {
  font-size: 2.3rem;
  color: var(--primary);
  margin-right: 1rem;
}

.option-content {
  flex-grow: 1;
}

.option-content h4 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-family: 'Inter', sans-serif;
}

.option-content p {
  font-size: 1.1rem;
  color: var(--secondary);
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.option-radio {
  margin-left: 1rem;
}

.option-radio input {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

/* Store List */
.store-list {
  display: grid;
  gap: 0.75rem;
}

.store-card {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border: 2px solid #eee;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
}

.store-card:hover {
  border-color: var(--primary);
}

.store-card.selected {
  border-color: var(--primary);
  background-color: var(--primary-light);
}

.store-radio {
  margin-right: 1rem;
  margin-top: 0.25rem;
}

.store-radio input {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.store-content h4 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-family: 'Inter', sans-serif;
}

.store-address,
.store-hours {
  font-size: 1rem;
  margin: 0;
  color: var(--secondary);
  font-family: 'Inter', sans-serif;
}

/* Order Items */
.order-items {
  border: 1px solid #eee;
  border-radius: var(--border-radius);
}

.order-item {
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.order-item:last-child {
  border-bottom: none;
}

.item-details {
  flex-grow: 1;
}

.item-details h4 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-family: 'Inter', sans-serif;
}

.item-quantity {
  font-size: 1.2rem;
  color: var(--secondary);
  margin-top: .5rem;
  font-family: 'Inter', sans-serif;
}

.item-price {
  text-align: right;
  min-width: 100px;
}

.price-unit {
  font-size: 1.2rem;
  color: var(--secondary);
  margin-bottom: 0.25rem;
  font-family: 'Inter', sans-serif;
}

.price-total {
  font-weight: 600;
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
}

/* Discount Styles */
.discount-input {
  display: flex;
  margin-bottom: 1rem;
}

.discount-input .form-control {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  font-size: 1.5rem;
}

.btn-apply {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
}

/* Payment Options */
.payment-option {
  display: flex;
  align-items: center;
  padding: 1.25rem;
  border: 2px solid #eee;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  height: 100%;
}

.payment-option:hover {
  border-color: var(--primary);
}

.payment-option.selected {
  border-color: var(--primary);
  background-color: var(--primary-light);
}

.payment-icon {
  font-size: 2.3rem;
  color: var(--primary);
  margin-right: 1rem;
}

.payment-content {
  flex-grow: 1;
  font-family: 'Inter', sans-serif;
}

.payment-content h4 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-family: 'Inter', sans-serif;
}

.payment-content p {
  font-size: 1.2rem;
  color: var(--secondary);
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.payment-radio {
  margin-left: 1rem;
}

.payment-radio input {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

/* VNPay QR Section */
.vnpay-qr-section {
  background-color: var(--light);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  border: 1px solid #eee;
}

.vnpay-logo-img {
  max-width: 150px;
  height: auto;
  margin-bottom: 1rem;
}

.qr-code,
.vnpay-logo {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.qr-code-img {
  max-width: 200px;
  height: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.5rem;
  background-color: white;
}

/* Order Summary */
.order-products {
  margin-bottom: 1.5rem;
}

.product-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 1.5rem;
  font-family: 'Inter', sans-serif;
}

.product-quantity {
  font-size: 1rem;
  color: var(--secondary);
  font-family: 'Inter', sans-serif;
}

.product-price {
  font-weight: 500;
  font-size: 1.5rem;
  font-family: 'Inter', sans-serif;
}

.order-totals {
  padding: 1rem 0;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  font-family: 'Inter', sans-serif;
}

.total-row:last-child {
  margin-bottom: 0;
}

.total-row.discount {
  color: var(--success);
}

.total-row.grand-total {
  font-weight: 600;
  font-size: 1.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #eee;
}

.benefit-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: var(--secondary);
  font-family: 'Inter', sans-serif;
}

.benefit-item:last-child {
  margin-bottom: 0;
}

.benefit-item i {
  margin-right: 0.75rem;
  color: var(--success);
}

/* Step Actions */
.step-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  margin-top: 2rem;
}

.btn-next,
.btn-submit,
.btn-prev,
.btn-apply {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: .5rem;
  padding: 1rem;
  font-size: 1.5rem;
  font-family: 'Inter', sans-serif;
}

.btn-submit {
  background-color: var(--success);
  border-color: var(--success);
  text-align: center;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  max-width: 500px;
  width: 100%;
  padding: 1.5rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
}

.modal-body {
  margin-bottom: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn-cancel,
.btn-confirm {
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
}

.btn-cancel {
  background-color: var(--secondary);
  color: white;
}

.btn-confirm {
  background-color: var(--success);
  color: white;
  position: relative;
  transition: var(--transition);
}

/* Loading Overlay for Modal */
.modal-overlay.loading {
  background-color: rgba(0, 0, 0, 0.7);
  cursor: wait;
}

.modal-content.loading {
  position: relative;
  pointer-events: none;
}

.modal-content.loading::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: var(--border-radius);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Beautiful Gradient Spinner */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.spinner {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 5px solid transparent;
  border-top-color: var(--primary);
  border-right-color: var(--success);
  border-radius: 50%;
  animation: spin 1s linear infinite, pulse 1.5s ease-in-out infinite;
  position: relative;
  z-index: 11;
}

.modal-content.loading::before {
  content: '';
  position: absolute;
  width: 50px;
  height: 50px;
  border: 5px solid transparent;
  border-top-color: var(--primary);
  border-right-color: var(--success);
  border-radius: 50%;
  animation: spin 1s linear infinite, pulse 1.5s ease-in-out infinite;
  z-index: 11;
}

/* Enhanced Button Loading State */
.btn-confirm:disabled {
  background-color: #6c757d;
  border-color: #6c757d;
  opacity: 0.8;
  cursor: not-allowed;
}

.btn-confirm .spinner-border {
  display: none;
}

.btn-confirm:disabled .spinner-border {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: middle;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  animation: spin 0.75s linear infinite;
}

/* Ensure modal content is blurred during loading */
.modal-content.loading .modal-header,
.modal-content.loading .modal-body,
.modal-content.loading .modal-footer {
  filter: blur(2px);
  transition: filter 0.3s ease;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Responsive Styles */
@media (max-width: 1550px) {
  .main {
    padding: 3.5rem;
  }

  .checkout-card {
    padding: 1.5rem;
  }

  .summary-card {
    margin-top: 2rem;
  }
}

@media (max-width: 768px) {
  .progress-track::before {
    width: calc((100% / 3) * (v-bind('currentStep') - 1));
  }

  .step-title {
    font-size: 1.5rem;
  }

  .step-actions {
    flex-direction: column;
    gap: 0.75rem;
  }

  .btn-prev,
  .btn-next,
  .btn-submit {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .delivery-option,
  .payment-option {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }

  .option-icon,
  .payment-icon {
    margin-right: 0;
    margin-bottom: 0.75rem;
  }

  .option-radio,
  .payment-radio {
    margin-left: 0;
    margin-top: 0.75rem;
  }
}
</style>