<template>
        <footer class="footer">
            <div class="footer-middle">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6 col-lg-3">
                            <div class="widget widget-about">
                                <img src="assets/images/demos/demo-4/logo.png" class="footer-logo"
                                    alt="Footer Logo" width="105" height="25" />
                                <p style="color: white;">
                                    Mobile World
                                </p>
                            </div>
                        </div>


                        <div class="col-sm-6 col-lg-3">
                            <div class="widget">
                                <h4 class="widget-title" style="color: #ffffff !important;">Mobile world</h4>
                                <!-- End .widget-title -->

                                <ul class="widget-list">
                                    <li><a href="about.html">Về Mobile World</a></li>
                                    <li><a href="#">Dịch vụ của chúng tôi</a></li>
                                    <li><a href="faq.html">FAQ</a></li>
                                    <li><a href="contact.html">Liên hệ với chúng tôi</a></li>
                                </ul>
                                <!-- End .widget-list -->
                            </div>
                            <!-- End .widget -->
                        </div>
                        <!-- End .col-sm-6 col-lg-3 -->

                        <div class="col-sm-6 col-lg-3">
                            <div class="widget">
                                <h4 class="widget-title"  style="color: #ffffff !important;">Dịch vụ chăm sóc khách hàng</h4>
                                <!-- End .widget-title -->

                                <ul class="widget-list">
                                    <li><a href="#">Phương thức thanh toán</a></li>
                                    <li><a href="#">Trả hàng</a></li>
                                    <li><a href="#">Vận chuyển</a></li>
                                    <li><a href="#">Chính sách</a></li>
                                    <li><a href="#">Chính sách bảo mật</a></li>
                                </ul>
                                <!-- End .widget-list -->
                            </div>
                            <!-- End .widget -->
                        </div>
                        <!-- End .col-sm-6 col-lg-3 -->

                        <div class="col-sm-6 col-lg-3">
                            <div class="widget">
                                <h4 class="widget-title"  style="color: #ffffff !important;">Tài khoản</h4>
                                <!-- End .widget-title -->

                                <ul class="widget-list">
                                    <li><a href="login.html">Đăng nhập</a></li>
                                    <li><a href="cart.html">Xem giỏ hàng</a></li>
                                    <li><a href="#">Theo dõi đơn hàng</a></li>
                                </ul>
                                <!-- End .widget-list -->
                            </div>
                            <!-- End .widget -->
                        </div>
                        <!-- End .col-sm-6 col-lg-3 -->
                    </div>
                    <!-- End .row -->
                </div>
                <!-- End .container -->
            </div>
            <!-- End .footer-middle -->

            <div class="footer-bottom">
                <div class="container">
                    <p class="footer-copyright">
                        Copyright © 2025 Mobile World. All Rights Reserved.
                    </p>
                    <!-- End .footer-copyright -->
                    <figure class="footer-payments">
                        <img src="assets/images/payments.png" alt="Payment methods" width="272" height="20" />
                    </figure>
                    <!-- End .footer-payments -->
                </div>
                <!-- End .container -->
            </div>
            <!-- End .footer-bottom -->
        </footer>
        <!-- End .footer -->
</template>
<script>
export default {
  name: 'BaseFooter',
}
</script>

<style scoped>
.container{
width: auto;
height: auto;
}
footer{
  background: #162d63;
}

footer a{
    color: #ffffff;
}

.footer-copyright{
  color: #ffffff;
}
</style>
