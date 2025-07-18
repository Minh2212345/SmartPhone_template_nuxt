<template>
  <nav class="navbar" style="display: flex; align-items: center; justify-content: space-between;">
    <div>
      <NuxtLink to="/">
        <img src="/assets/images/demos/demo-4/logo.png" alt="Logo" class="h-40" />
      </NuxtLink>
    </div>

    <div class="nav-links" style="display: flex; gap: 20px;">
      <NuxtLink class="fontTypeText" to="/">Trang chủ</NuxtLink>
      <NuxtLink class="fontTypeText" to="/category-4cols">Sản phẩm</NuxtLink>
      <NuxtLink class="fontTypeText" to="/compare-page">So sánh</NuxtLink>
      <NuxtLink class="fontTypeText" to="/order-page">Đơn hàng</NuxtLink>
      <a href="#" class="fontTypeText">Hỗ trợ</a>
    </div>
    <div class="nav-actions" style="display: flex; gap: 10px;">
      <NuxtLink class="fontType" to="/login-page#signin">
        <i class="las la-sign-in-alt" style="color: white"></i>
        Đăng nhập
      </NuxtLink>
      <div
        style="background: linear-gradient(335deg, #28a745, #08387B); color: white; padding: 5px 10px; border-radius: 5px; position: relative;">
        <NuxtLink
          class="fontType bg-gradient-to-r from-green-500 to-blue-700 text-white px-4 py-2 rounded hover:from-green-600 hover:to-blue-800 transition"
          to="/cart-page">
          <i class="icon-shopping-cart mr-1"></i>Giỏ hàng
          <span v-if="cartItemCount > 0"
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{{
            cartItemCount }}</span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Navbar',
  data() {
    return {
      cartItemCount: 0,
      invoiceId: null,
    };
  },
  async mounted() {
    await this.fetchCartItemCount();
  },
  methods: {
    async fetchCartItemCount() {
      try {
        this.invoiceId = this.$route.query.invoiceId || localStorage.getItem('invoiceId');
        if (!this.invoiceId) {
          this.cartItemCount = 0;
          return;
        }
        const response = await axios.get(`http://localhost:8080/api/client/gio-hang/${this.invoiceId}`);
        this.cartItemCount = response.data.chiTietGioHangDTOS.reduce((total, item) => total + (item.soLuong || 0), 0);
      } catch (error) {
        console.error('Lỗi khi tải số lượng giỏ hàng:', error);
        this.cartItemCount = 0;
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar{
  background: #162d63;
  transition: all 0.3s ease;
}

.fontType{
background: linear-gradient(335deg, #28a745, #08387B); color: white; border: none; padding: 5px 10px; border-radius: 5px;
}

.fontTypeText{
  color: white; border: none; padding: 5px 10px; border-radius: 5px;
  font-weight: 500;
  transition: color 0.3s ease;
}
</style>
