<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <div v-if="isLoggedIn" class="container mx-auto px-4 py-6">
      <!-- Profile Header -->
      <header class="bg-white shadow-sm rounded-2xl p-6 mb-6 flex items-center gap-6">
        <img src="/assets/images/icons/ava-profile.png" class="h-24 w-24 rounded-full object-cover" alt="Avatar" />
        <div class="flex-1 flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ customerName }}</h1>
            <p class="text-lg text-gray-600">{{ phoneNumber }}</p>
            <p class="text-sm text-gray-500">Cập nhật: {{ formatDate(updateAt) }}</p>
          </div>
          <div class="flex gap-12">
            <div class="text-center">
              <i class="las la-shopping-cart text-3xl text-blue-600 mb-2"></i>
              <p class="text-2xl font-semibold text-blue-600">{{ totalOrders }}</p>
              <p class="text-base text-gray-600">Tổng đơn hàng</p>
            </div>
            <div class="text-center">
              <i class="las la-money-bill-wave text-3xl text-blue-600 mb-2"></i>
              <p class="text-2xl font-semibold text-blue-600">{{ totalSpent }} VNĐ</p>
              <p class="text-base text-gray-600">Tổng chi tiêu</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <div class="flex gap-6">
        <!-- Sidebar -->
        <aside class="w-84 bg-white shadow-sm rounded-2xl p-4">
          <nav class="space-y-1">
            <button v-for="tab in tabs" :key="tab.id"
              class="w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200 flex items-center"
              :class="{ 'bg-blue-50 text-blue-700 font-medium': activeTab === tab.id }" @click="activeTab = tab.id">
              <i :class="tab.icon" class="mr-3 text-xl"></i>
              {{ tab.name }}
            </button>
            <button
              class="w-full px-4 py-3 text-left text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-200 flex items-center"
              @click="handleLogout">
              <i class="las la-sign-out-alt mr-3 text-xl"></i>
              Đăng xuất
            </button>
          </nav>
        </aside>

        <!-- Content Area -->
        <main class="flex-1 bg-white shadow-sm rounded-2xl p-6 overflow-y-auto">
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'" class="space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-gray-50 p-6 rounded-xl text-center">
                <h3 class="text-xl font-medium text-gray-800 mb-3">Đơn hàng gần đây</h3>
                <p class="text-gray-600 mb-4">Bạn chưa có đơn hàng nào hôm nay? Hãy bắt đầu mua sắm!</p>
                <button
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
                  Đăng ký ngay
                </button>
              </div>
              <div class="bg-gray-50 p-6 rounded-xl text-center">
                <h3 class="text-xl font-medium text-gray-800 mb-3">Ưu đãi của bạn</h3>
                <p class="text-gray-600 mb-4">Bạn chưa có ưu đãi nào</p>
                <button
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
                  Đăng ký ngay
                </button>
              </div>
              <div class="lg:col-span-2 bg-gray-50 p-6 rounded-xl text-center">
                <h3 class="text-xl font-medium text-gray-800 mb-3">Sản phẩm yêu thích</h3>
                <p class="text-gray-600 mb-4">Bạn chưa có sản phẩm yêu thích? Hãy khám phá ngay!</p>
                <button
                  class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 font-medium">
                  Xem sản phẩm
                </button>
              </div>
            </div>
          </div>

          <!-- Order History Tab -->
          <div v-if="activeTab === 'history'" class="space-y-6">
            <div class="flex gap-6 border-b border-gray-200 pb-2 overflow-x-auto">
              <button v-for="status in orderStatuses" :key="status.id"
                class="px-6 py-2 text-gray-700 hover:text-blue-700 whitespace-nowrap transition-colors duration-200"
                :class="{ 'text-blue-700 font-medium border-b-2 border-blue-600': activeStatus === status.id }"
                @click="activeStatus = status.id">
                {{ status.name }}
              </button>
            </div>
            <div class="overflow-x-auto border border-gray-200 rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Mã đơn hàng</th>
                    <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Ngày đặt</th>
                    <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Trạng thái</th>
                    <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Tổng tiền</th>
                    <th class="py-3 px-6 text-left text-sm font-medium text-gray-700">Tra cứu</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
                    <td class="py-4 px-6">{{ order.ma }}</td>
                    <td class="py-4 px-6">{{ formatDate(order.ngayTao) }}</td>
                    <td class="py-4 px-6">
                      <span v-if="order.trangThai === 0">{{ getStatusNameById(order.trangThai) }} - {{ formatDate(order.ngayTao) }}</span>
                      <span v-else>{{ getStatusNameById(order.trangThai) }}</span>
                    </td>
                    <td class="py-4 px-6">{{ formatCurrency(order.tongTienSauGiam) }}</td>
                    <td class="py-4 px-6">
                      <NuxtLink
                        class="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                        :to="'/invoice-status?orderId=' + order.id">
                        Tra cứu
                      </NuxtLink>
                      <button
                        v-if="order.trangThai === 0"
                        @click="cancelOrder(order.id)"
                        class="ml-2 px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 font-medium">
                        Hủy đơn
                      </button>
                    </td>
                  </tr>
                  <tr v-if="filteredOrders.length === 0">
                    <td colspan="5" class="py-6 text-center text-gray-500">Chưa có đơn hàng nào</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Pagination -->
            <div class="flex justify-center items-center gap-4 mt-4">
              <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 0"
                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50">
                Trước
              </button>
              <span class="text-gray-700">Trang {{ currentPage + 1 }} / {{ totalPages }}</span>
              <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages - 1"
                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50">
                Sau
              </button>
            </div>
            <p class="text-center text-gray-500 mt-4">Hiển thị {{ filteredOrders.length }} / {{ totalElements }} đơn
              hàng</p>
          </div>

          

          <!-- Order Lookup Tab -->
          <div v-if="activeTab === 'order-lookup'" class="space-y-6">
            <h2 class="text-xl font-medium text-gray-800">Tra cứu đơn hàng</h2>
            <div class="flex gap-4">
              <input v-model="orderLookupId" type="text" placeholder="Nhập mã đơn hàng" class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600" @keyup.enter="lookupOrder" />
              <button @click="lookupOrder" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
                Tìm kiếm
              </button>
            </div>
          </div>

          <!-- Account Tab -->
          <div v-if="activeTab === 'account'" class="space-y-6">
            <div v-if="showUpdatePrompt"
              class="bg-blue-100 text-blue-800 p-4 rounded-lg flex justify-between items-center">
              <span class="font-medium">Vui lòng cập nhật thông tin để có trải nghiệm tốt hơn.</span>
              <button class="text-blue-800 font-medium underline hover:no-underline" @click="updateAccountInfo">Cập
                nhật</button>
            </div>
            <div class="bg-gray-50 p-6 rounded-xl">
              <h2 class="text-xl font-medium text-gray-800 mb-6">Thông tin cá nhân</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col">
                  <label class="text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                  <input v-model.trim="fullName" type="text"
                    class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    :class="{ 'border-red-600': errors.fullName }" @input="clearError('fullName')" />
                  <p v-if="errors.fullName" class="mt-1 text-red-600 text-sm">{{ errors.fullName }}</p>
                </div>
                <div class="flex flex-col">
                  <label class="text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                  <input v-model.trim="phone" type="text"
                    class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    :class="{ 'border-red-600': errors.phone }" @input="clearError('phone')" />
                  <p v-if="errors.phone" class="mt-1 text-red-600 text-sm">{{ errors.phone }}</p>
                </div>
                <div class="flex flex-col">
                  <label class="text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                  <div class="flex gap-6">
                    <label class="flex items-center text-gray-700">
                      <input v-model="gender" type="radio" :value="true" class="mr-2 focus:ring-blue-600" />
                      Nam
                    </label>
                    <label class="flex items-center text-gray-700">
                      <input v-model="gender" type="radio" :value="false" class="mr-2 focus:ring-blue-600" />
                      Nữ
                    </label>
                  </div>
                </div>
                <div class="flex flex-col">
                  <label class="text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
                  <input v-model="birthDate" type="date"
                    class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div class="flex flex-col">
                  <label class="text-sm font-medium text-gray-700 mb-2">Địa chỉ mặc định</label>
                  <input v-model="defaultAddress" type="text"
                    class="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-600" disabled />
                </div>
                <div class="flex flex-col">
                  <label class="text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input v-model.trim="email" type="email"
                    class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    :class="{ 'border-red-600': errors.email }" @input="clearError('email')" />
                  <p v-if="errors.email" class="mt-1 text-red-600 text-sm">{{ errors.email }}</p>
                </div>
              </div>
              <div class="mt-6 flex justify-end">
                <button
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                  :disabled="isUpdating" @click="updateAccountInfo">
                  {{ isUpdating ? 'Đang cập nhật...' : 'Cập nhật thông tin' }}
                </button>
              </div>
            </div>
            <div class="bg-gray-50 p-6 rounded-xl">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-medium text-gray-800">Sổ địa chỉ</h2>
                <span class="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{{ addresses.length }} địa
                  chỉ</span>
              </div>

              <!-- Address Card Slider -->
              <div v-if="addresses.length > 0" class="relative">
                <div class="flex overflow-x-auto pb-4 -mx-2 scrollbar-hide" ref="slider">
                  <div v-for="address in addresses" :key="address.id"
                    class="flex-none mx-2 bg-white rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-shadow duration-300"
                    style="width: 1230px;">
                    <div class="flex justify-between items-start mb-4">
                      <div class="flex items-start gap-4 flex-1">
                        <svg class="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p class="text-gray-800 leading-relaxed">{{ formatAddress(address) }}</p>
                      </div>
                      <span v-if="defaultAddressId === address.id"
                        class="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                        Mặc định
                      </span>
                    </div>
                    <div class="flex justify-end gap-4 pt-4 border-t border-gray-200">
                      <button v-if="defaultAddressId !== address.id"
                        class="flex items-center gap-1 text-sm text-green-600 hover:text-green-700 transition-colors duration-200"
                        @click="setDefaultAddress(address.id)">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Đặt mặc định
                      </button>
                      <button
                        class="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                        @click="editAddress(address.id)">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Sửa
                      </button>
                      <button
                        class="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition-colors duration-200"
                        @click="deleteAddress(address.id)">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Navigation Arrows -->
                <button v-if="addresses.length > 3" @click="scrollSlider(-1)"
                  class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button v-if="addresses.length > 3" @click="scrollSlider(1)"
                  class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div v-if="addresses.length === 0" class="text-center py-12 bg-white rounded-lg border border-gray-200">
                <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 class="text-lg font-medium text-gray-800 mb-2">Chưa có địa chỉ giao hàng</h3>
                <p class="text-gray-600 mb-6">Thêm địa chỉ để việc đặt hàng trở nên thuận tiện hơn.</p>
                <button
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
                  @click="addNewAddress">
                  Thêm địa chỉ mới
                </button>
              </div>

              <button v-if="addresses.length > 0"
                class="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium flex items-center justify-center gap-2"
                @click="addNewAddress">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Thêm địa chỉ mới
              </button>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div class="bg-gray-50 p-6 rounded-xl">
                <h2 class="text-xl font-medium text-gray-800 mb-4">Mật khẩu</h2>
                <p class="text-gray-600 mb-4">Cập nhật lần cuối: 16/10/2024 21:10</p>
                <button class="text-blue-600 font-medium underline hover:no-underline">Thay đổi mật khẩu</button>
              </div>
              <div class="bg-gray-50 p-6 rounded-xl">
                <h2 class="text-xl font-medium text-gray-800 mb-4">Tài khoản liên kết</h2>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <img src="https://cdn-static.smember.com.vn/_next/static/media/logo-google.b6f9570f.svg"
                        alt="Google Icon" class="h-5 w-5" />
                      <span class="text-gray-700">Google - Đã liên kết</span>
                    </div>
                    <button class="text-red-600 font-medium underline hover:no-underline">Hủy liên kết</button>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <img src="https://cdn-static.smember.com.vn/_next/static/media/logo-zalo.120d889f.svg"
                        alt="Zalo Icon" class="h-5 w-5" />
                      <span class="text-gray-700">Zalo</span>
                    </div>
                    <button class="text-blue-600 font-medium underline hover:no-underline">Liên kết</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <!-- Address Modal -->
      <div v-if="showAddressModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
          <h2 class="text-xl font-medium text-gray-800 mb-6">{{ isEditingAddress ? 'Sửa địa chỉ' : 'Thêm địa chỉ mới' }}
          </h2>
          <div class="space-y-4">
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-2">Địa chỉ cụ thể</label>
              <input v-model.trim="addressForm.diaChiCuThe" type="text"
                class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                :class="{ 'border-red-600': addressErrors.diaChiCuThe }" @input="clearAddressError('diaChiCuThe')" />
              <p v-if="addressErrors.diaChiCuThe" class="mt-1 text-red-600 text-sm">{{ addressErrors.diaChiCuThe }}</p>
            </div>
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-2">Thành phố/Tỉnh</label>
              <select v-model="addressForm.thanhPhoCode"
                class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                :class="{ 'border-red-600': addressErrors.thanhPho }" @change="fetchDistricts">
                <option value="">Chọn Thành phố/Tỉnh</option>
                <option v-for="province in provinces" :key="province.code" :value="province.code">
                  {{ province.name }}
                </option>
              </select>
              <p v-if="addressErrors.thanhPho" class="mt-1 text-red-600 text-sm">{{ addressErrors.thanhPho }}</p>
            </div>
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-2">Quận/Huyện</label>
              <select v-model="addressForm.quanCode"
                class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                :class="{ 'border-red-600': addressErrors.quan }" :disabled="!addressForm.thanhPhoCode"
                @change="fetchWards">
                <option value="">Chọn Quận/Huyện</option>
                <option v-for="district in districts" :key="district.code" :value="district.code">
                  {{ district.name }}
                </option>
              </select>
              <p v-if="addressErrors.quan" class="mt-1 text-red-600 text-sm">{{ addressErrors.quan }}</p>
            </div>
            <div class="flex flex-col">
              <label class="text-sm font-medium text-gray-700 mb-2">Phường/Xã</label>
              <select v-model="addressForm.phuongCode"
                class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                :class="{ 'border-red-600': addressErrors.phuong }" :disabled="!addressForm.quanCode">
                <option value="">Chọn Phường/Xã</option>
                <option v-for="ward in wards" :key="ward.code" :value="ward.code">
                  {{ ward.name }}
                </option>
              </select>
              <p v-if="addressErrors.phuong" class="mt-1 text-red-600 text-sm">{{ addressErrors.phuong }}</p>
            </div>
          </div>
          <div class="flex justify-end gap-4 mt-6">
            <button
              class="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200 font-medium"
              @click="closeAddressModal">
              Hủy
            </button>
            <button
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
              :disabled="isSavingAddress" @click="saveAddress">
              {{ isSavingAddress ? 'Đang lưu...' : 'Lưu' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center min-h-screen bg-gray-50">
      <div class="bg-white p-8 rounded-xl shadow-sm text-center max-w-md w-full">
        <h2 class="text-2xl font-medium text-gray-800 mb-4">Vui lòng đăng nhập</h2>
        <p class="text-gray-600 mb-6">Bạn cần đăng nhập để xem thông tin tài khoản.</p>
        <button
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
          @click="$router.push('/login')">
          Đăng nhập
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import mitt from 'mitt';

const emitter = mitt();

export default {
  data() {
    return {
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
      activeTab: 'account',
      activeStatus: null, // Changed to null to represent 'all'
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
      warrantyStatuses: [
        { id: 'all', name: 'Tất cả' },
        { id: 'received', name: 'Đã tiếp nhận' },
        { id: 'coordinating', name: 'Đang điều phối' },
        { id: 'repairing', name: 'Đang sửa' },
        { id: 'repaired', name: 'Đã sửa xong' },
        { id: 'returned', name: 'Đã trả máy' },
      ],
      orders: [],
      warranties: [
        { id: 1, warrantyId: 'BH123456', date: '01/07/2025', status: 'Đang sửa', product: 'iPhone 14' },
        { id: 2, warrantyId: 'BH123457', date: '30/06/2025', status: 'Đã trả máy', product: 'Samsung Galaxy S23' },
      ],
      currentPage: 0,
      totalPages: 0,
      totalElements: 0,
    };
  },
  computed: {
    filteredOrders() {
      // This computed property is no longer needed as filtering is done on the backend
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
        alert('Vui lòng nhập mã đơn hàng.');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/api/hoa-don/ma/${this.orderLookupId.trim()}`);
        const orderId = response.data.id;
        this.$router.push(`/invoice-status?orderId=${orderId}`);
      } catch (error) {
        console.error('Lỗi khi tra cứu đơn hàng:', error);
        alert('Không tìm thấy đơn hàng với mã đã cho.');
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
          size: 5, // Or any other page size you prefer
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
        alert(error.response?.data?.error || 'Lỗi khi lấy lịch sử đơn hàng');
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

    scrollSlider(direction) {
      const slider = this.$refs.slider;
      const scrollAmount = 1250; // Khoảng cách cuộn mỗi lần (tương đương với chiều rộng card + margin)
      slider.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    },
    async handleLogin() {
      if (!this.loginInput || !this.password) {
        alert('Tên đăng nhập hoặc email và mật khẩu không được để trống');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8080/tai-khoan/dang-nhap-Web', {
          tenDangNhap: this.loginInput,
          email: this.loginInput,
          matKhau: this.password,
        });

        if (response.data && response.data.idKhachHang) {
          const { idKhachHang, tenDangNhap, idTaiKhoan, role } = response.data;

          localStorage.setItem('customerId', idKhachHang);
          localStorage.setItem('accountId', idTaiKhoan);
          localStorage.setItem('customerName', tenDangNhap);
          localStorage.setItem('role', role);
          localStorage.setItem('isLoggedIn', 'true');

          this.isLoggedIn = true;

          emitter.emit('loginStatusChanged', {
            isLoggedIn: true,
            customerName: tenDangNhap,
          });

          await this.fetchAccountInfo();
          await this.fetchAddresses();

          alert(response.data.message || 'Đăng nhập thành công!');
          this.$router.push('/account');
        } else {
          alert('Không tìm thấy thông tin khách hàng từ phản hồi đăng nhập');
        }
      } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        const errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          'Lỗi kết nối đến máy chủ';
        alert(errorMessage);
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
        alert('Lỗi khi đăng xuất');
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
    getStatusName(statusId) {
      const statusList = this.activeTab === 'history' ? this.orderStatuses : this.warrantyStatuses;
      const status = statusList.find((s) => s.id === statusId);
      return status ? status.name : '';
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
        const { tenKH, soDienThoai, gioiTinh, ngaySinh, diaChiMacDinh, email, updateAt } = response.data;

        this.fullName = tenKH || this.fullName || '';
        this.phone = soDienThoai || this.phone || '';
        this.gender = gioiTinh !== null ? gioiTinh : null;
        this.birthDate = ngaySinh ? new Date(ngaySinh).toISOString().split('T')[0] : '';
        this.defaultAddress = diaChiMacDinh ? this.formatAddress(diaChiMacDinh) : '';
        this.defaultAddressId = diaChiMacDinh ? diaChiMacDinh.id : '';
        this.email = email || this.email || '';
        this.updateAt = updateAt ? new Date(updateAt).toISOString() : '';
        this.customerName = tenKH || this.fullName || localStorage.getItem('customerName') || 'Khách hàng';
        this.phoneNumber = soDienThoai || this.phone || localStorage.getItem('phoneNumber') || 'Chưa có số điện thoại';
        this.showUpdatePrompt = !tenKH || !soDienThoai;

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
        alert(error.response?.data || 'Lỗi khi lấy thông tin khách hàng');
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
        alert(error.response?.data?.error || 'Lỗi khi lấy danh sách địa chỉ');
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
        alert(response.data || 'Cập nhật địa chỉ mặc định thành công!');
      } catch (error) {
        console.error('Lỗi khi đặt địa chỉ mặc định:', error);
        alert(error.response?.data || 'Lỗi khi đặt địa chỉ mặc định');
      }
    },
    async fetchProvinces() {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/v1/?depth=1');
        this.provinces = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tỉnh/thành phố:', error);
        alert('Không thể tải danh sách tỉnh/thành phố');
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
        alert('Không thể tải danh sách quận/huyện');
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
        alert('Không thể tải danh sách phường/xã');
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
        alert('Không tìm thấy địa chỉ');
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
          alert('Không tìm thấy ID khách hàng');
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
          alert(response.data || 'Cập nhật địa chỉ thành công!');
        } else {
          const response = await axios.post(`http://localhost:8080/khach-hang/addDchiKhachHang`, payload);
          this.addresses.push(response.data);
          alert('Thêm địa chỉ thành công!');
        }

        await this.fetchAddresses();
        if (this.defaultAddressId === this.addressForm.id || !this.defaultAddressId) {
          await this.fetchAccountInfo();
        }
        this.closeAddressModal();
      } catch (error) {
        console.error('Lỗi khi lưu địa chỉ:', error);
        alert(error.response?.data || 'Lỗi khi lưu địa chỉ');
      } finally {
        this.isSavingAddress = false;
      }
    },
    async deleteAddress(addressId) {
      if (!confirm('Bạn có chắc muốn xóa địa chỉ này?')) return;
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
        alert('Xóa địa chỉ thành công');
      } catch (error) {
        console.error('Lỗi khi xóa địa chỉ:', error);
        alert(error.response?.data?.error || 'Lỗi khi xóa địa chỉ');
      }
    },
    async updateAccountInfo() {
      if (!this.validateForm()) return;

      this.isUpdating = true;
      try {
        const idKhachHang = localStorage.getItem('customerId');
        if (!idKhachHang) {
          alert('Không tìm thấy ID khách hàng');
          return;
        }

        const payload = {
          tenKH: this.fullName,
          soDienThoai: this.phone,
          gioiTinh: this.gender,
          ngaySinh: this.birthDate || null,
          idDiaChiMacDinh: this.defaultAddressId || null,
          email: this.email || null,
        };

        const response = await axios.put(`http://localhost:8080/khach-hang/update/${idKhachHang}`, payload);

        const { tenKH, soDienThoai, gioiTinh, ngaySinh, idDiaChiMacDinh, email, updateAt } = response.data;
        this.fullName = tenKH || this.fullName;
        this.phone = soDienThoai || this.phone;
        this.gender = gioiTinh !== null ? gioiTinh : this.gender;
        this.birthDate = ngaySinh ? new Date(ngaySinh).toISOString().split('T')[0] : this.birthDate;
        this.defaultAddressId = idDiaChiMacDinh || this.defaultAddressId;
        this.email = email || this.email;
        this.updateAt = updateAt ? new Date(updateAt).toISOString() : this.updateAt;
        this.customerName = tenKH || this.fullName || 'Khách hàng';
        this.phoneNumber = soDienThoai || this.phone;
        this.showUpdatePrompt = !tenKH || !soDienThoai;

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

        alert('Cập nhật thông tin thành công');
      } catch (error) {
        console.error('Lỗi khi cập nhật thông tin:', error);
        const errorMessage = error.response?.data || 'Lỗi khi cập nhật thông tin';
        this.errors.server = errorMessage;
        alert(errorMessage);
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
      if (!confirm('Bạn có chắc muốn hủy đơn hàng này?')) return;
      try {
        await axios.put(`http://localhost:8080/api/hoa-don/${orderId}/cancel-client`);
        alert('Hủy đơn hàng thành công!');
        this.fetchOrders(this.currentPage);
      } catch (error) {
        console.error('Lỗi khi hủy đơn hàng:', error);
        alert(error.response?.data?.message || 'Lỗi khi hủy đơn hàng');
      }
    },
  },
};
</script>

<style scoped>
/* Custom scrollbar hide */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Card slider styling */
.flex-none {
  flex: none;
}

/* Navigation arrows styling */
.absolute {
  position: absolute;
}

.translate-y-1\/2 {
  transform: translateY(-50%);
}

/* General styling */
*,
*:before,
*:after {
  font-size: 1.5rem !important;
}

i,
svg {
  font-size: 1.2rem !important;
}

button,
input,
select,
label {
  font-size: 1.5rem !important;
}

.cancelled-order {
  background-color: #fee2e2; /* A more prominent red background */
  color: #b91c1c; /* Darker red text */
  opacity: 1; /* Ensure full opacity */
}

.cancelled-order:hover {
  background-color: #fecaca; /* Slightly darker red on hover */
}
</style>
