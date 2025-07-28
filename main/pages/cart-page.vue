<template>
  <div>
    <ToastNotification ref="toastNotification" />
    <main class="p-16">
      <!-- Breadcrumb -->
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="flex items-center space-x-3 text-2xl text-gray-600">
          <li>
            <NuxtLink to="/" class="text-blue-600 hover:text-blue-800 font-medium">Trang chủ</NuxtLink>
          </li>
          <li class="text-gray-400 text-2xl">/</li>
          <li>
            <NuxtLink to="/category-4cols" class="text-blue-600 hover:text-blue-800 font-medium">iPhone 16 Series</NuxtLink>
          </li>
          <li class="text-gray-400 text-2xl">/</li>
          <li class="text-gray-800 font-semibold">Giỏ hàng</li>
        </ol>
      </nav>

      <!-- Page Title -->
      <div class="mb-4">
        <h1 class="text-5xl font-bold text-gray-900 mb-1">Giỏ hàng của bạn</h1>
        <p class="text-2xl text-gray-600" style="font-family: 'Inter', sans-serif;">Xem lại các sản phẩm đã chọn và tiến hành thanh toán</p>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <!-- Cart Items -->
        <div class="xl:col-span-3">
          <div v-if="cartItems.length > 0" class="space-y-6">
            <!-- Select All -->
            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div class="flex items-center justify-between">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="w-8 h-8 text-blue-600 rounded focus:ring-blue-500 focus:ring-2" />
                  <span class="text-2xl font-semibold text-gray-800">Chọn tất cả ({{ cartItems.length }} sản phẩm)</span>
                </label>
                <button @click="removeSelected" :disabled="selectedItems.length === 0" class="text-2xl text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium">Xóa đã chọn</button>
              </div>
            </div>

            <!-- Cart Item List -->
            <div class="space-y-4">
              <div v-for="(item, index) in cartItems" :key="item.maImel" class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div class="flex items-start space-x-4">
                  <!-- Checkbox -->
                  <div class="flex-shrink-0 pt-2">
                    <input type="checkbox" v-model="item.selected" @change="updateSelectedItems" class="w-8 h-8 text-blue-600 rounded focus:ring-blue-500 focus:ring-2" />
                  </div>

                  <!-- Product Image -->
                  <div class="flex-shrink-0">
                    <NuxtLink :to="item.productLink">
                      <img :src="item.image || '/assets/images/placeholder.jpg'" alt="Product image" class="w-40 h-40 object-cover rounded-lg border border-gray-200" />
                    </NuxtLink>
                  </div>

                  <!-- Product Info -->
                  <div class="flex-1 min-w-0">
                    <h3 class="text-3xl font-semibold text-gray-900 mb-3 leading-tight">
                      <NuxtLink :to="item.productLink" class="hover:text-blue-600 transition-colors">Điện thoại {{ item.tenSanPham || 'Sản phẩm không xác định' }}</NuxtLink>
                    </h3>
                    <div class="space-y-2 text-xl text-gray-600">
                      <div class="flex flex-wrap gap-x-6 gap-y-1">
                        <span><strong>Màu sắc:</strong> {{ item.mauSac || 'Không xác định' }}</span>
                        <span><strong>RAM:</strong> {{ item.ram || 'Không xác định' }}</span>
                        <span><strong>Bộ nhớ:</strong> {{ item.boNhoTrong || 'Không xác định' }}</span>
                      </div>
                      <div class="flex items-center space-x-3">
                        <span class="text-3xl font-bold text-red-600">{{ formatPrice(item.giaBan) }}</span>
                        <span v-if="item.ghiChuGia" class="text-xl line-through text-gray-400">{{ item.ghiChuGia }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Quantity and Actions -->
                  <div class="flex flex-col sm:flex-row items-end sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <!-- Quantity Controls -->
                    <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button class="px-4 py-3 text-2xl text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed" :disabled="item.soLuong <= 1" @click="updateQuantity(index, item.soLuong - 1)">−</button>
                      <span class="px-4 py-3 text-2xl font-semibold text-gray-900 bg-gray-50 min-w-[50px] text-center">{{ item.soLuong }}</span>
                      <button class="px-4 py-3 text-2xl text-gray-600 hover:bg-gray-100" @click="updateQuantity(index, item.soLuong + 1)">+</button>
                    </div>

                    <!-- Total Price -->
                    <div class="text-right">
                      <div class="text-3xl font-bold text-gray-900">{{ formatPrice(item.tongTien) }}</div>
                    </div>

                    <!-- Remove Button -->
                    <button class="text-red-600 hover:text-red-800 transition-colors p-2" @click="removeItem(index)" title="Xóa sản phẩm">
                      <i class="fas fa-trash-alt text-2xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty Cart -->
          <div v-else class="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-200">
            <div class="max-w-md mx-auto">
              <div class="text-gray-400 mb-6">
                <i class="fas fa-shopping-cart text-8xl"></i>
              </div>
              <h3 class="text-4xl font-semibold text-gray-900 mb-4">Giỏ hàng trống</h3>
              <p class="text-2xl text-gray-600 mb-8">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
              <NuxtLink to="/" class="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-2xl font-medium">Tiếp tục mua sắm</NuxtLink>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <aside class="xl:col-span-1">
          <div v-if="cartItems.length > 0" class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
            <h3 class="text-4xl font-bold text-gray-900 mb-3">Tổng đơn hàng</h3>

            <div class="space-y-4 mb-3">
              <div class="flex justify-between items-center text-2xl">
                <span class="text-gray-600">Số lượng sản phẩm:</span>
                <span class="font-semibold text-gray-900">{{ selectedItems.length }} / {{ cartItems.length }}</span>
              </div>

              <div class="flex justify-between items-center text-2xl">
                <span class="text-gray-600">Tổng tiền sản phẩm:</span>
                <span class="font-semibold text-gray-900">{{ formatPrice(selectedTotalPrice) }}</span>
              </div>

              <div class="flex justify-between items-center text-2xl">
                <span class="text-gray-600">Phí vận chuyển:</span>
                <span class="font-semibold text-gray-900">{{ formatPrice(shippingFee) }}</span>
              </div>

              <div v-if="discount > 0" class="flex justify-between items-center text-2xl">
                <span class="text-green-600">Giảm giá:</span>
                <span class="font-semibold text-green-600">-{{ formatPrice(discount) }}</span>
              </div>

              <div class="border-t pt-4">
                <div class="flex justify-between items-center">
                  <span class="text-3xl font-bold text-gray-900">Tổng cộng:</span>
                  <span class="text-4xl font-bold text-red-600">{{ formatPrice(selectedTotalPrice + shippingFee - discount) }}</span>
                </div>
              </div>
            </div>

            <!-- Discount Info -->
            <div class="mb-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div class="flex items-start space-x-3">
                <i class="fas fa-info-circle text-blue-600 text-lg mt-1"></i>
                <div>
                  <p class="text-lg text-gray-700 leading-relaxed">
                    <span v-if="cartItems.length >= 3" class="font-semibold text-green-600">Chúc mừng! Bạn được giảm {{ formatPrice(500000) }} khi mua từ 3 sản phẩm trở lên.</span>
                    <span v-else-if="totalPrice >= 20000000" class="font-semibold text-green-600">Chúc mừng! Bạn được giảm {{ formatPrice(300000) }} khi tổng đơn hàng trên 20,000,000 VNĐ.</span>
                    <span v-else>Mua thêm <strong>{{ 3 - cartItems.length }} sản phẩm</strong> để được giảm <strong>500,000 VNĐ</strong> hoặc đạt tổng đơn <strong>20,000,000 VNĐ</strong> để được giảm <strong>300,000 VNĐ</strong>!</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Checkout Button -->
            <NuxtLink to="/checkout-page" :class="[
              'block w-full text-center py-4 rounded-lg font-semibold text-2xl transition-colors',
              selectedItems.length > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            ]" :style="selectedItems.length === 0 ? 'pointer-events: none;' : ''">
              Thanh toán ({{ selectedItems.length }} sản phẩm)
            </NuxtLink>
          </div>

          <!-- Empty Summary -->
          <div v-else class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 class="text-3xl font-semibold text-gray-900 mb-4">Tổng đơn hàng</h3>
            <p class="text-xl text-gray-600">Không có sản phẩm để hiển thị tổng.</p>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
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
        if (!this.invoiceId) {
          this.cartItems = [];
          return;
        }
        await this.fetchCart();
      } catch (error) {
        this.cartItems = [];
        console.error('Khởi tạo giỏ hàng thất bại:', error);
      }
    },
    async fetchCart() {
      try {
        const response = await axios.get(`http://localhost:8080/api/client/gio-hang/${this.invoiceId}`);
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
        this.handleError(error, 'Lỗi khi tải giỏ hàng');
        this.cartItems = [];
      }
    },
    async updateQuantity(index, newQuantity) {
      const item = this.cartItems[index];
      try {
        const chiTietGioHangDTO = {
          chiTietSanPhamId: item.chiTietSanPhamId,
          maImel: item.maImel,
          soLuong: newQuantity,
          idPhieuGiamGia: item.idPhieuGiamGia || null,
        };
        const response = await axios.post(`http://localhost:8080/api/client/gio-hang/them?idHD=${this.invoiceId}`, chiTietGioHangDTO);
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
          selected: this.cartItems.find(i => i.maImel === item.maImel)?.selected || true,
        }));
        this.$refs.toastNotification?.addToast({
          type: 'success',
          message: 'Cập nhật số lượng thành công!',
          isLoading: false,
          duration: 3000,
        });
      } catch (error) {
        this.handleError(error, 'Lỗi khi cập nhật số lượng');
      }
    },
    async removeItem(index) {
      try {
        const item = this.cartItems[index];
        const response = await axios.delete(`http://localhost:8080/api/client/gio-hang/xoa`, {
          params: {
            idHD: this.invoiceId,
            spId: item.chiTietSanPhamId,
            maImel: item.maImel,
          },
        });

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

        if (this.cartItems.length === 0) {
          await axios.delete(`http://localhost:8080/api/client/hoa-don-cho/${this.invoiceId}`);
          localStorage.removeItem('invoiceId');
          this.invoiceId = null;
          this.$refs.toastNotification?.addToast({
            type: 'success',
            message: 'Giỏ hàng trống, hóa đơn chờ đã được xóa!',
            isLoading: false,
            duration: 3000,
          });
        } else {
          this.$refs.toastNotification?.addToast({
            type: 'success',
            message: `Đã xóa sản phẩm "${item.tenSanPham}" khỏi giỏ hàng!`,
            isLoading: false,
            duration: 3000,
          });
        }
        this.updateSelectedItems();
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
        await this.fetchCart();
        this.$refs.toastNotification?.addToast({
          type: 'success',
          message: 'Đã xóa các sản phẩm đã chọn!',
          isLoading: false,
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
/* Custom styles for better visual hierarchy */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease;
}

/* Better focus styles */
input:focus,
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Responsive font sizes */
@media (max-width: 640px) {
  .text-5xl {
    font-size: 3rem;
  }

  .text-4xl {
    font-size: 2.5rem;
  }

  .text-3xl {
    font-size: 2rem;
  }

  .text-2xl {
    font-size: 1.5rem;
  }

  .text-xl {
    font-size: 1.25rem;
  }
}
</style>