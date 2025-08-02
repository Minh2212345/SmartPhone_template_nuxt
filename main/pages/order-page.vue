```vue
<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <!-- Thanh thông tin phía trên -->
    <div class="bg-white shadow-lg p-4 flex items-center border-b border-gray-200 rounded-xl m-4">
      <!-- Avatar -->
      <img src="/assets/images/icons/ava-profile.png" style="height: 10rem; margin: 2rem" alt="" />

      <!-- Thông tin người dùng + thống kê -->
      <div class="flex items-start gap-x-12">
        <!-- Thông tin người dùng -->
        <div>
          <span class="text-5xl font-semibold text-gray-800 font-custom">{{ customerName }}</span>
          <div class="flex items-center">
            <p class="text-3xl text-gray-500 font-custom">{{ phoneNumber }}</p>
          </div>
          <p class="text-lg text-gray-500 mt-1 font-custom">Cập nhật sau 01/01/2026</p>
        </div>

        <!-- Thống kê -->
        <div class="flex items-center gap-x-8 ml-8">
          <!-- Tổng số đơn hàng -->
          <div class="text-center pl-4 border-l-2 border-[#162d63]">
            <i class="las la-shopping-cart text-2xl mb-1" style="color: #162d63;"></i>
            <p class="text-xl font-bold" style="color: #162d63;">2</p>
            <p class="text-lg text-gray-600 font-custom">Tổng số đơn hàng đã mua</p>
          </div>

          <!-- Tổng tiền đã tích lũy -->
          <div class="text-center pl-4 border-l-2 border-[#162d63]">
            <i class="las la-money-bill-wave text-2xl mb-1"></i>
            <p class="text-xl font-bold" style="color: #162d63;">0 VNĐ</p>
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
          <!-- Tab Tổng quan -->
          <div v-if="activeTab === 'overview'" class="tab-panel">
            <div class="grid grid-cols-2 gap-4 mb-6">
              <!-- Đơn hàng gần đây -->
              <div class="bg-white p-4 rounded-3xl text-center h-full">
                <p class="text-lg text-gray-500 mb-2 font-custom">Đơn hàng gần đây</p>
                <p class="text-lg text-gray-600 font-custom">
                  Bạn chưa có đơn hàng nào hôm nay? Hãy bắt đầu mua sắm ngay nào! Mua sắm ngay
                </p>
                <button
                  class="mt-2 px-4 py-2 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Đăng ký ngay
                </button>
              </div>

              <!-- Ưu đãi của bạn -->
              <div class="bg-white p-4 rounded-3xl text-center h-full">
                <p class="text-lg text-gray-500 mb-2 font-custom">Ưu đãi của bạn</p>
                <p class="text-lg text-gray-600 font-custom">Bạn chưa có ưu đãi nào</p>
                <button
                  class="mt-2 px-4 py-2 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Đăng ký ngay
                </button>
              </div>

              <!-- Sản phẩm yêu thích -->
              <div class="col-span-2 bg-white p-4 rounded-3xl text-center h-full">
                <p class="text-lg text-gray-500 mb-2 font-custom">Sản phẩm yêu thích</p>
                <p class="text-lg text-gray-600 font-custom">
                  Bạn chưa có sản phẩm nào yêu thích? Hãy bắt đầu mua sắm ngay nào! Mua sắm ngay
                </p>
                <button
                  class="mt-2 px-4 py-2 bg-red-600 text-white text-lg rounded-lg hover:bg-red-700 transition duration-200 font-custom"
                >
                  Xem sản phẩm
                </button>
              </div>
            </div>
          </div>

          <!-- Tab Lịch sử mua hàng -->
          <div v-if="activeTab === 'history'" class="tab-panel">
            <!-- Bộ lọc khoảng thời gian -->
            <div class="bg-white p-4 rounded-3xl">
              <div class="mb-2">
                <label class="text-lg font-custom text-gray-700">Lịch sử mua hàng</label>
                <input
                  type="date"
                  v-model="startDate"
                  class="border rounded-lg px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <span class="text-lg font-custom">→</span>
                <input
                  type="date"
                  v-model="endDate"
                  class="border rounded-lg px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <span class="text-lg font-custom ml-2">
                  <i class="fas fa-calendar-alt"></i>
                </span>
              </div>
              <!-- Thanh trạng thái -->
              <div class="flex space-x-4 mb-2 border-b border-gray-200">
                <button
                  v-for="(status, index) in orderStatuses"
                  :key="index"
                  @click="activeStatus = status.id"
                  class="px-4 py-2 text-gray-600 hover:text-[#162d63] focus:outline-none"
                  :class="{ 'text-red-600 font-semibold border-b-2 border-[#162d63]': activeStatus === status.id }"
                >
                  {{ status.name }}
                </button>
              </div>
              <!-- Bảng lịch sử mua hàng -->
              <div class="overflow-x-auto">
                <table class="min-w-full bg-white rounded-lg">
                  <thead>
                    <tr class="bg-gray-50 text-left text-gray-600">
                      <th class="py-2 px-4 border-b">Mã đơn hàng</th>
                      <th class="py-2 px-4 border-b">Ngày đặt</th>
                      <th class="py-2 px-4 border-b">Trạng thái</th>
                      <th class="py-2 px-4 border-b">Tổng tiền</th>
                      <th class="py-2 px-4 border-b">Tra cứu</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in filteredOrders" :key="order.id" class="border-b hover:bg-gray-50">
                      <td class="py-2 px-4">{{ order.orderId }}</td>
                      <td class="py-2 px-4">{{ order.date }}</td>
                      <td class="py-2 px-4">{{ order.status }}</td>
                      <td class="py-2 px-4">{{ order.total }} VNĐ</td>
                      <td class="py-2 px-4">
                        <NuxtLink
                          class="px-2 py-1 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition duration-200 font-custom"
                          to="/invoice-status"
                        >
                          Tra cứu
                        </NuxtLink>
                      </td>
                    </tr>
                    <!-- Dữ liệu mẫu -->
                    <tr class="border-b hover:bg-gray-50" v-if="filteredOrders.length === 0">
                      <td colspan="5" class="py-4 text-center text-gray-500">Chưa có đơn hàng nào</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mt-4 text-center text-gray-500 text-lg font-custom">
                Hiển thị 2 - 1 trong tổng số 2 đơn hàng
              </div>
            </div>
          </div>

          <!-- Tab Tra cứu bảo hành -->
          <div v-if="activeTab === 'warranty'" class="tab-panel">
            <!-- Thanh trạng thái -->
            <div class="bg-white p-4 rounded-3xl">
              <div class="flex space-x-4 mb-3 border-b border-gray-200">
                <button
                  v-for="(status, index) in warrantyStatuses"
                  :key="index"
                  @click="activeWarrantyStatus = status.id"
                  class="px-4 py-2 text-gray-600 hover:text-[#162d63] focus:outline-none"
                  :class="{
                    'text-red-600 font-semibold border-b-2 border-[#162d63]': activeWarrantyStatus === status.id,
                  }"
                >
                  {{ status.name }}
                </button>
              </div>
              <!-- Bảng tra cứu bảo hành -->
              <div class="overflow-x-auto">
                <table class="min-w-full bg-white rounded-lg">
                  <thead>
                    <tr class="bg-gray-50 text-left text-gray-600">
                      <th class="py-2 px-4 border-b">Mã bảo hành</th>
                      <th class="py-2 px-4 border-b">Ngày gửi</th>
                      <th class="py-2 px-4 border-b">Trạng thái</th>
                      <th class="py-2 px-4 border-b">Tên sản phẩm</th>
                      <th class="py-2 px-4 border-b">Tra cứu</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="warranty in filteredWarranties" :key="warranty.id" class="border-b hover:bg-gray-50">
                      <td class="py-2 px-4">{{ warranty.warrantyId }}</td>
                      <td class="py-2 px-4">{{ warranty.date }}</td>
                      <td class="py-2 px-4">{{ warranty.status }}</td>
                      <td class="py-2 px-4">{{ warranty.product }}</td>
                      <td class="py-2 px-4">
                        <button
                          class="px-2 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                          Tra cứu
                        </button>
                      </td>
                    </tr>
                    <!-- Dữ liệu mẫu -->
                    <tr class="border-b hover:bg-gray-50" v-if="filteredWarranties.length === 0">
                      <td colspan="5" class="py-4 text-center text-gray-500">Chưa có bảo hành nào</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mt-4 text-center text-gray-500 text-sm">Hiển thị 2 - 1 trong tổng số 2 bảo hành</div>
            </div>
          </div>

          <!-- Tab Thông tin tài khoản -->
          <div v-if="activeTab === 'account'" class="tab-panel">
            <!-- Thông báo -->
            <div class="bg-blue-50 text-blue-700 p-3 rounded-lg mb-1 flex justify-between items-center">
              <span class="text-sm">Vui lòng cập nhật thông tin để có trải nghiệm tốt hơn.</span>
              <button @click="updateAccountInfo" class="text-sm text-blue-700 underline">Cập nhật</button>
            </div>
            <!-- Thông tin cá nhân -->
            <div class="bg-white p-4 rounded-3xl mb-1">
              <div class="grid grid-cols-2 gap-4">
                <!-- Họ và tên -->
                <div class="flex items-center gap-2">
                  <label class="w-1/3 text-lg text-gray-600 font-custom">Họ và tên:</label>
                  <input type="text" v-model="fullName" class="w-2/3 border rounded-lg px-3 py-2" />
                </div>

                <!-- Số điện thoại -->
                <div class="flex items-center gap-2">
                  <label class="w-1/3 text-lg text-gray-600 font-custom">Số điện thoại:</label>
                  <input type="text" v-model="phone" class="w-2/3 border rounded-lg px-3 py-2" />
                </div>

                <!-- Giới tính -->
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

                <!-- Ngày sinh -->
                <div class="flex items-center gap-2">
                  <label class="w-1/3 text-lg text-gray-600 font-custom">Ngày sinh:</label>
                  <input type="date" v-model="birthDate" class="w-2/3 border rounded-lg px-3 py-2" />
                </div>

                <!-- Địa chỉ mặc định -->
                <div class="flex items-center gap-2">
                  <label class="w-1/3 text-lg text-gray-600 font-custom">Địa chỉ mặc định:</label>
                  <input type="text" v-model="defaultAddress" class="w-2/3 border rounded-lg px-3 py-2" disabled />
                </div>

                <!-- Email -->
                <div class="flex items-center gap-2">
                  <label class="w-1/3 text-lg text-gray-600 font-custom">Email:</label>
                  <input type="email" v-model="email" class="w-2/3 border rounded-lg px-3 py-2" />
                </div>
              </div>

              <button
                @click="updateAccountInfo"
                class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
              >
                Cập nhật
              </button>
            </div>

            <!-- Sổ địa chỉ -->
            <div class="bg-white p-4 rounded-3xl mb-1 text-center">
              <h2 class="text-xl font-semibold text-gray-800 mb-2">Sổ địa chỉ</h2>
              <p class="text-gray-600 font-custom">Bạn chưa có địa chỉ nào để giao hàng</p>
              <button class="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200">
                Thêm địa chỉ
              </button>
            </div>
            <!-- Mật khẩu và Tài khoản liên kết -->
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
                    <span class="text-gray-600 font-custom">Google - Đã liên kết</span>
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
      activeStatus: 'all',
      activeWarrantyStatus: 'all',
      startDate: '2020-12-01',
      endDate: '2025-07-01',
      customerName: localStorage.getItem('customerName') || 'Khách hàng',
      phoneNumber: localStorage.getItem('phoneNumber') || 'Chưa có số điện thoại',
      fullName: localStorage.getItem('fullName') || '',
      phone: localStorage.getItem('phoneNumber') || '',
      gender: localStorage.getItem('gender') || '',
      birthDate: localStorage.getItem('birthDate') || '',
      defaultAddress: localStorage.getItem('defaultAddress') || '',
      defaultAddressId: localStorage.getItem('defaultAddressId') || '',
      email: localStorage.getItem('email') || '',
      tabs: [
        { id: 'overview', name: 'Tổng quan', icon: 'las la-home' },
        { id: 'history', name: 'Lịch sử mua hàng', icon: 'las la-history' },
        { id: 'warranty', name: 'Tra cứu bảo hành', icon: 'las la-tools' },
        { id: 'account', name: 'Thông tin tài khoản', icon: 'las la-user' },
      ],
      orderStatuses: [
        { id: 'all', name: 'Tất cả' },
        { id: 'pending', name: 'Chờ thanh toán' },
        { id: 'delivering', name: 'Đang giao' },
        { id: 'delivered', name: 'Đã giao' },
        { id: 'canceled', name: 'Đã hủy' },
      ],
      warrantyStatuses: [
        { id: 'all', name: 'Tất cả' },
        { id: 'received', name: 'Đã tiếp nhận' },
        { id: 'coordinating', name: 'Đang điều phối' },
        { id: 'repairing', name: 'Đang sửa' },
        { id: 'repaired', name: 'Đã sửa xong' },
        { id: 'returned', name: 'Đã trả máy' },
      ],
      orders: [
        { id: 1, orderId: 'DH123456', date: '01/07/2025', status: 'Đang giao', total: '19,190,000' },
        { id: 2, orderId: 'DH123457', date: '30/06/2025', status: 'Đã giao', total: '3,000,000' },
      ],
      warranties: [
        { id: 1, warrantyId: 'BH123456', date: '01/07/2025', status: 'Đang sửa', product: 'iPhone 14' },
        { id: 2, warrantyId: 'BH123457', date: '30/06/2025', status: 'Đã trả máy', product: 'Samsung Galaxy S23' },
      ],
    };
  },
  computed: {
    filteredOrders() {
      if (this.activeStatus === 'all' && !this.startDate && !this.endDate) return this.orders;
      const start = this.startDate ? new Date(this.startDate) : null;
      const end = this.endDate ? new Date(this.endDate) : null;
      return this.orders.filter((order) => {
        const orderDate = new Date(order.date.split('/').reverse().join('-'));
        const matchesStatus = this.activeStatus === 'all' || order.status === this.getStatusName(this.activeStatus);
        const matchesDate = (!start || orderDate >= start) && (!end || orderDate <= end);
        return matchesStatus && matchesDate;
      });
    },
    filteredWarranties() {
      if (this.activeWarrantyStatus === 'all') return this.warranties;
      return this.warranties.filter((warranty) => warranty.status === this.getStatusName(this.activeWarrantyStatus));
    },
  },
  methods: {
    getStatusName(statusId) {
      const statusList = this.activeTab === 'history' ? this.orderStatuses : this.warrantyStatuses;
      const status = statusList.find((s) => s.id === statusId);
      return status ? status.name : '';
    },
    formatAddress(address) {
      if (!address) return '';
      const { diaChiCuThe, phuong, quan, thanhPho } = address;
      return [diaChiCuThe, phuong, quan, thanhPho].filter(Boolean).join(', ');
    },
    async fetchAccountInfo() {
      try {
        const idKhachHang = localStorage.getItem('customerId');
        if (!idKhachHang) {
          console.error('Không tìm thấy ID khách hàng trong localStorage');
          return;
        }
        const response = await axios.get(`http://localhost:8080/tai-khoan/thong-tin-khach-hang/${idKhachHang}`);
        console.log('Thông tin khách hàng:', response.data);
        const { hoTen, soDienThoai, gioiTinh, ngaySinh, diaChiMacDinh, email } = response.data;

        this.fullName = hoTen || '';
        this.phone = soDienThoai || '';
        this.gender = gioiTinh ? true : false; // Chuyển boolean thành true/false
        this.birthDate = ngaySinh ? new Date(ngaySinh).toISOString().split('T')[0] : '';
        this.defaultAddress = diaChiMacDinh ? this.formatAddress(diaChiMacDinh) : '';
        this.defaultAddressId = diaChiMacDinh ? diaChiMacDinh.id : '';
        this.email = email || '';
        this.customerName = hoTen || localStorage.getItem('customerName') || 'Khách hàng';
        this.phoneNumber = soDienThoai || localStorage.getItem('phoneNumber') || 'Chưa có số điện thoại';

        localStorage.setItem('fullName', this.fullName);
        localStorage.setItem('phoneNumber', this.phone);
        localStorage.setItem('gender', JSON.stringify(this.gender));
        localStorage.setItem('birthDate', this.birthDate);
        localStorage.setItem('defaultAddress', this.defaultAddress);
        localStorage.setItem('defaultAddressId', this.defaultAddressId);
        localStorage.setItem('email', this.email);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin khách hàng:', error);
        alert(error.response?.data?.message || 'Lỗi khi lấy thông tin khách hàng');
      }
    },
    async updateAccountInfo() {
      try {
        const idKhachHang = localStorage.getItem('customerId');
        if (!idKhachHang) {
          alert('Không tìm thấy ID khách hàng');
          return;
        }
        const response = await axios.put(`http://localhost:8080/tai-khoan/thong-tin-khach-hang/${idKhachHang}`, {
          hoTen: this.fullName,
          soDienThoai: this.phone,
          gioiTinh: this.gender,
          ngaySinh: this.birthDate,
          idDiaChiMacDinh: this.defaultAddressId, // Gửi id thay vì chuỗi địa chỉ
          email: this.email,
        });
        alert(response.data || 'Cập nhật thông tin thành công');

        localStorage.setItem('fullName', this.fullName);
        localStorage.setItem('phoneNumber', this.phone);
        localStorage.setItem('gender', JSON.stringify(this.gender));
        localStorage.setItem('birthDate', this.birthDate);
        localStorage.setItem('defaultAddress', this.defaultAddress);
        localStorage.setItem('defaultAddressId', this.defaultAddressId);
        localStorage.setItem('email', this.email);
        localStorage.setItem('customerName', this.fullName);
        this.customerName = this.fullName;
        this.phoneNumber = this.phone;

        emitter.emit('loginStatusChanged', {
          isLoggedIn: true,
          customerName: this.fullName,
        });
      } catch (error) {
        console.error('Lỗi khi cập nhật thông tin:', error);
        alert(error.response?.data?.message || 'Lỗi khi cập nhật thông tin');
      }
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