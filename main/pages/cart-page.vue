<template>
  <div class="page-wrapper bg-gray-50 py-4">
    <ToastNotification ref="toastNotification" />
    <main class="main container mx-auto px-4">
      <nav aria-label="breadcrumb" class="breadcrumb-nav mb-6">
        <ol class="breadcrumb flex items-center space-x-2 text-sm text-gray-600">
          <li class="breadcrumb-item">
            <NuxtLink to="/" class="text-blue-600 hover:text-blue-800">Trang chủ</NuxtLink>
          </li>
          <li class="text-gray-400">/</li>
          <li class="breadcrumb-item">
            <NuxtLink to="/category-4cols" class="text-blue-600 hover:text-blue-800">Iphone 16 Series</NuxtLink>
          </li>
          <li class="text-gray-400">/</li>
          <li class="breadcrumb-item active" aria-current="page">
            <span class="text-gray-900">Giỏ hàng</span>
          </li>
        </ol>
      </nav>

      <div class="page-content">
        <div class="cart">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Danh sách sản phẩm -->
            <div class="col-span-1 lg:col-span-2">
              <div v-if="cartItems.length > 0" class="space-y-6">
                <div v-for="(item, index) in cartItems" :key="item.maImel"
                  class="card bg-white rounded-lg shadow-md p-5 flex flex-col md:flex-row items-center justify-between gap-5 transition-all hover:shadow-lg">
                  <div class="flex items-center space-x-5 flex-1">
                    <figure class="product-media">
                      <NuxtLink :to="item.productLink">
                        <img :src="item.image || '/assets/images/placeholder.jpg'" alt="Product image"
                          class="w-20 h-20 md:w-24 md:h-24 object-cover rounded-md" />
                      </NuxtLink>
                    </figure>
                    <div class="product-details">
                      <h3 class="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 line-clamp-2">
                        <NuxtLink :to="item.productLink" class="hover:text-blue-600 transition-colors">
                          Điện thoại {{ item.tenSanPham || 'Sản phẩm không xác định' }} - {{ item.mauSac || 'Không xác định' }} - {{ item.ram || 'Không xác định' }} - {{ item.boNhoTrong || 'Không xác định' }}
                        </NuxtLink>
                      </h3>
                      <div class="text-base md:text-lg lg:text-xl text-gray-500 mt-2">
                        <span class="font-medium">Giá: </span>{{ formatPrice(item.giaBan) }}
                        <span v-if="item.ghiChuGia" class="line-through text-gray-400 ml-2">{{ item.ghiChuGia }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-5">
                    <div class="flex items-center border rounded-md">
                      <button class="btn-decrease px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                        :disabled="item.soLuong <= 1" @click="updateQuantity(index, item.soLuong - 1)">-</button>
                      <span class="quantity-display px-4 py-2 text-gray-900 font-medium text-lg md:text-xl">{{
                        item.soLuong }}</span>
                      <button class="btn-increase px-3 py-2 text-gray-600 hover:bg-gray-100"
                        @click="updateQuantity(index, item.soLuong + 1)">+</button>
                    </div>
                    <div class="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900">{{
                      formatPrice(item.tongTien) }}</div>
                    <button class="btn-remove text-red-500 hover:text-red-700 transition-colors text-xl md:text-2xl"
                      @click="removeItem(index)">
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div v-else class="text-center p-6 bg-white rounded-lg shadow-md">
                <p class="text-gray-600 text-lg md:text-xl">Giỏ hàng của bạn đang trống.</p>
                <NuxtLink to="/"
                  class="mt-4 inline-block bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 transition-colors text-lg md:text-xl">
                  Tiếp tục mua sắm
                </NuxtLink>
              </div>
            </div>

            <!-- Tổng đơn hàng -->
            <aside class="col-span-1">
              <div v-if="cartItems.length > 0" class="summary summary-cart bg-white rounded-lg shadow-md p-4 md:p-5">
                <h3 class="summary-title text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-5">Tổng đơn hàng
                </h3>
                <div class="space-y-4">
                  <div class="flex justify-between text-gray-600 text-base md:text-lg lg:text-xl">
                    <span>Tổng tiền sản phẩm:</span>
                    <span>{{ formatPrice(totalPrice) }}</span>
                  </div>
                  <div class="flex justify-between text-gray-600 text-base md:text-lg lg:text-xl">
                    <span>Phí vận chuyển:</span>
                    <span>{{ formatPrice(shippingFee) }}</span>
                  </div>
                  <div
                    class="flex justify-between text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 border-t pt-4">
                    <span>Tổng cộng:</span>
                    <span>{{ formatPrice(totalPrice + shippingFee) }}</span>
                  </div>
                </div>
                <NuxtLink to="/checkout-page"
                  class="btn btn-order mt-6 w-full bg-blue-600 text-white py-3 md:py-4 rounded-md hover:bg-blue-700 transition-colors text-lg md:text-xl">
                  Thanh toán
                </NuxtLink>
              </div>
              <div v-else class="text-center p-6 bg-white rounded-lg shadow-md">
                <p class="text-gray-600 text-lg md:text-xl">Không có sản phẩm để hiển thị tổng.</p>
              </div>
            </aside>
          </div>
        </div>
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
      discountCode: '',
      shippingFee: 30000,
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + (item.tongTien || 0), 0);
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
          // Nếu không có invoiceId, chỉ hiển thị giỏ hàng trống
          this.cartItems = [];
          return;
        }
        await this.fetchCart();
      } catch (error) {
        // Không hiển thị lỗi, chỉ đặt cartItems về rỗng
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
        }));
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
        const response = await axios.post(
          `http://localhost:8080/api/client/gio-hang/them?idHD=${this.invoiceId}`,
          chiTietGioHangDTO
        );
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
        }));

        if (this.cartItems.length === 0) {
          try {
            await axios.delete(`http://localhost:8080/api/client/hoa-don-cho/${this.invoiceId}`);
            localStorage.removeItem('invoiceId');
            this.invoiceId = null;
            this.$refs.toastNotification?.addToast({
              type: 'success',
              message: 'Giỏ hàng trống, hóa đơn chờ đã được xóa!',
              isLoading: false,
              duration: 3000,
            });
          } catch (error) {
            this.handleError(error, 'Lỗi khi xóa hóa đơn chờ');
          }
        } else {
          this.$refs.toastNotification?.addToast({
            type: 'success',
            message: `Đã xóa sản phẩm "${item.tenSanPham}" khỏi giỏ hàng!`,
            isLoading: false,
            duration: 3000,
          });
        }
      } catch (error) {
        this.handleError(error, 'Lỗi khi xóa sản phẩm');
      }
    },
    async applyDiscount() {
      if (!this.discountCode) {
        this.$refs.toastNotification?.addToast({
          type: 'error',
          message: 'Vui lòng nhập mã giảm giá!',
          isLoading: false,
          duration: 5000,
        });
        return;
      }
      try {
        this.$refs.toastNotification?.addToast({
          type: 'info',
          message: 'Chức năng áp dụng mã giảm giá chưa được triển khai.',
          isLoading: false,
          duration: 5000,
        });
      } catch (error) {
        this.handleError(error, 'Lỗi khi áp dụng mã giảm giá');
      }
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
/* Định nghĩa font cho cart-page.vue */
.roboto-cart {
  font-family: "Roboto", sans-serif !important;
  font-optical-sizing: auto !important;
  font-weight: 400 !important;
  /* Thay <weight> bằng 400, có thể điều chỉnh (ví dụ: 700) */
  font-style: normal !important;
  font-variation-settings: "wdth" 100 !important;
}

/* Các style hiện có */
.table-cart {
  width: 100%;
  border-collapse: collapse;
}

.table-cart th,
.table-cart td {
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
  vertical-align: middle;
}

.product-col .product {
  display: flex;
  align-items: center;
}

.product-col .product-media img {
  width: 80px;
  height: auto;
}

.product-col .product-details {
  margin-left: 10px;
}

.product-col .product-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.product-col .product-title a {
  color: #333;
  text-decoration: none;
}

.product-col .product-title a:hover {
  color: #007bff;
}

.price-col .price-wrapper {
  display: flex;
  flex-direction: column;
}

.price-col .current-price {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-right: 10px;
}

.price-col .old-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}

.quantity-col .cart-product-quantity {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.quantity-col .btn-decrease,
.quantity-col .btn-increase {
  width: 24px;
  height: 24px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}

.quantity-col .btn-decrease:hover,
.quantity-col .btn-increase:hover {
  background-color: #f5f5f5;
}

.quantity-col .quantity-display {
  font-size: 16px;
  font-weight: 600;
  width: 30px;
  text-align: center;
  color: #333;
}

.total-col {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.remove-col .btn-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  font-size: 16px;
}

.remove-col .btn-remove:hover {
  color: #e74c3c;
}

.summary-cart .btn-order:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {

  .table-cart th,
  .table-cart td {
    padding: 10px;
  }

  .product-col .product-media img {
    width: 60px;
  }

  .product-col .product-title {
    font-size: 14px;
  }

  .price-col .current-price {
    font-size: 14px;
  }

  .price-col .old-price {
    font-size: 12px;
  }

  .quantity-col .btn-decrease,
  .quantity-col .btn-increase {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }

  .quantity-col .quantity-display {
    font-size: 14px;
    width: 25px;
  }

  .total-col {
    font-size: 14px;
  }
}
</style>
