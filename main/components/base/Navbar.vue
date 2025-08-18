<template>
  <nav class="navbar">
    <div class="container">
      <!-- Logo Section -->
      <div class="logo-container">
        <NuxtLink to="/">
          <img src="/assets/images/demos/demo-4/logo.png" alt="Mobile World Logo" class="logo-img" />
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
        <!-- User Greeting and Dropdown -->
        <div v-if="isLoggedIn" class="nav-actions__user">
          <div class="greeting" @mouseenter="showModal = true" @mouseleave="showModal = false">
            Xin chào, {{ customerName }}
          </div>
          <div v-if="showModal" class="dropdown-menu" @mouseenter="showModal = true" @mouseleave="showModal = false">
            <button @click="logout" class="action-btn logout-btn">
              <i class="las la-sign-out-alt"></i> Đăng xuất
            </button>
          </div>
        </div>
        <!-- Login Button -->
        <NuxtLink v-else to="/login-page#signin" class="action-btn login-btn">
          <i class="las la-sign-in-alt"></i> Đăng nhập
        </NuxtLink>
        <!-- Cart Button -->
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
import mitt from 'mitt';

const emitter = mitt();

export default {
  name: 'Navbar',
  data() {
    return {
      cartItemCount: 0,
      invoiceId: null,
      isLoggedIn: false,
      customerName: '',
      showModal: false,
    };
  },
  mounted() {
    this.updateLoginStatus();
    this.fetchCartItemCount();
    emitter.on('loginStatusChanged', this.handleLoginStatusChange);
    this.$router.afterEach(() => {
      this.updateLoginStatus();
    });
  },
  beforeDestroy() {
    emitter.off('loginStatusChanged', this.handleLoginStatusChange);
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
    updateLoginStatus() {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      this.customerName = localStorage.getItem('customerName') || 'Khách';
      this.showModal = false;
    },
    handleLoginStatusChange({ isLoggedIn, customerName }) {
      this.isLoggedIn = isLoggedIn;
      this.customerName = customerName || 'Khách';
      this.showModal = false;
    },
    logout() {
      localStorage.removeItem('customerId');
      localStorage.removeItem('customerName');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('invoiceId');
      this.isLoggedIn = false;
      this.customerName = '';
      this.cartItemCount = 0;
      this.showModal = false;
      emitter.emit('loginStatusChanged', { isLoggedIn: false, customerName: '' });
      alert('Đăng xuất thành công!');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

.navbar {
  background: linear-gradient(90deg, #002c69, #13ad75);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 1rem 0;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.logo-container {
  flex-shrink: 0;
}

.logo-img {
  height: 80px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease, filter 0.3s ease;
}

.logo-img:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 1,5rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #ecfdf5;
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-actions__user {
  position: relative;
}

.greeting {
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 1,5rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.greeting:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  min-width: 160px;
  z-index: 2000;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.login-btn {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.login-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.logout-btn {
  color: #ffffff;
  background-color: #d32f2f;
  width: 100%;
  justify-content: center;
}

.logout-btn:hover {
  background-color: #b71c1c;
  transform: translateY(-2px);
}

.cart-btn {
  color: #ffffff;
  background-color: #047857;
  position: relative;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.cart-btn:hover {
  background-color: #0f9765;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.cart-count {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #f59e0b;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 600;
  width: 1.5rem;
  height: 1.5rem;
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
    gap: 0.5rem;
    width: 100%;
  }

  .nav-link {
    width: 100%;
    text-align: center;
    padding: 0.75rem;
  }

  .nav-actions {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
  }

  .nav-actions__user {
    width: 100%;
  }

  .action-btn {
    justify-content: center;
    width: 100%;
  }

  .greeting {
    width: 100%;
    text-align: center;
  }

  .dropdown-menu {
    position: static;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: none;
    border-radius: 6px;
  }
}
</style>
