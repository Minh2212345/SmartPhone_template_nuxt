<template>
  <div class="account-page">
    <!-- User Info Section -->
    <div class="user-info">
      <h1>Someone Name</h1>
      <p class="phone">0986221206</p>
    </div>

    <div class="divider"></div>

    <!-- Main Content Area -->
    <div class="content-container">
      <!-- Left Sidebar -->
      <div class="sidebar">
        <link rel="stylesheet" href="">
        <NuxtLink to="/" class="section-title">
            <h3>Trang chủ</h3>
        </NuxtLink>
        <hr />
        <div class="menu-section">
          <ul class="menu-list">
            <li><NuxtLink to="/history-page">Lịch sử mua hàng</NuxtLink></li>                                    
            <li><NuxtLink to="">Tra cứu bảo hành</NuxtLink></li>                          
            <li><NuxtLink to="/client-page" class="light-purchase-btn" style="padding: 5px 5px">Tài khoản của bạn</NuxtLink></li>              
            <li class="logout">Thoát tài khoản</li>
          </ul>
        </div>
      </div>

      <!-- Right Content - User Profile -->
      <div class="main-content">
        <div class="profile-section">
          <h2 class="profile-title">Nguyễn Đức Minh</h2>

          <div class="profile-info">
            <div class="info-row">
              <span class="info-label">Họ và tên:</span>
              <input v-model="userInfo.fullName" class="info-input" type="text" />
            </div>

            <div class="info-row">
              <span class="info-label">Email:</span>
              <input v-model="userInfo.email" class="info-input" type="email" placeholder="Chưa cập nhật" />
            </div>

            <div class="info-row">
              <span class="info-label">Giới tính:</span>
              <select v-model="userInfo.gender" class="info-input">
                <option value="">Chưa cập nhật</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div class="info-row">
              <span class="info-label">Số điện thoại:</span>
              <input v-model="userInfo.phone" class="info-input" type="tel" />
            </div>

            <div class="info-row">
              <span class="info-label">Sinh nhật:</span>
              <input v-model="userInfo.birthday" class="info-input" type="date" />
            </div>

            <div class="info-row">
              <span class="info-label">Ngày tham gia Smember:</span>
              <span class="info-value">16/10/2024</span>
            </div>

            <div class="info-row">
              <span class="info-label">Tổng tiền tích lũy từ 01/01/2024:</span>
              <span class="info-value">0đ</span>
            </div>

            <div class="info-row">
              <span class="info-label">Tổng tiền đã mua sắm:</span>
              <span class="info-value">2.425.000đ</span>
            </div>

            <div class="info-row">
              <span class="info-label">Địa chỉ:</span>
              <input v-model="userInfo.address" class="info-input" type="text" placeholder="Chưa có địa chỉ mặc định" />
            </div>
          </div>

          <div class="action-buttons">
            <button class="change-password-btn">Đổi mật khẩu</button>
            <button class="update-info-btn" @click="updateUserInfo">Cập nhật thông tin</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountPage',
  data() {
    return {
      userInfo: {
        fullName: 'Nguyễn Đức Minh',
        email: '',
        gender: '',
        phone: '0986221206',
        birthday: '2006-12-22',
        address: '',
      },
    }
  },
  methods: {
    updateUserInfo() {
      // Xử lý cập nhật thông tin người dùng
      console.log('Thông tin đã cập nhật:', this.userInfo)
      alert('Thông tin đã được cập nhật thành công!')
    },
  },
}
</script>

<style scoped>
.light-purchase-btn {
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(153deg, #ffffff, #5b7c99);
  color: #333;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
}

.account-page {
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}

.user-info h1 {
  font-size: 24px;
  margin-bottom: 5px;
}

.phone {
  margin: 5px 0;
  color: #666;
}

.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 15px 0;
}

.content-container {
  display: flex;
  gap: 30px;
}

.sidebar {
  width: 250px;
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
  height: fit-content; 
}

.menu-section {
  height: auto;
}

.section-title {
  font-size: 18px;
  margin-bottom: 20px;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  padding: 10px 0;
  cursor: pointer;
  font-size: 14px;
  border-bottom: 1px solid #e0e0e0;
}

.menu-list li:last-child {
  border-bottom: none;
}

.menu-list li.active {
  color: #ff5722;
  font-weight: bold;
}

.menu-list li.logout {
  color: #f44336;
  margin-top: 15px;
}

.main-content {
  flex: 1;
}

.profile-section {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.profile-title {
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
}

.profile-info {
  margin-bottom: 25px;
}

.info-row {
  display: flex;
  margin-bottom: 15px;
  align-items: center;
}

.info-label {
  width: 220px;
  font-weight: 500;
  color: #555;
}

.info-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.info-input:focus {
  outline: none;
  border-color: #5b7c99;
}

.info-value {
  flex: 1;
  color: #666;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.change-password-btn,
.update-info-btn {
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.change-password-btn {
  background: #f5f5f5;
  border: 1px solid #ddd;
  color: #333;
}

.change-password-btn:hover {
  background: #e0e0e0;
}

.update-info-btn {
  background: #5b7c99;
  border: 1px solid #5b7c99;
  color: white;
}

.update-info-btn:hover {
  background: #4a6a85;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .light-purchase-btn {
    padding: 5px 5px !important;
    font-size: 14px;
  }

  .content-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    margin-bottom: 20px;
  }

  .info-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .info-label {
    width: 100%;
    margin-bottom: 5px;
  }

  .info-input {
    width: 100%;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>
