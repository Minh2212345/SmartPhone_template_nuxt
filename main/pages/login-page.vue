<template>    
<div>
            <div class="login-page bg-image pt-8 pb-8 pt-md-12 pb-md-12 pt-lg-17 pb-lg-17" style="background-image: url('assets/images/backgrounds/login-bg.jpg')">
     <!-- Sign in / Register Modal -->     
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
                      <form action="#">
                        <div class="form-group">
                          <label for="singin-email">Tên người dùng hoặc địa chỉ email *</label>
                          <input type="text" class="form-control" id="singin-email" name="singin-email" required />
                        </div>
                        <!-- End .form-group -->
  
                        <div class="form-group">
                          <label for="singin-password">Mật khẩu *</label>
                          <input
                            type="password"
                            class="form-control"
                            id="singin-password"
                            name="singin-password"
                            required
                          />
                        </div>
                        <!-- End .form-group -->
  
                        <div class="form-footer">
                          <button type="submit" class="btn btn-outline-primary-2">
                            <span>Đăng nhập</span>
                            <i class="icon-long-arrow-right"></i>
                          </button>
  
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="signin-remember" />
                            <label class="custom-control-label" for="signin-remember">Nhớ mật khẩu</label>
                          </div>
                          <!-- End .custom-checkbox -->
  
                          <a href="#" class="forgot-link">Quên mật khẩu?</a>
                        </div>
                        <!-- End .form-footer -->
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
                          <!-- End .col-6 -->
                          <div class="col-sm-6">
                            <a href="#" class="btn btn-login btn-f">
                              <i class="icon-facebook-f"></i>
                              Facebook
                            </a>
                          </div>
                          <!-- End .col-6 -->
                        </div>
                        <!-- End .row -->
                      </div>
                      <!-- End .form-choice -->
                    </div>
                    <!-- .End .tab-pane -->
                    <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                      <form action="#">
                        <div class="form-group">
                          <label for="register-email">Địa chỉ email *</label>
                          <input type="email" class="form-control" id="register-email" name="register-email" required />
                        </div>
                        <!-- End .form-group -->
  
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
                        <!-- End .form-group -->
  
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
                          <!-- End .custom-checkbox -->
                        </div>
                        <!-- End .form-footer -->
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
                          <!-- End .col-6 -->
                          <div class="col-sm-6">
                            <a href="#" class="btn btn-login btn-f">
                              <i class="icon-facebook-f"></i>
                              Facebook
                            </a>
                          </div>
                          <!-- End .col-6 -->
                        </div>
                        <!-- End .row -->
                      </div>
                      <!-- End .form-choice -->
                    </div>
                    <!-- .End .tab-pane -->
                  </div>
                  <!-- End .tab-content -->
                </div>
                <!-- End .form-tab -->
              </div>
              <!-- End .form-box -->
            </div>
            <!-- End .modal-body -->
          </div>
          <!-- End .modal-content -->
        </div>
        <!-- End .modal-dialog -->    
      </div>
      </div>
          <!-- <script src="assets/js/jquery.min.js"></script>
           <script src="assets/js/bootstrap.bundle.min.js"></script>
           <script src="assets/js/jquery.hoverIntent.min.js"></script>
           <script src="assets/js/jquery.waypoints.min.js"></script>
           <script src="assets/js/superfish.min.js"></script>
           <script src="assets/js/owl.carousel.min.js"></script> -->
</template>