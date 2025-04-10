<template>
  <div class="page-wrapper">
    <main class="main">
      <nav aria-label="breadcrumb" class="breadcrumb-nav">
        <div class="container">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><NuxtLink to="/">Trang chủ</NuxtLink></li>
            <li class="breadcrumb-item"><NuxtLink to="/category-4cols">Iphone 16 Series</NuxtLink></li>
            <li class="breadcrumb-item active" aria-current="page"><NuxtLink to="/cart-page">Giỏ hàng</NuxtLink></li>
          </ol>
        </div>
        <!-- End .container -->
      </nav>
      <!-- End .breadcrumb-nav -->

      <div class="page-content">
        <div class="cart">
          <div class="container">
            <div class="row">
              <div class="col-lg-9">
                <table class="table table-cart table-mobile">
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
                    <tr v-for="(item, index) in cartItems" :key="index">
                      <td class="product-col">
                        <div class="product d-flex align-items-center">
                          <figure class="product-media mr-3">
                            <NuxtLink :to="item.productLink">
                              <img :src="item.image" alt="Product image" />
                            </NuxtLink>
                          </figure>
                          <div class="product-details">
                            <h3 class="product-title">
                              <NuxtLink :to="item.productLink">{{ item.name }}</NuxtLink>
                            </h3>
                          </div>
                        </div>
                      </td>
                      <td class="price-col">
                        <div class="price-wrapper">
                          <span class="current-price">{{ formatPrice(item.currentPrice) }}</span>
                          <span class="old-price">{{ formatPrice(item.oldPrice) }}</span>
                        </div>
                      </td>
                      <td class="quantity-col">
                        <div class="cart-product-quantity">
                          <button class="btn-decrease" @click="decreaseQuantity(index)">-</button>
                          <span class="quantity-display">{{ item.quantity }}</span>
                          <button class="btn-increase" @click="increaseQuantity(index)">+</button>
                        </div>
                      </td>
                      <td class="total-col">{{ formatPrice(item.currentPrice * item.quantity) }}</td>
                      <td class="remove-col">
                        <button class="btn-remove" @click="removeItem(index)"><i class="fas fa-trash-alt"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <!-- Giữ nguyên phần cart-bottom -->
                <div class="cart-bottom">
                  <div class="cart-discount">
                    <form action="#">
                      <div class="input-group">
                        <input type="text" class="form-control" required placeholder="Mã giảm giá" />
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
                <div class="summary summary-cart">
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
                            <input type="text" id="free-shipping" name="shipping" class="custom-control-input" />
                            <label class="custom-control-label" for="free-shipping">Phí vận chuyển</label>
                          </div>
                        </td>
                        <td>0.00</td>
                      </tr>
                      <tr class="summary-total">
                        <td>Tổng tiền:</td>
                        <td>{{ formatPrice(totalPrice) }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <NuxtLink to="/checkout-page" class="btn btn-outline-primary-2 btn-order btn-block">Thanh toán</NuxtLink>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <!-- End .page-content -->
    </main>
    <!-- End .main -->
  </div>
</template>

<script>
export default {
  name: 'cartPage',
  data() {
    return {
      cartItems: [
        {
          name: 'Iphone 16 128GB - Trắng',
          currentPrice: 19190000,
          oldPrice: 22490000,
          quantity: 1,
          image: 'assets/images/products/table/product-1.jpg',
          productLink: '/product-page'
        },
        {
          name: 'Iphone 16e 128GB - Đen',
          currentPrice: 16290000,
          oldPrice: 18990000,
          quantity: 1,
          image: 'assets/images/products/table/product-2.jpg',
          productLink: '/product-page'
        }
      ]
    }
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + (item.currentPrice * item.quantity), 0)
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price)
    },
    increaseQuantity(index) {
      if (this.cartItems[index].quantity < 10) {
        // Sử dụng $set để đảm bảo reactivity
        this.$set(this.cartItems[index], 'quantity', this.cartItems[index].quantity + 1)
      }
    },
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        // Sử dụng $set để đảm bảo reactivity
        this.$set(this.cartItems[index], 'quantity', this.cartItems[index].quantity - 1)
      }
    },
    removeItem(index) {
      this.cartItems.splice(index, 1)
    }
  }
}
</script>
<style scoped>
/* Định dạng chung cho bảng giỏ hàng */
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

/* Định dạng cột sản phẩm */
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

/* Định dạng cột giá */
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

.price-col .discount-info {
  display: flex;
  gap: 10px;
  margin-top: 5px;
}

.price-col .discount-amount {
  font-size: 12px;
  color: #e74c3c;
}

.price-col .discount-label {
  font-size: 12px;
  color: #e74c3c;
  background-color: #ffe6e6;
  padding: 2px 5px;
  border-radius: 3px;
}

/* Định dạng cột số lượng */
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

/* Định dạng cột tổng tiền */
.total-col {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* Định dạng nút xóa */
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

/* Responsive */
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

  .price-col .discount-amount,
  .price-col .discount-label {
    font-size: 10px;
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
