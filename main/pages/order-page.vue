```vue
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
          <p class="text-lg text-gray-500 mt-1 font-custom">Cập nhật sau 01/01/2026</p>
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
            <div class="bg-white p-4 rounded-3xl mb-1 text-center">
              <h2 class="text-xl font-semibold text-gray-800 mb-2">Sổ địa chỉ</h2>
              <p class="text-gray-600 font-custom">Bạn chưa có địa chỉ nào để giao hàng</p>
              <button class="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200">
                Thêm địa chỉ
              </button>
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
      errors: {},
      isUpdating: false,
      showUpdatePrompt: false,
      totalOrders: 2, // Giả lập dữ liệu
      totalSpent: '22,190,000', // Giả lập dữ liệu
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
    async fetchAccountInfo() {
      try {
        const idKhachHang = localStorage.getItem('customerId');
        if (!idKhachHang) {
          console.error('Không tìm thấy ID khách hàng trong localStorage');
          this.showUpdatePrompt = true;
          return;
        }
        const response = await axios.get(`http://localhost:8080/tai-khoan/thong-tin-khach-hang/${idKhachHang}`);
        const { hoTen, soDienThoai, gioiTinh, ngaySinh, diaChiMacDinh, email } = response.data;

        this.fullName = hoTen || this.fullName || '';
        this.phone = soDienThoai || this.phone || '';
        this.gender = gioiTinh !== null ? gioiTinh : null;
        this.birthDate = ngaySinh ? new Date(ngaySinh).toISOString().split('T')[0] : '';
        this.defaultAddress = diaChiMacDinh ? this.formatAddress(diaChiMacDinh) : '';
        this.defaultAddressId = diaChiMacDinh ? diaChiMacDinh.id : '';
        this.email = email || this.email || '';
        // Giữ customerName không bị null
        this.customerName = hoTen || this.fullName || localStorage.getItem('customerName') || 'Khách hàng';
        this.phoneNumber = soDienThoai || this.phone || localStorage.getItem('phoneNumber') || 'Chưa có số điện thoại';
        this.showUpdatePrompt = !hoTen || !soDienThoai;

        // Lưu vào localStorage
        localStorage.setItem('fullName', this.fullName);
        localStorage.setItem('phoneNumber', this.phone);
        localStorage.setItem('gender', JSON.stringify(this.gender));
        localStorage.setItem('birthDate', this.birthDate);
        localStorage.setItem('defaultAddress', this.defaultAddress);
        localStorage.setItem('defaultAddressId', this.defaultAddressId);
        localStorage.setItem('email', this.email);
        localStorage.setItem('customerName', this.customerName);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin khách hàng:', error);
        this.showUpdatePrompt = true;
        alert(error.response?.data || 'Lỗi khi lấy thông tin khách hàng');
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
          hoTen: this.fullName,
          soDienThoai: this.phone,
          gioiTinh: this.gender,
          ngaySinh: this.birthDate || null,
          idDiaChiMacDinh: this.defaultAddressId || null,
          email: this.email || null,
        };

        const response = await axios.put(`http://localhost:8080/khach-hang/update/${idKhachHang}`, payload);
        
        // Cập nhật dữ liệu từ phản hồi
        const { hoTen, soDienThoai, gioiTinh, ngaySinh, idDiaChiMacDinh, email } = response.data;
        this.fullName = hoTen || this.fullName;
        this.phone = soDienThoai || this.phone;
        this.gender = gioiTinh !== null ? gioiTinh : this.gender;
        this.birthDate = ngaySinh ? new Date(ngaySinh).toISOString().split('T')[0] : this.birthDate;
        this.defaultAddressId = idDiaChiMacDinh || this.defaultAddressId;
        this.email = email || this.email;
        // Đảm bảo customerName không bị null
        this.customerName = hoTen || this.fullName || 'Khách hàng';
        this.phoneNumber = soDienThoai || this.phone;
        this.showUpdatePrompt = !hoTen || !soDienThoai;

        // Lưu vào localStorage
        localStorage.setItem('fullName', this.fullName);
        localStorage.setItem('phoneNumber', this.phone);
        localStorage.setItem('gender', JSON.stringify(this.gender));
        localStorage.setItem('birthDate', this.birthDate);
        localStorage.setItem('defaultAddressId', this.defaultAddressId);
        localStorage.setItem('email', this.email);
        localStorage.setItem('customerName', this.customerName);

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
```