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
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="form-floating">
                        <label for="fullName">Họ và tên *</label>
                        <input type="text" class="form-control" id="fullName" v-model="customer.ten"
                          placeholder="Nhập họ và tên" required />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-floating">
                        <label for="phone">Số điện thoại *</label>
                        <input type="tel" class="form-control" id="phone" v-model="customer.soDienThoai"
                          placeholder="Nhập số điện thoại" required />

                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-floating">
                        <label for="email">Email *</label>
                        <input type="email" class="form-control" id="email" v-model="customer.email"
                          placeholder="Nhập địa chỉ email" required />

                      </div>
                    </div>
                  </div>
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

                <!-- Address Management Section -->
                <div v-if="deliveryMethod === 'delivery'" class="section-container">
                  <div class="section-header">
                    <h3 class="section-title">
                      <i class="bi bi-geo-alt me-2"></i>Địa chỉ giao hàng
                    </h3>
                    <button v-if="!showAddressForm" class=" btn-sm btn-outline-primary" @click="showAddressForm = true">
                      <i class="bi bi-plus-lg me-1"></i> Thêm địa chỉ mới
                    </button>
                  </div>

                  <!-- Saved Addresses -->
                  <div v-if="isLoggedIn && savedAddresses.length > 0" class="address-list">
                    <div v-for="(address, index) in savedAddresses" :key="index" class="address-card"
                      :class="{ 'selected': selectedAddressIndex === index }" @click="selectAddress(index)">
                      <div class="address-radio">
                        <input type="radio" :checked="selectedAddressIndex === index" />
                      </div>
                      <div class="address-content">
                        <div class="address-info">
                          <h4>{{ address.ten }}</h4>
                          <p>{{ address.soDienThoai }}</p>
                          <p class="address-text">{{ address.fullAddress }}</p>
                        </div>
                        <div v-if="address.isDefault" class="address-badge">
                          <span class="badge">Mặc định</span>
                        </div>
                      </div>
                      <div class="address-actions">
                        <button class=" btn-icon" @click.stop="editAddress(index)">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class=" btn-icon" @click.stop="deleteAddress(index)">
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Address Form -->
                  <div v-if="showAddressForm || (!isLoggedIn || savedAddresses.length === 0)" class="address-form">
                    <div class="row g-3">
                      <div class="col-md-6">
                        <div class="form-floating">
                          <select class="form-select" id="city" v-model="newAddress.thanhPho" @change="fetchDistricts"
                            required>
                            <option value="" disabled selected>Chọn tỉnh/thành phố</option>
                            <option v-for="province in provinces" :key="province.name" :value="province.name">
                              {{ province.name }}
                            </option>
                          </select>
                          <label for="city">Tỉnh/Thành phố *</label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <select class="form-select" id="district" v-model="newAddress.quan" @change="fetchWards"
                            required>
                            <option value="" disabled selected>Chọn quận/huyện</option>
                            <option v-for="district in districts" :key="district.name" :value="district.name">
                              {{ district.name }}
                            </option>
                          </select>
                          <label for="district">Quận/Huyện *</label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <select class="form-select" id="ward" v-model="newAddress.phuong" required>
                            <option value="" disabled selected>Chọn xã/phường</option>
                            <option v-for="ward in wards" :key="ward.name" :value="ward.name">
                              {{ ward.name }}
                            </option>
                          </select>
                          <label for="ward">Xã/Phường *</label>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-floating">
                          <input type="text" class="form-control" id="street" v-model="newAddress.soNha"
                            placeholder="Ví dụ: 123 Nguyễn Trãi" required />
                          <label for="street">Số nhà, tên đường *</label>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-floating">
                          <textarea class="form-control" id="notes" v-model="newAddress.ghiChu"
                            placeholder="Ghi chú cho shipper (tùy chọn)" style="height: 100px"></textarea>
                          <label for="notes">Ghi chú</label>
                        </div>
                      </div>
                    </div>
                    <div class="form-actions">
                      <button class=" btn-outline-secondary" @click="cancelAddressForm">
                        Hủy
                      </button>
                      <button class=" btn-primary" @click="saveAddress">
                        <i class="bi bi-check-lg me-1"></i> Lưu địa chỉ
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Store Pickup Section -->
                <div v-if="deliveryMethod === 'pickup'" class="section-container">
                  <h3 class="section-title">
                    <i class="bi bi-shop-window me-2"></i>Chọn cửa hàng
                  </h3>
                  <div class="store-list">
                    <div v-for="(store, index) in stores" :key="index" class="store-card"
                      :class="{ 'selected': selectedStoreIndex === index }" @click="selectStore(index)">
                      <div class="store-radio">
                        <input type="radio" :checked="selectedStoreIndex === index" />
                      </div>
                      <div class="store-content">
                        <h4>{{ store.name }}</h4>
                        <p class="store-address">{{ store.address }}</p>
                        <p class="store-hours">{{ store.hours }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="step-actions">
                  <button class=" btn-primary btn-next" @click="nextStep">
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
                      <div class="item-image">
                        <img :src="item.image" :alt="item.name" />
                      </div>
                      <div class="item-details">
                        <h4>{{ item.name }}</h4>
                        <p class="item-variant">{{ item.variant }}</p>
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
                  <div class="discount-input">
                    <input type="text" class="form-control" v-model="discountCode" placeholder="Nhập mã giảm giá" />
                    <button class="btn-apply btn-primary" @click="applyDiscount"
                      style="padding: 0; border-top-left-radius: 0px; border-bottom-left-radius: 0px;">
                      Áp dụng
                    </button>
                  </div>
                  <div v-if="bestDiscount" class="best-discount">
                    <div class="discount-icon">
                      <i class="bi bi-tag"></i>
                    </div>
                    <div class="discount-info">
                      <span class="discount-code">{{ bestDiscount.code }}</span>
                      <span class="discount-value">Giảm {{ bestDiscount.value }}%</span>
                    </div>
                    <button class="btn-apply btn-sm btn-success" @click="applyBestDiscount" style="">
                      Áp dụng ngay
                    </button>
                  </div>
                </div>

                <div class="step-actions">
                  <button class=" btn-outline-secondary btn-prev" @click="prevStep">
                    <i class="bi bi-arrow-left me-2"></i> Quay lại
                  </button>
                  <button class=" btn-primary btn-next" @click="nextStep">
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
                          <p>Thanh toán qua thẻ ATM, Internet Banking, QR Code</p>
                        </div>
                        <div class="payment-radio">
                          <input type="radio" :checked="paymentMethod === 'VNPay'" />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="payment-option" :class="{ 'selected': paymentMethod === 'COD' }"
                        @click="setPaymentMethod('COD')">
                        <div class="payment-icon">
                          <i class="bi bi-cash-stack"></i>
                        </div>
                        <div class="payment-content">
                          <h4>Thanh toán khi nhận hàng (COD)</h4>
                          <p>Thanh toán bằng tiền mặt khi nhận hàng</p>
                        </div>
                        <div class="payment-radio">
                          <input type="radio" :checked="paymentMethod === 'COD'" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- VNPay QR Code and Logo -->
                  <div v-if="paymentMethod === 'VNPay'" class="vnpay-qr-section mt-4">
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

                <div class="step-actions">
                  <button class="btn-outline-secondary btn-prev" @click="prevStep">
                    <i class="bi bi-arrow-left me-2"></i> Quay lại
                  </button>
                  <button class="btn-success btn-submit" @click="submitOrder">
                    <i class="bi bi-check-circle me-2"></i> Đặt hàng
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
      currentStep: 1,
      deliveryMethod: 'delivery',
      paymentMethod: 'COD',
      showAddressForm: false,
      selectedAddressIndex: 0,
      selectedStoreIndex: 0,
      discountCode: '',
      appliedDiscount: null,
      qrCodeUrl: '', // Add QR code URL
      steps: [
        { label: 'Thông tin giao hàng' },
        { label: 'Xác nhận đơn hàng' },
        { label: 'Thanh toán' }
      ],
      customer: {
        ten: '',
        soDienThoai: '',
        email: ''
      },
      newAddress: {
        thanhPho: '',
        quan: '',
        phuong: '',
        soNha: '',
        ghiChu: ''
      },
      isLoggedIn: true,
      savedAddresses: [
        {
          ten: 'Nguyễn Văn A',
          soDienThoai: '0123456789',
          fullAddress: '123 Nguyễn Trãi, Phường 2, Quận 5, TP.HCM',
          isDefault: true
        },
        {
          ten: 'Nguyễn Văn A',
          soDienThoai: '0123456789',
          fullAddress: '456 Lê Lợi, Phường 1, Quận 1, TP.HCM',
          isDefault: false
        }
      ],
      provinces: [
        { name: 'TP.Hồ Chí Minh' },
        { name: 'Hà Nội' },
        { name: 'Đà Nẵng' }
      ],
      districts: [],
      wards: [],
      stores: [
        {
          name: 'Cửa hàng Quận 1',
          address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
          hours: '8:00 - 22:00 (Thứ 2 - Chủ nhật)'
        },
        {
          name: 'Cửa hàng Quận 3',
          address: '456 Võ Văn Tần, Quận 3, TP.HCM',
          hours: '8:00 - 22:00 (Thứ 2 - Chủ nhật)'
        }
      ],
      bestDiscount: {
        code: 'SAVE20',
        value: 20,
        amount: 8394000
      }
    }
  },
  methods: {
    ...checkoutPage.methods,
    nextStep() {
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
    async setPaymentMethod(method) {
      this.paymentMethod = method
      if (method === 'VNPay') {
        await this.generateQRCode()
      } else {
        this.qrCodeUrl = '' // Clear QR code when switching to COD
      }
    },
    selectAddress(index) {
      this.selectedAddressIndex = index
      this.showAddressForm = false
    },
    selectStore(index) {
      this.selectedStoreIndex = index
    },
    saveAddress() {
      if (this.newAddress.thanhPho && this.newAddress.quan && this.newAddress.phuong && this.newAddress.soNha) {
        const fullAddress = `${this.newAddress.soNha}, ${this.newAddress.phuong}, ${this.newAddress.quan}, ${this.newAddress.thanhPho}`
        this.savedAddresses.push({
          ten: this.customer.ten,
          soDienThoai: this.customer.soDienThoai,
          fullAddress: fullAddress,
          isDefault: this.savedAddresses.length === 0
        })
        this.selectedAddressIndex = this.savedAddresses.length - 1
        this.showAddressForm = false
        this.resetNewAddress()
      }
    },
    cancelAddressForm() {
      this.showAddressForm = false
      this.resetNewAddress()
    },
    resetNewAddress() {
      this.newAddress = {
        thanhPho: '',
        quan: '',
        phuong: '',
        soNha: '',
        ghiChu: ''
      }
    },
    editAddress(index) {
      console.log('Edit address:', index)
    },
    deleteAddress(index) {
      this.savedAddresses.splice(index, 1)
      if (this.selectedAddressIndex >= this.savedAddresses.length) {
        this.selectedAddressIndex = Math.max(0, this.savedAddresses.length - 1)
      }
    },
    applyDiscount() {
      if (this.discountCode) {
        this.appliedDiscount = {
          code: this.discountCode,
          amount: Math.floor(this.order.subtotal * 0.1)
        }
        this.calculateTotal()
      }
    },
    applyBestDiscount() {
      this.appliedDiscount = {
        code: this.bestDiscount.code,
        amount: this.bestDiscount.amount
      }
      this.discountCode = this.bestDiscount.code
      this.calculateTotal()
    },
    calculateTotal() {
      let total = this.order.subtotal + this.order.shipping
      if (this.appliedDiscount) total -= this.appliedDiscount.amount
      this.order.total = Math.max(0, total)
    },
    fetchDistricts() {
      this.districts = [
        { name: 'Quận 1' },
        { name: 'Quận 3' },
        { name: 'Quận 5' }
      ]
    },
    fetchWards() {
      this.wards = [
        { name: 'Phường 1' },
        { name: 'Phường 2' },
        { name: 'Phường 3' }
      ]
    },
    async generateQRCode() {
      // Simulate fetching QR code from VNPay API
      // Replace this with actual VNPay API integration
      try {
        // Example: Fetch QR code URL from VNPay API
        // const response = await fetch('https://vnpay-api-endpoint/qr', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     orderId: this.order.id,
        //     amount: this.order.total,
        //     // Other required VNPay parameters
        //   })
        // })
        // const data = await response.json()
        // this.qrCodeUrl = data.qrCodeUrl

        // For demonstration, use a placeholder QR code image
        this.qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=VNPay_Transaction_' + this.order.total
      } catch (error) {
        console.error('Error generating QR code:', error)
        this.qrCodeUrl = ''
      }
    },
    submitOrder() {
      console.log('Order submitted:', {
        customer: this.customer,
        deliveryMethod: this.deliveryMethod,
        paymentMethod: this.paymentMethod,
        order: this.order,
        qrCodeUrl: this.qrCodeUrl
      })
      this.$router.push('/order-success')
    }
  }
}
</script>

<style scoped>
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
  font-size: 0.9rem;
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
}

.step-label {
  font-size: 0.85rem;
  color: var(--secondary);
  font-weight: 500;
  white-space: nowrap;
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
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
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
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.step-subtitle {
  color: var(--secondary);
  margin: 0;
  font-family: 'Inter', sans-serif;
}

/* Section Styles */
.section-container {
  margin-bottom: 2.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--dark);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  font-family: 'Inter', sans-serif;
}

/* Form Styles */
.form-floating {
  margin-bottom: 1rem;
}

.form-control,
.form-select {
  border-radius: 8px;
  margin: 0 !important;
  border: 1px solid #e0e0e0;
  transition: var(--transition);
  font-family: 'Inter', sans-serif;
}

.form-control:focus,
.form-select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 0.25rem rgba(58, 123, 213, 0.15);
}

.form-label {
  font-weight: 500;
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
  font-size: 1.5rem;
  color: var(--primary);
  margin-right: 1rem;
}

.option-content {
  flex-grow: 1;
}

.option-content h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.option-content p {
  font-size: 0.85rem;
  color: var(--secondary);
  margin: 0;
}

.option-radio {
  margin-left: 1rem;
}

.option-radio input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

/* Address Styles */
.address-list {
  margin-bottom: 1.5rem;
}

.address-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid #eee;
  border-radius: var(--border-radius);
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: var(--transition);
}

.address-card:hover {
  border-color: var(--primary);
}

.address-card.selected {
  border-color: var(--primary);
  background-color: var(--primary-light);
}

.address-radio {
  margin-right: 1rem;
}

.address-radio input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.address-content {
  flex-grow: 1;
}

.address-info h4 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.address-info p {
  font-size: 0.85rem;
  margin: 0;
  color: var(--secondary);
}

.address-text {
  margin-top: 0.25rem !important;
  color: var(--dark) !important;
}

.address-badge {
  margin-top: 0.5rem;
}

.address-badge .badge {
  background-color: var(--success);
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
}

.address-actions {
  display: flex;
  margin-left: 1rem;
}

.btn-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;
  margin-left: 0.5rem;
}

/* Address Form */
.address-form {
  background-color: var(--light);
  padding: 1.5rem;
  border-radius: var(--border-radius);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
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
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.store-content h4 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.store-address,
.store-hours {
  font-size: 0.85rem;
  margin: 0;
  color: var(--secondary);
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

.item-image {
  width: 80px;
  height: 80px;
  margin-right: 1rem;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex-grow: 1;
}

.item-details h4 {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.item-variant,
.item-quantity {
  font-size: 0.85rem;
  color: var(--secondary);
  margin: 0;
}

.item-price {
  text-align: right;
  min-width: 100px;
}

.price-unit {
  font-size: 0.85rem;
  color: var(--secondary);
  margin-bottom: 0.25rem;
}

.price-total {
  font-weight: 600;
  margin: 0;
}

/* Discount Styles */
.discount-input {
  display: flex;
  margin-bottom: 1rem;
}

.discount-input .form-control {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.btn-apply {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.best-discount {
  display: flex;
  align-items: center;
  background-color: #f0fdf4;
  border: 1px solid #dcfce7;
  border-radius: var(--border-radius);
  padding: 0.75rem 1rem;
}

.discount-icon {
  font-size: 1.25rem;
  color: var(--success);
  margin-right: 0.75rem;
}

.discount-info {
  flex-grow: 1;
}

.discount-code {
  font-weight: 600;
  color: var(--dark);
}

.discount-value {
  font-size: 0.85rem;
  color: var(--secondary);
  margin-left: 0.5rem;
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
  font-size: 1.5rem;
  color: var(--primary);
  margin-right: 1rem;
}

.payment-content {
  flex-grow: 1;
  font-family: 'Inter', sans-serif;
}

.payment-content h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.payment-content p {
  font-size: 0.85rem;
  color: var(--secondary);
  margin: 0;
}

.payment-radio {
  margin-left: 1rem;
}

.payment-radio input {
  width: 18px;
  height: 18px;
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

.qr-code, .vnpay-logo {
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
  font-size: 0.9rem;
}

.product-quantity {
  font-size: 0.8rem;
  color: var(--secondary);
}

.product-price {
  font-weight: 500;
  font-size: 0.9rem;
}

.order-totals {
  padding: 1rem 0;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.total-row:last-child {
  margin-bottom: 0;
}

.total-row.discount {
  color: var(--success);
}

.total-row.grand-total {
  font-weight: 600;
  font-size: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid #eee;
}

.benefit-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: var(--secondary);
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
.btn-submit,
.btn-apply,
.btn-icon {
  display: flex;
  align-items: center;
  /* căn giữa theo chiều dọc */
  justify-content: center;
  border-radius: .5rem;
  padding: 1rem;
  font-size: 1rem;
}

.btn-submit {
  background-color: var(--success);
  border-color: var(--success);
  text-align: center;
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
    font-size: 1.3rem;
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

  .address-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .address-radio {
    margin-right: 0;
    margin-bottom: 0.75rem;
  }

  .address-actions {
    margin-left: 0;
    margin-top: 0.75rem;
    align-self: flex-end;
  }
}
</style>