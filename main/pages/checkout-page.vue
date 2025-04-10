<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><NuxtLink to="/">Trang chủ</NuxtLink></li>
          <li class="breadcrumb-item"><NuxtLink to="/cart=page">Giỏ hàng</NuxtLink></li>
          <li class="breadcrumb-item active" aria-current="page">
            <NuxtLink to="/checkout-page">Thanh toán</NuxtLink>
          </li>
        </ol>
      </div>
      <!-- End .container -->
    </nav>
    <!-- End .breadcrumb-nav -->

    <div class="page-content">
      <div class="checkout">
        <div class="container">
          <div class="checkout-discount">
            <form action="#">
              <input type="text" class="form-control" required id="checkout-discount-input" />
              <label for="checkout-discount-input" class="text-truncate"
                >Bạn có mã giảm giá? <span>Click để nhập mã</span></label
              >
            </form>
          </div>
          <!-- End .checkout-discount -->
          <form action="#">
            <div class="row">
              <div class="col-lg-9">
                <h2 class="checkout-title">Chi tiết hóa đơn</h2>
                <!-- End .checkout-title -->
                <div class="row">
                  <div class="col-sm-6">
                    <label>Tên *</label>
                    <input type="text" class="form-control" required />
                  </div>
                  <!-- End .col-sm-6 -->

                  <div class="col-sm-6">
                    <label>Họ *</label>
                    <input type="text" class="form-control" required />
                  </div>
                  <!-- End .col-sm-6 -->
                </div>
                <!-- End .row -->

                <label>Địa chỉ *</label>
                <input type="text" class="form-control" placeholder="Địa chỉ cụ thể" required />

                <div class="row">
                  <div class="col-sm-6">
                    <label>Phường *</label>
                    <input type="text" class="form-control" required />
                  </div>
                  <!-- End .col-sm-6 -->

                  <div class="col-sm-6">
                    <label>Quận *</label>
                    <input type="text" class="form-control" required />
                  </div>
                  <!-- End .col-sm-6 -->
                </div>
                <!-- End .row -->

                <div class="row">
                  <div class="col-sm-12">
                    <label>Số điện thoại *</label>
                    <input type="tel" class="form-control" required />
                  </div>
                  <!-- End .col-sm-6 -->
                </div>
                <!-- End .row -->

                <label>Địa chỉ Email *</label>
                <input type="email" class="form-control" required />

                <label>Ghi chú</label>
                <textarea class="form-control" cols="30" rows="4" placeholder="Ghi chú về đơn hàng"></textarea>
              </div>
              <!-- End .col-lg-9 -->
              <aside class="col-lg-3">
                <div class="summary">
                  <h3 class="summary-title">Đơn hàng của bạn</h3>
                  <!-- End .summary-title -->

                  <table class="table table-summary">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Giá trị</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td><a href="#">Iphone 16 - Trắng - 128GB</a></td>
                        <td>19.190.000 VND</td>
                      </tr>

                      <tr>
                        <td><a href="#">Iphone 16e - Trắng - 128GB</a></td>
                        <td>16.290.000 VND</td>
                      </tr>
                      <tr class="summary-subtotal">
                        <td>Tổng tiền sản phẩm:</td>
                        <td>35.840.000 VND</td>
                      </tr>
                      <!-- End .summary-subtotal -->
                      <tr>
                        <td>Phí vận chuyển:</td>
                        <td>0.0</td>
                      </tr>
                      <tr class="summary-total">
                        <td>Tổng tiền:</td>
                        <td>35.840.000 VND</td>
                      </tr>
                      <!-- End .summary-total -->
                    </tbody>
                  </table>
                  <!-- End .table table-summary -->

                  <div class="accordion-summary" id="accordion-payment">
                    <div class="card">
                      <div class="card-header" id="heading-1">
                        <h2 class="card-title">
                          <a
                            role="button"
                            data-toggle="collapse"
                            href="#collapse-1"
                            aria-expanded="true"
                            aria-controls="collapse-1"
                          >
                            Thanh toán bằng mã QR
                          </a>
                        </h2>
                      </div>
                      <!-- End .card-header -->
                      <div
                        id="collapse-1"
                        class="collapse show"
                        aria-labelledby="heading-1"
                        data-parent="#accordion-payment"
                      >
                        <div class="card-body">Thanh toán bằng mã QR từ tài khoản ngân hàng</div>
                        <!-- End .card-body -->
                      </div>
                      <!-- End .collapse -->
                    </div>
                    <!-- End .card -->

                    <div class="card">
                      <div class="card-header" id="heading-3">
                        <h2 class="card-title">
                          <a
                            class="collapsed"
                            role="button"
                            data-toggle="collapse"
                            href="#collapse-3"
                            aria-expanded="false"
                            aria-controls="collapse-3"
                          >
                            Hình thức COD (Cash on delivery)
                          </a>
                        </h2>
                      </div>
                      <!-- End .card-header -->
                      <div
                        id="collapse-3"
                        class="collapse"
                        aria-labelledby="heading-3"
                        data-parent="#accordion-payment"
                      >
                        <div class="card-body">Thanh toán khi nhận hàng</div>
                        <!-- End .card-body -->
                      </div>
                      <!-- End .collapse -->
                    </div>
                    <!-- End .card -->

                    <div class="card">
                      <div class="card-header" id="heading-5">
                        <h2 class="card-title">
                          <a
                            class="collapsed"
                            role="button"
                            data-toggle="collapse"
                            href="#collapse-5"
                            aria-expanded="false"
                            aria-controls="collapse-5"
                          >
                            Thanh toán bằng thẻ tín dụng
                            <img src="assets/images/payments-summary.png" alt="payments cards" />
                          </a>
                        </h2>
                      </div>
                      <!-- End .card-header -->
                      <div
                        id="collapse-5"
                        class="collapse"
                        aria-labelledby="heading-5"
                        data-parent="#accordion-payment"
                      >
                        <div class="card-body">Thanh toán bằng thẻ tín dụng</div>
                        <!-- End .card-body -->
                      </div>
                      <!-- End .collapse -->
                    </div>
                    <!-- End .card -->
                  </div>
                  <!-- End .accordion -->

                  <button type="submit" class="btn btn-outline-primary-2 btn-order btn-block">
                    <span class="btn-text">Đặt hàng</span>
                    <span class="btn-hover-text">Tiếp tục đặt hàng</span>
                  </button>
                </div>
                <!-- End .summary -->
              </aside>
              <!-- End .col-lg-3 -->
            </div>
            <!-- End .row -->
          </form>
        </div>
        <!-- End .container -->
      </div>
      <!-- End .checkout -->
    </div>
    <!-- End .page-content -->
  </main>
  <!-- End .main -->
</template>
