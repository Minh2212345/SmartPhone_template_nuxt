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
        <!-- User Account Section -->
        <div v-if="isLoggedIn" class="user-account-section">
          <!-- User Profile Dropdown -->
          <div class="user-profile-dropdown" @click="toggleUserDropdown" ref="userDropdown">
            <div class="user-profile-trigger">
              <div class="user-avatar">
                <i class="fas fa-user"></i>
              </div>
              <div class="user-info">
                <span class="user-name">{{ customerName }}</span>
                <span class="user-status">Đang hoạt động</span>
              </div>
              <i class="fas fa-chevron-down dropdown-arrow" :class="{ 'rotated': isUserDropdownOpen }"></i>
            </div>
            
            <!-- Dropdown Menu -->
            <div class="dropdown-menu" :class="{ 'show': isUserDropdownOpen }">
              <div class="dropdown-header">
                <div class="user-avatar-large">
                  <i class="fas fa-user"></i>
                </div>
                <div class="user-details">
                  <h4>{{ customerName }}</h4>
                  <p>Thành viên VIP</p>
                </div>
              </div>
              <div class="dropdown-divider"></div>
              <div class="dropdown-items">
                <a href="#" class="dropdown-item">
                  <i class="fas fa-user-circle"></i>
                  <span>Thông tin cá nhân</span>
                </a>
                <a href="/order-page" class="dropdown-item">
                  <i class="fas fa-shopping-bag"></i>
                  <span>Đơn hàng của tôi</span>
                </a>
                <a href="#" class="dropdown-item">
                  <i class="fas fa-heart"></i>
                  <span>Sản phẩm yêu thích</span>
                </a>
                <a href="#" class="dropdown-item">
                  <i class="fas fa-cog"></i>
                  <span>Cài đặt</span>
                </a>
                <div class="dropdown-divider"></div>
                <button @click="logout" class="dropdown-item logout-item">
                  <i class="fas fa-sign-out-alt"></i>
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Login Button -->
        <div v-else class="login-section">
          <NuxtLink to="/login-page#signin" class="modern-login-btn">
            <div class="login-icon">
              <i class="fas fa-sign-in-alt"></i>
            </div>
            <div class="login-text">
              <span class="login-title">Đăng nhập</span>
              <span class="login-subtitle">Truy cập tài khoản</span>
            </div>
          </NuxtLink>
        </div>
        
        <!-- Cart Button -->
        <NuxtLink to="/cart-page" class="modern-cart-btn">
          <div class="cart-icon-wrapper">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
          </div>
          <div class="cart-text">
            <span class="cart-title">Giỏ hàng</span>
            <span class="cart-subtitle">{{ cartItemCount }} sản phẩm</span>
          </div>
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
      isUserDropdownOpen: false,
    };
  },
  mounted() {
    this.updateLoginStatus();
    this.fetchCartItemCount();
    emitter.on('loginStatusChanged', this.handleLoginStatusChange);
    this.$router.afterEach(() => {
      this.updateLoginStatus();
    });
    // Close dropdown when clicking outside
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    emitter.off('loginStatusChanged', this.handleLoginStatusChange);
    document.removeEventListener('click', this.handleClickOutside);
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
    },
    handleLoginStatusChange({ isLoggedIn, customerName }) {
      this.isLoggedIn = isLoggedIn;
      this.customerName = customerName || 'Khách';
    },
    toggleUserDropdown() {
      this.isUserDropdownOpen = !this.isUserDropdownOpen;
    },
    handleClickOutside(event) {
      if (this.$refs.userDropdown && !this.$refs.userDropdown.contains(event.target)) {
        this.isUserDropdownOpen = false;
      }
    },
    logout() {
      this.isUserDropdownOpen = false;
      localStorage.removeItem('customerId');
      localStorage.removeItem('customerName');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('invoiceId');
      this.isLoggedIn = false;
      this.customerName = '';
      this.cartItemCount = 0;
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
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.logo-container {
  flex-shrink: 0;
}

.logo-img {
  height: 90px;
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
  font-size: 1.5rem;
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
  gap: 1.5rem;
  align-items: center;
}

/* User Account Section */
.user-account-section {
  position: relative;
}

.user-profile-dropdown {
  position: relative;
  cursor: pointer;
}

.user-profile-trigger {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.user-profile-trigger:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-name {
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
}

.user-status {
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 400;
}

.dropdown-arrow {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px) scale(0.95);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.dropdown-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.user-avatar-large {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.user-details h4 {
  margin: 0;
  color: #1f2937;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
}

.user-details p {
  margin: 0.25rem 0 0 0;
  color: #6b7280;
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
}

.dropdown-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 0.5rem 0;
}

.dropdown-items {
  padding: 0.5rem;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #374151;
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
}

.dropdown-item:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #1d4ed8;
}

.dropdown-item i {
  width: 16px;
  text-align: center;
  color: #6b7280;
}

.dropdown-item:hover i {
  color: #1d4ed8;
}

.logout-item {
  color: #dc2626 !important;
  margin-top: 0.5rem;
}

.logout-item:hover {
  background: rgba(220, 38, 38, 0.1) !important;
  color: #dc2626 !important;
}

.logout-item i {
  color: #dc2626 !important;
}

/* Login Section */
.login-section {
  position: relative;
}

.modern-login-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.modern-login-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.login-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.login-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.login-title {
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
}

.login-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
}

/* Modern Cart Button */
.modern-cart-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.modern-cart-btn:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.cart-icon-wrapper {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #047857 0%, #065f46 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(4, 120, 87, 0.3);
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
}

.cart-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cart-title {
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
}

.cart-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 400;
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
    gap: 1rem;
  }

  .user-profile-trigger,
  .modern-login-btn,
  .modern-cart-btn {
    width: 100%;
    justify-content: center;
  }

  .dropdown-menu {
    width: calc(100vw - 2rem);
    right: 50%;
    transform: translateX(50%) translateY(-10px) scale(0.95);
  }

  .dropdown-menu.show {
    transform: translateX(50%) translateY(0) scale(1);
  }

  .user-info,
  .login-text,
  .cart-text {
    text-align: center;
  }
}
</style>