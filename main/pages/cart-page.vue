<template>
  <div class="page-wrapper">
    <ToastNotification ref="toastNotification" />
    <main class="main">
      <nav aria-label="breadcrumb" class="breadcrumb-nav">
        <div class="container">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <NuxtLink to="/">Trang chủ</NuxtLink>
            </li>
            <li class="breadcrumb-item">
              <NuxtLink to="/category-4cols">Iphone 16 Series</NuxtLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <NuxtLink to="/cart-page">Giỏ hàng</NuxtLink>
            </li>
          </ol>
        </div>
      </nav>

      <div class="page-content">
        <div class="cart">
          <div class="container">
            <div class="row">
              <div class="col-lg-9">
                <table v-if="cartItems.length > 0" class="table table-cart table-mobile">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Tổng tiền</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(item, index) in cartItems" :key="item.maImel">
                      <td class="product-col">
                        <div class="product d-flex align-items-center">
                          <figure class="product-media mr-3">
                            <NuxtLink :to="item.productLink">
                              <img :src="item.image || '/assets/images/placeholder.jpg'" alt="Product image" />
                            </NuxtLink>
                          </figure>
                          <div class="product-details">
                            <h3 class="product-title">
                              <NuxtLink :to="item.productLink">{{ item.tenSanPham || 'Sản phẩm không xác định' }} - {{
                                item.mauSac || 'Không xác định' }} - {{ item.ram || 'Không xác định' }} - {{
                                  item.boNhoTrong || 'Không xác định' }}</NuxtLink>
                            </h3>
                          </div>
                        </div>
                      </td>
                      <td class="price-col">
                        <div class="price-wrapper">
                          <span class="current-price">{{ formatPrice(item.giaBan) }}</span>
                          <span v-if="item.ghiChuGia" class="old-price">{{ item.ghiChuGia }}</span>
                        </div>
                      </td>
                      <td class="quantity-col">
                        <div class="cart-product-quantity">
                          <button class="btn-decrease" :disabled="item.soLuong <= 1"
                            @click="updateQuantity(index, item.soLuong - 1)">-</button>
                          <span class="quantity-display">{{ item.soLuong }}</span>
                          <button class="btn-increase" @click="updateQuantity(index, item.soLuong + 1)">+</button>
                        </div>
                      </td>
                      <td class="total-col">{{ formatPrice(item.tongTien) }}</td>
                      <td class="remove-col">
                        <button class="btn-remove" @click="removeItem(index)"><i class="fas fa-trash-alt"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-else class="text-center p-5">
                  <p>Giỏ hàng của bạn đang trống.</p>
                  <NuxtLink to="/" class="btn btn-outline-primary-2">Tiếp tục mua sắm</NuxtLink>
                </div>

                <div class="cart-bottom">
                  <div class="cart-discount">
                    <form @submit.prevent="applyDiscount">
                      <div class="input-group">
                        <input v-model="discountCode" type="text" class="form-control" placeholder="Mã giảm giá" />
                        <div class="input-group-append">
                          <button class="btn btn-outline-primary-2" type="submit">
                            <i class="icon-long-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <aside class="col-lg-3">
                <div v-if="cartItems.length > 0" class="summary summary-cart">
                  <h3 class="summary-title">Tổng đơn hàng</h3>
                  <table class="table table-summary">
                    <tbody>
                      <tr class="summary-subtotal">
                        <td>Tổng tiền:</td>
                        <td>{{ formatPrice(totalPrice) }}</td>
                      </tr>
                      <tr class="summary-shipping-row">
                        <td>
                          <div>
                            <input id="free-shipping" type="text" name="shipping" class="custom-control-input"
                              disabled />
                            <label class="custom-control-label" for="free-shipping">Phí vận chuyển</label>
                          </div>
                        </td>
                        <td>{{ formatPrice(shippingFee) }}</td>
                      </tr>
                      <tr class="summary-total">
                        <td>Tổng tiền:</td>
                        <td>{{ formatPrice(totalPrice + shippingFee) }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <NuxtLink to="/checkout-page" class="btn btn-outline-primary-2 btn-order btn-block"
                    :disabled="cartItems.length === 0">Thanh toán</NuxtLink>
                </div>
                <div v-else class="text-center p-5">
                  <p>Không có sản phẩm để hiển thị tổng.</p>
                </div>
              </aside>
            </div>
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
