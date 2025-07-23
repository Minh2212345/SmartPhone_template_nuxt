```vue
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
                      >Đăng nhập Nhân viên/Admin</a
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
                        <button type="submit" class="btn btn-outline-primary-2" :disabled="isLoading">
                          <span v-if="!isLoading">Đăng nhập</span>
                          <span v-else>Đang xử lý...</span>
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

export default {
  data() {
    return {
      loginInput: '', // Stores username or email
      password: '', // Stores password
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

        // Handle successful login
        alert(response.data); // Example: "Đăng nhập thành công: <taikhoan>"
        // Optionally redirect or store token
        this.$router.push('/'); // Redirect to dashboard or another page
      } catch (error) {
        // Handle error
        if (error.response) {
          alert(error.response.data); // Example: "Vui lòng cung cấp tên đăng nhập hoặc email"
        } else {
          alert('Lỗi kết nối đến máy chủ');
        }
      }
    },
  },
};
</script>

<style scoped>
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
```