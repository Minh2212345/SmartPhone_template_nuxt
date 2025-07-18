<template>
    <footer>
        <div class="footer-middle">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-lg-3">
                        <div class="widget widget-about">
                            <img src="assets/images/demos/demo-4/logo.png" class="footer-logo" alt="Footer Logo" />
                        </div>
                    </div>


                    <div class="col-sm-6 col-lg-3">
                        <div class="widget">
                            <h4 class="widget-title" style="color: #ffffff !important;">Mobile world</h4>
                            <!-- End .widget-title -->

                            <ul>
                                <li><a href="about.html">Về Mobile World</a></li>
                                <li><a href="#">Dịch vụ của chúng tôi</a></li>
                                <li><a href="faq.html">FAQ</a></li>
                                <li><a href="contact.html">Liên hệ với chúng tôi</a></li>
                            </ul>
                            <!-- End .widget-hover -->
                        </div>
                        <!-- End .widget -->
                    </div>
                    <!-- End .col-sm-6 col-lg-3 -->

                    <div class="col-sm-6 col-lg-3">
                        <div class="widget">
                            <h4 class="widget-title" style="color: #ffffff !important;">Dịch vụ chăm sóc khách hàng</h4>
                            <!-- End .widget-title -->

                            <ul>
                                <li><a href="#">Phương thức thanh toán</a></li>
                                <li><a href="#">Trả hàng</a></li>
                                <li><a href="#">Vận chuyển</a></li>
                                <li><a href="#">Chính sách</a></li>
                                <li><a href="#">Chính sách bảo mật</a></li>
                            </ul>
                            <!-- End .widget-hover -->
                        </div>
                        <!-- End .widget -->
                    </div>
                    <!-- End .col-sm-6 col-lg-3 -->

                    <div class="col-sm-6 col-lg-3">
                        <div class="widget">
                            <h4 class="widget-title" style="color: #ffffff !important;">Tài khoản</h4>
                            <!-- End .widget-title -->

                            <ul>
                                <li><a href="login.html">Đăng nhập</a></li>
                                <li><a href="cart.html">Xem giỏ hàng</a></li>
                                <li><a href="#">Theo dõi đơn hàng</a></li>
                            </ul>
                            <!-- End .widget-hover -->
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.container {
    width: auto;
    height: auto;
}

footer {
    background: linear-gradient(90deg, #002c69, #13ad75);
    /* Matching navbar gradient */
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
    /* Subtle shadow for depth, mirrored from navbar */
}

ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

footer a {
    color: #ffffff;
    /* White for high contrast, matching navbar links */
    text-decoration: none;
    transition: all 0.3s ease;
    /* Smooth transition to match navbar */
    font-family: 'Inter', sans-serif;
}

footer a:hover {
    color: #ecfdf5;
    /* Light green hover effect to match navbar */
    transform: translateY(-1px);
    /* Subtle lift effect to match navbar */
}

.footer-copyright {
    color: #ffffff;
    /* White for consistency with navbar text */
    font-weight: 500;
    /* Matching navbar text weight */
}

.widget-title {
    color: #ffffff !important;
    /* Ensure widget titles remain white */
    font-weight: 600;
    /* Slightly bolder to match navbar's bold aesthetic */
}

.footer-logo {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    /* Matching navbar logo shadow */
    transition: transform 0.3s ease, filter 0.3s ease;
    /* Matching navbar logo transitions */
    height: 180px;
}

.footer-logo:hover {
    transform: scale(1.05);
    /* Matching navbar logo hover effect */
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4));
    /* Matching navbar logo hover shadow */
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
    }

    .row {
        flex-direction: column;
        gap: 1rem;
    }

    .col-sm-6.col-lg-3 {
        width: 100%;
        text-align: center;
    }
}
</style>