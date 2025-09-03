<template>
  <div class="min-h-screen" style="background: linear-gradient(135deg, #e6f3ff 0%, #e6f9f0 100%);">
    <!-- Enhanced Breadcrumb Navigation -->
    <div class="container mx-auto px-6 py-4 max-w-8xl">
      <nav class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-lg rounded-2xl px-6 py-4 mb-2">
        <div class="flex items-center gap-3 text-2xl">
          <NuxtLink to="/" class="text-gray-500 hover:text-[#13ad75] transition-colors duration-200">
            <i class="las la-home"></i>
            Trang chủ
          </NuxtLink>
          <i class="las la-chevron-right text-gray-400"></i>
          <NuxtLink to="/cart-page" class="text-gray-500 hover:text-[#13ad75] transition-colors duration-200">
            Giỏ hàng
          </NuxtLink>
          <i class="las la-chevron-right text-gray-400"></i>
          <span class="text-[#13ad75] font-medium">Thanh toán</span>
        </div>
      </nav>
    </div>

    <div class="container mx-auto px-6 pb-8 max-w-8xl">
      <!-- Enhanced Progress Steps -->
      <div class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 mb-2 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-[#13ad75]/10 to-[#13ad75]/15"></div>
        <div class="relative">
          <div class="flex items-center gap-4 mb-2">
            <div class="w-12 h-12 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-xl flex items-center justify-center">
              <i class="las la-shopping-cart text-2xl text-white"></i>
            </div>
            <div>
              <h2 class="text-4xl font-bold text-gray-900">Quy trình thanh toán</h2>
              <p class="text-2xl text-gray-600 mt-1">Hoàn tất đơn hàng của bạn trong {{ steps.length }} bước đơn giản</p>
            </div>
          </div>
          
          <div class="modern-progress-timeline">
            <div v-for="(step, index) in steps" :key="index" 
                 class="progress-item" 
                 :class="{
                   'progress-completed': currentStep > index + 1,
                   'progress-current': currentStep === index + 1,
                   'progress-pending': currentStep < index + 1
                 }">
              <div class="progress-circle">
                <div class="progress-icon-wrapper">
                  <i v-if="currentStep > index + 1" class="las la-check progress-icon"></i>
                  <span v-else class="progress-icon">{{ index + 1 }}</span>
                </div>
                <div class="progress-pulse"></div>
                <div class="progress-glow"></div>
              </div>
              <div class="progress-content">
                <h3 class="progress-title">{{ step.label }}</h3>
                <div class="progress-description">{{ step.description || getStepDescription(index) }}</div>
              </div>
              <div v-if="index < steps.length - 1" class="progress-connector"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Forms -->
        <div class="lg:col-span-2">
          <div class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-[#13ad75]/5 to-[#13ad75]/10"></div>
            <div class="relative">
            <transition name="fade" mode="out-in">
              <!-- Step 1: Shipping Information -->
              <div v-if="currentStep === 1" key="step1">
                <div class="flex items-center gap-4 mb-2">
                  <div class="w-12 h-12 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-xl flex items-center justify-center">
                    <i class="las la-truck text-2xl text-white"></i>
                  </div>
                  <div>
                    <h2 class="text-4xl font-bold text-gray-900">Thông tin giao hàng</h2>
                    <p class="text-2xl text-gray-600 mt-1">Vui lòng cung cấp thông tin để giao hàng nhanh chóng</p>
                  </div>
                </div>

                <!-- Delivery Method Selection -->
                <div class="mb-2">
                  <h3 class="text-3xl font-bold text-gray-900 mb-2">Phương thức giao hàng</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 cursor-pointer transition-all duration-300 hover:bg-white/70 hover:shadow-lg"
                      :class="{ 'border-[#13ad75]/50 bg-[#13ad75]/10': deliveryMethod === 'delivery' }"
                      @click="setDeliveryMethod('delivery')">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-[#13ad75]/20 rounded-xl flex items-center justify-center">
                          <i class="las la-truck text-2xl text-[#13ad75]"></i>
                        </div>
                        <div>
                          <h4 class="text-2xl font-semibold text-gray-900">Giao hàng tận nơi</h4>
                          <p class="text-xl text-gray-600">Nhận hàng tại địa chỉ bạn chọn</p>
                        </div>
                      </div>
                    </div>
                    <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 cursor-pointer transition-all duration-300 hover:bg-white/70 hover:shadow-lg"
                      :class="{ 'border-[#13ad75]/50 bg-[#13ad75]/10': deliveryMethod === 'pickup' }"
                      @click="setDeliveryMethod('pickup')">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-[#13ad75]/20 rounded-xl flex items-center justify-center">
                          <i class="las la-store text-2xl text-[#13ad75]"></i>
                        </div>
                        <div>
                          <h4 class="text-2xl font-semibold text-gray-900">Nhận tại cửa hàng</h4>
                          <p class="text-xl text-gray-600">Đến lấy hàng tại cửa hàng gần nhất</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Delivery Form -->
                <div v-if="deliveryMethod === 'delivery'" class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <div class="flex items-center gap-4 mb-2">
                    <div class="w-10 h-10 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-xl flex items-center justify-center">
                      <i class="las la-map-marker-alt text-xl text-white"></i>
                    </div>
                    <h3 class="text-3xl font-bold text-gray-900">Địa chỉ giao hàng <span class="text-2xl text-gray-600">(Bắt buộc)</span></h3>
                  </div>
                  <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 mb-2">
                    <div class="flex items-center gap-4 mb-2">
                      <div class="w-8 h-8 bg-[#13ad75]/20 rounded-xl flex items-center justify-center">
                        <i class="las la-check-circle text-xl text-[#13ad75]"></i>
                      </div>
                      <h4 class="text-2xl font-bold text-[#13ad75]">Địa chỉ đã chọn</h4>
                    </div>
                    <div class="space-y-2">
                      <p class="text-xl text-gray-900">
                        <strong>{{ selectedAddress.ten || delivery.ten }}</strong> | {{ selectedAddress.soDienThoai || delivery.soDienThoai }}
                      </p>
                      <p class="text-xl text-gray-600">
                        {{ selectedAddress.diaChiCuThe || delivery.soNha }}, {{ selectedAddress.phuong || delivery.phuong }}, {{ selectedAddress.quan || delivery.quan }}, {{ selectedAddress.thanhPho || delivery.thanhPho }}
                      </p>
                    </div>
                    <div class="flex gap-4 mt-2">
                      <button class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#13ad75] to-[#13ad75] text-white rounded-2xl hover:from-[#0f8a5f] hover:to-[#0f8a5f] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-xl" @click="editSelectedAddress">
                        <i class="las la-edit mr-2"></i>Chỉnh sửa
                      </button>
                      <button class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-2xl hover:from-red-700 hover:to-red-900 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-xl" @click="confirmDeleteAddress(selectedAddressId)">
                        <i class="las la-trash mr-2"></i>Xóa
                      </button>
                    </div>
                  </div>

                  <!-- Tabs Navigation -->
                  <div class="flex gap-4 mb-2 bg-white/60 backdrop-blur-sm p-2 rounded-2xl border border-white/30">
                    <button class="flex-1 py-4 px-6 text-xl font-medium rounded-2xl transition-all duration-300"
                      :class="{ 'bg-gradient-to-r from-[#13ad75] to-[#13ad75] text-white shadow-lg': activeTab === 0, 'bg-transparent text-gray-600 hover:bg-white/50': activeTab !== 0 }"
                      @click="activeTab = 0">
                      <i class="las la-plus mr-3"></i>Thêm địa chỉ mới
                    </button>
                    <button class="flex-1 py-4 px-6 text-xl font-medium rounded-2xl transition-all duration-300"
                      :class="{ 'bg-gradient-to-r from-[#13ad75] to-[#13ad75] text-white shadow-lg': activeTab === 1, 'bg-transparent text-gray-600 hover:bg-white/50': activeTab !== 1 }"
                      @click="activeTab = 1">
                      <i class="las la-list mr-3"></i>Chọn từ danh sách
                    </button>
                  </div>

                  <!-- Tab Content -->
                  <div>
                    <!-- Add New Address Tab -->
                    <div v-if="activeTab === 0" class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                      <form @submit.prevent="saveAddress">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div class="space-y-2">
                            <label for="fullName" class="block text-xl font-medium text-gray-700">Họ và tên <span
                                class="text-red-500">*</span></label>
                            <input type="text" id="fullName" v-model="delivery.ten"
                              class="w-full border border-white/30 rounded-2xl p-4 text-xl bg-white/60 backdrop-blur-sm focus:border-[#13ad75] focus:ring-2 focus:ring-[#13ad75]/20 transition-all duration-300" placeholder="Nguyễn Văn A" required />
                          </div>
                          <div class="space-y-2">
                            <label for="phone" class="block text-xl font-medium text-gray-700">Số điện thoại <span
                                class="text-red-500">*</span></label>
                            <input type="tel" id="phone" v-model="delivery.soDienThoai"
                              class="w-full border border-white/30 rounded-2xl p-4 text-xl bg-white/60 backdrop-blur-sm focus:border-[#13ad75] focus:ring-2 focus:ring-[#13ad75]/20 transition-all duration-300" placeholder="0123456789" required
                              pattern="[0-9]{10}" />
                          </div>
                          <div class="space-y-2">
                            <label for="email" class="block text-xl font-medium text-gray-700">Email <span
                                class="text-red-500">*</span></label>
                            <input type="email" id="email" v-model="delivery.email"
                              class="w-full border border-white/30 rounded-2xl p-4 text-xl bg-white/60 backdrop-blur-sm focus:border-[#13ad75] focus:ring-2 focus:ring-[#13ad75]/20 transition-all duration-300" placeholder="example@domain.com" required />
                          </div>
                          <div class="space-y-2">
                            <label for="city" class="block text-xl font-medium text-gray-700">Tỉnh/Thành phố <span
                                class="text-red-500">*</span></label>
                            <select id="city" v-model="delivery.thanhPho" @change="fetchDistricts"
                              class="w-full border border-white/30 rounded-2xl p-4 text-xl bg-white/60 backdrop-blur-sm focus:border-[#13ad75] focus:ring-2 focus:ring-[#13ad75]/20 transition-all duration-300" required>
                              <option value="" disabled selected>Chọn tỉnh/thành phố</option>
                              <option v-for="province in provinces" :key="province.name" :value="province.name">
                                {{ province.name }}
                              </option>
                            </select>
                          </div>
                          <div class="space-y-2">
                            <label for="district" class="block text-xl font-medium text-gray-700">Quận/Huyện <span
                                class="text-red-500">*</span></label>
                            <select id="district" v-model="delivery.quan" @change="fetchWards"
                              class="w-full border border-white/30 rounded-2xl p-4 text-xl bg-white/60 backdrop-blur-sm focus:border-[#13ad75] focus:ring-2 focus:ring-[#13ad75]/20 transition-all duration-300" required>
                              <option value="" disabled selected>Chọn quận/huyện</option>
                              <option v-for="district in districts" :key="district.name" :value="district.name">
                                {{ district.name }}
                              </option>
                            </select>
                          </div>
                          <div class="space-y-2">
                            <label for="ward" class="block text-xl font-medium text-gray-700">Xã/Phường <span
                                class="text-red-500">*</span></label>
                            <select id="ward" v-model="delivery.phuong" class="w-full border border-white/30 rounded-2xl p-4 text-xl bg-white/60 backdrop-blur-sm focus:border-[#13ad75] focus:ring-2 focus:ring-[#13ad75]/20 transition-all duration-300"
                              required>
                              <option value="" disabled selected>Chọn xã/phường</option>
                              <option v-for="ward in wards" :key="ward.name" :value="ward.name">
                                {{ ward.name }}
                              </option>
                            </select>
                          </div>
                          <div class="col-span-2 space-y-2">
                            <label for="address" class="block text-xl font-medium text-gray-700">Số nhà, tên đường <span
                                class="text-red-500">*</span></label>
                            <input type="text" id="address" v-model="delivery.soNha"
                              class="w-full border border-white/30 rounded-2xl p-4 text-xl bg-white/60 backdrop-blur-sm focus:border-[#13ad75] focus:ring-2 focus:ring-[#13ad75]/20 transition-all duration-300" placeholder="123 Đường Láng, Đống Đa"
                              required />
                          </div>
                          <div class="col-span-2 space-y-2">
                            <label for="notes" class="block text-xl font-medium text-gray-700">Ghi chú (không bắt
                              buộc)</label>
                            <textarea id="notes" v-model="delivery.ghiChu" class="w-full border border-white/30 rounded-2xl p-4 text-xl bg-white/60 backdrop-blur-sm focus:border-[#13ad75] focus:ring-2 focus:ring-[#13ad75]/20 transition-all duration-300 resize-none"
                              placeholder="Ghi chú" rows="4"></textarea>
                          </div>
                        </div>
                        <div class="flex justify-end gap-4 mt-2">
                          <button type="submit"
                            class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#13ad75] to-[#13ad75] text-white rounded-2xl hover:from-[#0f8a5f] hover:to-[#0f8a5f] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-xl">
                            <i class="las la-save mr-3"></i>Lưu địa chỉ
                          </button>
                          <button type="button"
                            class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-2xl hover:from-gray-600 hover:to-gray-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-xl"
                            @click="clearSelectedAddress">
                            <i class="las la-times mr-3"></i>Xóa lựa chọn
                          </button>
                        </div>
                      </form>
                    </div>
                    <!-- Address List Tab -->
                    <div v-else class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                      <div class="space-y-4 max-h-80 overflow-y-auto">
                        <div v-for="address in addresses" :key="address.id"
                          class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 cursor-pointer hover:bg-white/70 hover:shadow-lg transition-all duration-300"
                          :class="{ 'border-[#13ad75]/50 bg-[#13ad75]/10': selectedAddressId === address.id }"
                          @click="selectAddress(address)">
                          <div class="flex items-center gap-4">
                            <div class="w-6 h-6 rounded-full border-2 border-[#13ad75] flex items-center justify-center"
                                 :class="{ 'bg-[#13ad75]': selectedAddressId === address.id }">
                              <div v-if="selectedAddressId === address.id" class="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            <div class="flex-1">
                              <h4 class="text-xl font-semibold text-gray-900">{{ address.ten }}</h4>
                              <p class="text-lg text-gray-600">{{ address.soDienThoai }}</p>
                              <p class="text-lg text-gray-600">{{ address.diaChiCuThe }}, {{ address.phuong }}, {{ address.quan }}, {{ address.thanhPho }}</p>
                            </div>
                            <div class="flex gap-3">
                              <button class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#13ad75] to-[#13ad75] text-white rounded-xl hover:from-[#0f8a5f] hover:to-[#0f8a5f] transition-all duration-300 font-medium shadow-md hover:shadow-lg text-lg"
                                @click.stop="editAddress(address)">
                                <i class="las la-edit mr-2"></i> Chỉnh sửa
                              </button>
                              <button class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl hover:from-red-700 hover:to-red-900 transition-all duration-300 font-medium shadow-md hover:shadow-lg text-lg"
                                @click.stop="confirmDeleteAddress(address.id)">
                                <i class="las la-trash mr-2"></i> Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Pickup Form -->
                <div v-else class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <div class="flex items-center gap-4 mb-2">
                    <div class="w-10 h-10 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-xl flex items-center justify-center">
                      <i class="las la-store text-xl text-white"></i>
                    </div>
                    <h3 class="text-3xl font-bold text-gray-900">Nhận tại cửa hàng <span class="text-2xl text-gray-600">(Bắt buộc)</span></h3>
                  </div>
                  <form>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div class="col-span-2 space-y-2">
                        <label for="store" class="block text-xl font-medium text-gray-700">Cửa hàng nhận hàng <span
                            class="text-red-500">*</span></label>
                        <select id="store" v-model="pickup.store"
                          @change="selectStore(stores.findIndex(s => s.address === pickup.store))"
                          class="w-full border border-white/30 rounded-2xl p-4 text-xl bg-white/60 backdrop-blur-sm focus:border-[#13ad75] focus:ring-2 focus:ring-[#13ad75]/20 transition-all duration-300" required>
                          <option value="" disabled selected>Chọn cửa hàng</option>
                          <option v-for="store in stores" :key="store.address" :value="store.address">
                            {{ store.name }} - {{ store.address }}
                          </option>
                        </select>
                      </div>
                      <div class="space-y-2">
                        <label for="pickupPhone" class="block text-xl font-medium text-gray-700">Số điện thoại <span
                            class="text-red-500">*</span></label>
                        <input type="tel" id="pickupPhone" v-model="pickup.soDienThoai"
                          class="w-full border border-white/30 rounded-2xl p-4 text-xl bg-white/60 backdrop-blur-sm focus:border-[#13ad75] focus:ring-2 focus:ring-[#13ad75]/20 transition-all duration-300" placeholder="0123456789" required
                          pattern="[0-9]{10}" />
                      </div>
                      <div class="space-y-2">
                        <label for="pickupEmail" class="block text-xl font-medium text-gray-700">Email <span
                            class="text-red-500">*</span></label>
                        <input type="email" id="pickupEmail" v-model="pickup.email"
                          class="w-full border border-white/30 rounded-2xl p-4 text-xl bg-white/60 backdrop-blur-sm focus:border-[#13ad75] focus:ring-2 focus:ring-[#13ad75]/20 transition-all duration-300" placeholder="example@domain.com" required />
                      </div>
                    </div>
                  </form>
                </div>
                <div class="flex justify-between mt-6 pt-4 border-t">
                  <button class="border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
                    @click="prevStep">
                    <i class="bi bi-arrow-left mr-2"></i>Quay lại
                  </button>
                  <button class=" text-white px-4 py-2 bg-gradient-to-r from-[#13ad75] to-[#13ad75] text-white rounded-2xl hover:from-[#0f8a5f] hover:to-[#0f8a5f] transition"
                    @click="nextStep">
                    Tiếp tục <i class="bi bi-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>

              <!-- Step 2: Order Summary -->
              <div v-else-if="currentStep === 2" key="step2">
                <div class="flex items-center gap-4 mb-2">
                  <div class="w-12 h-12 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-xl flex items-center justify-center">
                    <i class="las la-clipboard-check text-2xl text-white"></i>
                  </div>
                  <div>
                    <h2 class="text-4xl font-bold text-gray-900">Xác nhận đơn hàng</h2>
                    <p class="text-2xl text-gray-600 mt-1">Kiểm tra lại thông tin đơn hàng của bạn</p>
                  </div>
                </div>
                <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <h3 class="text-3xl font-bold text-gray-900 mb-2">Sản phẩm</h3>
                  <div class="space-y-4">
                    <div v-for="(item, index) in order.items" :key="index"
                      class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                      <div class="flex justify-between items-center">
                        <div>
                          <h4 class="text-2xl font-semibold text-gray-900">{{ item.name }}</h4>
                          <p class="text-xl text-gray-600">Số lượng: {{ item.quantity }}</p>
                        </div>
                        <div class="text-right">
                          <p class="text-xl text-gray-600">{{ item.price.toLocaleString('vi-VN') }} ₫</p>
                          <p class="text-2xl font-bold text-[#13ad75]">{{ (item.price * item.quantity).toLocaleString('vi-VN') }} ₫</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-4 mt-2">
                    <input v-model="discountCode" class="flex-1 border border-white/30 rounded-2xl p-4 text-xl bg-white/60 backdrop-blur-sm focus:border-[#13ad75] focus:ring-2 focus:ring-[#13ad75]/20 transition-all duration-300"
                      placeholder="Nhập mã giảm giá" />
                    <button class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#13ad75] to-[#13ad75] text-white rounded-2xl hover:from-[#0f8a5f] hover:to-[#0f8a5f] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-xl"
                      @click="applyDiscount">
                      <i class="las la-tag mr-3"></i>Áp dụng
                    </button>
                    <button class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-xl"
                      @click="openVoucherModal">
                      <i class="las la-ticket-alt mr-3"></i>Chọn hoặc nhập mã
                    </button>
                  </div>
                </div>
                <div class="flex justify-between mt-6 pt-4 border-t">
                  <button class="border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 transition"
                    @click="prevStep">
                    <i class="bi bi-arrow-left mr-2"></i>Quay lại
                  </button>
                                    <button class=" text-white px-4 py-2 bg-gradient-to-r from-[#13ad75] to-[#13ad75] text-white rounded-2xl hover:from-[#0f8a5f] hover:to-[#0f8a5f] transition"
                    @click="nextStep">
                    Tiếp tục <i class="bi bi-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>

              <!-- Step 3: Payment -->
              <div v-else-if="currentStep === 3" key="step3">
                <div class="flex items-center gap-4 mb-2">
                  <div class="w-12 h-12 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-xl flex items-center justify-center">
                    <i class="las la-credit-card text-2xl text-white"></i>
                  </div>
                  <div>
                    <h2 class="text-4xl font-bold text-gray-900">Phương thức thanh toán</h2>
                    <p class="text-2xl text-gray-600 mt-1">Chọn phương thức thanh toán phù hợp</p>
                  </div>
                </div>
                <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                  <h3 class="text-3xl font-bold text-gray-900 mb-2">Chọn phương thức</h3>
                  <div class="space-y-4">
                    <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 cursor-pointer hover:bg-white/70 hover:shadow-lg transition-all duration-300"
                      :class="{ 'border-[#13ad75]/50 bg-[#13ad75]/10': paymentMethod === 'COD' }"
                      @click="setPaymentMethod('COD')">
                      <div class="flex items-center gap-4">
                        <div class="w-6 h-6 rounded-full border-2 border-[#13ad75] flex items-center justify-center"
                             :class="{ 'bg-[#13ad75]': paymentMethod === 'COD' }">
                          <div v-if="paymentMethod === 'COD'" class="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div class="w-12 h-12 bg-[#13ad75]/20 rounded-xl flex items-center justify-center">
                          <i class="las la-money-bill text-2xl text-[#13ad75]"></i>
                        </div>
                        <div>
                          <h4 class="text-2xl font-semibold text-gray-900">Thanh toán khi nhận hàng (COD)</h4>
                          <p class="text-xl text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</p>
                        </div>
                      </div>
                    </div>
                    <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 cursor-pointer hover:bg-white/70 hover:shadow-lg transition-all duration-300"
                      :class="{ 'border-[#13ad75]/50 bg-[#13ad75]/10': paymentMethod === 'VNPay' }"
                      @click="setPaymentMethod('VNPay')">
                      <div class="flex items-center gap-4">
                        <div class="w-6 h-6 rounded-full border-2 border-[#13ad75] flex items-center justify-center"
                             :class="{ 'bg-[#13ad75]': paymentMethod === 'VNPay' }">
                          <div v-if="paymentMethod === 'VNPay'" class="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div class="w-12 h-12 bg-[#13ad75]/20 rounded-xl flex items-center justify-center">
                          <i class="las la-credit-card text-2xl text-[#13ad75]"></i>
                        </div>
                        <div>
                          <h4 class="text-2xl font-semibold text-gray-900">Thanh toán qua VNPay</h4>
                          <p class="text-xl text-gray-600">Thanh toán an toàn qua cổng VNPay</p>
                        </div>
                      </div>
                    </div>
                    <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 cursor-pointer hover:bg-white/70 hover:shadow-lg transition-all duration-300"
                      :class="{ 'border-[#a3258e]/50 bg-[#a3258e]/10': paymentMethod === 'MOMO' }"
                      @click="setPaymentMethod('MOMO')">
                      <div class="flex items-center gap-4">
                        <div class="w-6 h-6 rounded-full border-2 border-[#a3258e] flex items-center justify-center"
                             :class="{ 'bg-[#a3258e]': paymentMethod === 'MOMO' }">
                          <div v-if="paymentMethod === 'MOMO'" class="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div class="w-12 h-12 bg-[#a3258e]/20 rounded-xl flex items-center justify-center">
                           <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="MoMo" class="h-8 w-8">
                        </div>
                        <div>
                          <h4 class="text-2xl font-semibold text-gray-900">Thanh toán qua MoMo</h4>
                          <p class="text-xl text-gray-600">Sử dụng ví điện tử MoMo để thanh toán</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-between mt-2 pt-6 border-t border-white/30">
                  <button class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-2xl hover:from-gray-600 hover:to-gray-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-xl"
                    @click="prevStep">
                    <i class="las la-arrow-left mr-3"></i>Quay lại
                  </button>
                  <button class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#13ad75] to-[#13ad75] text-white rounded-2xl hover:from-[#0f8a5f] hover:to-[#0f8a5f] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-xl"
                    @click="confirmOrder">
                    Hoàn tất đơn hàng <i class="las la-check-circle ml-3"></i>
                  </button>
                </div>
              </div>
            </transition>
            </div>
          </div>
        </div>

        <!-- Right Column - Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 sticky top-4 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-[#13ad75]/5 to-[#13ad75]/10"></div>
            <div class="relative">
              <div class="flex items-center gap-4 mb-2">
                <div class="w-10 h-10 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-xl flex items-center justify-center">
                  <i class="las la-receipt text-xl text-white"></i>
                </div>
                <h3 class="text-3xl font-bold text-gray-900">Tóm tắt đơn hàng</h3>
              </div>
              
              <div class="space-y-4">
                <div v-for="(item, index) in order.items" :key="index"
                  class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                  <div class="flex justify-between items-center">
                    <div>
                      <span class="text-xl font-semibold text-gray-900">{{ item.name }}</span>
                      <span class="text-lg text-gray-600 ml-2">x{{ item.quantity }}</span>
                    </div>
                    <span class="text-2xl font-bold text-[#13ad75]">{{ (item.price * item.quantity).toLocaleString('vi-VN') }} ₫</span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 mt-2">
                <div class="space-y-4">
                  <div class="flex justify-between items-center">
                    <span class="text-xl text-gray-700">Tạm tính</span>
                    <span class="text-xl font-semibold text-gray-900">{{ order.subtotal.toLocaleString('vi-VN') }} ₫</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-xl text-gray-700">Phí vận chuyển</span>
                    <span class="text-lg text-gray-600">Miễn phí</span>
                  </div>
                  <div v-if="appliedDiscount" class="flex justify-between items-center text-[#13ad75]">
                    <span class="text-xl font-medium">Giảm giá</span>
                    <span class="text-xl font-semibold">-{{ calculatedDiscount.toLocaleString('vi-VN') }} ₫</span>
                  </div>
                  <div class="flex justify-between items-center pt-4 border-t border-white/30">
                    <span class="text-2xl font-bold text-gray-900">Tổng cộng</span>
                    <span class="text-3xl font-bold text-[#13ad75]">{{ order.total.toLocaleString('vi-VN') }} ₫</span>
                  </div>
                </div>
              </div>
              
              <div class="mt-2 space-y-3">
                <div class="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                  <i class="las la-undo-alt text-2xl text-[#13ad75]"></i>
                  <span class="text-xl text-gray-700">Đổi trả dễ dàng trong 30 ngày</span>
                </div>
                <div class="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                  <i class="las la-shield-alt text-2xl text-[#13ad75]"></i>
                  <span class="text-xl text-gray-700">Bảo hành chính hãng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Confirmation Modal -->
      <div v-if="showConfirmationModal"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-8 max-w-lg w-full mx-4 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-[#13ad75]/5 to-[#13ad75]/10"></div>
          <div class="relative">
            <div class="flex justify-between items-center mb-2">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-xl flex items-center justify-center">
                  <i class="las la-check-circle text-2xl text-white"></i>
                </div>
                <h5 class="text-3xl font-bold text-gray-900">Xác nhận đơn hàng</h5>
              </div>
              <button class="w-10 h-10 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 flex items-center justify-center text-gray-600 hover:text-[#13ad75] hover:bg-white/80 transition-all duration-300" @click="showConfirmationModal = false">
                <i class="las la-times text-xl"></i>
              </button>
            </div>
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 mb-2">
              <p class="text-2xl text-gray-700 text-center">
                Bạn có chắc chắn muốn đặt hàng với tổng giá trị 
                <span class="font-bold text-[#13ad75]">{{ order.total.toLocaleString('vi-VN') }} ₫</span>?
              </p>
            </div>
            <div class="flex justify-center gap-4">
              <button class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-2xl hover:from-gray-600 hover:to-gray-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-xl"
                @click="showConfirmationModal = false">
                <i class="las la-times mr-3"></i>Hủy
              </button>
              <button class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#13ad75] to-[#13ad75] text-white rounded-2xl hover:from-[#0f8a5f] hover:to-[#0f8a5f] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-xl"
                :disabled="isLoading" @click="submitOrder">
                <i class="las la-check mr-3"></i>Xác nhận
                <i v-if="isLoading" class="las la-spinner la-spin ml-3"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Voucher Modal -->
      <VoucherModal :visible="showVoucherModal" :total-price="order.subtotal" :customer-id="customerId" @close="showVoucherModal = false" @voucher-selected="onVoucherSelected" />

      <!-- Toast Notifications -->
      <ToastNotification ref="toastNotification" />
    </div>
  </div>
</template>

<script>
import checkoutLogic from '../store/pay/checkout-page'
import ToastNotification from '../components/base/ToastNotification.vue'
import VoucherModal from '../components/VoucherModal.vue'

export default {
  ...checkoutLogic,
  components: {
    ToastNotification,
    VoucherModal
  }
}
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

/* CSS Custom Properties */
:root {
  --primary-color: #13ad75;
  --primary-light: #13ad75;
  --primary-dark: #0f8a5f;
  --secondary-color: #002c69;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --info-color: #3b82f6;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Modern Progress Timeline */
.modern-progress-timeline {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 100%;
  margin: 0 auto;
  padding: 3rem 0;
  gap: 2rem;
}

/* Progress Item */
.progress-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  padding: 1rem;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Progress Connector */
.progress-connector {
  position: absolute;
  top: 3rem;
  left: calc(100% - 1rem);
  width: 2rem;
  height: 4px;
  background: linear-gradient(90deg, 
    rgba(200, 200, 200, 0.3) 0%, 
    rgba(200, 200, 200, 0.5) 100%);
  border-radius: 2px;
  z-index: 1;
}

.progress-item.progress-completed + .progress-item .progress-connector {
  background: linear-gradient(90deg, 
    #10b981 0%, 
    #13ad75 100%);
  box-shadow: 0 0 8px rgba(19, 173, 117, 0.3);
}

/* Progress Circle */
.progress-circle {
  position: relative;
  width: 6rem;
  height: 6rem;
  margin-bottom: 1.5rem;
  z-index: 4;
}

.progress-icon-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  border: 4px solid white;
  box-shadow: var(--shadow-xl);
  backdrop-filter: blur(10px);
}

.progress-icon {
  font-size: 2rem;
  transition: all 0.4s ease;
}

/* Progress Pulse Effect */
.progress-pulse {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  animation: progressPulse 2s ease-in-out infinite;
}

/* Progress Glow Effect */
.progress-glow {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border-radius: 50%;
  z-index: 0;
  opacity: 0;
  animation: progressGlow 3s ease-in-out infinite;
}

/* Progress States - Color-coded */

/* Pending Progress - Gray */
.progress-item.progress-pending .progress-icon-wrapper {
  background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
  color: white;
}

.progress-item.progress-pending .progress-pulse {
  background: radial-gradient(circle, rgba(156, 163, 175, 0.3) 0%, transparent 70%);
}

.progress-item.progress-pending .progress-glow {
  background: linear-gradient(45deg, transparent 0%, rgba(156, 163, 175, 0.2) 25%, transparent 50%, rgba(156, 163, 175, 0.2) 75%, transparent 100%);
}

/* Completed Progress - Green */
.progress-item.progress-completed .progress-icon-wrapper {
  background: linear-gradient(135deg, #10b981 0%, #13ad75 100%);
  color: white;
  transform: scale(1.05);
  box-shadow: var(--shadow-xl), 0 0 20px rgba(19, 173, 117, 0.4);
}

.progress-item.progress-completed .progress-pulse {
  background: radial-gradient(circle, rgba(19, 173, 117, 0.4) 0%, transparent 70%);
  opacity: 1;
}

.progress-item.progress-completed .progress-glow {
  background: linear-gradient(45deg, transparent 0%, rgba(19, 173, 117, 0.3) 25%, transparent 50%, rgba(19, 173, 117, 0.3) 75%, transparent 100%);
  opacity: 1;
}

/* Current Progress - Blue */
.progress-item.progress-current .progress-icon-wrapper {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  transform: scale(1.15);
  box-shadow: var(--shadow-2xl), 0 0 30px rgba(59, 130, 246, 0.6);
  animation: currentGlow 2s ease-in-out infinite alternate;
}

.progress-item.progress-current .progress-pulse {
  background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
  opacity: 1;
  animation: progressPulse 1.5s ease-in-out infinite;
}

.progress-item.progress-current .progress-glow {
  background: linear-gradient(45deg, transparent 0%, rgba(59, 130, 246, 0.3) 25%, transparent 50%, rgba(59, 130, 246, 0.3) 75%, transparent 100%);
  opacity: 1;
  animation: progressGlow 2s ease-in-out infinite;
}

/* Progress Content */
.progress-content {
  padding: 0 0.5rem;
  transition: all 0.4s ease;
}

.progress-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gray-800);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: all 0.4s ease;
}

.progress-description {
  font-size: 0.95rem;
  color: var(--gray-500);
  margin: 0;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
  max-width: 200px;
}

/* Enhanced States for Content */
.progress-item.progress-completed .progress-title {
  color: var(--primary-color);
  text-shadow: 0 1px 2px rgba(19, 173, 117, 0.2);
}

.progress-item.progress-current .progress-title {
  color: var(--info-color);
  transform: scale(1.05);
  text-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

/* Animations */
@keyframes progressPulse {
  0%, 100% {
    opacity: 0;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

@keyframes progressGlow {
  0%, 100% {
    opacity: 0;
    transform: rotate(0deg);
  }
  50% {
    opacity: 0.8;
    transform: rotate(180deg);
  }
}

@keyframes currentGlow {
  0% {
    box-shadow: var(--shadow-2xl), 0 0 30px rgba(59, 130, 246, 0.6);
  }
  100% {
    box-shadow: var(--shadow-2xl), 0 0 40px rgba(59, 130, 246, 0.8);
  }
}

/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}


/* Responsive Design */
@media (max-width: 1024px) {
  .modern-progress-timeline {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .progress-connector {
    display: none;
  }
  
  .progress-circle {
    width: 4rem;
    height: 4rem;
  }
  
  .progress-icon {
    font-size: 1.5rem;
  }
  
  .progress-title {
    font-size: 1.25rem;
  }
}

@media (max-width: 768px) {
  .progress-circle {
    width: 3rem;
    height: 3rem;
  }
  
  .progress-icon {
    font-size: 1.25rem;
  }
  
  .progress-title {
    font-size: 1rem;
  }
  
  .progress-description {
    font-size: 0.875rem;
  }
}
</style>