<template>
  <div>
    <ToastNotification ref="toast" />
    <div
      class="login-page bg-image"
      style="background-image: url('assets/images/backgrounds/login-bg.jpg')"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"><i class="icon-close"></i></span>
            </button>

            <div class="form-box">
              <div class="form-tab">
                <ul class="nav nav-pills nav-fill nav-border-anim" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      :class="{ active: activeTab === 'signin' }"
                      @click="switchTab('signin')"
                      id="signin-tab"
                      role="tab"
                      aria-controls="signin"
                      :aria-selected="activeTab === 'signin'"
                      >Đăng nhập</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      :class="{ active: activeTab === 'register' }"
                      @click="switchTab('register')"
                      id="register-tab"
                      role="tab"
                      aria-controls="register"
                      :aria-selected="activeTab === 'register'"
                      >Đăng ký</a
                    >
                  </li>
                </ul>
                <div class="tab-content" id="tab-content-5">
                  <div 
                    class="tab-pane"
                    :class="{ 'fade-in active': activeTab === 'signin', 'fade-out': activeTab !== 'signin' }"
                    id="signin" 
                    role="tabpanel" 
                    aria-labelledby="signin-tab"
                    v-show="activeTab === 'signin'"
                  >
                    <form @submit.prevent="handleLogin">
                      <div class="form-group">
                        <label for="singin-email">Tên người dùng hoặc địa chỉ email *</label>
                        <input
                          type="text"
                          class="form-control"
                          id="singin-email"
                          v-model="loginInput"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="singin-password">Mật khẩu *</label>
                        <input
                          type="password"
                          class="form-control"
                          id="singin-password"
                          v-model="password"
                          required
                        />
                      </div>
                      <div class="form-footer">
                        <button type="submit" class="btn btn-outline-primary-2">
                          <span>Đăng nhập</span>
                          <i class="icon-long-arrow-right"></i>
                        </button>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="signin-remember" />
                          <label class="custom-control-label" for="signin-remember">Nhớ mật khẩu</label>
                        </div>
                        <a href="#" class="forgot-link">Quên mật khẩu?</a>
                      </div>
                    </form>
                  </div>
                  <div 
                    class="tab-pane"
                    :class="{ 'fade-in active': activeTab === 'register', 'fade-out': activeTab !== 'register' }"
                    id="register" 
                    role="tabpanel" 
                    aria-labelledby="register-tab"
                    v-show="activeTab === 'register'"
                  >
                    <form @submit.prevent="handleRegister">
                      <div class="registration-info">
                        <div class="info-card">
                          <i class="fas fa-envelope"></i>
                          <h4>Đăng ký nhanh chóng</h4>
                          <p>Chỉ cần nhập email, chúng tôi sẽ tự động tạo tài khoản và gửi thông tin đăng nhập về email của bạn.</p>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="register-email">Địa chỉ email *</label>
                        <input
                          type="email"
                          class="form-control"
                          id="register-email"
                          v-model="registerEmail"
                          required
                        />
                      </div>
                      <div class="form-footer">
                        <button type="submit" class="btn btn-outline-primary-2" :disabled="isRegistering">
                          <span v-if="!isRegistering">Đăng ký</span>
                          <span v-else>Đang xử lý...</span>
                          <i class="icon-long-arrow-right" v-if="!isRegistering"></i>
                          <i class="fas fa-spinner fa-spin" v-else></i>
                        </button>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="register-policy" v-model="agreePolicy" required />
                          <label class="custom-control-label" for="register-policy">
                            Tôi đồng ý với <a href="#">chính sách bảo mật</a> *
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import mitt from 'mitt';
import ToastNotification from '~/components/base/ToastNotification.vue';

const emitter = mitt();

export default {
  components: {
    ToastNotification,
  },
  data() {
    return {
      activeTab: 'signin',
      loginInput: '',
      password: '',
      registerEmail: '',
      agreePolicy: false,
      isRegistering: false,
    };
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
    },
    
    showToast(type, message) {
      this.$refs.toast.addToast({ type, message });
    },
    
    async handleLogin() {
      // Kiểm tra đầu vào trống
      if (!this.loginInput || !this.password) {
        this.showToast('error', 'Tên đăng nhập hoặc email và mật khẩu không được để trống');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8080/tai-khoan/dang-nhap-Web', {
          tenDangNhap: this.loginInput,
          email: this.loginInput,
          matKhau: this.password,
        });

        // Kiểm tra phản hồi từ backend
        if (response.data && response.data.idKhachHang) {
          const { idKhachHang, tenDangNhap, idTaiKhoan, role } = response.data;

          // Lưu thông tin vào localStorage
          localStorage.setItem('customerId', idKhachHang);
          localStorage.setItem('accountId', idTaiKhoan);
          localStorage.setItem('customerName', tenDangNhap);
          localStorage.setItem('role', role);
          localStorage.setItem('isLoggedIn', 'true');

          // Phát sự kiện loginStatusChanged
          emitter.emit('loginStatusChanged', {
            isLoggedIn: true,
            customerName: tenDangNhap,
          });

          this.showToast('success', `Đăng nhập thành công! Chào mừng ${tenDangNhap}`);
          setTimeout(() => {
            this.$router.push('/');
          }, 1500);
        } else {
          this.showToast('error', 'Không tìm thấy thông tin khách hàng từ phản hồi đăng nhập');
        }
      } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        // Xử lý lỗi từ backend
        const errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          'Lỗi kết nối đến máy chủ';
        this.showToast('error', errorMessage);
      }
    },
    
    async handleRegister() {
  // Kiểm tra email trống
  if (!this.registerEmail) {
    this.showToast('error', 'Vui lòng nhập địa chỉ email');
    return;
  }

  // Kiểm tra đồng ý chính sách
  if (!this.agreePolicy) {
    this.showToast('warning', 'Vui lòng đồng ý với chính sách bảo mật');
    return;
  }

  this.isRegistering = true;

  try {
    // Gọi API đăng ký với query param thay vì body
    const response = await axios.post(
      `http://localhost:8080/tai-khoan/dang-ky-email?email=${encodeURIComponent(this.registerEmail)}`
    );

    if (response.data && response.data.success) {
      this.showToast('success', 'Đăng ký thành công! Thông tin tài khoản đã được gửi về email của bạn.');

      // Reset form
      this.registerEmail = '';
      this.agreePolicy = false;

      // Chuyển về tab đăng nhập sau 2 giây
      setTimeout(() => {
        this.switchTab('signin');
      }, 2000);
    } else {
      this.showToast('error', response.data.message || 'Đăng ký thất bại');
    }
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      'Lỗi kết nối đến máy chủ';
    this.showToast('error', errorMessage);
  } finally {
    this.isRegistering = false;
  }
}
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

/* Login Page Layout */
.login-page {
  height: 90vh !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  overflow: hidden;
}

.modal-dialog {
  margin: 0 !important;
  max-width: 500px;
  width: 90%;
}

/* Smooth Tab Transitions */
.tab-content {
  position: relative;
  min-height: 400px;
}

.tab-pane {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.tab-pane.fade-in {
  opacity: 1;
  transform: translateX(0);
  pointer-events: all;
}

.tab-pane.fade-out {
  opacity: 0;
  transform: translateX(-20px);
  pointer-events: none;
}

/* Enhanced Tab Navigation */
.nav-link {
  font-size: 1.5rem !important; /* Increased by 0.6rem from ~0.9rem */
  font-weight: 600;
  padding: 0.875rem 1.5rem !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(19, 173, 117, 0.1), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(19, 173, 117, 0.15);
}

/* Nav Border Animation Styles - Must come after main nav-link styles */
.nav.nav-pills .nav-link:hover, .nav.nav-pills .nav-link:focus {
  color: #0d7a52 !important;
}

.nav-link.active {
  color: #0d7a52 !important;
}

.nav.nav-border-anim .nav-link:before {
  background-color: #0d7a52 !important;
  bottom: 0 !important;
  top: auto !important;
  height: 3px !important;
}

/* Registration Info Card Styling */
.registration-info {
  margin-bottom: 1.5rem;
}

.info-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}

.info-card i {
  font-size: 2.5rem;
  color: #13ad75;
  margin-bottom: 1rem;
  display: block;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-card h4 {
  color: #333;
  font-size: 1.85rem; /* Increased by 0.6rem from 1.25rem */
  font-weight: 600;
  margin-bottom: 0.75rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.info-card p {
  color: #555;
  font-size: 1.5rem; /* Increased by 0.6rem from 0.9rem */
  line-height: 1.5;
  margin: 0;
  font-weight: 400;
}

/* Enhanced Button Styling */
.btn-outline-primary-2 {
  background: linear-gradient(135deg, #13ad75 0%, #0f9463 100%);
  border: 2px solid #13ad75;
  color: white;
  font-weight: 600;
  font-size: 1.4rem; /* Increased by 0.6rem from ~0.8rem */
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-outline-primary-2::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-outline-primary-2:hover::before {
  left: 100%;
}

.btn-outline-primary-2:hover {
  background: linear-gradient(135deg, #0f9463 0%, #0d7a52 100%);
  border-color: #0f9463;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(19, 173, 117, 0.3);
}

.btn-outline-primary-2:focus {
  background: linear-gradient(135deg, #13ad75 0%, #0f9463 100%);
  border-color: #13ad75;
  color: white;
  box-shadow: 0 0 0 0.2rem rgba(19, 173, 117, 0.25);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn:disabled:hover {
  transform: none;
  box-shadow: none;
}

/* Loading Spinner Animation */
.fa-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Enhanced Form Styling */
.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  font-size: 1.4rem; /* Increased by 0.6rem from ~0.8rem */
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-control {
  font-size: 1.3rem; /* Increased by 0.6rem from ~0.7rem */
  padding: 0.875rem 1rem;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-control:focus {
  border-color: #13ad75;
  box-shadow: 0 0 0 0.2rem rgba(19, 173, 117, 0.25);
  transform: translateY(-1px);
}

/* Custom Checkbox Enhancement */
.custom-control-label {
  font-size: 1.3rem; /* Increased by 0.6rem from ~0.7rem */
  font-weight: 400;
  color: #555;
}

.custom-control-input:checked ~ .custom-control-label::before {
  background-color: #13ad75;
  border-color: #13ad75;
}

.custom-control-input:focus ~ .custom-control-label::before {
  box-shadow: 0 0 0 0.2rem rgba(19, 173, 117, 0.25);
}

.forgot-link {
  font-size: 1.3rem; /* Increased by 0.6rem from ~0.7rem */
  color: #13ad75;
  text-decoration: none;
  transition: all 0.3s ease;
}

.forgot-link:hover {
  color: #0f9463;
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-link {
    font-size: 1.3rem !important; /* Adjusted for mobile */
    padding: 0.75rem 1.25rem !important;
  }
  
  .info-card {
    padding: 1.25rem;
  }
  
  .info-card i {
    font-size: 2.5rem; /* Maintained larger size */
  }
  
  .info-card h4 {
    font-size: 1.65rem; /* Increased by 0.6rem from 1.05rem */
  }
  
  .info-card p {
    font-size: 1.35rem; /* Increased by 0.6rem from 0.75rem */
  }
  
  .form-group label {
    font-size: 1.25rem; /* Adjusted for mobile */
  }
  
  .form-control {
    font-size: 1.2rem; /* Adjusted for mobile */
  }
  
  .btn-outline-primary-2 {
    font-size: 1.25rem; /* Adjusted for mobile */
  }
  
  .custom-control-label {
    font-size: 1.2rem; /* Adjusted for mobile */
  }
}

@media (max-width: 480px) {
  .nav-link {
    font-size: 1.2rem !important; /* Further adjusted for small mobile */
    padding: 0.625rem 1rem !important;
  }
  
  .tab-content {
    min-height: 350px; /* Reduced for mobile */
  }
  
  .info-card {
    padding: 1rem;
  }
  
  .info-card i {
    font-size: 2.25rem; /* Maintained larger size */
    margin-bottom: 0.75rem;
  }
  
  .info-card h4 {
    font-size: 1.5rem; /* Increased by 0.6rem from 0.9rem */
    margin-bottom: 0.5rem;
  }
  
  .info-card p {
    font-size: 1.25rem; /* Increased by 0.6rem from 0.65rem */
  }
  
  .form-group label {
    font-size: 1.15rem; /* Adjusted for small mobile */
  }
  
  .form-control {
    font-size: 1.1rem; /* Adjusted for small mobile */
    padding: 0.75rem 0.875rem;
  }
  
  .btn-outline-primary-2 {
    font-size: 1.15rem; /* Adjusted for small mobile */
    padding: 0.75rem 1.5rem;
  }
  
  .custom-control-label {
    font-size: 1.1rem; /* Adjusted for small mobile */
  }
  
  .forgot-link {
    font-size: 1.1rem; /* Adjusted for small mobile */
  }
}
</style>