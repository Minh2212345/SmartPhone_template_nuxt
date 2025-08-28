<template>
  <div class="min-h-screen" style="  background: linear-gradient(135deg, #e6f3ff 0%, #e6f9f0 100%);">
    <div v-if="isLoggedIn" class="container mx-auto px-6 py-8 max-w-8xl">
      <!-- Enhanced Profile Header with Glassmorphism -->
      <header class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 mb-2 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-[#13ad75]/10 to-[#13ad75]/15"></div>
        <div class="relative flex items-center gap-8">
          <div class="relative">
            <img src="/assets/images/icons/ava-profile.png" 
                 class="h-28 w-28 rounded-full object-cover border-4 border-white shadow-lg" 
                 alt="Avatar" />
            <div class="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
              <i class="las la-check text-white texl-2xl"></i>
            </div>
          </div>
          
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-2">
              <h1 class="text-5xl font-bold text-gray-900">{{ customerName }}</h1>
              <span class="px-3 py-1 text-2xl bg-[#13ad75]/20 text-[#13ad75] rounded-full text-base font-medium border border-[#13ad75]/30">
                Khách hàng VIP
              </span>
            </div>
            <div class="flex items-center gap-6 text-gray-600">
              <div class="flex items-center gap-2">
                <i class="las la-phone text-[#13ad75]"></i>
                <span class="text-xl font-medium">{{ phoneNumber }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="las la-clock text-gray-400"></i>
                <span class="text-xl">Cập nhật: {{ formatDate(updateAt) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Stats Cards -->
          <div class="flex gap-8">
            <div class="flex items-center justify-center text-center bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-white/30 hover:bg-white/70 transition-all duration-300 hover:shadow-lg hover:scale-105 gap-4">
              <div class="flex items-center justify-center w-12 h-12 bg-[#13ad75]/20 rounded-xl shadow-sm">
                <i class="las la-shopping-cart text-2xl text-[#13ad75]"></i>
              </div>
              <div>
                <p class="text-3xl font-bold text-[#13ad75]">{{ totalOrders }}</p>
                <p class="text-2xl text-gray-600 font-medium">Tổng đơn hàng</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="flex gap-8">
        <!-- Enhanced Sidebar Navigation -->
        <aside class="space-y-2" style="width: 300px;">
          <nav class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl p-2 sticky top-8">
            <div class="space-y-1">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                class="w-full px-6 py-4 text-left rounded-xl transition-all duration-300 flex items-center group hover:scale-105 transform"
                :class="activeTab === tab.id 
                  ? 'bg-[#13ad75] text-white shadow-lg shadow-[#13ad75]/25' 
                  : 'text-gray-700 hover:bg-[#13ad75]/10 hover:text-[#13ad75]'"
                @click="activeTab = tab.id">
                <i :class="tab.icon" 
                   class="text-xl mr-4 transition-transform group-hover:scale-110"
                   :style="activeTab === tab.id ? 'color: white' : ''"></i>
                <span class="font-medium text-2xl">{{ tab.name }}</span>
                <i v-if="activeTab === tab.id" class="las la-chevron-right ml-auto"></i>
              </button>
              
              <div class="border-t border-gray-200 my-4"></div>
              
              <button
                class="w-full px-6 py-4 text-left text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 flex items-center group hover:scale-105 transform"
                @click="handleLogout">
                <i class="las la-sign-out-alt text-xl mr-4 transition-transform group-hover:scale-110"></i>
                <span class="font-medium text-2xl">Đăng xuất</span>
              </button>
            </div>
          </nav>
        </aside>

        <!-- Enhanced Main Content Area -->
        <main class="flex-1 bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl overflow-hidden">
          
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'" class="p-8">
            <div class="mb-2">
              <h2 class="text-6xl font-bold text-gray-900 mb-2">Tổng quan tài khoản</h2>
              <p class="text-2xl text-gray-600">Xem tình hình hoạt động và thông tin tài khoản của bạn</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="bg-[#13ad75]/10 border border-[#13ad75]/30 rounded-2xl p-8 text-center group hover:shadow-lg transition-all duration-300">
                <div class="w-16 h-16 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <i class="las la-shopping-bag text-2xl text-white"></i>
                </div>
                <h3 class="text-2xl font-semibold text-gray-800 mb-1">Đơn hàng gần đây</h3>
                <p class="text-2xl text-gray-600 mb-6">Bạn chưa có đơn hàng nào hôm nay? Hãy bắt đầu mua sắm!</p>
                <button class="px-8 py-3 bg-gradient-to-r from-[#13ad75] to-[#13ad75] text-white rounded-xl hover:shadow-lg hover:shadow-[#13ad75]/25 transition-all duration-200 font-medium transform hover:scale-105 text-2xl">
                  Bắt đầu mua sắm
                </button>
              </div>
              
              <div class="bg-[#13ad75]/10 border border-[#13ad75]/30 rounded-2xl p-8 text-center group hover:shadow-lg transition-all duration-300">
                <div class="w-16 h-16 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <i class="las la-gift text-2xl text-white"></i>
                </div>
                <h3 class="text-2xl font-semibold text-gray-800 mb-1">Ưu đãi của bạn</h3>
                <p class="text-2xl text-gray-600 mb-6">Bạn chưa có ưu đãi nào</p>
                <button class="px-8 py-3 bg-gradient-to-r from-[#13ad75] to-[#13ad75] text-white rounded-xl hover:shadow-lg hover:shadow-[#13ad75]/25 transition-all duration-200 font-medium transform hover:scale-105 text-2xl">
                  Khám phá ưu đãi
                </button>
              </div>
              
              <div class="lg:col-span-2 bg-[#13ad75]/10 border border-[#13ad75]/20 rounded-2xl p-8 text-center group hover:shadow-lg transition-all duration-300">
                <div class="w-16 h-16 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <i class="las la-heart text-2xl text-white"></i>
                </div>
                <h3 class="text-2xl font-semibold text-gray-800 mb-1">Sản phẩm yêu thích</h3>
                <p class="text-2xl text-gray-600 mb-6">Bạn chưa có sản phẩm yêu thích? Hãy khám phá ngay!</p>
                <button class="px-8 py-3 bg-gradient-to-r from-[#13ad75] to-[#13ad75] text-white rounded-xl hover:shadow-lg hover:shadow-[#13ad75]/25 transition-all duration-200 font-medium transform hover:scale-105 text-2xl">
                  Xem sản phẩm
                </button>
              </div>
            </div>
          </div>

          <!-- Order History Tab -->
          <div v-if="activeTab === 'history'" class="p-8">
            <div class="mb-2">
              <h2 class="text-6xl font-bold text-gray-900 mb-2">Lịch sử đơn hàng</h2>
              <p class="text-2xl text-gray-600">Theo dõi tất cả đơn hàng của bạn</p>
            </div>

            <!-- Status Filter Tabs -->
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-2 mb-2 inline-flex space-x-1 border border-white/30">
              <button 
                v-for="status in orderStatuses" 
                :key="status.id"
                class="px-6 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap text-2xl"
                :class="activeStatus === status.id 
                  ? 'bg-[#13ad75] text-white shadow-md shadow-[#13ad75]/25' 
                  : 'text-gray-600 hover:text-[#13ad75] hover:bg-white/70'"
                @click="activeStatus = status.id">
                {{ status.name }}
              </button>
            </div>
            <!-- Enhanced Orders Table -->
            <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
              <div class="overflow-x-auto">
                <table class="min-w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-8 py-6 text-left text-2xl font-semibold text-gray-700">Mã đơn hàng</th>
                      <th class="px-8 py-6 text-left text-2xl font-semibold text-gray-700">Ngày đặt</th>
                      <th class="px-8 py-6 text-left text-2xl font-semibold text-gray-700">Trạng thái</th>
                      <th class="px-8 py-6 text-left text-2xl font-semibold text-gray-700">Tổng tiền</th>
                      <th class="px-8 py-6 text-left text-2xl font-semibold text-gray-700">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="order in filteredOrders" :key="order.id" 
                        class="hover:bg-gray-50 transition-colors duration-200"
                        :class="{ 'bg-red-50': order.trangThai === 4 }">
                      <td class="px-8 py-6">
                        <div class="font-semibold text-[#13ad75] text-2xl">#{{ order.ma }}</div>
                      </td>
                      <td class="px-8 py-6 text-gray-600 text-2xl">{{ formatDate(order.ngayTao) }}</td>
                      <td class="px-8 py-6">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-2xl font-medium"
                              :class="{
                                'bg-yellow-100 text-yellow-800': order.trangThai === 0,
                                'bg-blue-100 text-blue-800': order.trangThai === 1,
                                'bg-purple-100 text-purple-800': order.trangThai === 2,
                                'bg-green-100 text-green-800': order.trangThai === 3,
                                'bg-red-100 text-red-800': order.trangThai === 4
                              }">
                          <div class="w-2 h-2 rounded-full mr-2"
                               :class="{
                                 'bg-yellow-400': order.trangThai === 0,
                                 'bg-blue-400': order.trangThai === 1,
                                 'bg-purple-400': order.trangThai === 2,
                                 'bg-green-400': order.trangThai === 3,
                                 'bg-red-400': order.trangThai === 4
                               }"></div>
                          {{ getStatusNameById(order.trangThai) }}
                        </span>
                      </td>
                      <td class="px-8 py-6">
                        <span class="font-semibold text-gray-900 text-2xl">{{ formatCurrency(order.tongTienSauGiam) }}</span>
                      </td>
                      <td class="px-8 py-6">
                        <div class="flex gap-3">
                          <NuxtLink
                            class="inline-flex items-center px-4 py-2 bg-[#13ad75] text-white rounded-lg hover:shadow-lg hover:shadow-[#13ad75]/25 transition-all duration-200 font-medium transform hover:scale-105 text-2xl"
                            :to="'/invoice-status?orderId=' + order.id">
                            <i class="las la-search mr-2"></i>
                            Tra cứu
                          </NuxtLink>
                          <button
                            v-if="order.trangThai === 0"
                            @click="cancelOrder(order.id)"
                            class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105 text-2xl">
                            <i class="las la-times mr-2"></i>
                            Hủy đơn
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="filteredOrders.length === 0">
                      <td colspan="5" class="px-8 py-16 text-center text-gray-500">
                        <div class="flex flex-col items-center">
                          <i class="las la-shopping-cart text-6xl text-gray-300 mb-4"></i>
                          <h3 class="text-xl font-medium text-gray-900 mb-2">Chưa có đơn hàng nào</h3>
                          <p class="text-2xl text-gray-500">Hãy bắt đầu mua sắm để xem đơn hàng ở đây</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Enhanced Pagination -->
            <div class="flex justify-between items-center mt-2">
              <p class="text-gray-600">
                Hiển thị {{ filteredOrders.length }} / {{ totalElements }} đơn hàng
              </p>
              
              <div class="flex items-center gap-4">
                <button 
                  @click="goToPage(currentPage - 1)" 
                  :disabled="currentPage === 0"
                  class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                  <i class="las la-chevron-left mr-2"></i>
                  Trước
                </button>
                
                <div class="flex items-center gap-2">
                  <span class="text-gray-700 font-medium">
                    Trang {{ currentPage + 1 }} / {{ totalPages }}
                  </span>
                </div>
                
                <button 
                  @click="goToPage(currentPage + 1)" 
                  :disabled="currentPage >= totalPages - 1"
                  class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                  Sau
                  <i class="las la-chevron-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Order Lookup Tab -->
          <div v-if="activeTab === 'order-lookup'" class="p-8">
            <div class="mb-2">
              <h2 class="text-6xl font-bold text-gray-900 mb-2">Tra cứu đơn hàng</h2>
              <p class="text-2xl text-gray-600">Nhập mã đơn hàng để xem chi tiết</p>
            </div>
            
            <div class="max-w-100">
              <div class="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                <div class="flex gap-4">
                  <div class="flex-1 relative">
                    <i class="las la-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
                    <input 
                      v-model="orderLookupId" 
                      type="text" 
                      placeholder="Nhập mã đơn hàng..." 
                      class="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl"
                      @keyup.enter="lookupOrder" />
                  </div>
                  <button 
                    @click="lookupOrder" 
                    class="px-8 py-4 bg-[#13ad75] text-white rounded-xl hover:shadow-lg hover:shadow-[#13ad75]/25 transition-all duration-200 font-medium transform hover:scale-105 text-2xl">
                    <i class="las la-search mr-2"></i>
                    Tìm kiếm
                  </button>
                </div>
                
                <div class="mt-2 p-4 bg-[#13ad75]/10 border border-[#13ad75]/30 rounded-xl">
                  <div class="flex items-start gap-3">
                    <i class="las la-info-circle text-[#13ad75] text-2xl mt-0.5"></i>
                    <div>
                      <h4 class="font-medium text-gray-600 mb-1 text-3xl">Hướng dẫn tra cứu</h4>
                      <p class="text-gray-600 font-medium text-xl">Mã đơn hàng thường có định dạng như: HD001, HD002... Bạn có thể tìm thấy mã này trong email xác nhận hoặc SMS.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Tab -->
          <div v-if="activeTab === 'account'" class="p-8">
            <div class="mb-2">
              <h2 class="text-6xl font-bold text-gray-900 mb-2">Thông tin tài khoản</h2>
              <p class="text-2xl text-gray-600">Quản lý thông tin cá nhân và cài đặt tài khoản</p>
            </div>

            <!-- Update Prompt -->
            <div v-if="showUpdatePrompt"
                 class="bg-[#13ad75]/10 border border-[#13ad75]/30 rounded-2xl p-6 mb-2 flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#13ad75] rounded-full flex items-center justify-center">
                  <i class="las la-exclamation text-white text-xl"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-600 mb-1 text-2xl">Cập nhật thông tin</h4>
                  <p class="text-gray-600 text-2xl">Vui lòng cập nhật thông tin để có trải nghiệm tốt hơn.</p>
                </div>
              </div>
              <button 
                class="px-6 py-3 bg-[#13ad75] text-white rounded-xl hover:shadow-lg hover:shadow-[#13ad75]/25 transition-all duration-200 font-medium transform hover:scale-105 text-2xl" 
                @click="updateAccountInfo">
                Cập nhật ngay
              </button>
            </div>

            <div class="space-y-8">
              <!-- Personal Information -->
              <div class="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                <h3 class="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
                  <i class="las la-user-circle text-[#13ad75] text-3xl mr-3"></i>
                  Thông tin cá nhân
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block texl-2xl font-semibold text-gray-700 mb-1">Họ và tên</label>
                    <input 
                      v-model.trim="fullName" 
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-xl"
                      :class="{ 'border-red-500 ring-red-500': errors.fullName }" 
                      @input="clearError('fullName')" />
                    <p v-if="errors.fullName" class="mt-2 text-red-600 texl-2xl flex items-center">
                      <i class="las la-exclamation-circle mr-1"></i>
                      {{ errors.fullName }}
                    </p>
                  </div>
                  
                  <div>
                    <label class="block texl-2xl font-semibold text-gray-700 mb-1">Số điện thoại</label>
                    <input 
                      v-model.trim="phone" 
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-xl"
                      :class="{ 'border-red-500 ring-red-500': errors.phone }" 
                      @input="clearError('phone')" />
                    <p v-if="errors.phone" class="mt-2 text-red-600 texl-2xl flex items-center">
                      <i class="las la-exclamation-circle mr-1"></i>
                      {{ errors.phone }}
                    </p>
                  </div>
                  
                  <div>
                    <label class="block texl-2xl font-semibold text-gray-700 mb-1">Giới tính</label>
                    <div class="flex gap-6">
                      <label class="flex items-center text-gray-700 cursor-pointer">
                        <input v-model="gender" type="radio" :value="true" class="mr-3 w-4 h-4 text-[#13ad75] focus:ring-[#13ad75]" />
                        <span class="font-medium text-xl">Nam</span>
                      </label>
                      <label class="flex items-center text-gray-700 cursor-pointer">
                        <input v-model="gender" type="radio" :value="false" class="mr-3 w-4 h-4 text-[#13ad75] focus:ring-[#13ad75]" />
                        <span class="font-medium text-xl">Nữ</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block texl-2xl font-semibold text-gray-700 mb-1">Ngày sinh</label>
                    <input 
                      v-model="birthDate" 
                      type="date"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13ad75] focus:border-transparent transition-all duration-200 text-xl" />
                  </div>
                  
                  <div>
                    <label class="block texl-2xl font-semibold text-gray-700 mb-1">Địa chỉ mặc định</label>
                    <input 
                      v-model="defaultAddress" 
                      type="text"
                      class="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-600 text-xl" 
                      disabled />
                  </div>
                  
                  <div>
                    <label class="block texl-2xl font-semibold text-gray-700 mb-1">Email</label>
                    <input 
                      v-model.trim="email" 
                      type="email"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-xl"
                      :class="{ 'border-red-500 ring-red-500': errors.email }" 
                      @input="clearError('email')" />
                    <p v-if="errors.email" class="mt-2 text-red-600 texl-2xl flex items-center">
                      <i class="las la-exclamation-circle mr-1"></i>
                      {{ errors.email }}
                    </p>
                  </div>
                </div>
                
                <div class="mt-4 flex justify-end">
                  <button
                    class="px-8 py-3 bg-[#13ad75] text-white rounded-xl hover:shadow-lg hover:shadow-[#13ad75]/25 transition-all duration-200 font-medium transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="isUpdating" 
                    @click="updateAccountInfo">
                    <i v-if="isUpdating" class="las la-spinner la-spin mr-2"></i>
                    <i v-else class="las la-save mr-2"></i>
                    {{ isUpdating ? 'Đang cập nhật...' : 'Cập nhật thông tin' }}
                  </button>
                </div>
              </div>

              <!-- Address Management -->
              <div class="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-3xl font-semibold text-gray-900 flex items-center">
                    <i class="las la-map-marker-alt text-[#13ad75] text-3xl mr-3"></i>
                    Sổ địa chỉ
                  </h3>
                  <div class="flex items-center gap-4">
                    <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full texl-2xl font-medium">
                      {{ addresses.length }} địa chỉ
                    </span>
                    <button
                      class="px-6 py-3 bg-[#13ad75] text-white rounded-xl hover:shadow-lg hover:shadow-[#13ad75]/25 transition-all duration-200 font-medium transform hover:scale-105 flex items-center"
                      @click="addNewAddress">
                      <i class="las la-plus mr-2"></i>
                      Thêm địa chỉ mới
                    </button>
                  </div>
                </div>

                <!-- Address Cards -->
                <div v-if="addresses.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div v-for="(address, index) in addresses" :key="address.id"
                       class="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
                       :class="index % 2 === 0 ? 'bg-[#13ad75]/5' : 'bg-[#002c69]/5'">
                    <div class="flex justify-between items-start mb-4">
                      <div class="flex items-start gap-4 flex-1">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                             :class="index % 2 === 0 ? 'bg-[#13ad75]/20 group-hover:bg-[#13ad75]/30' : 'bg-[#13ad75]/15 group-hover:bg-[#13ad75]/25'">
                          <i class="las la-map-marker-alt text-[#13ad75]"></i>
                        </div>
                        <p class="text-gray-800 leading-relaxed">{{ formatAddress(address) }}</p>
                      </div>
                      <span v-if="defaultAddressId === address.id"
                            class="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
                        Mặc định
                      </span>
                    </div>
                    
                    <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
                      <button v-if="defaultAddressId !== address.id"
                              class="flex items-center gap-2 px-4 py-2 texl-2xl text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200"
                              @click="setDefaultAddress(address.id)">
                        <i class="las la-check"></i>
                        Đặt mặc định
                      </button>
                      <button
                        class="flex items-center gap-2 px-4 py-2 texl-2xl text-[#13ad75] hover:text-[#13ad75] hover:bg-[#13ad75]/10 rounded-lg transition-all duration-200"
                        @click="editAddress(address.id)">
                        <i class="las la-edit"></i>
                        Sửa
                      </button>
                      <button
                        class="flex items-center gap-2 px-4 py-2 texl-2xl text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                        @click="deleteAddress(address.id)">
                        <i class="las la-trash"></i>
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>

                <div v-if="addresses.length === 0" class="text-center py-16 bg-[#13ad75]/5 rounded-2xl border-2 border-dashed border-gray-300">
                  <i class="las la-map-marker-alt text-6xl text-gray-300 mb-4"></i>
                  <h4 class="text-xl font-semibold text-gray-800 mb-2">Chưa có địa chỉ giao hàng</h4>
                  <p class="text-gray-600 mb-8">Thêm địa chỉ để việc đặt hàng trở nên thuận tiện hơn.</p>
                  <button
                    class="px-8 py-3 bg-[#13ad75] text-white rounded-xl hover:shadow-lg hover:shadow-[#13ad75]/25 transition-all duration-200 font-medium transform hover:scale-105"
                    @click="addNewAddress">
                    <i class="las la-plus mr-2"></i>
                    Thêm địa chỉ đầu tiên
                  </button>
                </div>
              </div>

              <!-- Security Settings -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                  <h3 class="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
                    <i class="las la-lock text-[#13ad75] text-3xl mr-3"></i>
                    Mật khẩu & Bảo mật
                  </h3>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between py-4 px-6 bg-gray-50 rounded-xl">
                      <div>
                        <h4 class="font-medium text-gray-900">Mật khẩu</h4>
                        <p class="texl-2xl text-gray-600">Cập nhật lần cuối: 16/10/2024 21:10</p>
                      </div>
                      <button class="px-4 py-2 text-[#002c69] hover:text-[#002c69] font-medium bg-[#002c69]/10 hover:bg-[#002c69]/20 rounded-lg transition-all duration-200">
                        Thay đổi
                      </button>
                    </div>
                    <div class="flex items-center justify-between py-4 px-6 bg-gray-50 rounded-xl">
                      <div>
                        <h4 class="font-medium text-gray-900">Xác thực 2 lớp</h4>
                        <p class="texl-2xl text-gray-600">Tăng cường bảo mật tài khoản</p>
                      </div>
                      <button class="px-4 py-2 text-gray-600 hover:text-[#13ad75] font-medium bg-gray-100 hover:bg-[#13ad75]/10 rounded-lg transition-all duration-200">
                        Bật
                      </button>
                    </div>
                  </div>
                </div>

                <div class="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                  <h3 class="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
                    <i class="las la-link text-[#13ad75] text-3xl mr-3"></i>
                    Tài khoản liên kết
                  </h3>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between py-4 px-6 bg-green-50 rounded-xl border border-green-200">
                      <div class="flex items-center gap-4">
                        <img src="https://cdn-static.smember.com.vn/_next/static/media/logo-google.b6f9570f.svg"
                             alt="Google" class="h-8 w-8" />
                        <div>
                          <h4 class="font-medium text-gray-900">Google</h4>
                          <p class="texl-2xl text-green-600">Đã liên kết</p>
                        </div>
                      </div>
                      <button class="px-4 py-2 text-red-600 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200">
                        Hủy liên kết
                      </button>
                    </div>
                    <div class="flex items-center justify-between py-4 px-6 bg-gray-50 rounded-xl">
                      <div class="flex items-center gap-4">
                        <img src="https://cdn-static.smember.com.vn/_next/static/media/logo-zalo.120d889f.svg"
                             alt="Zalo" class="h-8 w-8" />
                        <div>
                          <h4 class="font-medium text-gray-900">Zalo</h4>
                          <p class="texl-2xl text-gray-500">Chưa liên kết</p>
                        </div>
                      </div>
                      <button class="px-4 py-2 text-[#002c69] hover:text-[#002c69] font-medium bg-[#002c69]/10 hover:bg-[#002c69]/20 rounded-lg transition-all duration-200">
                        Liên kết
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <!-- Enhanced Modern Address Modal -->
      <div v-if="showAddressModal" class="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
        <div class="bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl w-full max-w-4xl shadow-2xl transform transition-all duration-300 scale-100 overflow-hidden">
          
          <!-- Modal Header with Gradient -->
          <div class="relative bg-gradient-to-r from-[#13ad75]/10 to-[#13ad75]/20 p-8 border-b border-white/20">
            <div class="absolute inset-0 bg-gradient-to-r from-[#13ad75]/5 to-transparent"></div>
            <div class="relative flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 bg-gradient-to-br from-[#13ad75] to-[#13ad75]/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <i class="las la-map-marker-alt text-white text-3xl"></i>
                </div>
                <div>
                  <h2 class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {{ isEditingAddress ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới' }}
                  </h2>
                  <p class="text-gray-600 text-xl mt-1">Vui lòng điền đầy đủ thông tin địa chỉ giao hàng</p>
                </div>
              </div>
              <button 
                class="w-12 h-12 bg-white/80 hover:bg-white backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg"
                @click="closeAddressModal">
                <i class="las la-times text-gray-600 text-xl"></i>
              </button>
            </div>
          </div>

          <!-- Modal Body with Step Design -->
          <div class="p-8 space-y-8">
            
            <!-- Step 1: Detailed Address -->
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-8 h-8 bg-gradient-to-br from-[#13ad75] to-[#13ad75]/80 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <h3 class="text-2xl font-semibold text-gray-800">Địa chỉ chi tiết</h3>
              </div>
              
              <div>
                <label class="block text-lg font-semibold text-gray-700 mb-3 flex items-center">
                  <i class="las la-home text-[#13ad75] mr-2"></i>
                  Số nhà, tên đường, khu vực
                </label>
                <div class="relative">
                  <input 
                    v-model.trim="addressForm.diaChiCuThe" 
                    type="text"
                    placeholder="Ví dụ: 123 Nguyễn Văn Linh, Khu phố 1..."
                    class="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13ad75]/50 focus:border-[#13ad75] transition-all duration-200 text-xl placeholder-gray-400"
                    :class="{ 'border-red-500 ring-red-500': addressErrors.diaChiCuThe }" 
                    @input="clearAddressError('diaChiCuThe')" />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-4">
                    <i class="las la-map-marker-alt text-gray-400"></i>
                  </div>
                </div>
                <p v-if="addressErrors.diaChiCuThe" class="mt-3 text-red-600 text-lg flex items-center bg-red-50 px-3 py-2 rounded-lg">
                  <i class="las la-exclamation-circle mr-2"></i>
                  {{ addressErrors.diaChiCuThe }}
                </p>
              </div>
            </div>

            <!-- Step 2: Administrative Divisions -->
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-8 h-8 bg-gradient-to-br from-[#13ad75] to-[#13ad75]/80 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <h3 class="text-2xl font-semibold text-gray-800">Thông tin hành chính</h3>
              </div>
              
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Province -->
                <div class="space-y-3">
                  <label class="block text-lg font-semibold text-gray-700 flex items-center">
                    <i class="las la-map text-[#13ad75] mr-2"></i>
                    Tỉnh/Thành phố
                  </label>
                  <div class="relative">
                    <select 
                      v-model="addressForm.thanhPhoCode"
                      class="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13ad75]/50 focus:border-[#13ad75] transition-all duration-200 text-xl appearance-none cursor-pointer"
                      :class="{ 'border-red-500 ring-red-500': addressErrors.thanhPho }" 
                      @change="fetchDistricts">
                      <option value="">Chọn Tỉnh/Thành phố</option>
                      <option v-for="province in provinces" :key="province.code" :value="province.code">
                        {{ province.name }}
                      </option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <i class="las la-chevron-down text-gray-400"></i>
                    </div>
                  </div>
                  <p v-if="addressErrors.thanhPho" class="text-red-600 text-lg flex items-center bg-red-50 px-3 py-2 rounded-lg">
                    <i class="las la-exclamation-circle mr-2"></i>
                    {{ addressErrors.thanhPho }}
                  </p>
                </div>
                
                <!-- District -->
                <div class="space-y-3">
                  <label class="block text-lg font-semibold text-gray-700 flex items-center">
                    <i class="las la-building text-[#13ad75] mr-2"></i>
                    Quận/Huyện
                  </label>
                  <div class="relative">
                    <select 
                      v-model="addressForm.quanCode"
                      class="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13ad75]/50 focus:border-[#13ad75] transition-all duration-200 text-xl appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      :class="{ 'border-red-500 ring-red-500': addressErrors.quan }" 
                      :disabled="!addressForm.thanhPhoCode"
                      @change="fetchWards">
                      <option value="">Chọn Quận/Huyện</option>
                      <option v-for="district in districts" :key="district.code" :value="district.code">
                        {{ district.name }}
                      </option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <i class="las la-chevron-down text-gray-400"></i>
                    </div>
                  </div>
                  <p v-if="addressErrors.quan" class="text-red-600 text-lg flex items-center bg-red-50 px-3 py-2 rounded-lg">
                    <i class="las la-exclamation-circle mr-2"></i>
                    {{ addressErrors.quan }}
                  </p>
                </div>
                
                <!-- Ward -->
                <div class="space-y-3">
                  <label class="block text-lg font-semibold text-gray-700 flex items-center">
                    <i class="las la-map-pin text-[#13ad75] mr-2"></i>
                    Phường/Xã
                  </label>
                  <div class="relative">
                    <select 
                      v-model="addressForm.phuongCode"
                      class="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#13ad75]/50 focus:border-[#13ad75] transition-all duration-200 text-xl appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      :class="{ 'border-red-500 ring-red-500': addressErrors.phuong }" 
                      :disabled="!addressForm.quanCode">
                      <option value="">Chọn Phường/Xã</option>
                      <option v-for="ward in wards" :key="ward.code" :value="ward.code">
                        {{ ward.name }}
                      </option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <i class="las la-chevron-down text-gray-400"></i>
                    </div>
                  </div>
                  <p v-if="addressErrors.phuong" class="text-red-600 text-lg flex items-center bg-red-50 px-3 py-2 rounded-lg">
                    <i class="las la-exclamation-circle mr-2"></i>
                    {{ addressErrors.phuong }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Help Section -->
            <div class="bg-gradient-to-r from-[#13ad75]/10 to-[#13ad75]/5 border border-[#13ad75]/20 rounded-2xl p-6">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 bg-[#13ad75]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i class="las la-info-circle text-[#13ad75] text-xl"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-2 text-xl">Lưu ý quan trọng</h4>
                  <ul class="text-gray-600 text-lg space-y-1">
                    <li>• Vui lòng điền chính xác địa chỉ để đảm bảo giao hàng thành công</li>
                    <li>• Địa chỉ này sẽ được sử dụng cho các đơn hàng tiếp theo</li>
                    <li>• Bạn có thể đặt làm địa chỉ mặc định sau khi lưu</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Modal Footer with Enhanced Buttons -->
          <div class="bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm p-8 border-t border-white/20">
            <div class="flex justify-end gap-4">
              <button
                class="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-200 font-semibold border border-gray-200 flex items-center gap-2 text-xl"
                @click="closeAddressModal">
                <i class="las la-times"></i>
                Hủy bỏ
              </button>
              <button
                class="px-8 py-4 bg-gradient-to-r from-[#13ad75] to-[#13ad75]/90 text-white rounded-xl hover:shadow-xl hover:shadow-[#13ad75]/25 transition-all duration-200 font-semibold transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 text-xl"
                :disabled="isSavingAddress" 
                @click="saveAddress">
                <i v-if="isSavingAddress" class="las la-spinner la-spin"></i>
                <i v-else class="las la-save"></i>
                {{ isSavingAddress ? 'Đang lưu địa chỉ...' : 'Lưu địa chỉ' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Prompt for Non-logged Users -->
    <div v-else class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div class="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-12 text-center max-w-md w-full mx-4">
        <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="las la-lock text-3xl text-blue-600"></i>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Đăng nhập tài khoản</h2>
        <p class="text-gray-600 mb-8">Bạn cần đăng nhập để xem thông tin tài khoản và đơn hàng của mình.</p>
        <button
          class="w-full px-8 py-4 bg-[#13ad75] text-white rounded-xl hover:bg-[#13ad75]/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          @click="$router.push('/login')">
          <i class="las la-sign-in-alt mr-2"></i>
          Đăng nhập ngay
        </button>
        <p class="text-gray-500 texl-2xl mt-6">
          Chưa có tài khoản? 
          <a href="/register" class="text-[#13ad75] hover:text-[#13ad75]/80 font-medium">Đăng ký tại đây</a>
        </p>
      </div>
    </div>

    <!-- ConfirmDialog Component -->
    <ConfirmDialog ref="confirmDialog" />
    
    <!-- ToastNotification Component -->
    <ToastNotification ref="toastNotification" />
  </div>
</template>

<script>
import axios from 'axios';
import mitt from 'mitt';
import ConfirmDialog from '~/components/base/ConfirmDialog.vue';
import ToastNotification from '~/components/base/ToastNotification.vue';

const emitter = mitt();

export default {
  components: {
    ConfirmDialog,
    ToastNotification
  },
  data() {
    return {
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
      activeTab: 'account',
      activeStatus: null,
      activeWarrantyStatus: 'all',
      customerName: localStorage.getItem('customerName') || 'Khách hàng',
      phoneNumber: localStorage.getItem('phoneNumber') || 'Chưa có số điện thoại',
      fullName: localStorage.getItem('fullName') || '',
      phone: localStorage.getItem('phoneNumber') || '',
      gender: localStorage.getItem('gender') ? JSON.parse(localStorage.getItem('gender')) : null,
      birthDate: localStorage.getItem('birthDate') || '',
      defaultAddress: localStorage.getItem('defaultAddress') || '',
      defaultAddressId: localStorage.getItem('defaultAddressId') || '',
      email: localStorage.getItem('email') || '',
      updateAt: localStorage.getItem('updateAt') || '',
      errors: {},
      isUpdating: false,
      showUpdatePrompt: false,
      totalOrders: 0,
      totalSpent: '0',
      addresses: [],
      showAddressModal: false,
      isEditingAddress: false,
      isSavingAddress: false,
      provinces: [],
      districts: [],
      wards: [],
      addressForm: {
        id: null,
        diaChiCuThe: '',
        phuongCode: '',
        quanCode: '',
        thanhPhoCode: ''
      },
      addressErrors: {},
      orderLookupId: '',
      tabs: [
        { id: 'overview', name: 'Tổng quan', icon: 'las la-home' },
        { id: 'history', name: 'Lịch sử mua hàng', icon: 'las la-history' },
        { id: 'order-lookup', name: 'Tra cứu đơn hàng', icon: 'las la-search-dollar' },
        { id: 'account', name: 'Thông tin tài khoản', icon: 'las la-user' },
      ],
      orderStatuses: [
        { id: null, name: 'Tất cả' },
        { id: 0, name: 'Chờ xác nhận' },
        { id: 1, name: 'Chờ giao hàng' },
        { id: 2, name: 'Đang giao' },
        { id: 3, name: 'Hoàn thành' },
        { id: 4, name: 'Đã hủy' },
      ],
      orders: [],
      currentPage: 0,
      totalPages: 0,
      totalElements: 0,
    };
  },
  computed: {
    filteredOrders() {
      return this.orders;
    },
  },
  watch: {
    activeTab(newTab) {
      if (newTab === 'history') {
        this.fetchOrders();
      }
    },
    activeStatus() {
      this.fetchOrders();
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      this.fetchAccountInfo();
      this.fetchAddresses();
      this.fetchProvinces();
      if (this.activeTab === 'history') {
        this.fetchOrders();
      }
    } else {
      this.$router.push('/login');
    }
  },

  methods: {
    async lookupOrder() {
      if (!this.orderLookupId.trim()) {
        this.$refs.confirmDialog.show({
          type: 'warning',
          title: 'Thông báo',
          message: 'Vui lòng nhập mã đơn hàng.',
          confirmText: 'Đồng ý',
          cancelText: 'Đóng',
          onConfirm: () => {},
          onCancel: () => {}
        });
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/api/hoa-don/ma/${this.orderLookupId.trim()}`);
        const orderId = response.data.id;
        this.$router.push(`/invoice-status?orderId=${orderId}`);
      } catch (error) {
        console.error('Lỗi khi tra cứu đơn hàng:', error);
        this.$refs.confirmDialog.show({
          type: 'error',
          title: 'Lỗi tra cứu',
          message: 'Không tìm thấy đơn hàng với mã đã cho.',
          confirmText: 'Đồng ý',
          cancelText: 'Đóng',
          onConfirm: () => {},
          onCancel: () => {}
        });
      }
    },
    async fetchOrders(page = 0) {
      try {
        const idKhachHang = localStorage.getItem('customerId');
        if (!idKhachHang) {
          console.error('Không tìm thấy ID khách hàng trong localStorage');
          return;
        }

        const params = {
          page: page,
          size: 5,
          idKhachHang: idKhachHang,
          trangThai: this.activeStatus,
          startDate: this.startDate ? new Date(this.startDate).toISOString() : null,
          endDate: this.endDate ? new Date(this.endDate).toISOString() : null,
          deleted: false
        };

        const response = await axios.get('http://localhost:8080/api/hoa-don/my-orders', { params });

        this.orders = response.data.content;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.number;
        this.totalElements = response.data.totalElements;
        this.totalOrders = response.data.totalElements;

      } catch (error) {
        console.error('Lỗi khi lấy lịch sử đơn hàng:', error);
        this.$refs.confirmDialog.show({
          type: 'error',
          title: 'Lỗi tải dữ liệu',
          message: error.response?.data?.error || 'Lỗi khi lấy lịch sử đơn hàng',
          confirmText: 'Đồng ý',
          cancelText: 'Đóng',
          onConfirm: () => {},
          onCancel: () => {}
        });
      }
    },
    getStatusNameById(statusId) {
      const status = this.orderStatuses.find(s => s.id === statusId);
      return status ? status.name : 'Không xác định';
    },
    formatCurrency(value) {
      if (!value) return '0 VNĐ';
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    },
    goToPage(page) {
      if (page >= 0 && page < this.totalPages) {
        this.fetchOrders(page);
      }
    },
    async handleLogout() {
      try {
        localStorage.removeItem('customerId');
        localStorage.removeItem('accountId');
        localStorage.removeItem('customerName');
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('fullName');
        localStorage.removeItem('gender');
        localStorage.removeItem('birthDate');
        localStorage.removeItem('defaultAddress');
        localStorage.removeItem('defaultAddressId');
        localStorage.removeItem('email');
        localStorage.removeItem('updateAt');
        localStorage.setItem('isLoggedIn', 'false');

        this.isLoggedIn = false;
        this.customerName = 'Khách hàng';
        this.phoneNumber = 'Chưa có số điện thoại';
        this.fullName = '';
        this.phone = '';
        this.gender = null;
        this.birthDate = '';
        this.defaultAddress = '';
        this.defaultAddressId = '';
        this.email = '';
        this.updateAt = '';
        this.addresses = [];
        this.showUpdatePrompt = true;

        emitter.emit('loginStatusChanged', {
          isLoggedIn: false,
          customerName: '',
        });

        this.$router.push('/login');
      } catch (error) {
        console.error('Lỗi khi đăng xuất:', error);
        this.$refs.confirmDialog.show({
          type: 'error',
          title: 'Lỗi đăng xuất',
          message: 'Lỗi khi đăng xuất',
          confirmText: 'Đồng ý',
          cancelText: 'Đóng',
          onConfirm: () => {},
          onCancel: () => {}
        });
      }
    },
    validateForm() {
      this.errors = {};
      if (!this.fullName) this.errors.fullName = 'Họ và tên không được để trống';
      if (!this.phone) this.errors.phone = 'Số điện thoại không được để trống';
      else if (!/^\d{10,11}$/.test(this.phone)) this.errors.phone = 'Số điện thoại không hợp lệ';
      if (this.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) this.errors.email = 'Email không hợp lệ';
      return Object.keys(this.errors).length === 0;
    },
    validateAddressForm() {
      this.addressErrors = {};
      if (!this.addressForm.diaChiCuThe) this.addressErrors.diaChiCuThe = 'Địa chỉ cụ thể không được để trống';
      if (!this.addressForm.thanhPhoCode) this.addressErrors.thanhPho = 'Thành phố/Tỉnh không được để trống';
      if (!this.addressForm.quanCode) this.addressErrors.quan = 'Quận/Huyện không được để trống';
      if (!this.addressForm.phuongCode) this.addressErrors.phuong = 'Phường/Xã không được để trống';
      return Object.keys(this.addressErrors).length === 0;
    },
    clearError(field) {
      if (this.errors[field]) delete this.errors[field];
    },
    clearAddressError(field) {
      if (this.addressErrors[field]) delete this.addressErrors[field];
    },
    formatDate(date) {
      if (!date) return 'Chưa cập nhật';
      const d = new Date(date);
      return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    },
    async fetchAccountInfo() {
      try {
        const idKhachHang = localStorage.getItem('customerId');
        if (!idKhachHang) {
          console.error('Không tìm thấy ID khách hàng trong localStorage');
          this.showUpdatePrompt = true;
          return;
        }
        const response = await axios.get(`http://localhost:8080/tai-khoan/thong-tin-khach-hang/${idKhachHang}`);
        const { hoTen, soDienThoai, gioiTinh, ngaySinh, diaChiMacDinh, email, updateAt } = response.data;

        this.fullName = hoTen || this.fullName || '';
        this.phone = soDienThoai || this.phone || '';
        this.gender = gioiTinh !== null ? gioiTinh : null;
        this.birthDate = ngaySinh ? new Date(ngaySinh).toISOString().split('T')[0] : '';
        this.defaultAddress = diaChiMacDinh ? this.formatAddress(diaChiMacDinh) : '';
        this.defaultAddressId = diaChiMacDinh ? diaChiMacDinh.id : '';
        this.email = email || this.email || '';
        this.updateAt = updateAt ? new Date(updateAt).toISOString() : '';
        this.customerName = hoTen || this.fullName || localStorage.getItem('customerName') || 'Khách hàng';
        this.phoneNumber = soDienThoai || this.phone || localStorage.getItem('phoneNumber') || 'Chưa có số điện thoại';
        this.showUpdatePrompt = !hoTen || !soDienThoai;

        localStorage.setItem('fullName', this.fullName);
        localStorage.setItem('phoneNumber', this.phone);
        localStorage.setItem('gender', JSON.stringify(this.gender));
        localStorage.setItem('birthDate', this.birthDate);
        localStorage.setItem('defaultAddress', this.defaultAddress);
        localStorage.setItem('defaultAddressId', this.defaultAddressId);
        localStorage.setItem('email', this.email);
        localStorage.setItem('customerName', this.customerName);
        localStorage.setItem('updateAt', this.updateAt);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin khách hàng:', error);
        this.showUpdatePrompt = true;
        this.$refs.confirmDialog.show({
          type: 'error',
          title: 'Lỗi tải thông tin',
          message: error.response?.data || 'Lỗi khi lấy thông tin khách hàng',
          confirmText: 'Đồng ý',
          cancelText: 'Đóng',
          onConfirm: () => {},
          onCancel: () => {}
        });
      }
    },
    async fetchAddresses() {
      try {
        const idKhachHang = localStorage.getItem('customerId');
        if (!idKhachHang) {
          console.error('Không tìm thấy ID khách hàng trong localStorage');
          return;
        }
        const response = await axios.get(`http://localhost:8080/khach-hang/getByKhachHang/${idKhachHang}`);
        this.addresses = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách địa chỉ:', error);
        this.$refs.confirmDialog.show({
          type: 'error',
          title: 'Lỗi tải địa chỉ',
          message: error.response?.data?.error || 'Lỗi khi lấy danh sách địa chỉ',
          confirmText: 'Đồng ý',
          cancelText: 'Đóng',
          onConfirm: () => {},
          onCancel: () => {}
        });
      }
    },
    async setDefaultAddress(addressId) {
      try {
        const response = await axios.put(`http://localhost:8080/khach-hang/setDefault/${addressId}`, {
          macDinh: true
        });
        this.defaultAddressId = addressId;
        this.defaultAddress = this.addresses.find(addr => addr.id === addressId);
        this.defaultAddress = this.defaultAddress ? this.formatAddress(this.defaultAddress) : '';
        localStorage.setItem('defaultAddress', this.defaultAddress);
        localStorage.setItem('defaultAddressId', this.defaultAddressId);
        await this.fetchAccountInfo();
        this.$refs.toastNotification.addToast({
          type: 'success',
          message: response.data || 'Cập nhật địa chỉ mặc định thành công!'
        });
      } catch (error) {
        console.error('Lỗi khi đặt địa chỉ mặc định:', error);
        this.$refs.toastNotification.addToast({
          type: 'error',
          message: error.response?.data || 'Lỗi khi đặt địa chỉ mặc định'
        });
      }
    },
    async fetchProvinces() {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/v1/?depth=1');
        this.provinces = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tỉnh/thành phố:', error);
        this.$refs.confirmDialog.show({
          type: 'error',
          title: 'Lỗi tải dữ liệu',
          message: 'Không thể tải danh sách tỉnh/thành phố',
          confirmText: 'Đồng ý',
          cancelText: 'Đóng',
          onConfirm: () => {},
          onCancel: () => {}
        });
      }
    },
    async fetchDistricts() {
      this.addressForm.quanCode = '';
      this.addressForm.phuongCode = '';
      this.districts = [];
      this.wards = [];
      this.clearAddressError('quan');
      this.clearAddressError('phuong');

      if (!this.addressForm.thanhPhoCode) return;

      try {
        const response = await axios.get(`https://provinces.open-api.vn/api/v1/p/${this.addressForm.thanhPhoCode}?depth=2`);
        this.districts = response.data.districts || [];
      } catch (error) {
        console.error('Lỗi khi lấy danh sách quận/huyện:', error);
        this.$refs.confirmDialog.show({
          type: 'error',
          title: 'Lỗi tải dữ liệu',
          message: 'Không thể tải danh sách quận/huyện',
          confirmText: 'Đồng ý',
          cancelText: 'Đóng',
          onConfirm: () => {},
          onCancel: () => {}
        });
      }
    },
    async fetchWards() {
      this.addressForm.phuongCode = '';
      this.wards = [];
      this.clearAddressError('phuong');

      if (!this.addressForm.quanCode) return;

      try {
        const response = await axios.get(`https://provinces.open-api.vn/api/v1/d/${this.addressForm.quanCode}?depth=2`);
        this.wards = response.data.wards || [];
      } catch (error) {
        console.error('Lỗi khi lấy danh sách phường/xã:', error);
        this.$refs.confirmDialog.show({
          type: 'error',
          title: 'Lỗi tải dữ liệu',
          message: 'Không thể tải danh sách phường/xã',
          confirmText: 'Đồng ý',
          cancelText: 'Đóng',
          onConfirm: () => {},
          onCancel: () => {}
        });
      }
    },
    addNewAddress() {
      this.isEditingAddress = false;
      this.addressForm = {
        id: null,
        diaChiCuThe: '',
        phuongCode: '',
        quanCode: '',
        thanhPhoCode: ''
      };
      this.addressErrors = {};
      this.districts = [];
      this.wards = [];
      this.showAddressModal = true;
    },
    editAddress(addressId) {
      const address = this.addresses.find(addr => addr.id === addressId);
      if (!address) {
        this.$refs.confirmDialog.show({
          type: 'warning',
          title: 'Thông báo',
          message: 'Không tìm thấy địa chỉ',
          confirmText: 'Đồng ý',
          cancelText: 'Đóng',
          onConfirm: () => {},
          onCancel: () => {}
        });
        return;
      }
      this.isEditingAddress = true;
      this.addressForm = {
        id: address.id,
        diaChiCuThe: address.diaChiCuThe || '',
        phuongCode: address.phuongCode || '',
        quanCode: address.quanCode || '',
        thanhPhoCode: address.thanhPhoCode || ''
      };
      this.addressErrors = {};
      this.showAddressModal = true;

      if (this.addressForm.thanhPhoCode) {
        this.fetchDistricts();
      }
      if (this.addressForm.quanCode) {
        this.fetchWards();
      }
    },
    closeAddressModal() {
      this.showAddressModal = false;
      this.addressForm = { id: null, diaChiCuThe: '', phuongCode: '', quanCode: '', thanhPhoCode: '' };
      this.addressErrors = {};
      this.districts = [];
      this.wards = [];
      this.isEditingAddress = false;
    },
    async saveAddress() {
      if (!this.validateAddressForm()) return;

      this.isSavingAddress = true;
      try {
        const idKhachHang = localStorage.getItem('customerId');
        if (!idKhachHang) {
          this.$refs.confirmDialog.show({
            type: 'warning',
            title: 'Thông báo',
            message: 'Không tìm thấy ID khách hàng',
            confirmText: 'Đồng ý',
            cancelText: 'Đóng',
            onConfirm: () => {},
            onCancel: () => {}
          });
          this.isSavingAddress = false;
          return;
        }

        const province = this.provinces.find(p => p.code === this.addressForm.thanhPhoCode);
        const district = this.districts.find(d => d.code === this.addressForm.quanCode);
        const ward = this.wards.find(w => w.code === this.addressForm.phuongCode);

        const payload = {
          diaChiCuThe: this.addressForm.diaChiCuThe,
          phuong: ward ? ward.name : '',
          quan: district ? district.name : '',
          thanhPho: province ? province.name : '',
          phuongCode: this.addressForm.phuongCode,
          quanCode: this.addressForm.quanCode,
          thanhPhoCode: this.addressForm.thanhPhoCode,
          idKhachHang: parseInt(idKhachHang)
        };

        if (this.isEditingAddress) {
          const response = await axios.put(`http://localhost:8080/khach-hang/updateDchi/${this.addressForm.id}`, payload);
          this.$refs.toastNotification.addToast({
            type: 'success',
            message: response.data || 'Cập nhật địa chỉ thành công!'
          });
        } else {
          const response = await axios.post(`http://localhost:8080/khach-hang/addDchiKhachHang`, payload);
          this.addresses.push(response.data);
          this.$refs.toastNotification.addToast({
            type: 'success',
            message: 'Thêm địa chỉ thành công!'
          });
        }

        await this.fetchAddresses();
        if (this.defaultAddressId === this.addressForm.id || !this.defaultAddressId) {
          await this.fetchAccountInfo();
        }
        this.closeAddressModal();
      } catch (error) {
        console.error('Lỗi khi lưu địa chỉ:', error);
        this.$refs.toastNotification.addToast({
          type: 'error',
          message: error.response?.data || 'Lỗi khi lưu địa chỉ'
        });
      } finally {
        this.isSavingAddress = false;
      }
    },
    async deleteAddress(addressId) {
      this.$refs.confirmDialog.show({
        type: 'danger',
        title: 'Xác nhận xóa',
        message: 'Bạn có chắc muốn xóa địa chỉ này?',
        confirmText: 'Xóa',
        cancelText: 'Hủy',
        onConfirm: async () => {
          try {
            await axios.delete(`http://localhost:8080/dia-chi-khach-hang/delete/${addressId}`);
            this.addresses = this.addresses.filter((address) => address.id !== addressId);
            if (this.defaultAddressId === addressId) {
              this.defaultAddressId = '';
              this.defaultAddress = '';
              localStorage.setItem('defaultAddress', '');
              localStorage.setItem('defaultAddressId', '');
              await this.updateAccountInfo();
            }
            this.$refs.toastNotification.addToast({
              type: 'success',
              message: 'Xóa địa chỉ thành công'
            });
          } catch (error) {
            console.error('Lỗi khi xóa địa chỉ:', error);
            this.$refs.toastNotification.addToast({
              type: 'error',
              message: error.response?.data?.error || 'Lỗi khi xóa địa chỉ'
            });
          }
        },
        onCancel: () => {}
      });
    },
    async updateAccountInfo() {
      if (!this.validateForm()) return;

      this.isUpdating = true;
      try {
        const idKhachHang = localStorage.getItem('customerId');
        if (!idKhachHang) {
          this.$refs.confirmDialog.show({
            type: 'warning',
            title: 'Thông báo',
            message: 'Không tìm thấy ID khách hàng',
            confirmText: 'Đồng ý',
            cancelText: 'Đóng',
            onConfirm: () => {},
            onCancel: () => {}
          });
          return;
        }

        const payload = {
          hoTen: this.fullName,
          soDienThoai: this.phone,
          gioiTinh: this.gender,
          ngaySinh: this.birthDate || null,
          idDiaChiMacDinh: this.defaultAddressId || null,
          email: this.email || null,
        };

        const response = await axios.put(`http://localhost:8080/khach-hang/update/${idKhachHang}`, payload);

        const { hoTen, soDienThoai, gioiTinh, ngaySinh, idDiaChiMacDinh, email, updateAt } = response.data;
        this.fullName = hoTen || this.fullName;
        this.phone = soDienThoai || this.phone;
        this.gender = gioiTinh !== null ? gioiTinh : this.gender;
        this.birthDate = ngaySinh ? new Date(ngaySinh).toISOString().split('T')[0] : this.birthDate;
        this.defaultAddressId = idDiaChiMacDinh || this.defaultAddressId;
        this.email = email || this.email;
        this.updateAt = updateAt ? new Date(updateAt).toISOString() : this.updateAt;
        this.customerName = hoTen || this.fullName || 'Khách hàng';
        this.phoneNumber = soDienThoai || this.phone;
        this.showUpdatePrompt = !hoTen || !soDienThoai;

        localStorage.setItem('fullName', this.fullName);
        localStorage.setItem('phoneNumber', this.phone);
        localStorage.setItem('gender', JSON.stringify(this.gender));
        localStorage.setItem('birthDate', this.birthDate);
        localStorage.setItem('defaultAddressId', this.defaultAddressId);
        localStorage.setItem('email', this.email);
        localStorage.setItem('customerName', this.customerName);
        localStorage.setItem('updateAt', this.updateAt);

        emitter.emit('loginStatusChanged', {
          isLoggedIn: true,
          customerName: this.customerName,
        });

        this.$refs.toastNotification.addToast({
          type: 'success',
          message: 'Cập nhật thông tin thành công'
        });
      } catch (error) {
        console.error('Lỗi khi cập nhật thông tin:', error);
        const errorMessage = error.response?.data || 'Lỗi khi cập nhật thông tin';
        this.errors.server = errorMessage;
        this.$refs.toastNotification.addToast({
          type: 'error',
          message: errorMessage
        });
      } finally {
        this.isUpdating = false;
      }
    },
    formatAddress(address) {
      if (!address) return '';
      const { diaChiCuThe, phuong, quan, thanhPho } = address;
      return [diaChiCuThe, phuong, quan, thanhPho].filter(Boolean).join(', ');
    },
    async cancelOrder(orderId) {
      this.$refs.confirmDialog.show({
        type: 'danger',
        title: 'Xác nhận hủy đơn hàng',
        message: 'Bạn có chắc muốn hủy đơn hàng này?',
        confirmText: 'Hủy đơn hàng',
        cancelText: 'Không hủy',
        onConfirm: async () => {
          try {
            await axios.put(`http://localhost:8080/api/hoa-don/${orderId}/cancel-client`);
            this.$refs.toastNotification.addToast({
              type: 'success',
              message: 'Hủy đơn hàng thành công!'
            });
            this.fetchOrders(this.currentPage);
          } catch (error) {
            console.error('Lỗi khi hủy đơn hàng:', error);
            this.$refs.toastNotification.addToast({
              type: 'error',
              message: error.response?.data?.message || 'Lỗi khi hủy đơn hàng'
            });
          }
        },
        onCancel: () => {}
      });
    },
  },
};
</script>

<style scoped>
/* Modern glassmorphism effects */
.backdrop-blur-xl {
  backdrop-filter: blur(20px);
}

/* Enhanced transitions and animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.5s ease-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Responsive typography */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .text-6xl {
    font-size: 2rem;
  }
  
  .text-3xl {
    font-size: 1.75rem;
  }
  
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}

/* Enhanced focus states */
input:focus, select:focus, textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Loading spinner */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.la-spin {
  animation: spin 1s linear infinite;
}

/* Gradient text effects */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced button hover effects */
button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Card hover effects */
.group:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Status badge animations */
.status-badge {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .flex {
    flex-direction: column;
  }
  
  .gap-8 {
    gap: 1rem;
  }
  
  aside {
    width: 100%;
    position: static;
  }
  
  .sticky {
    position: static;
  }
}</style>