<template>
  <div class="min-h-screen" style="background: linear-gradient(135deg, #e6f3ff 0%, #e6f9f0 100%);">
    <ToastNotification ref="toastNotification" />
    <div class="container mx-auto px-6 py-8 max-w-8xl">
      <!-- Enhanced Breadcrumb Navigation -->
      <nav class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-lg rounded-2xl px-6 py-4 mb-2">
        <div class="flex items-center gap-3 text-2xl">
          <NuxtLink to="/" class="text-gray-500 hover:text-[#13ad75] transition-colors duration-200">
            <i class="las la-home"></i>
            Trang chủ
          </NuxtLink>
          <i class="las la-chevron-right text-gray-400"></i>
          <NuxtLink to="/category-4cols" class="text-gray-500 hover:text-[#13ad75] transition-colors duration-200">
            Sản phẩm
          </NuxtLink>
          <i class="las la-chevron-right text-gray-400"></i>
          <span class="text-[#13ad75] font-medium">Giỏ hàng</span>
        </div>
      </nav>

      <!-- Enhanced Page Header -->
      <header class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 mb-2 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-[#13ad75]/10 to-[#13ad75]/15"></div>
        <div class="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-[#13ad75]/20 to-transparent rounded-full blur-2xl"></div>
        <div class="relative flex items-center gap-8">
          <div class="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#13ad75] to-[#0d8a5a] rounded-2xl shadow-lg">
            <i class="las la-shopping-cart text-4xl text-white"></i>
          </div>
          <div class="flex-1">
            <h1 class="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">Giỏ hàng của bạn</h1>
            <p class="text-3xl text-gray-600" style="font-family: 'Inter', sans-serif;">Xem lại các sản phẩm đã chọn và tiến hành thanh toán</p>
          </div>
          <!-- Cart Stats -->
          <div class="flex items-center justify-center text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#13ad75]/20 to-[#13ad75]/30 rounded-xl shadow-sm mr-4">
              <i class="las la-box text-2xl text-[#13ad75]"></i>
            </div>
            <div>
              <p class="text-3xl font-bold bg-gradient-to-r from-[#13ad75] to-[#0d8a5a] bg-clip-text text-transparent">{{ cartItems.length }}</p>
              <p class="text-2xl text-gray-600 font-medium">Sản phẩm</p>
            </div>
          </div>
        </div>
      </header>

      <div class="flex gap-8">
        <!-- Enhanced Main Content Area with Scroll -->
        <main class="flex-1 bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl overflow-hidden">
          <div class="p-8">
            <div class="mb-2">
              <h2 class="text-5xl font-bold text-gray-900 mb-2">Giỏ hàng chi tiết</h2>
              <p class="text-3xl text-gray-600">Quản lý các sản phẩm trong giỏ hàng của bạn</p>
            </div>

          <div v-if="cartItems.length > 0" class="space-y-6">
            <!-- Select All -->
            <div class="bg-gradient-to-r from-[#13ad75]/10 to-[#13ad75]/15 border border-[#13ad75]/30 rounded-2xl p-6">
              <div class="flex items-center justify-between">
                <label class="flex items-center space-x-4 cursor-pointer">
                  <div class="relative">
                    <input type="checkbox" v-model="selectAll" @change="toggleSelectAll"
                      class="w-7 h-7 text-[#13ad75] rounded-xl focus:ring-[#13ad75] focus:ring-3 border-2 border-gray-300" />
                  </div>
                  <span class="text-2xl font-bold text-gray-800">Chọn tất cả ({{ cartItems.length }} sản phẩm)</span>
                </label>
                <button @click="removeSelected" :disabled="selectedItems.length === 0"
                  class="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed font-bold text-2xl shadow-xl hover:from-red-600 hover:to-red-700 hover:shadow-2xl hover:shadow-red-500/25 hover:scale-105 transform transition-all duration-300 relative overflow-hidden group">
                  <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="flex items-center relative z-10">
                    <i class="las la-trash mr-3 group-hover:animate-pulse"></i>
                    Xóa đã chọn
                  </div>
                </button>
              </div>
            </div>

            <!-- Enhanced Cart Items with Scroll -->
            <div class="max-h-[700px] overflow-y-auto pr-2 space-y-6 custom-scrollbar">
              <div v-for="(item, index) in cartItems" :key="item.maImel"
                class="bg-white/95 backdrop-blur-sm rounded-3xl border border-white/40 p-8 transition-shadow duration-300">
                
                <div class="flex items-center space-x-6">
                  <!-- Checkbox -->
                  <div class="flex-shrink-0">
                    <input type="checkbox" v-model="item.selected" @change="updateSelectedItems"
                      class="w-6 h-6 text-[#13ad75] rounded-lg focus:ring-[#13ad75] focus:ring-2 border-2 border-gray-300" />
                  </div>

                  <!-- Product Image -->
                  <div class="flex-shrink-0">
                    <NuxtLink :to="item.productLink">
                      <div class="w-40 h-40 rounded-3xl p-2 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                        <img :src="item.image || '/assets/images/placeholder.jpg'" alt="Product image"
                          class="w-full h-full object-contain" />
                      </div>
                    </NuxtLink>
                  </div>

                  <!-- Product Info -->
                  <div class="flex-1 min-w-0">
                    <h3 class="text-3xl font-bold text-gray-900 mb-1 line-clamp-2">
                      <NuxtLink :to="item.productLink">
                        {{ item.tenSanPham || 'Sản phẩm không xác định' }}
                      </NuxtLink>
                    </h3>
                    
                    <!-- Enhanced Product Specifications -->
                    <div class="flex flex-wrap gap-4 mb-1">
                      <div class="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-3 rounded-2xl border border-blue-200">
                        <i class="las la-palette text-blue-600 text-xl"></i>
                        <span class="text-lg font-medium text-blue-800">{{ item.mauSac || 'Không xác định' }}</span>
                      </div>
                      <div class="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-3 rounded-2xl border border-purple-200">
                        <i class="las la-memory text-purple-600 text-xl"></i>
                        <span class="text-lg font-medium text-purple-800">{{ item.ram || 'Không xác định' }}</span>
                      </div>
                      <div class="flex items-center gap-3 bg-gradient-to-r from-green-50 to-green-100 px-4 py-3 rounded-2xl border border-green-200">
                        <i class="las la-hdd text-green-600 text-xl"></i>
                        <span class="text-lg font-medium text-green-800">{{ item.boNhoTrong || 'Không xác định' }}</span>
                      </div>
                    </div>

                    <!-- Enhanced Price Display -->
                    <div class="flex items-center gap-4">
                      <span class="text-3xl font-bold bg-gradient-to-r from-[#13ad75] to-[#0d8a5a] bg-clip-text text-transparent">
                        {{ formatPrice(item.giaBan) }}
                      </span>
                      <span v-if="item.ghiChuGia" class="text-xl line-through text-gray-400">{{ item.ghiChuGia }}</span>
                      <div class="px-4 py-2 bg-gradient-to-r from-[#13ad75]/10 to-[#13ad75]/20 rounded-full">
                        <span class="text-lg font-medium text-[#13ad75]">Giá tốt</span>
                      </div>
                    </div>
                  </div>

                  <!-- Quantity Controls -->
                  <div class="flex flex-col items-center space-y-3">
                    <div class="flex items-center bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl">
                      <button
                        class="px-4 py-3 text-[#13ad75] disabled:opacity-50 disabled:cursor-not-allowed rounded-l-2xl hover:bg-[#13ad75]/10 hover:text-[#13ad75] hover:scale-110 transform transition-all duration-200 relative overflow-hidden group"
                        :disabled="item.soLuong <= 1" @click="updateQuantity(index, item.soLuong - 1)">
                        <div class="absolute inset-0 bg-gradient-to-r from-[#13ad75]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        <i class="las la-minus text-xl relative z-10 group-hover:animate-pulse"></i>
                      </button>
                      <div class="px-6 py-3 text-xl font-bold text-gray-900 bg-gradient-to-r from-gray-50 to-gray-100 min-w-[80px] text-center border-x border-gray-200">
                        {{ item.soLuong }}
                      </div>
                      <button class="px-4 py-3 text-[#13ad75] rounded-r-2xl hover:bg-[#13ad75]/10 hover:text-[#13ad75] hover:scale-110 transform transition-all duration-200 relative overflow-hidden group"
                        @click="updateQuantity(index, item.soLuong + 1)">
                        <div class="absolute inset-0 bg-gradient-to-r from-[#13ad75]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        <i class="las la-plus text-xl relative z-10 group-hover:animate-pulse"></i>
                      </button>
                    </div>
                  </div>

                  <!-- Enhanced Total Price -->
                  <div class="text-center min-w-[180px]">
                    <div class="bg-gradient-to-r from-[#13ad75]/10 to-[#13ad75]/20 rounded-3xl p-6 border border-[#13ad75]/30">
                      <div class="text-3xl font-bold bg-gradient-to-r from-[#13ad75] to-[#0d8a5a] bg-clip-text text-transparent">
                        {{ formatPrice(item.tongTien) }}
                      </div>
                      <div class="text-lg text-[#13ad75] mt-1 font-medium text-dark">{{ item.soLuong }} × {{ formatPrice(item.giaBan) }}</div>
                    </div>
                  </div>

                  <!-- Remove Button -->
                  <div class="flex-shrink-0">
                    <button class="p-3 text-red-500 rounded-xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 hover:border-red-300 hover:text-red-600 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 transform transition-all duration-300 relative overflow-hidden group"
                      @click="removeItem(index)" title="Xóa sản phẩm">
                      <div class="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <i class="las la-trash text-3xl relative z-10 group-hover:animate-bounce"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Enhanced Empty Cart -->
          <div v-else class="text-center py-20 bg-[#13ad75]/5 rounded-2xl border-2 border-dashed border-gray-300">
            <div class="max-w-md mx-auto">
              <div class="w-24 h-24 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i class="las la-shopping-cart text-4xl text-white"></i>
              </div>
              <h3 class="text-4xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h3>
              <p class="text-2xl text-gray-600 mb-2">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
              <NuxtLink to="/"
                class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#13ad75] to-[#0d8a5a] text-white rounded-xl hover:shadow-lg hover:shadow-[#13ad75]/25 transition-all duration-300 font-medium transform hover:scale-105 text-2xl hover:from-[#0d8a5a] hover:to-[#13ad75] relative overflow-hidden group">
                <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <i class="las la-shopping-bag mr-2 relative z-10 group-hover:animate-bounce"></i>
                <span class="relative z-10">Tiếp tục mua sắm</span>
              </NuxtLink>
            </div>
          </div>
          </div>
        </main>

        <!-- Enhanced Order Summary Sidebar with Scroll -->
        <aside class="w-[450px]">
        <div v-if="cartItems.length > 0" class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl p-8 sticky top-8 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-xl flex items-center justify-center shadow-lg">
              <i class="las la-calculator text-2xl text-white"></i>
            </div>
            <h3 class="text-4xl font-bold text-gray-900">Tổng đơn hàng</h3>
          </div>

          <!-- Summary Items -->
          <div class="space-y-4 mb-6">
            <div class="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <i class="las la-box text-[#13ad75] text-xl"></i>
                  <span class="text-2xl text-gray-600 font-medium">Số lượng sản phẩm:</span>
                </div>
                <span class="text-2xl font-bold text-[#13ad75]">{{ selectedItems.length }} / {{ cartItems.length }}</span>
              </div>
            </div>

            <div class="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <i class="las la-tags text-[#13ad75] text-xl"></i>
                  <span class="text-2xl text-gray-600 font-medium">Tổng tiền sản phẩm:</span>
                </div>
                <span class="text-2xl font-bold text-gray-900">{{ formatPrice(selectedTotalPrice) }}</span>
              </div>
            </div>

            <div class="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <i class="las la-shipping-fast text-[#13ad75] text-xl"></i>
                  <span class="text-2xl text-gray-600 font-medium">Phí vận chuyển:</span>
                </div>
                <span class="text-2xl font-bold text-gray-900">{{ formatPrice(shippingFee) }}</span>
              </div>
            </div>

            <div v-if="discount > 0" class="bg-green-50 backdrop-blur-sm rounded-xl p-4 border border-green-200">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <i class="las la-percentage text-green-600 text-xl"></i>
                  <span class="text-2xl text-green-600 font-medium">Giảm giá:</span>
                </div>
                <span class="text-2xl font-bold text-green-600">-{{ formatPrice(discount) }}</span>
              </div>
            </div>

            <!-- Total -->
            <div class="bg-[#13ad75]/10 backdrop-blur-sm rounded-xl p-6 border border-[#13ad75]/30">
              <div class="flex justify-between items-center">
                <span class="text-3xl font-bold text-gray-900">Tổng cộng:</span>
                <span class="text-4xl font-bold bg-gradient-to-r from-[#13ad75] to-[#13ad75] bg-clip-text text-transparent">
                  {{ formatPrice(selectedTotalPrice + shippingFee - discount) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Enhanced Discount Info -->
          <div class="mb-2 p-6 bg-[#13ad75]/10 border border-[#13ad75]/30 rounded-2xl">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-[#13ad75] rounded-full flex items-center justify-center flex-shrink-0">
                <i class="las la-info-circle text-white text-xl"></i>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-2 text-2xl">Thông tin ưu đãi</h4>
                <p class="text-xl text-gray-700 leading-relaxed">
                  <span v-if="cartItems.length >= 3" class="font-semibold text-green-600">
                    🎉 Chúc mừng! Bạn được giảm {{ formatPrice(500000) }} khi mua từ 3 sản phẩm trở lên.
                  </span>
                  <span v-else-if="totalPrice >= 20000000" class="font-semibold text-green-600">
                    🎉 Chúc mừng! Bạn được giảm {{ formatPrice(300000) }} khi tổng đơn hàng trên 20,000,000 VNĐ.
                  </span>
                  <span v-else>
                    Mua thêm <strong>{{ 3 - cartItems.length }} sản phẩm</strong> để được giảm <strong>500,000 VNĐ</strong> 
                    hoặc đạt tổng đơn <strong>20,000,000 VNĐ</strong> để được giảm <strong>300,000 VNĐ</strong>!
                  </span>
                </p>
              </div>
            </div>
          </div>

          <!-- Checkout Button -->
          <NuxtLink to="/checkout-page" :class="[
            'block w-full text-center py-6 rounded-2xl font-bold text-2xl transform transition-all duration-300 relative overflow-hidden group',
            selectedItems.length > 0 
              ? 'bg-gradient-to-r from-[#13ad75] to-[#0d8a5a] text-white shadow-xl hover:from-[#0d8a5a] hover:to-[#13ad75] hover:shadow-2xl hover:shadow-[#13ad75]/30 hover:scale-105' 
              : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-500 cursor-not-allowed'
          ]" :style="selectedItems.length === 0 ? 'pointer-events: none;' : ''">
            <div v-if="selectedItems.length > 0" class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="flex items-center justify-center gap-4 relative z-10">
              <i class="las la-credit-card text-3xl" :class="selectedItems.length > 0 ? 'group-hover:animate-pulse' : ''"></i>
              <span>Thanh toán ({{ selectedItems.length }} sản phẩm)</span>
              <i class="las la-arrow-right text-2xl" :class="selectedItems.length > 0 ? 'group-hover:translate-x-1 transition-transform duration-300' : ''"></i>
            </div>
          </NuxtLink>
        </div>

        <!-- Enhanced Empty Summary -->
        <div v-else class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl rounded-2xl p-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <i class="las la-calculator text-3xl text-white"></i>
            </div>
            <h3 class="text-3xl font-bold text-gray-900 mb-2">Tổng đơn hàng</h3>
            <p class="text-xl text-gray-600">Không có sản phẩm để hiển thị tổng.</p>
          </div>
        </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { emitCartUpdate } from '~/utils/eventBus.js';
import ToastNotification from '../components/base/ToastNotification.vue';

export default {
  name: 'CartPage',
  components: {
    ToastNotification,
  },
  data() {
    return {
      cartItems: [],
      invoiceId: null,
      shippingFee: 30000,
      selectAll: false,
      selectedItems: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + (item.tongTien || 0), 0);
    },
    selectedTotalPrice() {
      return this.selectedItems.reduce((total, item) => total + (item.tongTien || 0), 0);
    },
    discount() {
      if (this.selectedItems.length >= 3) return 500000;
      if (this.selectedTotalPrice >= 20000000) return 300000;
      return 0;
    },
  },
  watch: {
    cartItems: {
      handler() {
        this.updateSelectedItems();
      },
      deep: true,
    },
  },
  async mounted() {
    await this.initCart();
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
    },

    async initCart() {
      try {
        this.invoiceId = this.$route.query.invoiceId || localStorage.getItem('invoiceId');
        const customerId = localStorage.getItem('customerId');

        // Kiểm tra hóa đơn hiện tại
        if (this.invoiceId) {
          const isPending = await this.isPendingInvoice(this.invoiceId);
          if (!isPending) {
            localStorage.removeItem('invoiceId');
            this.invoiceId = null;
          }
        }

        // Nếu không có hóa đơn chờ, kiểm tra hóa đơn chờ của khách hàng
        if (!this.invoiceId && customerId) {
          const existingInvoice = await this.getExistingPendingInvoice(customerId);
          if (existingInvoice) {
            this.invoiceId = existingInvoice.id;
            localStorage.setItem('invoiceId', this.invoiceId);
          }
        }

        // Nếu vẫn không có hóa đơn, tạo mới
        if (!this.invoiceId) {
          await this.createInvoice(customerId || null);
        }

        await this.fetchCart();
      } catch (error) {
        console.error('Lỗi khi khởi tạo giỏ hàng:', error);
        this.cartItems = [];
        this.$refs.toastNotification?.addToast({
          type: 'info',
          message: 'Giỏ hàng của bạn đang trống!',
          isLoading: false,
          duration: 3000,
        });
      }
    },

    async getExistingPendingInvoice(customerId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/client/hoa-don-cho/khach-hang/${customerId}`);
        const pendingInvoices = response.data;
        return pendingInvoices.find(invoice => invoice.trangThai === 6) || null;
      } catch (error) {
        console.error('Lỗi khi lấy hóa đơn chờ:', error);
        return null;
      }
    },

    // Thêm hàm kiểm tra trạng thái hóa đơn
    async isPendingInvoice(invoiceId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/client/gio-hang/${invoiceId}`);
        return response.data.trangThai === 6;
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái hóa đơn:', error);
        return false;
      }
    },

    async checkInvoiceExists(invoiceId) {
      try {
        await axios.get(`http://localhost:8080/api/client/gio-hang/${invoiceId}`);
        return true;
      } catch (error) {
        if (error.response?.status === 500 || error.response?.status === 404) {
          return false;
        }
        throw error;
      }
    },

    async createInvoice(customerId) {
      try {
        const params = customerId ? { khachHangId: customerId } : {};
        const response = await axios.post('http://localhost:8080/api/client/hoa-don-cho', {}, { params });
        this.invoiceId = response.data.id;
        localStorage.setItem('invoiceId', this.invoiceId);
      } catch (error) {
        throw new Error('Lỗi khi tạo hóa đơn mới: ' + (error.response?.data?.message || error.message));
      }
    },

    // Modify fetchCart để handle lỗi không tìm thấy
    async fetchCart() {
      try {
        const response = await axios.get(`http://localhost:8080/api/client/gio-hang/${this.invoiceId}`);
        if (!response.data || !response.data.chiTietGioHangDTOS || response.data.chiTietGioHangDTOS.length === 0) {
          // Nếu không có dữ liệu hoặc giỏ hàng rỗng
          this.cartItems = [];
          this.$refs.toastNotification?.addToast({
            type: 'info',
            message: 'Giỏ hàng của bạn đang trống!',
            isLoading: false,
            duration: 3000,
          });
          return;
        }
        this.cartItems = response.data.chiTietGioHangDTOS.map(item => ({
          chiTietSanPhamId: item.chiTietSanPhamId,
          maImel: item.maImel,
          tenSanPham: item.tenSanPham || 'Sản phẩm không xác định',
          mauSac: item.mauSac || 'Không xác định',
          ram: item.ram || 'Không xác định',
          boNhoTrong: item.boNhoTrong || 'Không xác định',
          giaBan: item.giaBan || 0,
          ghiChuGia: item.ghiChuGia || '',
          soLuong: item.soLuong || 1,
          tongTien: item.tongTien || 0,
          image: item.image || '/assets/images/placeholder.jpg',
          productLink: `/product-page?sp_id=${item.chiTietSanPhamId}`,
          selected: true,
        }));
        this.updateSelectedItems();
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Nếu hóa đơn không tồn tại, tạo mới và thử lại
          localStorage.removeItem('invoiceId');
          this.invoiceId = null;
          const customerId = localStorage.getItem('customerId');
          await this.createInvoice(customerId);
          await this.fetchCart(); // Gọi lại fetchCart
        } else {
          // Xử lý các lỗi khác, hiển thị giỏ hàng rỗng
          this.cartItems = [];
          this.$refs.toastNotification?.addToast({
            type: 'info',
            message: 'Giỏ hàng của bạn đang trống!',
            isLoading: false,
            duration: 3000,
          });
        }
      }
    },
    async updateQuantity(index, newQuantity) {
      const item = this.cartItems[index];
      try {
        if (newQuantity > item.soLuong) { // Increment quantity
          const chiTietGioHangDTO = {
            chiTietSanPhamId: item.chiTietSanPhamId,
            maImel: '', // No IMEI for adding a generic instance
            soLuong: 1, // Always add one item at a time
            idPhieuGiamGia: item.idPhieuGiamGia || null,
          };
          await axios.post(`http://localhost:8080/api/client/gio-hang/them?idHD=${this.invoiceId}`, chiTietGioHangDTO);
          this.$refs.toastNotification?.addToast({
            type: 'success',
            message: 'Đã thêm 1 sản phẩm!',
            isLoading: false,
            duration: 3000,
          });
        } else if (newQuantity < item.soLuong) { // Decrement quantity
          // To decrement, we need to remove one instance of this product.
          // The backend's xoaSanPhamKhoiGioHang removes one instance if maImel is empty.
          await axios.delete(`http://localhost:8080/api/client/gio-hang/xoa`, {
            params: {
              idHD: this.invoiceId,
              spId: item.chiTietSanPhamId,
              maImel: '', // Remove one generic instance
            },
          });
          this.$refs.toastNotification?.addToast({
            type: 'success',
            message: 'Đã xóa 1 sản phẩm!',
            isLoading: false,
            duration: 3000,
          });
        }
        // After adding/removing, re-fetch the cart to update the UI
        await this.fetchCart();
        // Emit cart update event to sync with navbar
        emitCartUpdate();
      } catch (error) {
        this.handleError(error, 'Lỗi khi cập nhật số lượng');
      }
    },
    async removeItem(index) {
      try {
        const item = this.cartItems[index];
        await axios.delete(`http://localhost:8080/api/client/gio-hang/xoa`, {
          params: {
            idHD: this.invoiceId,
            spId: item.chiTietSanPhamId,
            maImel: item.maImel,
          },
        });
        // Gọi fetchCart để cập nhật giỏ ngay lập tức
        await this.fetchCart();
        // Emit cart update event to sync with navbar
        emitCartUpdate();
        this.$refs.toastNotification?.addToast({
          type: 'success',
          message: `Đã xóa sản phẩm "${item.tenSanPham}" khỏi giỏ hàng!`,
          duration: 3000,
        });
      } catch (error) {
        this.handleError(error, 'Lỗi khi xóa sản phẩm');
      }
    },
    async removeSelected() {
      try {
        const promises = this.selectedItems.map(item =>
          axios.delete(`http://localhost:8080/api/client/gio-hang/xoa`, {
            params: {
              idHD: this.invoiceId,
              spId: item.chiTietSanPhamId,
              maImel: item.maImel,
            },
          })
        );
        await Promise.all(promises);
        // Gọi fetchCart để cập nhật giỏ ngay lập tức
        await this.fetchCart();
        // Emit cart update event to sync with navbar
        emitCartUpdate();
        this.$refs.toastNotification?.addToast({
          type: 'success',
          message: 'Đã xóa các sản phẩm đã chọn!',
          duration: 3000,
        });
      } catch (error) {
        this.handleError(error, 'Lỗi khi xóa các sản phẩm đã chọn');
      }
    },
    toggleSelectAll() {
      this.cartItems.forEach(item => (item.selected = this.selectAll));
      this.updateSelectedItems();
    },
    updateSelectedItems() {
      this.selectedItems = this.cartItems.filter(item => item.selected);
      this.selectAll = this.cartItems.length > 0 && this.cartItems.every(item => item.selected);
    },
    handleError(error, defaultMessage) {
      const message = error.response?.data?.message || error.message || defaultMessage;
      this.$refs.toastNotification?.addToast({
        type: 'error',
        message,
        isLoading: false,
        duration: 5000,
      });
      console.error(`${defaultMessage}:`, error);
    },
  },
};
</script>

<style scoped>
/* Custom Scrollbar Styling */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(19, 173, 117, 0.3) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, rgba(19, 173, 117, 0.6), rgba(19, 173, 117, 0.8));
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: content-box;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, rgba(19, 173, 117, 0.8), rgba(19, 173, 117, 1));
  background-clip: content-box;
}

/* Floating Animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Shimmer Effect */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.shimmer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transform: translateX(-100%);
  animation: shimmer 2s infinite;
}

/* Custom styles for better visual hierarchy */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2; /* Standard property for compatibility */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions */
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Better focus styles */
input:focus,
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(19, 173, 117, 0.2);
}

/* Pulse Animation */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(19, 173, 117, 0.3); }
  50% { box-shadow: 0 0 30px rgba(19, 173, 117, 0.6); }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Enhanced Mobile Responsive Design */
@media (max-width: 1024px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .cart-sidebar {
    width: 100%;
    margin-top: 2rem;
  }
  
  .cart-main-layout {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .cart-header-title {
    font-size: 2.5rem;
  }
  
  .cart-section-title {
    font-size: 2rem;
  }
  
  .cart-text-lg {
    font-size: 1.75rem;
  }
  
  .cart-text-md {
    font-size: 1.25rem;
  }
  
  .cart-padding {
    padding: 1rem;
  }
  
  .cart-item-layout {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .cart-product-image {
    width: 5rem;
    height: 5rem;
  }
}

@media (max-width: 640px) {
  .cart-header-main {
    font-size: 2rem;
  }

  .cart-title-lg {
    font-size: 1.75rem;
  }

  .cart-title-md {
    font-size: 1.5rem;
  }

  .cart-text-base {
    font-size: 1.125rem;
  }

  .cart-text-sm {
    font-size: 1rem;
  }
  
  .cart-mobile-padding {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .cart-quantity-controls {
    min-width: 60px;
  }
  
  .cart-total-section {
    min-width: 100px;
  }
  
  .cart-spec-tags {
    gap: 0.5rem;
    flex-wrap: wrap;
  }
}
</style>