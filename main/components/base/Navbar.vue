<template>
  <header class="header" style="height: 9rem; display: flex; align-items: center">
    <div class="container flex items-center justify-between">
      <!-- Logo -->
      <div>
        <NuxtLink to="/">
          <img src="/assets/images/demos/demo-4/logo.png" alt="Logo" class="h-40" />
        </NuxtLink>
      </div>

      <!-- Navigation -->
      <nav class="flex items-center space-x-6">
        <!-- Search -->
        <div class="search relative">
          <input type="text" placeholder="Tìm kiếm sản phẩm" class="border rounded-2xl" />
          <button
            class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#162d63] rounded-full p-2 w-10 h-10 flex items-center justify-center"
          >
            <i class="fas fa-search" style="color: white"></i>
          </button>
        </div>

        <!-- Login -->
        <div class="login">
          <NuxtLink to="/login-page" class="text-white hover:text-gray-300 font-custom">
            <i class="las la-sign-in-alt" style="color: white"></i>
            Đăng nhập</NuxtLink
          >
        </div>

        <!-- Phone -->
        <div class="phone">
          <NuxtLink to="/category-4cols" class="text-white hover:text-gray-300 font-custom">
            <i class="las la-mobile" style="color: white"></i>
            Điện thoại</NuxtLink
          >
        </div>

        <!-- Compare -->
        <div class="compare relative">
          <NuxtLink to="/order-page" class="text-white hover:text-gray-300 font-custom">
            <i class="las la-shipping-fast" style="color: white"></i> Đơn hàng
          </NuxtLink>
        </div>

        <!-- Cart -->
        <div class="cart relative">
          <NuxtLink to="/cart-page" class="text-white hover:text-gray-300 font-custom">
            <i class="icon-shopping-cart" style="color: white"></i> Giỏ hàng
            <span class="badge bg-red-600 text-white rounded-full px-2">2</span>
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>

.font-custom{
font-family: Arial, Helvetica, sans-serif;
}

.header {
  width: 100%;
  background: #162d63;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.space-x-6 > * + * {
  margin-left: 1.5rem;
}

.search input {
  width: 500px;
  height: 30px;
}

.compare-dropdown,
.cart-dropdown {
  display: none;
}

.compare:hover .compare-dropdown,
.cart:hover .cart-dropdown {
  display: block;
}

.badge {
  position: absolute;
  top: -10px;
  right: -10px;
}
</style>
