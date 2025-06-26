<template>
  <header class="header header-intro-clearance header-4">
    <div class="header-middle">
      <div class="container">
        <div class="header-left">
          <NuxtLink to="/" class="logo">
            <img src="assets/images/demos/demo-4/logo.png" alt="Mobile_world Logo" width="164" height="55" />
          </NuxtLink>
        </div>
        <!-- End .header-left -->

        <div class="header-center">
          <div class="header-search header-search-extended header-search-visible d-none d-lg-block">
            <a href="#" class="search-toggle" role="button"><i class="icon-search"></i></a>
            <form action="#" method="get">
              <div class="header-search-wrapper search-wrapper-wide">
                <label for="q" class="sr-only">Search</label>
                <button class="btn btn-primary" type="submit">
                  <i class="icon-search"></i>
                </button>
                <input type="search" class="form-control" name="q" id="q" placeholder="Tìm kiếm sản phẩm" required />
              </div>
              <!-- End .header-search-wrapper -->
            </form>
          </div>
          <!-- End .header-search -->
        </div>

        <div class="header-right">
          <div class="login">
            <NuxtLink to="/login-page">
              <i class="las la-sign-in-alt" style="color: white;"></i>
              <p>Đăng nhập</p>
            </NuxtLink>
          </div>

          <div class="wishlist">
            <NuxtLink to="/category-4cols">
              <i class="las la-mobile" style="color: white;"></i>
              <p>Điện thoại</p>
            </NuxtLink>
          </div>

          <div class="dropdown compare-dropdown">
            <NuxtLink
              to="/compare-page"
              class="dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-display="static"
              title="Compare Products"
              aria-label="Compare Products"
            >
              <div class="icon">
                <i class="icon-random" style="color: white;"></i>
              </div>
              <p>So sánh</p></NuxtLink
            >

            <div class="dropdown-menu dropdown-menu-right">
              <ul class="compare-products">
                <li class="compare-product">
                  <a href="#" class="btn-remove" title="Remove Product"><i class="icon-close"></i></a>
                  <h4 class="compare-product-title">
                    <a href="product.html">Iphone 15 Pro</a>
                  </h4>
                </li>
                <li class="compare-product">
                  <a href="#" class="btn-remove" title="Remove Product"><i class="icon-close"></i></a>
                  <h4 class="compare-product-title">
                    <a href="product.html">Iphone 15</a>
                  </h4>
                </li>
                <li class="compare-product">
                  <a href="#" class="btn-remove" title="Remove Product"><i class="icon-close"></i></a>
                  <h4 class="compare-product-title">
                    <a href="product.html">Iphone 16</a>
                  </h4>
                </li>
              </ul>

              <div class="compare-actions">
                <a href="#" class="action-link">Bỏ hết</a>
                <a href="#" class="btn btn-outline-primary-2"
                  ><span>Compare</span><i class="icon-long-arrow-right"></i
                ></a>
              </div>
            </div>
            <!-- End .dropdown-menu -->
          </div>
          <!-- End .compare-dropdown -->

          <div class="dropdown cart-dropdown">
            <NuxtLink
              to="/cart-page"
              class="dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-display="static"
            >
              <div class="icon">
                <i class="icon-shopping-cart" style="color: white;"></i>
                <span class="cart-count">2</span>
              </div>
              <p>Giỏ hàng</p></NuxtLink
            >

            <div class="dropdown-menu dropdown-menu-right">
              <div class="dropdown-cart-products">
                <div class="product">
                  <div class="product-cart-details">
                    <h4 class="product-title">
                      <a href="product.html">Iphone 16 - 128GB</a>
                    </h4>

                    <span class="cart-product-info"> 19.190.000 VND </span>
                  </div>
                  <!-- End .product-cart-details -->

                  <figure class="product-image-container">
                    <a href="product.html" class="product-image">
                      <img src="assets/images/products/cart/product-1.jpg" alt="product" />
                    </a>
                  </figure>
                  <a href="#" class="btn-remove" title="Remove Product"><i class="icon-close"></i></a>
                </div>
                <!-- End .product -->

                <div class="product">
                  <div class="product-cart-details">
                    <h4 class="product-title">
                      <a href="product.html">Iphone 16e</a>
                    </h4>

                    <span class="cart-product-info"> 16.290.000 VND </span>
                  </div>
                  <!-- End .product-cart-details -->

                  <figure class="product-image-container">
                    <a href="product.html" class="product-image">
                      <img src="assets/images/products/cart/product-2.jpg" alt="product" />
                    </a>
                  </figure>
                  <a href="#" class="btn-remove" title="Remove Product"><i class="icon-close"></i></a>
                </div>
                <!-- End .product -->
              </div>
              <!-- End .cart-product -->

              <div class="dropdown-cart-total">
                <span>Tổng tiền</span>

                <span class="cart-total-price">35.840.000</span>
              </div>
              <!-- End .dropdown-cart-total -->

              <div class="dropdown-cart-action">
                <NuxtLink to="/cart-page" class="btn btn-outline-primary-2">
                  <span>Giỏ hàng</span>
                </NuxtLink>
                <NuxtLink to="/checkout-page" class="btn btn-outline-primary-2">
                  <span>Thanh toán</span>
                </NuxtLink>
              </div>
              <!-- End .dropdown-cart-total -->
            </div>
            <!-- End .dropdown-menu -->
          </div>
          <!-- End .cart-dropdown -->
        </div>
        <!-- End .header-right -->
      </div>
      <!-- End .container -->
    </div>
    <!-- End .header-middle -->
  </header>
</template>

<script>
export default {
  name: 'BaseNavbar',
  data() {
    return {
      open: false,
      dropdownNavbar: false,
    }
  },
  methods: {
    dropdownToggler() {
      this.dropdownNavbar = !this.dropdownNavbar
    },
  },
}
</script>

<style scoped>
header{
  background: linear-gradient(100deg, #28a745, #08387B) !important;
}

.header-intro-clearance .login a {
  font-size: 2.8rem;
  color: #fff;
  line-height: 1;
}

.header-intro-clearance .account > a,
.header-intro-clearance .login > a,
.header-intro-clearance .compare-dropdown > a,
.header-intro-clearance .cart-dropdown > a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header-intro-clearance .header-middle .header-right p{
    font-size: 0.8rem;
    color: #ffffff;
    font-weight: 600;
}
</style>