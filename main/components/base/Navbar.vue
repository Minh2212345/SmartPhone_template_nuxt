<template>
  <nav class="navbar">
    <div class="container">
      <!-- Logo Section -->
      <div>
        <NuxtLink to="/">
          <img src="/assets/images/demos/demo-4/logo.png" alt="Logo" class="logo-img" />
        </NuxtLink>
      </div>

      <!-- Navigation Links -->
      <div class="nav-links">
        <NuxtLink to="/" class="nav-link">Trang chủ</NuxtLink>
        <NuxtLink to="/category-4cols" class="nav-link">Sản phẩm</NuxtLink>
        <NuxtLink to="/compare-page" class="nav-link">So sánh</NuxtLink>
        <NuxtLink to="/order-page" class="nav-link">Đơn hàng</NuxtLink>
        <a href="#" class="nav-link">Hỗ trợ</a>
      </div>

      <!-- Action Buttons -->
      <div class="nav-actions">
        <NuxtLink to="/login-page#signin" class="action-btn login-btn">
          <i class="las la-sign-in-alt"></i> Đăng nhập
        </NuxtLink>
        <NuxtLink to="/cart-page" class="action-btn cart-btn">
          <i class="icon-shopping-cart"></i> Giỏ hàng
          <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
.navbar {
  background: linear-gradient(90deg, #002c69, #13ad75); /* Gradient from primary to secondary color */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Slightly darker shadow for depth */
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.container {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-img {
  height: 100px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3)); /* Subtle shadow for logo */
  transition: transform 0.3s ease, filter 0.3s ease;
}

.logo-img:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4)); /* Enhanced shadow on hover */
}

.nav-links {
  display: flex;
  gap: 3rem;
  align-items: center;
}

.nav-link {
  color: #ffffff; /* White for high contrast on gradient */
  font-size: 1.7rem;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  font-family: 'Inter', sans-serif;
}

.nav-link:hover {
  color: #ecfdf5;
  transform: translateY(-1px);
}

.nav-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 1.5rem;
  font-family: 'Inter', sans-serif;
}

.login-btn {
  color: #ffffff; /* White text for contrast */
  background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent white background */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Semi-transparent white border */
}

.login-btn:hover {
  background-color: rgba(255, 255, 255, 0.2); /* Slightly darker on hover */
  transform: translateY(-1px);
}

.cart-btn {
  color: #ffffff; /* White text for contrast */
  background-color: #047857; /* Darker green for prominence */
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); /* Darker shadow for depth */
}

.cart-btn:hover {
  background-color: #0f9765; /* Even darker green on hover */
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); /* Enhanced shadow on hover */
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #f59e0b; /* Amber for contrast and complementarity */
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .nav-links {
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
  }

  .nav-link {
    width: 100%;
    text-align: center;
    padding: 0.5rem;
  }

  .nav-actions {
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }

  .action-btn {
    justify-content: center;
    width: 100%;
  }
}
</style>