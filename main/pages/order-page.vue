<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Thanh thông tin phía trên -->
    <div class="bg-white shadow-lg p-4 flex items-center border-b border-gray-200 rounded-xl m-4">
      <img src="/assets/images/icons/ava-profile.png" style="height: 10rem; margin: 2rem" alt="Avatar" />
      <div class="flex items-start gap-x-12">
        <div>
          <span class="text-5xl font-semibold text-gray-800 font-custom">{{ customerName }}</span>
          <div class="flex items-center">
            <p class="text-3xl text-gray-500 font-custom">{{ phoneNumber }}</p>
          </div>
          <p class="text-lg text-gray-500 mt-1 font-custom">Cập nhật sau {{ formatDate(updateAt) }}</p>
        </div>
        <div class="flex items-center gap-x-8 ml-8">
          <div class="text-center pl-4 border-l-2 border-[#162d63]">
            <i class="las la-shopping-cart text-2xl mb-1" style="color: #162d63;"></i>
            <p class="text-xl font-bold" style="color: #162d63;">{{ totalOrders }}</p>
            <p class="text-lg text-gray-600 font-custom">Tổng số đơn hàng đã mua</p>
          </div>
          <div class="text-center pl-4 border-l-2 border-[#162d63]">
            <i class="las la-money-bill-wave text-2xl mb-1"></i>
            <p class="text-xl font-bold" style="color: #162d63;">{{ totalSpent }} VNĐ</p>
            <p class="text-lg text-gray-600 font-custom">Tổng tiền đã tích lũy</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Khu vực nội dung chính -->
    <div class="flex flex-1 justify-center">
      <!-- Thanh tab dọc -->
      <div class="bg-white shadow-md p-4 m-2 rounded-3xl flex flex-col justify-center" style="height: 50vh">
        <div class="flex flex-col space-y-2">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="activeTab = tab.id"
            class="px-4 py-2 text-gray-600 hover:text-[#162d63] focus:outline-none text-left flex items-center"
            :class="{ 'text-red-600 font-semibold bg-gray-100 rounded': activeTab === tab.id }"
          >
            <i :class="tab.icon" class="mr-2 text-lg"></i>
            {{ tab.name }}
          </button>
        </div>
      </div>

      <!-- Nội dung tab -->
      <div class="w-3/4 p-6 overflow-y-auto">
        <div class="p-6 rounded-lg">
          <!-- Tab Thông tin tài khoản -->
          <div v-if="activeTab === 'account'" class="tab-panel">
            <div class="bg-blue-50 text-blue-700 p-3 rounded-lg mb-1 flex justify-between items-center" v-if="showUpdatePrompt">
              <span class="text-sm">Vui lòng cập nhật thông tin để có trải nghiệm tốt hơn.</span>
              <button @click="updateAccountInfo" class="text-sm text-blue-700 underline">Cập nhật</button>
            </div>
            <div class="bg-white p-4 rounded-3xl mb-1">
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-2">
                  <label class="w-1/3 text-lg text-gray-600 font-custom">Họ và tên:</label>
                  <input
                    type="text"
                    v-model.trim="fullName"
                    class="w-2/3 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                    :class="{ 'border-red-600': errors.fullName }"
                    @input="clearError('fullName')"
                  />
                </div>
                <div class="flex items-center gap-2">
                  <label class="w-1/3 text-lg text-gray-600 font-custom">Số điện thoại:</label>
                  <input
                    type="text"
                    v-model.trim="phone"
                    class="w-2/3 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                    :class="{ 'border-red-600': errors.phone }"
                    @input="clearError('phone')"
                  />
                </div>
                <div class="flex items-center gap-2">
                  <label class="w-1/3 text-lg text-gray-600 font-custom">Giới tính:</label>
                  <div class="w-2/3 flex items-center gap-4">
                    <label class="flex items-center">
                      <input type="radio" v-model="gender" :value="true" class="mr-1" />
                      <span class="text-lg text-gray-600 font-custom">Nam</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" v-model="gender" :value="false" class="mr-1" />
                      <span class="text-lg text-gray-600 font-custom">Nữ</span>
                    </label>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <label class="w-1/3 text-lg text-gray-600 font-custom">Ngày sinh:</label>
                  <input
                    type="date"
                    v-model="birthDate"
                    class="w-2/3 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
                <div class="flex items-center gap-2">
                  <label class="w-1/3 text-lg text-gray-600 font-custom">Địa chỉ mặc định:</label>
                  <input
                    type="text"
                    v-model="defaultAddress"
                    class="w-2/3 border rounded-lg px-3 py-2 focus:outline-none"
                    disabled
                  />
                </div>
                <div class="flex items-center gap-2">
                  <label class="w-1/3 text-lg text-gray-600 font-custom">Email:</label>
                  <input
                    type="email"
                    v-model.trim="email"
                    class="w-2/3 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                    :class="{ 'border-red-600': errors.email }"
                    @input="clearError('email')"
                  />
                </div>
              </div>
              <div class="text-red-600 text-sm mt-2" v-if="Object.keys(errors).length">
                <p v-for="(error, field) in errors" :key="field">{{ error }}</p>
              </div>
              <button
                @click="updateAccountInfo"
                class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                :disabled="isUpdating"
              >
                {{ isUpdating ? 'Đang cập nhật...' : 'Cập nhật' }}
              </button>
            </div>
            <div class="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-100 mb-4">
              <!-- Header -->
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-bold text-gray-800">Sổ địa chỉ</h2>
                </div>
                <div class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {{ addresses.length }} địa chỉ
                </div>
              </div>

              <!-- Empty State -->
              <div v-if="addresses.length === 0" class="text-center py-12">
                <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-700 mb-2">Chưa có địa chỉ giao hàng</h3>
                <p class="text-gray-500 mb-6 max-w-sm mx-auto">
                  Thêm địa chỉ giao hàng để việc đặt hàng trở nên thuận tiện hơn
                </p>
              </div>

              <!-- Address List -->
              <div v-else class="space-y-4 mb-6">
                <div 
                  v-for="address in addresses" 
                  :key="address.id" 
                  class="group relative bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <!-- Default Badge -->
                  <div 
                    v-if="defaultAddressId === address.id"
                    class="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-3 py-1 rounded-bl-lg font-medium"
                  >
                    <svg class="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Mặc định
                  </div>

                  <div class="p-5">
                    <!-- Address Info -->
                    <div class="flex items-start gap-4 mb-4">
                      <div class="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-gray-800 font-medium leading-relaxed">
                          {{ formatAddress(address) }}
                        </p>
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                      <button
                        v-if="defaultAddressId !== address.id"
                        @click="setDefaultAddress(address.id)"
                        class="flex items-center gap-1 px-3 py-1.5 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        Đặt mặc định
                      </button>
                      <button 
                        @click="editAddress(address.id)" 
                        class="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Sửa
                      </button>
                      <button 
                        @click="deleteAddress(address.id)" 
                        class="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Add New Address Button -->
              <div class="flex justify-center">
                <button
                  @click="addNewAddress"
                  class="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Thêm địa chỉ mới
                </button>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white p-4 rounded-3xl">
                <h2 class="text-xl font-semibold text-gray-800 mb-2">Mật khẩu</h2>
                <p class="text-gray-600 font-custom">Cập nhật lần cuối: 16/10/2024 21:10</p>
                <button class="mt-2 text-red-600 underline">Thay đổi mật khẩu</button>
              </div>
              <div class="bg-white p-4 rounded-3xl">
                <h2 class="text-xl font-semibold text-gray-800 mb-2">Tài khoản liên kết</h2>
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center">
                    <img
                      src="https://cdn-static.smember.com.vn/_next/static/media/logo-google.b6f9570f.svg"
                      alt="Google Icon"
                      class="mr-2"
                    />
                    <span class="text-gray-600 font-custom">Google - Đãoscience liên kết</span>
                  </div>
                  <button class="text-red-600 underline">Hủy liên kết</button>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img
                      src="https://cdn-static.smember.com.vn/_next/static/media/logo-zalo.120d889f.svg"
                      alt="Zalo Icon"
                      class="mr-2"
                    />
                    <span class="text-gray-600 font-custom">Zalo</span>
                  </div>
                  <button class="text-red-600 underline">Liên kết</button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      activeTab: 'account',
      customerName: localStorage.getItem('customerName') || 'Khách hàng',
      phoneNumber: localStorage.getItem('phoneNumber') || 'Chưa có số điện thoại',
      fullName: localStorage.getItem('fullName') || '',
      phone: localStorage.getItem('phoneNumber') || '',
      gender: localStorage.getItem('gender') ? JSON.parse(localStorage.getItem('gender')) : null,
      birthDate: localStorage.getItem('birthDate') || '',
      defaultAddress: localStorage.getItem('defaultAddress') || '',
      defaultAddressId: localStorage.getItem('defaultAddressId') || '',
      email: localStorage.getItem('email') || '',
      updateAt: localStorage.getItem('updateAt') || '', // New field for updateAt
      errors: {},
      isUpdating: false,
      showUpdatePrompt: false,
      totalOrders: 2, // Giả lập dữ liệu
      totalSpent: '22,190,000', // Giả lập dữ liệu
      addresses: [], // Mảng lưu danh sách địa chỉ
      tabs: [
        { id: 'overview', name: 'Tổng quan', icon: 'las la-home' },
        { id: 'history', name: 'Lịch sử mua hàng', icon: 'las la-history' },
        { id: 'warranty', name: 'Tra cứu bảo hành', icon: 'las la-tools' },
        { id: 'account', name: 'Thông tin tài khoản', icon: 'las la-user' },
      ],
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.fullName) this.errors.fullName = 'Họ và tên không được để trống';
      if (!this.phone) this.errors.phone = 'Số điện thoại không được để trống';
      else if (!/^\d{10,11}$/.test(this.phone)) this.errors.phone = 'Số điện thoại không hợp lệ';
      if (this.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) this.errors.email = 'Email không hợp lệ';
      return Object.keys(this.errors).length === 0;
    },
    clearError(field) {
      if (this.errors[field]) delete this.errors[field];
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
        const { tenKH, soDienThoai, gioiTinh, ngaySinh, diaChiMacDinh, email, updateAt } = response.data;

        this.fullName = tenKH || this.fullName || '';
        this.phone = soDienThoai || this.phone || '';
        this.gender = gioiTinh !== null ? gioiTinh : null;
        this.birthDate = ngaySinh ? new Date(ngaySinh).toISOString().split('T')[0] : '';
        this.defaultAddress = diaChiMacDinh ? this.formatAddress(diaChiMacDinh) : '';
        this.defaultAddressId = diaChiMacDinh ? diaChiMacDinh.id : '';
        this.email = email || this.email || '';
        this.updateAt = updateAt ? new Date(updateAt).toISOString() : ''; // Store updateAt
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
          idDiaChiMacDinh: addressId,
          email: this.email || null,
        };
        const response = await axios.put(`http://localhost:8080/khach-hang/update/${idKhachHang}`, payload);
        const { diaChiMacDinh } = response.data;
        this.defaultAddressId = addressId;
        this.defaultAddress = diaChiMacDinh ? this.formatAddress(diaChiMacDinh) : '';
        localStorage.setItem('defaultAddress', this.defaultAddress);
        localStorage.setItem('defaultAddressId', this.defaultAddressId);
        alert('Đặt địa chỉ mặc định thành công');
      } catch (error) {
        console.error('Lỗi khi đặt địa chỉ mặc định:', error);
        alert(error.response?.data || 'Lỗi khi đặt địa chỉ mặc định');
      }
    },
    addNewAddress() {
      // Placeholder: Chuyển hướng hoặc mở modal để thêm địa chỉ mới
      alert('Chức năng thêm địa chỉ đang được phát triển');
      // Ví dụ: this.$router.push('/add-address');
    },
    editAddress(addressId) {
      // Placeholder: Chuyển hướng hoặc mở modal để sửa địa chỉ
      alert(`Chức năng sửa địa chỉ ${addressId} đang được phát triển`);
      // Ví dụ: this.$router.push(`/edit-address/${addressId}`);
    },
    async deleteAddress(addressId) {
      if (!confirm('Bạn có chắc muốn xóa địa chỉ này?')) return;
      try {
        // Giả định có endpoint DELETE cho địa chỉ
        await axios.delete(`http://localhost:8080/dia-chi-khach-hang/delete/${addressId}`);
        this.addresses = this.addresses.filter((address) => address.id !== addressId);
        if (this.defaultAddressId === addressId) {
          this.defaultAddressId = '';
          this.defaultAddress = '';
          localStorage.setItem('defaultAddress', '');
          localStorage.setItem('defaultAddressId', '');
          // Cập nhật thông tin khách hàng để xóa idDiaChiMacDinh
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
        this.updateAt = updateAt ? new Date(updateAt).toISOString() : this.updateAt; // Update updateAt
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
  },
  mounted() {
    this.fetchAccountInfo();
    this.fetchAddresses();
  },
};
</script>

<style scoped>
.font-custom {
  font-family: Arial, Helvetica, sans-serif;
}

.tab-panel {
  display: block;
}
</style>