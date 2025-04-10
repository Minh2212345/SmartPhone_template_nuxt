<template>
  <div class="page-wrapper">
    <main class="main">
      <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
        <div class="container d-flex align-items-center">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><NuxtLink to="/">Trang chủ</NuxtLink></li>
            <li class="breadcrumb-item"><NuxtLink to="/category-4cols">Sản phẩm</NuxtLink></li>
            <li class="breadcrumb-item active" aria-current="page"><NuxtLink to="/product-page">Giỏ hàng</NuxtLink></li>
          </ol>
        </div>
        <!-- End .container -->
      </nav>
      <!-- End .breadcrumb-nav -->

      <div class="page-content">
        <div class="container">
          <div class="product-details-top">
            <div class="row">
              <div class="col-md-6">
                <div class="product-gallery product-gallery-vertical">
                  <div class="row">
                    <figure class="product-main-image">
                      <img
                        id="product-zoom"
                        src="assets/images/products/single/1.jpg"
                        data-zoom-image="assets/images/products/single/1-big.jpg"
                        alt="product image"
                      />

                      <a href="#" id="btn-product-gallery" class="btn-product-gallery">
                        <i class="icon-arrows"></i>
                      </a>
                    </figure>
                    <!-- End .product-main-image -->

                    <div id="product-zoom-gallery" class="product-image-gallery">
                      <a
                        class="product-gallery-item active"
                        href="#"
                        data-image="assets/images/products/single/1.jpg"
                        data-zoom-image="assets/images/products/single/1-big.jpg"
                      >
                        <img src="assets/images/products/single/1-small.jpg" alt="product side" />
                      </a>

                      <a
                        class="product-gallery-item"
                        href="#"
                        data-image="assets/images/products/single/2.jpg"
                        data-zoom-image="assets/images/products/single/2-big.jpg"
                      >
                        <img src="assets/images/products/single/2-small.jpg" alt="product cross" />
                      </a>

                      <a
                        class="product-gallery-item"
                        href="#"
                        data-image="assets/images/products/single/3.jpg"
                        data-zoom-image="assets/images/products/single/3-big.jpg"
                      >
                        <img src="assets/images/products/single/3-small.jpg" alt="product with model" />
                      </a>

                      <a
                        class="product-gallery-item"
                        href="#"
                        data-image="assets/images/products/single/4.jpg"
                        data-zoom-image="assets/images/products/single/4-big.jpg"
                      >
                        <img src="assets/images/products/single/4-small.jpg" alt="product back" />
                      </a>
                    </div>
                    <!-- End .product-image-gallery -->
                  </div>
                  <!-- End .row -->
                </div>
                <!-- End .product-gallery -->
              </div>
              <!-- End .col-md-6 -->

              <div class="col-md-6">
                <div class="product-details">
                  <h1 class="product-title">Iphone 16 - 128GB</h1>
                  <!-- End .product-title -->
                  <div class="memory-options">
                    <div class="d-flex flex-wrap">
                      <div class="option-btn active">
                        128GB<br />22.490.000 đ
                        <span class="check-icon"><i class="fas fa-check"></i></span>
                      </div>
                      <div class="option-btn">
                        256GB<br />25.890.000 đ
                        <span class="check-icon"><i class="fas fa-check"></i></span>
                      </div>
                      <div class="option-btn">
                        512GB<br />29.490.000 đ
                        <span class="check-icon"><i class="fas fa-check"></i></span>
                      </div>
                    </div>
                  </div>

                  <div class="details-filter-row details-row-size">
                    <div class="color-options">
                      <h5>Chọn màu để xem giá và chi nhánh có hàng</h5>
                      <div class="d-flex flex-wrap">
                        <div class="option-btn color-btn">
                          <span class="color-circle" style="background-color: #a3d2ca"></span>
                          Xanh Mộng Kết<br />22.590.000đ
                          <span class="check-icon"><i class="fas fa-check"></i></span>
                        </div>
                        <div class="option-btn color-btn">
                          <span class="color-circle" style="background-color: #b3cde0"></span>
                          Xanh Lưu Ly<br />22.590.000đ
                          <span class="check-icon"><i class="fas fa-check"></i></span>
                        </div>
                        <div class="option-btn color-btn">
                          <span class="color-circle" style="background-color: #f4c2c2"></span>
                          Hồng<br />22.590.000đ
                          <span class="check-icon"><i class="fas fa-check"></i></span>
                        </div>
                        <div class="option-btn color-btn">
                          <span class="color-circle" style="background-color: #333"></span>
                          Đen<br />22.490.000đ
                          <span class="check-icon"><i class="fas fa-check"></i></span>
                        </div>
                        <div class="option-btn color-btn active">
                          <span class="color-circle" style="background-color: #fff; border: 1px solid #ccc"></span>
                          Trắng<br />22.590.000đ
                          <span class="check-icon"><i class="fas fa-check"></i></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- End .details-filter-row -->

                  <div class="details-filter-row details-row-size">
                    <label for="qty">Qty:</label>
                    <div class="product-details-quantity">
                      <input
                        type="number"
                        id="qty"
                        class="form-control"
                        value="1"
                        min="1"
                        max="10"
                        step="1"
                        data-decimals="0"
                        required
                      />
                    </div>
                    <!-- End .product-details-quantity -->
                  </div>
                  <!-- End .details-filter-row -->

                  <div class="product-details-action">
                    <a href="#" class="btn-product btn-cart"><span>Thêm vào giỏ hàng</span></a>

                    <div class="details-action-wrapper">
                      <a href="#" class="btn-product btn-compare" title="Compare"><span>So sánh</span></a>
                    </div>
                    <!-- End .details-action-wrapper -->
                  </div>
                  <!-- End .product-details-action -->

                  <div class="product-details-footer">
                    <div class="product-cat">
                      <span>Phân loại:</span>
                      <a href="#">Iphone</a>, <a href="#">16 Series</a>,
                      <a href="#">Iphone 16</a>
                    </div>
                    <!-- End .product-cat -->

                    <div class="social-icons social-icons-sm">
                      <span class="social-label">Chia sẻ:</span>
                      <a href="#" class="social-icon" title="Facebook" target="_blank"
                        ><i class="icon-facebook-f"></i
                      ></a>
                      <a href="#" class="social-icon" title="Twitter" target="_blank"><i class="icon-twitter"></i></a>
                      <a href="#" class="social-icon" title="Instagram" target="_blank"
                        ><i class="icon-instagram"></i
                      ></a>
                      <a href="#" class="social-icon" title="Pinterest" target="_blank"
                        ><i class="icon-pinterest"></i
                      ></a>
                    </div>
                  </div>
                  <!-- End .product-details-footer -->
                </div>
                <!-- End .product-details -->
              </div>
              <!-- End .col-md-6 -->
            </div>
            <!-- End .row -->
          </div>
          <!-- End .product-details-top -->

          <div class="product-details-tab">
            <ul class="nav nav-pills justify-content-center" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="product-desc-link"
                  data-toggle="tab"
                  href="#product-desc-tab"
                  role="tab"
                  aria-controls="product-desc-tab"
                  aria-selected="true"
                  >Mô tả</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="product-info-link"
                  data-toggle="tab"
                  href="#product-info-tab"
                  role="tab"
                  aria-controls="product-info-tab"
                  aria-selected="false"
                  >Thông tin chi tiết</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="product-review-link"
                  data-toggle="tab"
                  href="#product-review-tab"
                  role="tab"
                  aria-controls="product-review-tab"
                  aria-selected="false"
                  >Đánh giá (2)</a
                >
              </li>
            </ul>
            <div class="tab-content">
              <div
                class="tab-pane fade show active"
                id="product-desc-tab"
                role="tabpanel"
                aria-labelledby="product-desc-link"
              >
                <div class="product-desc-content">
                  <h3>Mô tả sản phẩm</h3>
                  <p>
                    Điện thoại iPhone 16 bản thường 128GB sở hữu thiết kế khung nhôm, mặt lưng kính pha màu cùng với 5
                    màu sắc bắt mắt để lựa chọn. Máy với trọng lượng 170g cùng kích thước màn hình 6.1 inch Super Retina
                    XDR, dải màu P3. Với cấu hình từ chip A18 Bionic mới, điện thoại iPhone mới này mang lại hiệu năng
                    ổn định, đáp ứng nhiều nhu cầu dùng.
                  </p>
                </div>
                <!-- End .product-desc-content -->
              </div>
              <!-- .End .tab-pane -->
              <div class="tab-pane fade" id="product-info-tab" role="tabpanel" aria-labelledby="product-info-link">
                <div class="product-desc-content">
                  <h3>Thông số kỹ thuật</h3>
                  <div class="specs-table">
                    <table class="table table-bordered">
                      <tbody>
                        <tr>
                          <td>Màn hình</td>
                          <td>6.1 inch, Super Retina XDR, độ sáng tối đa 2000 nits</td>
                        </tr>
                        <tr>
                          <td>Camera sau</td>
                          <td>48MP + 12MP, quay video 4K</td>
                        </tr>
                        <tr>
                          <td>Camera trước</td>
                          <td>12MP</td>
                        </tr>
                        <tr>
                          <td>Chip</td>
                          <td>A18 Bionic</td>
                        </tr>
                        <tr>
                          <td>Pin</td>
                          <td>22 giờ sử dụng liên tục, sạc không dây MagSafe</td>
                        </tr>
                        <tr>
                          <td>Bộ nhớ</td>
                          <td>128GB/256GB/512GB</td>
                        </tr>
                        <tr>
                          <td>Kích thước</td>
                          <td>146.7 x 71.5 x 7.8 mm</td>
                        </tr>
                        <tr>
                          <td>Trọng lượng</td>
                          <td>170g</td>
                        </tr>
                        <tr>
                          <td>Chống nước</td>
                          <td>IP68</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3>Đặc điểm nổi bật</h3>
                  <div class="features-list">
                    <div class="feature-item">
                      <h2>Hiệu năng mạnh mẽ với chip A18</h2>
                      <h3>
                        iPhone 16 được trang bị vi xử lý Apple A18, cho hiệu năng mạnh mẽ, đáp ứng tốt các tác vụ nặng
                        như chơi game, thiết kế đồ họa và chạy đa nhiệm.
                      </h3>
                      <img src="assets/images/features/feature-1.jpg" alt="Hiệu năng mạnh mẽ" class="feature-image" />
                    </div>
                    <div class="feature-item">
                      <h2>Điều khiển Camera mới</h2>
                      <h3>Giúp bạn truy cập nhanh các công cụ camera dễ dàng hơn chỉ cần trượt ngón tay.</h3>
                      <img src="assets/images/features/feature-2.jpg" alt="Điều khiển Camera" class="feature-image" />
                    </div>
                    <div class="feature-item">
                      <h2>Hệ thống camera cải tiến</h2>
                      <h3>Chụp ảnh và quay video macro cực kỳ chi tiết và sắc nét dù từ xa hay gần.</h3>
                      <img src="assets/images/features/feature-3.jpg" alt="Hệ thống camera" class="feature-image" />
                    </div>
                    <div class="feature-item">
                      <h2>Thiết kế bền bỉ với nhôm và kính</h2>
                      <h3>
                        Vỏ máy iPhone 16 được làm từ nhôm chuẩn hàng không vũ trụ cứng cáp và kính pha màu ở mặt sau vừa
                        đẹp vừa bền bỉ.
                      </h3>
                      <img src="assets/images/features/feature-4.jpg" alt="Thiết kế bền bỉ" class="feature-image" />
                    </div>
                    <div class="feature-item">
                      <h2>Màu sắc đa dạng</h2>
                      <h3>
                        Các màu sắc thời thượng như Xanh Mộng Kết, Xanh Lưu Ly, Hồng, Đen và Trắng, phù hợp với nhiều
                        phong cách.
                      </h3>
                      <img src="assets/images/features/feature-5.jpg" alt="Màu sắc đa dạng" class="feature-image" />
                    </div>
                  </div>
                </div>
                <!-- End .product-desc-content -->
              </div>
              <!-- .End .tab-pane -->
              <div class="tab-pane fade" id="product-review-tab" role="tabpanel" aria-labelledby="product-review-link">
                <div class="reviews">
                  <h3>Đánh giá (2)</h3>
                  <div class="review">
                    <div class="row no-gutters">
                      <div class="col-auto">
                        <h4><a href="#">Chí Dũng</a></h4>
                        <div class="ratings-container">
                          <div class="ratings">
                            <div class="ratings-val" style="width: 80%"></div>
                            <!-- End .ratings-val -->
                          </div>
                          <!-- End .ratings -->
                        </div>
                        <!-- End .rating-container -->
                        <span class="review-date">12/03/2025</span>
                      </div>
                      <!-- End .col -->
                      <div class="col">
                        <h4>Hiệu năng mạnh mẽ</h4>

                        <div class="review-content">
                          <p>Pin trâu tốt - đẹp - sang - mạnh - hơi nóng máy tí thui</p>
                        </div>
                        <!-- End .review-content -->

                        <div class="review-action">
                          <a href="#"><i class="icon-thumbs-up"></i>Có ích (2)</a>
                          <a href="#"><i class="icon-thumbs-down"></i>Không có ích (0)</a>
                        </div>
                        <!-- End .review-action -->
                      </div>
                      <!-- End .col-auto -->
                    </div>
                    <!-- End .row -->
                  </div>
                  <!-- End .review -->

                  <div class="review">
                    <div class="row no-gutters">
                      <div class="col-auto">
                        <h4><a href="#">Nguyễn Thành Nhân</a></h4>
                        <div class="ratings-container">
                          <div class="ratings">
                            <div class="ratings-val" style="width: 100%"></div>
                            <!-- End .ratings-val -->
                          </div>
                          <!-- End .ratings -->
                        </div>
                        <!-- End .rating-container -->
                        <span class="review-date">19/2/2025</span>
                      </div>
                      <!-- End .col -->
                      <div class="col">
                        <h4>Thời lượng pin cực khủng</h4>

                        <div class="review-content">
                          <p>SVIP nên giữ thời gian lâu hơn 2 năm</p>
                        </div>
                        <!-- End .review-content -->

                        <div class="review-action">
                          <a href="#"><i class="icon-thumbs-up"></i>Có ích (0)</a>
                          <a href="#"><i class="icon-thumbs-down"></i>Không có ích (0)</a>
                        </div>
                        <!-- End .review-action -->
                      </div>
                      <!-- End .col-auto -->
                    </div>
                    <!-- End .row -->
                  </div>
                  <!-- End .review -->
                </div>
                <!-- End .reviews -->
              </div>
              <!-- .End .tab-pane -->
            </div>
            <!-- End .tab-content -->
          </div>
          <!-- End .product-details-tab -->

          <h2 class="title text-center mb-4">Những sản phẩm tương tự</h2>
          <!-- End .title text-center -->

          <div
            class="owl-carousel owl-simple carousel-equal-height carousel-with-shadow"
            data-toggle="owl"
            data-owl-options='{
                            "nav": false, 
                            "dots": true,
                            "margin": 20,
                            "loop": false,
                            "responsive": {
                                "0": {
                                    "items":1
                                },
                                "480": {
                                    "items":2
                                },
                                "768": {
                                    "items":3
                                },
                                "992": {
                                    "items":4
                                },
                                "1200": {
                                    "items":4,
                                    "nav": true,
                                    "dots": false
                                }
                            }
                        }'
          >
            <div class="product product-7 text-center">
              <figure class="product-media">
                <NuxtLink to="/product-page">
                  <img src="assets/images/products/product-4.jpg" alt="Product image" class="product-image" />
                </NuxtLink>

                <div class="product-action-vertical">
                  <NuxtLink to="/compare-page" class="btn-product-icon btn-compare" title="Compare">
                    <span>So sánh</span></NuxtLink
                  >
                </div>
                <!-- End .product-action-vertical -->
              </figure>
              <!-- End .product-media -->

              <div class="product-body">
                <div class="product-cat">
                  <a href="#">Iphone 15 Series</a>
                </div>
                <!-- End .product-cat -->
                <h3 class="product-title">
                  <NuxtLink to="/product-page">Apple - Iphone 15 Pro Max</NuxtLink>
                </h3>
                <!-- End .product-title -->
                <div class="product-price">30.990.000 VND</div>
                <!-- End .product-price -->
                <div class="product-nav product-nav-dots">
                  <a href="#" class="active" style="background: #edd2c8"><span class="sr-only">Color name</span></a>
                  <a href="#" style="background: #eaeaec"><span class="sr-only">Color name</span></a>
                  <a href="#" style="background: #333333"><span class="sr-only">Color name</span></a>
                </div>
              </div>
              <!-- End .product-body -->
            </div>
            <!-- End .product -->

            <div class="product product-7 text-center">
              <figure class="product-media">
                <NuxtLink to="/product-page">
                  <img src="assets/images/products/product-6.jpg" alt="Product image" class="product-image" />
                </NuxtLink>
                <span class="product-label label-new">SP mới</span>
                <div class="product-action-vertical">
                  <NuxtLink to="/compare-page" class="btn-product-icon btn-compare" title="Compare">
                    <span>So sánh</span></NuxtLink
                  >
                </div>
                <!-- End .product-action-vertical -->
              </figure>
              <!-- End .product-media -->

              <div class="product-body">
                <div class="product-cat">
                  <NuxtLink to="/category-4cols">Iphone 16 Series</NuxtLink>
                </div>
                <!-- End .product-cat -->
                <h3 class="product-title"><NuxtLink to="/product-page">Apple - Iphone 16</NuxtLink></h3>
                <!-- End .product-title -->
                <div class="product-price">
                  <span class="out-price">19.190,000 VND</span>
                </div>
                <!-- End .product-price -->
                <div class="product-nav product-nav-dots">
                  <a href="#" style="background: #101010"><span class="sr-only">Color name</span></a>
                  <a href="#" style="background: #bdbdbd"><span class="sr-only">Color name</span></a>
                  <a href="#" class="active" style="background: #1aa7ff"><span class="sr-only">Color name</span></a>
                  <a href="#" class="active" style="background: #5ebc6b"><span class="sr-only">Color name</span></a>
                  <a href="#" class="active" style="background: #de6dcb"><span class="sr-only">Color name</span></a>
                </div>
              </div>
              <!-- End .product-body -->
            </div>
            <!-- End .product -->

            <div class="product product-7 text-center">
              <figure class="product-media">
                <span class="product-label label-top">Top</span>
                <NuxtLink to="/product-page">
                  <img src="assets/images/products/product-11.jpg" alt="Product image" class="product-image" />
                </NuxtLink>

                <div class="product-action-vertical">
                  <NuxtLink to="/compare-page" class="btn-product-icon btn-compare" title="Compare">
                    <span>So sánh</span></NuxtLink
                  >
                </div>
                <!-- End .product-action-vertical -->
              </figure>
              <!-- End .product-media -->

              <div class="product-body">
                <div class="product-cat">
                  <NuxtLink to="/category-4cols">Samsung S24 Series</NuxtLink>
                </div>
                <!-- End .product-cat -->
                <h3 class="product-title"><NuxtLink to="/product-page">Samsung - S24 Ultra</NuxtLink></h3>
                <!-- End .product-title -->
                <div class="product-price">23.990.000 VND</div>
                <!-- End .product-price -->
                <div class="product-nav product-nav-dots">
                  <a href="#" style="background: #3a3a3a"><span class="sr-only">Color name</span></a>
                  <a href="#" style="background: #1a0722"><span class="sr-only">Color name</span></a>
                  <a href="#" style="background: #f5f77d"><span class="sr-only">Color name</span></a>
                  <a href="#" style="background: #000000"><span class="sr-only">Color name</span></a>
                </div>
              </div>
              <!-- End .product-body -->
            </div>
            <!-- End .product -->

            <div class="product product-7 text-center">
              <figure class="product-media">
                <NuxtLink to="/product-page">
                  <img src="assets/images/products/product-10.jpg" alt="Product image" class="product-image" />
                </NuxtLink>

                <div class="product-action-vertical">
                  <NuxtLink to="/compare-page" class="btn-product-icon btn-compare" title="Compare">
                    <span>So sánh</span></NuxtLink
                  >
                </div>
                <!-- End .product-action-vertical -->
              </figure>
              <!-- End .product-media -->

              <div class="product-body">
                <div class="product-cat">
                  <NuxtLink to="/category-4cols">Samsung S24 Series</NuxtLink>
                </div>
                <!-- End .product-cat -->
                <h3 class="product-title"><NuxtLink to="/product-page">Samsung - S24 Plus</NuxtLink></h3>
                <!-- End .product-title -->
                <div class="product-price">18.990.000</div>
                <!-- End .product-price -->
                <div class="product-nav product-nav-dots">
                  <a href="#" style="background: #3a3a3a"><span class="sr-only">Color name</span></a>
                  <a href="#" style="background: #1a0722"><span class="sr-only">Color name</span></a>
                  <a href="#" style="background: #f5f77d"><span class="sr-only">Color name</span></a>
                  <a href="#" style="background: #000000"><span class="sr-only">Color name</span></a>
                </div>
              </div>
              <!-- End .product-body -->
            </div>
            <!-- End .product -->

            <div class="product product-7 text-center">
              <figure class="product-media">
                <a href="product.html">
                  <img src="assets/images/products/product-7.jpg" alt="Product image" class="product-image" />
                </a>

                <div class="product-action-vertical">
                  <NuxtLink to="/compare-page" class="btn-product-icon btn-compare" title="Compare">
                    <span>So sánh</span></NuxtLink
                  >
                  <span class="product-label label-new">SP mới</span>
                </div>
                <!-- End .product-action-vertical -->
              </figure>
              <!-- End .product-media -->

              <div class="product-body">
                <div class="product-cat">
                  <a href="#">Iphone 16 Series</a>
                </div>
                <!-- End .product-cat -->
                <h3 class="product-title"><a href="product.html">Apple - Iphone 16e</a></h3>
                <!-- End .product-title -->
                <div class="product-price">16.290.000 VND</div>
                <!-- End .product-price -->
                <div class="product-nav product-nav-dots">
                  <a href="#" style="background: #101010"><span class="sr-only">Color name</span></a>
                  <a href="#" style="background: #bdbdbd"><span class="sr-only">Color name</span></a>
                  <a href="#" class="active" style="background: #1aa7ff"><span class="sr-only">Color name</span></a>
                  <a href="#" class="active" style="background: #5ebc6b"><span class="sr-only">Color name</span></a>
                  <a href="#" class="active" style="background: #de6dcb"><span class="sr-only">Color name</span></a>
                </div>
              </div>
              <!-- End .product-body -->
            </div>
            <!-- End .product -->
          </div>
          <!-- End .owl-carousel -->
        </div>
        <!-- End .container -->
      </div>
      <!-- End .page-content -->
    </main>
    <!-- End .main -->
  </div>
</template>

<script>
export default {
  name: 'productPage',
  mounted() {
    this.$nextTick(() => {
      window.$('.owl-carousel').owlCarousel({
        nav: false,
        dots: true,
        margin: 20,
        loop: false,
        responsive: {
          0: { items: 1 },
          480: { items: 2 },
          768: { items: 3 },
          992: { items: 4 },
          1200: { items: 4, nav: true, dots: false },
        },
      })
    })
  },
}
</script>

<style scoped>
/* Định dạng bảng thông số kỹ thuật */
.specs-table {
  margin-bottom: 30px;
}

.specs-table table {
  width: 100%;
  border-collapse: collapse;
}

.specs-table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.specs-table td:first-child {
  font-weight: bold;
  background-color: #f9f9f9;
  width: 30%;
}

/* Định dạng danh sách đặc điểm nổi bật */
.features-list {
  margin-top: 20px;
}

.feature-item {
  margin-bottom: 40px;
}

.feature-item h4 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}

.feature-item p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 15px;
}

.feature-image {
  width: 711px;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}

/* Responsive cho hình ảnh */
@media (max-width: 768px) {
  .feature-image {
    width: 100%;
    height: auto;
  }
}
</style>
