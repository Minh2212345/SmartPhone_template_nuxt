<template>
  <main class="main">
    <div class="intro-slider-container mb-5">
      <div
        class="intro-slider owl-carousel owl-theme owl-nav-inside owl-light"
        data-toggle="owl"
        data-owl-options='{
                        "dots": true,
                        "nav": false, 
                        "responsive": {
                            "1200": {
                                "nav": true,
                                "dots": false
                            }
                        }
                    }'
      >
        <div class="intro-slide" style="background-image: url(assets/images/demos/demo-4/slider/slide-1.png)">
          <div class="container intro-content">
            <div class="row justify-content-end">
              <div class="col-auto col-sm-7 col-md-6 col-lg-5">
                <h3 class="intro-subtitle text-third">Sản phẩm mới</h3>
                <!-- End .h3 intro-subtitle -->
                <h1 class="intro-title">Ipad Pro M4</h1>
                <!-- End .intro-title -->

                <div class="intro-price">
                  <sup class="intro-old-price">36.590.000 VND</sup>
                  <br />
                  <span class="text-third">36.224.000 VND</span>
                </div>
                <!-- End .intro-price -->

                <a href="category.html" class="btn btn-primary btn-round">
                  <span>Xem chi tiết</span>
                  <i class="icon-long-arrow-right"></i>
                </a>
              </div>
              <!-- End .col-lg-11 offset-lg-1 -->
            </div>
            <!-- End .row -->
          </div>
          <!-- End .intro-content -->
        </div>
        <!-- End .intro-slide -->

        <div class="intro-slide" style="background-image: url(assets/images/demos/demo-4/slider/slide-2.png)">
          <div class="container intro-content">
            <div class="row justify-content-end">
              <div class="col-auto col-sm-7 col-md-6 col-lg-5">
                <h3 class="intro-subtitle text-primary">Sản phẩm mới</h3>
                <!-- End .h3 intro-subtitle -->
                <h1 class="intro-title">BEATS SOLO 4</h1>
                <!-- End .intro-title -->

                <div class="intro-price">
                  <sup>Giá bán:</sup>
                  <span class="text-primary"> 3.299.000 VNĐ </span>
                </div>
                <!-- End .intro-price -->

                <a href="category.html" class="btn btn-primary btn-round">
                  <span>Xem chi tiết</span>
                  <i class="icon-long-arrow-right"></i>
                </a>
              </div>
              <!-- End .col-md-6 offset-md-6 -->
            </div>
            <!-- End .row -->
          </div>
          <!-- End .intro-content -->
        </div>
        <!-- End .intro-slide -->
      </div>
      <!-- End .intro-slider owl-carousel owl-simple -->

      <span class="slider-loader"></span
      ><!-- End .slider-loader -->
    </div>
    <!-- End .intro-slider-container -->

    <nav aria-label="breadcrumb" class="breadcrumb-nav mb-2">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><NuxtLink to="/">Trang chủ</NuxtLink></li>
          <li class="breadcrumb-item active" aria-current="page">
            <NuxtLink to="/category-4cols">Sản phẩm</NuxtLink>
          </li>
        </ol>
      </div>
      <!-- End .container -->
    </nav>
    <!-- End .breadcrumb-nav -->

    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-9">
            <div class="toolbox">
              <div class="toolbox-left">
                <div class="toolbox-info">Hiện <span>9 trên 56</span> sản phẩm</div>
                <!-- End .toolbox-info -->
              </div>
              <!-- End .toolbox-left -->

              <div class="toolbox-right">
                <div class="toolbox-sort">
                  <label for="sortby">Sắp xếp theo:</label>
                  <div class="select-custom">
                    <select name="sortby" id="sortby" class="form-control">
                      <option value="popularity" selected="selected">Liên quan</option>
                      <option value="rating">Giá cao</option>
                      <option value="date">Giá thấp</option>
                    </select>
                  </div>
                </div>
                <!-- End .toolbox-sort -->
              </div>
              <!-- End .toolbox-right -->
            </div>
            <!-- End .toolbox -->

            <div class="products mb-3">
              <div class="row justify-content-center">
                <div class="col-6 col-md-4 col-lg-4 col-xl-3">
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
                        <NuxtLink to="/category-4cols">Iphone 15 Series</NuxtLink>
                      </div>
                      <!-- End .product-cat -->
                      <h3 class="product-title">
                        <NuxtLink to="/product-page">Apple - Iphone 15 Pro Max</NuxtLink>
                      </h3>
                      <!-- End .product-title -->
                      <div class="product-price">30.990.000 VND</div>
                      <!-- End .product-price -->
                      <div class="product-nav product-nav-dots">
                        <a href="#" class="active" style="background: #edd2c8"
                          ><span class="sr-only">Color name</span></a
                        >
                        <a href="#" style="background: #eaeaec"><span class="sr-only">Color name</span></a>
                        <a href="#" style="background: #333333"><span class="sr-only">Color name</span></a>
                      </div>
                    </div>
                    <!-- End .product-body -->
                  </div>
                  <!-- End .product -->
                </div>
                <!-- End .col-sm-6 col-lg-4 col-xl-3 -->

                <div class="col-6 col-md-4 col-lg-4 col-xl-3">
                  <div class="product product-7 text-center">
                    <figure class="product-media">
                      <NuxtLink to="/product-page">
                        <img src="assets/images/products/product-5.jpg" alt="Product image" class="product-image" />
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
                        <NuxtLink to="/category-4cols">Iphone 16 Series</NuxtLink>
                      </div>
                      <!-- End .product-cat -->
                      <h3 class="product-title"><NuxtLink to="/product-page">Apple - Iphone 16 Pro Max</NuxtLink></h3>
                      <!-- End .product-title -->
                      <div class="product-price">37.990.000 VND</div>
                      <!-- End .product-price -->
                      <div class="product-nav product-nav-dots">
                        <a href="#" class="active" style="background: #edd2c8"
                          ><span class="sr-only">Color name</span></a
                        >
                        <a href="#" style="background: #eaeaec"><span class="sr-only">Color name</span></a>
                        <a href="#" style="background: #333333"><span class="sr-only">Color name</span></a>
                      </div>
                    </div>
                    <!-- End .product-body -->
                  </div>
                  <!-- End .product -->
                </div>
                <!-- End .col-sm-6 col-lg-4 col-xl-3 -->

                <div class="col-6 col-md-4 col-lg-4 col-xl-3">
                  <div class="product product-7 text-center">
                    <figure class="product-media">
                      <NuxtLink to="/product-page">
                        <img src="assets/images/products/product-6.jpg" alt="Product image" class="product-image" />
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
                        <NuxtLink to="/category-4cols">Iphone 16 Series</NuxtLink>
                      </div>
                      <!-- End .product-cat -->
                      <h3 class="product-title"><NuxtLink to="/product-page">Apple - Iphone 16</NuxtLink></h3>
                      <!-- End .product-title -->
                      <div class="product-price">19.190.000 VND</div>
                      <!-- End .product-price -->
                      <div class="product-nav product-nav-dots">
                        <a href="#" style="background: #101010"><span class="sr-only">Color name</span></a>
                        <a href="#" style="background: #bdbdbd"><span class="sr-only">Color name</span></a>
                        <a href="#" class="active" style="background: #1aa7ff"
                          ><span class="sr-only">Color name</span></a
                        >
                        <a href="#" class="active" style="background: #5ebc6b"
                          ><span class="sr-only">Color name</span></a
                        >
                        <a href="#" class="active" style="background: #de6dcb"
                          ><span class="sr-only">Color name</span></a
                        >
                      </div>
                    </div>
                    <!-- End .product-body -->
                  </div>
                  <!-- End .product -->
                </div>
                <!-- End .col-sm-6 col-lg-4 col-xl-3 -->

                <div class="col-6 col-md-4 col-lg-4 col-xl-3">
                  <div class="product product-7 text-center">
                    <figure class="product-media">
                      <NuxtLink to="/product-page">
                        <img src="assets/images/products/product-7.jpg" alt="Product image" class="product-image" />
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
                        <NuxtLink to="/category-4cols">Iphone 16 Series</NuxtLink>
                      </div>
                      <!-- End .product-cat -->
                      <h3 class="product-title"><NuxtLink to="/product-page">Apple - Iphone 16e</NuxtLink></h3>
                      <!-- End .product-title -->
                      <div class="product-price">16.290.000 VND</div>
                      <!-- End .product-price -->
                      <div class="product-nav product-nav-dots">
                        <a href="#" style="background: #101010"><span class="sr-only">Color name</span></a>
                        <a href="#" style="background: #bdbdbd"><span class="sr-only">Color name</span></a>
                        <a href="#" class="active" style="background: #1aa7ff"
                          ><span class="sr-only">Color name</span></a
                        >
                        <a href="#" class="active" style="background: #5ebc6b"
                          ><span class="sr-only">Color name</span></a
                        >
                        <a href="#" class="active" style="background: #de6dcb"
                          ><span class="sr-only">Color name</span></a
                        >
                      </div>
                    </div>
                    <!-- End .product-body -->
                  </div>
                  <!-- End .product -->
                </div>
                <!-- End .col-sm-6 col-lg-4 col-xl-3 -->

                <div class="col-6 col-md-4 col-lg-4 col-xl-3">
                  <div class="product product-7 text-center">
                    <figure class="product-media">
                      <NuxtLink to="/product-page">
                        <img src="assets/images/products/product-8.jpg" alt="Product image" class="product-image" />
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
                        <NuxtLink to="/category-4cols">Samsung S23 Series</NuxtLink>
                      </div>
                      <!-- End .product-cat -->
                      <h3 class="product-title"><NuxtLink to="/product-page">Samsung - S23</NuxtLink></h3>
                      <!-- End .product-title -->
                      <div class="product-price">11.990.000 VND</div>
                      <!-- End .product-price -->
                      <div class="product-nav product-nav-dots">
                        <a href="#" style="background: #eaeaec"><span class="sr-only">Color name</span></a>
                        <a href="#" class="active" style="background: #000000"
                          ><span class="sr-only">Color name</span></a
                        >
                        <a href="#" class="active" style="background: #043418"
                          ><span class="sr-only">Color name</span></a
                        >
                        <a href="#" class="active" style="background: #ab34eb"
                          ><span class="sr-only">Color name</span></a
                        >
                      </div>
                    </div>
                    <!-- End .product-body -->
                  </div>
                  <!-- End .product -->
                </div>
                <!-- End .col-sm-6 col-lg-4 col-xl-3 -->

                <div class="col-6 col-md-4 col-lg-4 col-xl-3">
                  <div class="product product-7 text-center">
                    <figure class="product-media">
                      <NuxtLink to="/product-page">
                        <img src="assets/images/products/product-9.jpg" alt="Product image" class="product-image" />
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
                        <NuxtLink to="/category-4cols">Nothing Phone</NuxtLink>
                      </div>
                      <!-- End .product-cat -->
                      <h3 class="product-title">
                        <NuxtLink to="/product-page">Nothing Phone - 2A Pro Plus</NuxtLink>
                      </h3>
                      <!-- End .product-title -->
                      <div class="product-price">8.890.000 VND</div>
                      <!-- End .product-price -->
                      <div class="product-nav product-nav-dots">
                        <a href="#" style="background: #eaeaec"><span class="sr-only">Color name</span></a>
                        <a href="#" class="active" style="background: #000000"
                          ><span class="sr-only">Color name</span></a
                        >
                      </div>
                    </div>
                    <!-- End .product-body -->
                  </div>
                  <!-- End .product -->
                </div>
                <!-- End .col-sm-6 col-lg-4 col-xl-3 -->

                <div class="col-6 col-md-4 col-lg-4 col-xl-3">
                  <div class="product product-7 text-center">
                    <figure class="product-media">
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
                </div>
                <!-- End .col-sm-6 col-lg-4 col-xl-3 -->

                <div class="col-6 col-md-4 col-lg-4 col-xl-3">
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
                      <div class="product-price">18.990.000 VND</div>
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
                </div>
                <!-- End .col-sm-6 col-lg-4 col-xl-3 -->

                <div class="col-6 col-md-4 col-lg-4 col-xl-3">
                  <div class="product product-7 text-center">
                    <figure class="product-media">
                      <NuxtLink to="/product-page">
                        <img src="assets/images/products/product-12.jpg" alt="Product image" class="product-image" />
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
                        <NuxtLink to="/category-4cols">Samsung S25 Series</NuxtLink>
                      </div>
                      <!-- End .product-cat -->
                      <h3 class="product-title"><NuxtLink to="/product-page">Samsung - S25</NuxtLink></h3>
                      <!-- End .product-title -->
                      <div class="product-price">19.290.000 VND</div>
                      <!-- End .product-price -->
                      <div class="product-nav product-nav-dots">
                        <a href="#" style="background: #3a3a3a"><span class="sr-only">Color name</span></a>
                        <a href="#" style="background: #318e62"><span class="sr-only">Color name</span></a>
                        <a href="#" style="background: #100935"><span class="sr-only">Color name</span></a>
                        <a href="#" style="background: #3d96b6"><span class="sr-only">Color name</span></a>
                      </div>
                    </div>
                    <!-- End .product-body -->
                  </div>
                  <!-- End .product -->
                </div>
                <!-- End .col-sm-6 col-lg-4 col-xl-3 -->

                <div class="col-6 col-md-4 col-lg-4 col-xl-3">
                  <div class="product product-7 text-center">
                    <figure class="product-media">
                      <NuxtLink to="/product-page">
                        <img src="assets/images/products/product-13.jpg" alt="Product image" class="product-image" />
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
                        <NuxtLink to="/category-4cols">Samsung S25 Series</NuxtLink>
                      </div>
                      <!-- End .product-cat -->
                      <h3 class="product-title"><NuxtLink to="/product-page">Samsung - S25 Ultra</NuxtLink></h3>
                      <!-- End .product-title -->
                      <div class="product-price">28.990.000 VND</div>
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
                </div>
                <!-- End .col-sm-6 col-lg-4 col-xl-3 -->

                <div class="col-6 col-md-4 col-lg-4 col-xl-3">
                  <div class="product product-7 text-center">
                    <figure class="product-media">
                      <NuxtLink to="/product-page">
                        <img src="assets/images/products/product-14.jpg" alt="Product image" class="product-image" />
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
                        <NuxtLink to="/category-4cols">Xiaomi 14 Series</NuxtLink>
                      </div>
                      <!-- End .product-cat -->
                      <h3 class="product-title"><NuxtLink to="/product-page">Xiaomi - 14 Series</NuxtLink></h3>
                      <!-- End .product-title -->
                      <div class="product-price">17.499.000 VND</div>
                      <!-- End .product-price -->
                      <div class="product-nav product-nav-dots">
                        <a href="#" style="background: #1d8e43"><span class="sr-only">Color name</span></a>
                        <a href="#" style="background: #1a0722"><span class="sr-only">Color name</span></a>
                        <a href="#" style="background: #ff17d4"><span class="sr-only">Color name</span></a>
                      </div>
                    </div>
                    <!-- End .product-body -->
                  </div>
                  <!-- End .product -->
                </div>
                <!-- End .col-sm-6 col-lg-4 col-xl-3 -->

                <div class="col-6 col-md-4 col-lg-4 col-xl-3">
                  <div class="product product-7 text-center">
                    <figure class="product-media">
                      <NuxtLink to="/product-page">
                        <img src="assets/images/products/product-15.jpg" alt="Product image" class="product-image" />
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
                        <NuxtLink to="/category-4cols">Xiaomi 13 Series</NuxtLink>
                      </div>
                      <!-- End .product-cat -->
                      <h3 class="product-title"><NuxtLink to="/product-page">Xiaomi - 13 Series</NuxtLink></h3>
                      <!-- End .product-title -->
                      <div class="product-price">16.490.000 VND</div>
                      <!-- End .product-price -->
                      <div class="product-nav product-nav-dots">
                        <a href="#" style="background: #1d8e43"><span class="sr-only">Color name</span></a>
                        <a href="#" style="background: #000000"><span class="sr-only">Color name</span></a>
                        <a href="#" style="background: #dbdbdb"><span class="sr-only">Color name</span></a>
                      </div>
                    </div>
                    <!-- End .product-body -->
                  </div>
                  <!-- End .product -->
                </div>
                <!-- End .col-sm-6 col-lg-4 col-xl-3 -->
              </div>
              <!-- End .row -->
            </div>
            <!-- End .products -->

            <nav aria-label="Page navigation">
              <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                  <a class="page-link page-link-prev" href="#" aria-label="Previous" tabindex="-1" aria-disabled="true">
                    <span aria-hidden="true"><i class="icon-long-arrow-left"></i></span>Trang trước
                  </a>
                </li>
                <li class="page-item active" aria-current="page"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item-total">của 6</li>
                <li class="page-item">
                  <a class="page-link page-link-next" href="#" aria-label="Next">
                    Trang sau <span aria-hidden="true"><i class="icon-long-arrow-right"></i></span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <!-- End .col-lg-9 -->
          <aside class="col-lg-3 order-lg-first">
            <div class="sidebar sidebar-shop">
              <div class="widget widget-clean">
                <label>Bộ lọc:</label>
                <a href="#" class="sidebar-filter-clear">Làm mới</a>
              </div>
              <!-- End .widget widget-clean -->

              <div class="widget widget-collapsible">
                <h3 class="widget-title">
                  <a
                    data-toggle="collapse"
                    href="#widget-1"
                    role="button"
                    aria-expanded="true"
                    aria-controls="widget-1"
                  >
                    Tính năng camera
                  </a>
                </h3>
                <!-- End .widget-title -->

                <div class="collapse show">
                  <div class="widget-body">
                    <div class="filter-items filter-items-count">
                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cat-1" />
                          <label class="custom-control-label" for="cat-1">Chụp xóa phông</label>
                        </div>
                        <!-- End .custom-checkbox -->
                        <span class="item-count">3</span>
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cat-2" />
                          <label class="custom-control-label" for="cat-2">Chụp góc rộng</label>
                        </div>
                        <!-- End .custom-checkbox -->
                        <span class="item-count">0</span>
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cat-3" />
                          <label class="custom-control-label" for="cat-3">Quay video 4K</label>
                        </div>
                        <!-- End .custom-checkbox -->
                        <span class="item-count">4</span>
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cat-4" />
                          <label class="custom-control-label" for="cat-4">Chụp Zoom za</label>
                        </div>
                        <!-- End .custom-checkbox -->
                        <span class="item-count">2</span>
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cat-5" />
                          <label class="custom-control-label" for="cat-5">Chụp macro</label>
                        </div>
                        <!-- End .custom-checkbox -->
                        <span class="item-count">2</span>
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cat-6" />
                          <label class="custom-control-label" for="cat-6">Chống rung</label>
                        </div>
                        <!-- End .custom-checkbox -->
                        <span class="item-count">1</span>
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cat-7" />
                          <label class="custom-control-label" for="cat-7">Quay video 8K</label>
                        </div>
                        <!-- End .custom-checkbox -->
                        <span class="item-count">1</span>
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cat-8" />
                          <label class="custom-control-label" for="cat-8">Camera AI</label>
                        </div>
                        <!-- End .custom-checkbox -->
                        <span class="item-count">0</span>
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="cat-8" />
                          <label class="custom-control-label" for="cat-8">Chụp đêm</label>
                        </div>
                        <!-- End .custom-checkbox -->
                        <span class="item-count">10</span>
                      </div>
                      <!-- End .filter-item -->
                    </div>
                    <!-- End .filter-items -->
                  </div>
                  <!-- End .widget-body -->
                </div>
                <!-- End .collapse -->
              </div>
              <!-- End .widget -->

              <div class="widget widget-collapsible">
                <h3 class="widget-title">
                  <a
                    data-toggle="collapse"
                    href="#widget-2"
                    role="button"
                    aria-expanded="true"
                    aria-controls="widget-2"
                  >
                    Nhu cầu sử dụng
                  </a>
                </h3>
                <!-- End .widget-title -->

                <div class="collapse show">
                  <div class="widget-body">
                    <div class="filter-items">
                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="size-1" />
                          <label class="custom-control-label" for="size-1">Chơi game</label>
                        </div>
                        <!-- End .custom-checkbox -->
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="size-2" />
                          <label class="custom-control-label" for="size-2">Pin trâu</label>
                        </div>
                        <!-- End .custom-checkbox -->
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" checked id="size-3" />
                          <label class="custom-control-label" for="size-3">Dung lượng bộ nhớ trong lớn</label>
                        </div>
                        <!-- End .custom-checkbox -->
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" checked id="size-4" />
                          <label class="custom-control-label" for="size-4">Cấu hình cao</label>
                        </div>
                        <!-- End .custom-checkbox -->
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="size-5" />
                          <label class="custom-control-label" for="size-5">Mỏng nhẹ</label>
                        </div>
                        <!-- End .custom-checkbox -->
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="size-6" />
                          <label class="custom-control-label" for="size-6">Chụp ảnh đẹp</label>
                        </div>
                        <!-- End .custom-checkbox -->
                      </div>
                      <!-- End .filter-item -->
                    </div>
                    <!-- End .filter-items -->
                  </div>
                  <!-- End .widget-body -->
                </div>
                <!-- End .collapse -->
              </div>
              <!-- End .widget -->

              <div class="widget widget-collapsible">
                <h3 class="widget-title">
                  <a
                    data-toggle="collapse"
                    href="#widget-3"
                    role="button"
                    aria-expanded="true"
                    aria-controls="widget-3"
                  >
                    Màu sắc
                  </a>
                </h3>
                <!-- End .widget-title -->

                <div class="collapse show">
                  <div class="widget-body">
                    <div class="filter-colors">
                      <a href="#" style="background: #b87145"><span class="sr-only">Color Name</span></a>
                      <a href="#" style="background: #f0c04a"><span class="sr-only">Color Name</span></a>
                      <a href="#" style="background: #333333"><span class="sr-only">Color Name</span></a>
                      <a href="#" class="selected" style="background: #cc3333"
                        ><span class="sr-only">Color Name</span></a
                      >
                      <a href="#" style="background: #3399cc"><span class="sr-only">Color Name</span></a>
                      <a href="#" style="background: #669933"><span class="sr-only">Color Name</span></a>
                      <a href="#" style="background: #f2719c"><span class="sr-only">Color Name</span></a>
                      <a href="#" style="background: #ebebeb"><span class="sr-only">Color Name</span></a>
                    </div>
                    <!-- End .filter-colors -->
                  </div>
                  <!-- End .widget-body -->
                </div>
                <!-- End .collapse -->
              </div>
              <!-- End .widget -->

              <div class="widget widget-collapsible">
                <h3 class="widget-title">
                  <a
                    data-toggle="collapse"
                    href="#widget-4"
                    role="button"
                    aria-expanded="true"
                    aria-controls="widget-4"
                  >
                    Thương hiệu
                  </a>
                </h3>
                <!-- End .widget-title -->

                <div class="collapse show" id="widget-4">
                  <div class="widget-body">
                    <div class="filter-items">
                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="brand-1" />
                          <label class="custom-control-label" for="brand-1">Apple</label>
                        </div>
                        <!-- End .custom-checkbox -->
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="brand-2" />
                          <label class="custom-control-label" for="brand-2">Samsung</label>
                        </div>
                        <!-- End .custom-checkbox -->
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="brand-3" />
                          <label class="custom-control-label" for="brand-3">Huawei</label>
                        </div>
                        <!-- End .custom-checkbox -->
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="brand-4" />
                          <label class="custom-control-label" for="brand-4">Xiaomi</label>
                        </div>
                        <!-- End .custom-checkbox -->
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="brand-5" />
                          <label class="custom-control-label" for="brand-5">Nothing Phone</label>
                        </div>
                        <!-- End .custom-checkbox -->
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="brand-6" />
                          <label class="custom-control-label" for="brand-6">Redmi</label>
                        </div>
                        <!-- End .custom-checkbox -->
                      </div>
                      <!-- End .filter-item -->

                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="brand-7" />
                          <label class="custom-control-label" for="brand-7">Oppo</label>
                        </div>
                        <!-- End .custom-checkbox -->
                      </div>
                      <!-- End .filter-item -->
                    </div>
                    <!-- End .filter-items -->
                  </div>
                  <!-- End .widget-body -->
                </div>
                <!-- End .collapse -->
              </div>

              <div class="widget widget-collapsible">
                <div class="widget-body">
                <div class="price-filter">
                  <div class="label">Hoặc nhập khoảng giá phù hợp với bạn:</div>
                  <div class="range-values">
                    <span id="min-price">450,000đ</span>
                    <span id="max-price">50,000,000đ</span>
                  </div>
                  <div class="range-slider">
                    <div class="slider-track"></div>
                    <div class="slider-range" id="slider-range"></div>
                    <input type="range" id="min-range" min="450000" max="50000000" value="450000" step="10000" />
                    <input type="range" id="max-range" min="450000" max="50000000" value="50000000" step="10000" />
                  </div>
                </div>
              </div>
            </div>
              <!-- End .widget -->
            </div>
            <!-- End .sidebar sidebar-shop -->
          </aside>
          <!-- End .col-lg-3 -->
        </div>
        <!-- End .row -->
      </div>
      <!-- End .container -->
    </div>
    <!-- End .page-content -->
  </main>
  <!-- End .main -->
</template>

<script>
export default {
  name: 'Category4Cols',
}
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif; 
  margin: 20px;
}

.price-filter {
  width: 100%; /* Use 100% width to adapt to the container */
  max-width: 300px; /* Keep a max-width for larger screens */
  margin: 20px 0;
}

.range-values {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 14px; /* Slightly smaller font for better fit */
}

.range-values span {
  color: #333;
}

.range-slider {
  position: relative;
  width: 100%; /* Ensure the slider takes full width of its container */
}

.slider-track {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 5px;
  background: #a8a8a8;
  width: 100%;
  border-radius: 5px;
  z-index: 1;
}

.slider-range {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 5px;
  background: #ff6200; /* Orange color */
  z-index: 2;
}

input[type='range'] {
  position: absolute;
  width: 100%;
  margin: 0;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  z-index: 3;
  pointer-events: none;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: #ff0000; /* Red color for thumb */
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
}

input[type='range']::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  appearance: none;
  height: 5px;
}

input[type='range']::-moz-range-thumb {
  width: 15px;
  height: 15px;
  background: #ff0000;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
}

.label {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 14px; /* Adjust font size for smaller screens */
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .price-filter {
    max-width: 100%; /* Allow it to take full width on smaller screens */
  }

  .range-values {
    font-size: 12px; /* Smaller font for mobile */
  }

  .label {
    font-size: 12px;
  }

  input[type='range']::-webkit-slider-thumb {
    width: 20px; /* Larger thumbs for easier touch on mobile */
    height: 20px;
  }

  input[type='range']::-moz-range-thumb {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 576px) {
  .range-values {
    flex-direction: column; /* Stack the min and max values vertically on very small screens */
    align-items: flex-start;
    gap: 5px;
  }

  .range-values span {
    font-size: 11px;
  }

  .label {
    font-size: 11px;
  }
}
</style>
