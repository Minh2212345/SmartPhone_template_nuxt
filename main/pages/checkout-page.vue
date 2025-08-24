<template>
  <main class="min-h-screen bg-gray-50 py-8 font-sans">
    <!-- Breadcrumb -->
    <div class="bg-white shadow-sm py-4 mb-6">
      <div class="container mx-auto px-4">
        <nav aria-label="breadcrumb">
          <ol class="flex items-center space-x-2 text-sm">
            <li>
              <NuxtLink to="/" class="flex items-center text-gray-600 hover:text-blue-600 transition">
                <i class="bi bi-house-door mr-1"></i> Trang chủ
              </NuxtLink>
            </li>
            <li class="text-gray-400">/</li>
            <li>
              <NuxtLink to="/cart-page" class="text-gray-600 hover:text-blue-600 transition">Giỏ hàng</NuxtLink>
            </li>
            <li class="text-gray-400">/</li>
            <li class="text-blue-600 font-medium" aria-current="page">Thanh toán</li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="container mx-auto px-4">
      <!-- Progress Steps -->
      <div class="relative mb-8">
        <div class="absolute top-4 left-0 right-0 h-1 bg-gray-200 rounded-full">
          <div class="h-1 bg-blue-600 rounded-full transition-all duration-300"
            :style="{ width: `${(currentStep - 1) * 33.33}%` }"></div>
        </div>
        <div class="flex justify-between">
          <div v-for="(step, index) in steps" :key="index" class="text-center">
            <div class="flex flex-col items-center">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium transition-all duration-300"
                :class="{
                  'bg-blue-600': currentStep >= index + 1,
                  'bg-green-500': currentStep > index + 1,
                  'bg-gray-300': currentStep < index + 1
                }">
                <i v-if="currentStep > index + 1" class="bi bi-check"></i>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <span class="mt-2 text-sm font-medium"
                :class="{ 'text-blue-600': currentStep >= index + 1, 'text-gray-600': currentStep < index + 1 }">{{
                  step.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Forms -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <transition name="fade" mode="out-in">
              <!-- Step 1: Shipping Information -->
              <div v-if="currentStep === 1" key="step1">
                <div class="text-center mb-6">
                  <h2 class="text-2xl font-semibold text-blue-600"><i class="bi bi-truck mr-2"></i>Thông tin giao hàng
                  </h2>
                  <p class="text-gray-500 mt-1">Vui lòng cung cấp thông tin để giao hàng nhanh chóng</p>
                </div>

                <!-- Delivery Method Selection -->
                <div class="mb-6">
                  <h3 class="text-lg font-semibold text-blue-600 mb-4">Phương thức giao hàng</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md"
                      :class="{ 'border-blue-600 bg-blue-50': deliveryMethod === 'delivery' }"
                      @click="setDeliveryMethod('delivery')">
                      <div class="flex items-center">
                        <i class="bi bi-truck text-xl text-blue-600 mr-3"></i>
                        <div>
                          <h4 class="font-semibold">Giao hàng tận nơi</h4>
                          <p class="text-sm text-gray-500">Nhận hàng tại địa chỉ bạn chọn</p>
                        </div>
                      </div>
                    </div>
                    <div class="border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md"
                      :class="{ 'border-blue-600 bg-blue-50': deliveryMethod === 'pickup' }"
                      @click="setDeliveryMethod('pickup')">
                      <div class="flex items-center">
                        <i class="bi bi-shop text-xl text-blue-600 mr-3"></i>
                        <div>
                          <h4 class="font-semibold">Nhận tại cửa hàng</h4>
                          <p class="text-sm text-gray-500">Đến lấy hàng tại cửa hàng gần nhất</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Delivery Form -->
                <div v-if="deliveryMethod === 'delivery'" class="border rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-blue-600 mb-4">Địa chỉ giao hàng <span
                      class="text-gray-500">(Bắt buộc)</span></h3>
                  <div class="border rounded-lg p-4 mb-4 bg-gray-50">
                    <div class="flex items-center justify-between">
                      <h4 class="font-semibold text-green-600"><i class="bi bi-check-circle-fill mr-2"></i>Địa chỉ đã
                        chọn</h4>
                    </div>
                    <p class="text-sm text-gray-600 mt-2">
                      <strong>{{ selectedAddress.ten || delivery.ten }}</strong> | {{ selectedAddress.soDienThoai ||
                        delivery.soDienThoai }}
                    </p>
                    <p class="text-sm text-gray-600">
                      {{ selectedAddress.diaChiCuThe || delivery.soNha }}, {{ selectedAddress.phuong || delivery.phuong
                      }}, {{ selectedAddress.quan || delivery.quan }}, {{ selectedAddress.thanhPho || delivery.thanhPho
                      }}
                    </p>
                    <div class="flex gap-2 mt-3">
                      <button class="btn btn-outline-primary text-sm" @click="editSelectedAddress">
                        <i class="bi bi-pencil mr-1"></i>Chỉnh sửa
                      </button>
                      <button class="btn btn-outline-danger text-sm" @click="confirmDeleteAddress(selectedAddressId)">
                        <i class="bi bi-trash mr-1"></i>Xóa
                      </button>
                    </div>
                  </div>

                  <!-- Tabs Navigation -->
                  <div class="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg">
                    <button class="flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200"
                      :class="{ 'bg-blue-600 text-white': activeTab === 0, 'bg-transparent text-gray-600': activeTab !== 0 }"
                      @click="activeTab = 0">
                      <i class="bi bi-plus-lg mr-2"></i>Thêm địa chỉ mới
                    </button>
                    <button class="flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200"
                      :class="{ 'bg-blue-600 text-white': activeTab === 1, 'bg-transparent text-gray-600': activeTab !== 1 }"
                      @click="activeTab = 1">
                      <i class="bi bi-list-ul mr-2"></i>Chọn từ danh sách
                    </button>
                  </div>

                  <!-- Tab Content -->
                  <div>
                    <!-- Add New Address Tab -->
                    <div v-if="activeTab === 0" class="border rounded-lg p-4 bg-white">
                      <form @submit.prevent="saveAddress">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div class="space-y-1">
                            <label for="fullName" class="block text-sm font-medium text-gray-700">Họ và tên <span
                                class="text-red-500">*</span></label>
                            <input type="text" id="fullName" v-model="delivery.ten"
                              class="w-full border rounded-md p-2 text-sm" placeholder="Nguyễn Văn A" required />
                          </div>
                          <div class="space-y-1">
                            <label for="phone" class="block text-sm font-medium text-gray-700">Số điện thoại <span
                                class="text-red-500">*</span></label>
                            <input type="tel" id="phone" v-model="delivery.soDienThoai"
                              class="w-full border rounded-md p-2 text-sm" placeholder="0123456789" required
                              pattern="[0-9]{10}" />
                          </div>
                          <div class="space-y-1">
                            <label for="email" class="block text-sm font-medium text-gray-700">Email <span
                                class="text-red-500">*</span></label>
                            <input type="email" id="email" v-model="delivery.email"
                              class="w-full border rounded-md p-2 text-sm" placeholder="example@domain.com" required />
                          </div>
                          <div class="space-y-1">
                            <label for="city" class="block text-sm font-medium text-gray-700">Tỉnh/Thành phố <span
                                class="text-red-500">*</span></label>
                            <select id="city" v-model="delivery.thanhPho" @change="fetchDistricts"
                              class="w-full border rounded-md p-2 text-sm" required>
                              <option value="" disabled selected>Chọn tỉnh/thành phố</option>
                              <option v-for="province in provinces" :key="province.name" :value="province.name">
                                {{ province.name }}
                              </option>
                            </select>
                          </div>
                          <div class="space-y-1">
                            <label for="district" class="block text-sm font-medium text-gray-700">Quận/Huyện <span
                                class="text-red-500">*</span></label>
                            <select id="district" v-model="delivery.quan" @change="fetchWards"
                              class="w-full border rounded-md p-2 text-sm" required>
                              <option value="" disabled selected>Chọn quận/huyện</option>
                              <option v-for="district in districts" :key="district.name" :value="district.name">
                                {{ district.name }}
                              </option>
                            </select>
                          </div>
                          <div class="space-y-1">
                            <label for="ward" class="block text-sm font-medium text-gray-700">Xã/Phường <span
                                class="text-red-500">*</span></label>
                            <select id="ward" v-model="delivery.phuong" class="w-full border rounded-md p-2 text-sm"
                              required>
                              <option value="" disabled selected>Chọn xã/phường</option>
                              <option v-for="ward in wards" :key="ward.name" :value="ward.name">
                                {{ ward.name }}
                              </option>
                            </select>
                          </div>
                          <div class="col-span-2 space-y-1">
                            <label for="address" class="block text-sm font-medium text-gray-700">Số nhà, tên đường <span
                                class="text-red-500">*</span></label>
                            <input type="text" id="address" v-model="delivery.soNha"
                              class="w-full border rounded-md p-2 text-sm" placeholder="123 Đường Láng, Đống Đa"
                              required />
                          </div>
                          <div class="col-span-2 space-y-1">
                            <label for="notes" class="block text-sm font-medium text-gray-700">Ghi chú (không bắt
                              buộc)</label>
                            <textarea id="notes" v-model="delivery.ghiChu" class="w-full border rounded-md p-2 text-sm"
                              placeholder="Ghi chú"></textarea>
                          </div>
                        </div>
                        <div class="flex justify-end gap-2 mt-4">
                          <button type="submit"
                            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Lưu địa
                            chỉ</button>
                          <button type="button"
                            class="border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
                            @click="clearSelectedAddress">Xóa lựa chọn</button>
                        </div>
                      </form>
                    </div>
                    <!-- Address List Tab -->
                    <div v-else class="border rounded-lg p-4 bg-white">
                      <div class="space-y-3 max-h-80 overflow-y-auto">
                        <div v-for="address in addresses" :key="address.id"
                          class="border rounded-lg p-3 cursor-pointer hover:shadow-md transition"
                          :class="{ 'border-blue-600 bg-blue-50': selectedAddressId === address.id }"
                          @click="selectAddress(address)">
                          <div class="flex items-center">
                            <input type="radio" :checked="selectedAddressId === address.id" class="mr-3" />
                            <div class="flex-1">
                              <h4 class="font-semibold">{{ address.ten }}</h4>
                              <p class="text-sm text-gray-600">{{ address.soDienThoai }}</p>
                              <p class="text-sm text-gray-600">{{ address.diaChiCuThe }}, {{ address.phuong }}, {{
                                address.quan }}, {{ address.thanhPho }}</p>
                            </div>
                            <div class="flex gap-2">
                              <button class="text-blue-600 hover:text-blue-700 text-sm"
                                @click.stop="editAddress(address)">
                                <i class="bi bi-pencil"></i> Chỉnh sửa
                              </button>
                              <button class="text-red-600 hover:text-red-700 text-sm"
                                @click.stop="confirmDeleteAddress(address.id)">
                                <i class="bi bi-trash"></i> Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Pickup Form -->
                <div v-else class="border rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-blue-600 mb-4">Nhận tại cửa hàng <span
                      class="text-gray-500">(Bắt buộc)</span></h3>
                  <form>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="col-span-2 space-y-1">
                        <label for="store" class="block text-sm font-medium text-gray-700">Cửa hàng nhận hàng <span
                            class="text-red-500">*</span></label>
                        <select id="store" v-model="pickup.store"
                          @change="selectStore(stores.findIndex(s => s.address === pickup.store))"
                          class="w-full border rounded-md p-2 text-sm" required>
                          <option value="" disabled selected>Chọn cửa hàng</option>
                          <option v-for="store in stores" :key="store.address" :value="store.address">
                            {{ store.name }} - {{ store.address }}
                          </option>
                        </select>
                      </div>
                      <div class="space-y-1">
                        <label for="pickupPhone" class="block text-sm font-medium text-gray-700">Số điện thoại <span
                            class="text-red-500">*</span></label>
                        <input type="tel" id="pickupPhone" v-model="pickup.soDienThoai"
                          class="w-full border rounded-md p-2 text-sm" placeholder="0123456789" required
                          pattern="[0-9]{10}" />
                      </div>
                      <div class="space-y-1">
                        <label for="pickupEmail" class="block text-sm font-medium text-gray-700">Email <span
                            class="text-red-500">*</span></label>
                        <input type="email" id="pickupEmail" v-model="pickup.email"
                          class="w-full border rounded-md p-2 text-sm" placeholder="example@domain.com" required />
                      </div>
                    </div>
                  </form>
                </div>
                <div class="flex justify-between mt-6 pt-4 border-t">
                  <button class="border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
                    @click="prevStep">
                    <i class="bi bi-arrow-left mr-2"></i>Quay lại
                  </button>
                  <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    @click="nextStep">
                    Tiếp tục <i class="bi bi-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>

              <!-- Step 2: Order Summary -->
              <div v-else-if="currentStep === 2" key="step2">
                <div class="text-center mb-6">
                  <h2 class="text-2xl font-semibold text-blue-600"><i class="bi bi-cart-check mr-2"></i>Xác nhận đơn
                    hàng</h2>
                  <p class="text-gray-500 mt-1">Kiểm tra lại thông tin đơn hàng của bạn</p>
                </div>
                <div class="border rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-blue-600 mb-4">Sản phẩm</h3>
                  <div class="space-y-3">
                    <div v-for="(item, index) in order.items" :key="index"
                      class="flex justify-between items-center border-b pb-3">
                      <div>
                        <h4 class="font-semibold">{{ item.name }}</h4>
                        <p class="text-sm text-gray-600">Số lượng: {{ item.quantity }}</p>
                      </div>
                      <div class="text-right">
                        <p class="text-sm text-gray-600">{{ item.price.toLocaleString('vi-VN') }} ₫</p>
                        <p class="font-semibold">{{ (item.price * item.quantity).toLocaleString('vi-VN') }} ₫</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-2 mt-4">
                    <input v-model="discountCode" class="flex-1 border rounded-md p-2 text-sm"
                      placeholder="Nhập mã giảm giá" />
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                      @click="applyDiscount">Áp dụng</button>
                  </div>
                </div>
                <div class="flex justify-between mt-6 pt-4 border-t">
                  <button class="border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
                    @click="prevStep">
                    <i class="bi bi-arrow-left mr-2"></i>Quay lại
                  </button>
                  <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    @click="nextStep">
                    Tiếp tục <i class="bi bi-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>

              <!-- Step 3: Payment -->
              <div v-else-if="currentStep === 3" key="step3">
                <div class="text-center mb-6">
                  <h2 class="text-2xl font-semibold text-blue-600"><i class="bi bi-credit-card mr-2"></i>Phương thức
                    thanh toán</h2>
                  <p class="text-gray-500 mt-1">Chọn phương thức thanh toán phù hợp</p>
                </div>
                <div class="border rounded-lg p-4">
                  <h3 class="text-lg font-semibold text-blue-600 mb-4">Chọn phương thức</h3>
                  <div class="space-y-3">
                    <div class="border rounded-lg p-3 cursor-pointer hover:shadow-md transition"
                      :class="{ 'border-blue-600 bg-blue-50': paymentMethod === 'COD' }"
                      @click="setPaymentMethod('COD')">
                      <div class="flex items-center">
                        <input type="radio" :checked="paymentMethod === 'COD'" class="mr-3" />
                        <i class="bi bi-cash text-xl text-blue-600 mr-3"></i>
                        <div>
                          <h4 class="font-semibold">Thanh toán khi nhận hàng (COD)</h4>
                          <p class="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</p>
                        </div>
                      </div>
                    </div>
                    <div class="border rounded-lg p-3 cursor-pointer hover:shadow-md transition"
                      :class="{ 'border-blue-600 bg-blue-50': paymentMethod === 'VNPay' }"
                      @click="setPaymentMethod('VNPay')">
                      <div class="flex items-center">
                        <input type="radio" :checked="paymentMethod === 'VNPay'" class="mr-3" />
                        <i class="bi bi-credit-card-2-front text-xl text-blue-600 mr-3"></i>
                        <div>
                          <h4 class="font-semibold">Thanh toán qua VNPay</h4>
                          <p class="text-sm text-gray-600">Thanh toán an toàn qua cổng VNPay</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between mt-6 pt-4 border-t">
                  <button class="border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
                    @click="prevStep">
                    <i class="bi bi-arrow-left mr-2"></i>Quay lại
                  </button>
                  <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    @click="confirmOrder">
                    Hoàn tất đơn hàng <i class="bi bi-check-circle ml-2"></i>
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Right Column - Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h3 class="text-lg font-semibold text-blue-600 mb-4">Tóm tắt đơn hàng</h3>
            <div class="space-y-3">
              <div v-for="(item, index) in order.items" :key="index"
                class="flex justify-between items-center border-b pb-3">
                <div>
                  <span class="font-medium">{{ item.name }}</span>
                  <span class="text-sm text-gray-600 ml-2">x{{ item.quantity }}</span>
                </div>
                <span class="font-semibold">{{ (item.price * item.quantity).toLocaleString('vi-VN') }} ₫</span>
              </div>
            </div>
            <div class="border-t pt-3 mt-3">
              <div class="flex justify-between text-sm">
                <span>Tạm tính</span>
                <span>{{ order.subtotal.toLocaleString('vi-VN') }} ₫</span>
              </div>
              <div class="flex justify-between text-sm mt-2">
                <span>Phí vận chuyển</span>
                <span>Tính phí vận chuyển được thu từ bên thứ ba</span>
              </div>
              <div v-if="appliedDiscount" class="flex justify-between text-sm mt-2 text-green-600">
                <span>Giảm giá</span>
                <span>-{{ calculatedDiscount.toLocaleString('vi-VN') }} ₫</span>
              </div>
              <div class="flex justify-between font-semibold text-lg mt-3 pt-3 border-t">
                <span>Tổng cộng</span>
                <span>{{ order.total.toLocaleString('vi-VN') }} ₫</span>
              </div>
            </div>
            <div class="mt-4 space-y-2">
              <div class="flex items-center text-sm text-gray-600">
                <i class="bi bi-arrow-repeat text-green-500 mr-2"></i> Đổi trả dễ dàng trong 30 ngày
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <i class="bi bi-shield-check text-green-500 mr-2"></i> Bảo hành chính hãng
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Confirmation Modal -->
      <div v-if="showConfirmationModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div class="flex justify-between items-center mb-4">
            <h5 class="text-lg font-semibold text-blue-600">Xác nhận đơn hàng</h5>
            <button class="text-gray-600 hover:text-blue-600" @click="showConfirmationModal = false">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="text-gray-600 mb-4">
            Bạn có chắc chắn muốn đặt hàng với tổng giá trị {{ order.total.toLocaleString('vi-VN') }} ₫?
          </div>
          <div class="flex justify-center gap-2">
            <button class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
              @click="showConfirmationModal = false">Hủy</button>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              :disabled="isLoading" @click="submitOrder">
              Xác nhận
              <span v-if="isLoading" class="ml-2 spinner-border spinner-border-sm"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import checkoutLogic from '../store/pay/checkout-page'

export default checkoutLogic
</script>

<style scoped>
/* Tailwind CSS is used in the template, so minimal custom styles are needed */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.btn-outline-primary {
  @apply border border-blue-600 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 transition;
}

.btn-outline-danger {
  @apply border border-red-600 text-red-600 px-3 py-1 rounded-md hover:bg-red-50 transition;
}
</style>
