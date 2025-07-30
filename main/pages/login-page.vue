<template>
  <div>
    <div
      class="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17"
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
                      class="nav-link active"
                      id="signin-tab"
                      data-toggle="tab"
                      href="#signin"
                      role="tab"
                      aria-controls="signin"
                      aria-selected="true"
                      >Đăng nhập</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="register-tab"
                      data-toggle="tab"
                      href="#register"
                      role="tab"
                      aria-controls="register"
                      aria-selected="false"
                      >Đăng ký</a
                    >
                  </li>
                </ul>
                <div class="tab-content" id="tab-content-5">
                  <div class="tab-pane fade show active" id="signin" role="tabpanel" aria-labelledby="signin-tab">
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
                    <div class="form-choice">
                      <p class="text-center">Hoặc đăng nhập bằng</p>
                      <div class="row">
                        <div class="col-sm-6">
                          <a href="#" class="btn btn-login btn-g">
                            <i class="icon-google"></i>
                            Google
                          </a>
                        </div>
                        <div class="col-sm-6">
                          <a href="#" class="btn btn-login btn-f">
                            <i class="icon-facebook-f"></i>
                            Facebook
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                    <form action="#">
                      <div class="form-group">
                        <label for="register-email">Địa chỉ email *</label>
                        <input
                          type="email"
                          class="form-control"
                          id="register-email"
                          name="register-email"
                          required
                        />
                      </div>
                      <div class="form-group">
                        <label for="register-password">Mật khẩu *</label>
                        <input
                          type="password"
                          class="form-control"
                          id="register-password"
                          name="register-password"
                          required
                        />
                      </div>
                      <div class="form-footer">
                        <button type="submit" class="btn btn-outline-primary-2">
                          <span>Đăng ký</span>
                          <i class="icon-long-arrow-right"></i>
                        </button>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="register-policy" required />
                          <label class="custom-control-label" for="register-policy"
                            >Tôi đồng ý với <a href="#">chính sách bảo mật</a> *</label
                          >
                        </div>
                      </div>
                    </form>
                    <div class="form-choice">
                      <p class="text-center">Hoặc đăng ký với</p>
                      <div class="row">
                        <div class="col-sm-6">
                          <a href="#" class="btn btn-login btn-g">
                            <i class="icon-google"></i>
                            Google
                          </a>
                        </div>
                        <div class="col-sm-6">
                          <a href="#" class="btn btn-login btn-f">
                            <i class="icon-facebook-f"></i>
                            Facebook
                          </a>
                        </div>
                      </div>
                    </div>
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

const emitter = mitt(); // Tạo event bus

export default {
  data() {
    return {
      loginInput: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:8080/tai-khoan/dang-nhap-Web', {
          tenDangNhap: this.loginInput,
          email: this.loginInput,
          matKhau: this.password,
        });

        // Giả định API trả về customerId và fullName (điều chỉnh theo API thực tế)
        const { customerId, fullName } = response.data;
        if (customerId) {
          localStorage.setItem('customerId', customerId);
          localStorage.setItem('customerName', fullName || this.loginInput);
          localStorage.setItem('isLoggedIn', 'true');
          
          // Emit sự kiện để thông báo Navbar cập nhật
          emitter.emit('loginStatusChanged', {
            isLoggedIn: true,
            customerName: fullName || this.loginInput,
          });

          alert('Đăng nhập thành công!');
          this.$router.push('/');
        } else {
          alert('Không tìm thấy ID khách hàng từ phản hồi đăng nhập');
        }
      } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        if (error.response) {
          alert(error.response.data.message || 'Lỗi đăng nhập');
        } else {
          alert('Lỗi kết nối đến máy chủ');
        }
      }
    },
  },
};
</script>