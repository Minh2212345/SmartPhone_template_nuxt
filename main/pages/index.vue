<template>
  <div class="page-wrapper">
    <main class="main">
      <div class="container homepage-section mb-5">
        <div class="row">

          <!-- Cột giữa: Slider chính -->
          <div class="col-lg-9">
            <div class="intro-slider-container">
              <div
                class="intro-slider owl-carousel owl-theme owl-nav-inside owl-light"
                data-toggle="owl"
                :data-owl-options="owlOptions"
              >
                <div class="intro-slide" style="background-image: url(assets/images/demos/demo-4/slider/slide-1.png)">
                  <div class="container intro-content">
                    <div class="row justify-content-end">
                      <div class="col-auto col-sm-7 col-md-6 col-lg-5">
                        <h3 class="intro-subtitle text-third">Sản phẩm mới</h3>
                        <h2 class="intro-title">Ipad Pro M4</h2>
                        <br>
                        <div class="intro-price">
                          <sup class="intro-old-price">36.590.000 VND</sup>
                          <br />
                          <span class="text-primary">36.224.000 VND</span>
                        </div>
                        <a href="category.html" class="btn btn-primary btn-round">
                          <span>Xem chi tiết</span>
                          <i class="icon-long-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="intro-slide" style="background-image: url(assets/images/demos/demo-4/slider/slide-2.png)">
                  <div class="container intro-content">
                    <div class="row justify-content-end">
                      <div class="col-auto col-sm-7 col-md-6 col-lg-5">
                        <h3 class="intro-subtitle text-primary">Sản phẩm mới</h3>
                        <h2 class="intro-title">BEATS SOLO 4</h2>
                        <div class="intro-price">
                          <span class="text-primary">3.299.000 VNĐ</span>
                        </div>
                        <a href="category.html" class="btn btn-primary btn-round">
                          <span>Xem chi tiết</span>
                          <i class="icon-long-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span class="slider-loader"></span>
            </div>
          </div>

          <!-- Cột phải: Banner dọc -->
          <div class="col-lg-3">
            <div class="banner-right">
              <div class="banner-item mb-2">
                <a href="#">
                  <img src="assets/images/banners/banner-1.jpg" alt="Galaxy M55 5G" class="img-banner" />
                </a>
              </div>
              <div class="banner-item mb-2">
                <a href="#">
                  <img src="assets/images/banners/banner-2.jpg" alt="iPad Air" class="img-banner" />
                </a>
              </div>
              <div class="banner-item banner-item-last">
                <a href="#">
                  <img src="assets/images/banners/banner-3.jpg" alt="Banner 3" class="img-banner" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sản phẩm mới -->
      <div class="container new-arrivals mb-4">
        <div class="heading heading-flex mb-3">
          <div class="heading-left">
            <h2 class="title">Sản phẩm mới</h2>
          </div>
          <div class="heading-right">
            <div class="btn-group d-flex" role="tablist">
              <a
                id="new-all-link"
                class="btn btn-outline-primary rounded-pill m-1"
                data-toggle="tab"
                href="#new-all-tab"
                role="tab"
                aria-controls="new-all-tab"
                aria-selected="true"
                :class="{ active: true }"
                >All</a
              >
              <a
                id="new-tv-link"
                class="btn btn-outline-primary rounded-pill m-1"
                data-toggle="tab"
                href="#new-tv-tab"
                role="tab"
                aria-controls="new-tv-tab"
                aria-selected="false"
                >iPhone</a
              >
              <a
                id="new-computers-link"
                class="btn btn-outline-primary rounded-pill m-1"
                data-toggle="tab"
                href="#new-computers-tab"
                role="tab"
                aria-controls="new-computers-tab"
                aria-selected="false"
                >Samsung</a
              >
              <a
                id="new-phones-link"
                class="btn btn-outline-primary rounded-pill m-1"
                data-toggle="tab"
                href="#new-phones-tab"
                role="tab"
                aria-controls="new-phones-tab"
                aria-selected="false"
                >OPPO</a
              >
            </div>
          </div>
        </div>
        <div class="tab-content tab-content-carousel just-action-icons-sm">
          <div id="new-all-tab" class="tab-pane p-0 fade show active" role="tabpanel" aria-labelledby="new-all-link">
            <div
              class="owl-carousel owl-simple carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                "nav": false,
                "dots": true,
                "margin": 20,
                "loop": false,
                "responsive": {
                  "0": { "items": 1 },
                  "480": { "items": 2 },
                  "768": { "items": 3 },
                  "992": { "items": 4 },
                  "1200": { "items": 4, "nav": true, "dots": false }
                }
              }'
            >
              <div v-for="product in newProducts" :key="product.id" class="product product-7 text-center shadow">
                <figure class="product-media">
                  <span v-if="isNewProduct(product)" class="product-label label-new">SP mới</span>
                  <NuxtLink :to="`/product-page?sp_id=${product.id}`">
                    <img
                      :src="product.imageUrl || '/assets/images/placeholder.jpg'"
                      alt="Product image"
                      class="product-image"
                    />
                  </NuxtLink>
                  <div class="product-action-vertical">
                    <NuxtLink to="/compare-page" class="btn-product-icon btn-compare" title="Compare">
                      <span>So sánh</span>
                    </NuxtLink>
                  </div>
                </figure>
                <div class="product-body">
                  <div class="product-cat">
                    <a href="#">{{ manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown' }}</a>
                  </div>
                  <h3 class="product-title">
                    <NuxtLink :to="`/product-page?sp_id=${product.id}`">{{ product.tenSanPham }}</NuxtLink>
                  </h3>
                  <div class="product-price">{{ formatPrice(product.giaBan || 0) }} VND</div>
                </div>
              </div>
            </div>
          </div>
          <!-- Các tab khác giữ nguyên -->
          <div id="new-tv-tab" class="tab-pane p-0 fade" role="tabpanel" aria-labelledby="new-tv-link">
            <div
              class="owl-carousel owl-simple carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                "nav": false,
                "dots": true,
                "margin": 20,
                "loop": false,
                "responsive": {
                  "0": { "items": 1 },
                  "480": { "items": 2 },
                  "768": { "items": 3 },
                  "992": { "items": 4 },
                  "1200": { "items": 4, "nav": true, "dots": false }
                }
              }'
            >
              <div v-for="product in iPhoneProducts" :key="product.id" class="product product-7 text-center shadow">
                <figure class="product-media">
                  <span v-if="isNewProduct(product)" class="product-label label-new">SP mới</span>
                  <NuxtLink :to="`/product-page?sp_id=${product.id}`">
                    <img
                      :src="product.imageUrl || '/assets/images/placeholder.jpg'"
                      alt="Product image"
                      class="product-image"
                    />
                  </NuxtLink>
                  <div class="product-action-vertical">
                    <NuxtLink to="/compare-page" class="btn-product-icon btn-compare" title="Compare">
                      <span>So sánh</span>
                    </NuxtLink>
                  </div>
                </figure>
                <div class="product-body">
                  <div class="product-cat">
                    <a href="#">{{ manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown' }}</a>
                  </div>
                  <h3 class="product-title">
                    <NuxtLink :to="`/product-page?sp_id=${product.id}`">{{ product.tenSanPham }}</NuxtLink>
                  </h3>
                  <div class="product-price">{{ formatPrice(product.giaBan || 0) }} VND</div>
                </div>
              </div>
            </div>
          </div>
          <div id="new-computers-tab" class="tab-pane p-0 fade" role="tabpanel" aria-labelledby="new-computers-link">
            <div
              class="owl-carousel owl-simple carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                "nav": false,
                "dots": true,
                "margin": 20,
                "loop": false,
                "responsive": {
                  "0": { "items": 1 },
                  "480": { "items": 2 },
                  "768": { "items": 3 },
                  "992": { "items": 4 },
                  "1200": { "items": 4, "nav": true, "dots": false }
                }
              }'
            >
              <div v-for="product in samsungProducts" :key="product.id" class="product product-7 text-center shadow">
                <figure class="product-media">
                  <span v-if="isNewProduct(product)" class="product-label label-new">SP mới</span>
                  <NuxtLink :to="`/product-page?sp_id=${product.id}`">
                    <img
                      :src="product.imageUrl || '/assets/images/placeholder.jpg'"
                      alt="Product image"
                      class="product-image"
                    />
                  </NuxtLink>
                  <div class="product-action-vertical">
                    <NuxtLink to="/compare-page" class="btn-product-icon btn-compare" title="Compare">
                      <span>So sánh</span>
                    </NuxtLink>
                  </div>
                </figure>
                <div class="product-body">
                  <div class="product-cat">
                    <a href="#">{{ manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown' }}</a>
                  </div>
                  <h3 class="product-title">
                    <NuxtLink :to="`/product-page?sp_id=${product.id}`">{{ product.tenSanPham }}</NuxtLink>
                  </h3>
                  <div class="product-price">{{ formatPrice(product.giaBan || 0) }} VND</div>
                </div>
              </div>
            </div>
          </div>
          <div id="new-phones-tab" class="tab-pane p-0 fade" role="tabpanel" aria-labelledby="new-phones-link">
            <div
              class="owl-carousel owl-simple carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                "nav": false,
                "dots": true,
                "margin": 20,
                "loop": false,
                "responsive": {
                  "0": { "items": 1 },
                  "480": { "items": 2 },
                  "768": { "items": 3 },
                  "992": { "items": 4 },
                  "1200": { "items": 4, "nav": true, "dots": false }
                }
              }'
            >
              <div v-for="product in oppoProducts" :key="product.id" class="product product-7 text-center shadow">
                <figure class="product-media">
                  <span v-if="isNewProduct(product)" class="product-label label-new">SP mới</span>
                  <NuxtLink :to="`/product-page?sp_id=${product.id}`">
                    <img
                      :src="product.imageUrl || '/assets/images/placeholder.jpg'"
                      alt="Product image"
                      class="product-image"
                    />
                  </NuxtLink>
                  <div class="product-action-vertical">
                    <NuxtLink to="/compare-page" class="btn-product-icon btn-compare" title="Compare">
                      <span>So sánh</span>
                    </NuxtLink>
                  </div>
                </figure>
                <div class="product-body">
                  <div class="product-cat">
                    <a href="#">{{ manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown' }}</a>
                  </div>
                  <h3 class="product-title">
                    <NuxtLink :to="`/product-page?sp_id=${product.id}`">{{ product.tenSanPham }}</NuxtLink>
                  </h3>
                  <div class="product-price">{{ formatPrice(product.giaBan || 0) }} VND</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container text-center">
        <hr class="mb-0" />
        <div
          class="owl-carousel mt-5 mb-5 owl-simple"
          data-toggle="owl"
          data-owl-options='{
            "nav": false,
            "dots": false,
            "margin": 30,
            "loop": false,
            "responsive": {
              "0": { "items": 2 },
              "420": { "items": 3 },
              "600": { "items": 4 },
              "900": { "items": 5 },
              "1024": { "items": 6 }
            }
          }'
        >
          <a href="#" class="brand">
            <img src="assets/images/brands/1.png" alt="Brand Name" />
          </a>
          <a href="#" class="brand">
            <img src="assets/images/brands/2.png" alt="Brand Name" />
          </a>
          <a href="#" class="brand">
            <img src="assets/images/brands/3.png" alt="Brand Name" />
          </a>
          <a href="#" class="brand">
            <img src="assets/images/brands/4.png" alt="Brand Name" />
          </a>
          <a href="#" class="brand">
            <img src="assets/images/brands/5.png" alt="Brand Name" />
          </a>
          <a href="#" class="brand">
            <img src="assets/images/brands/6.png" alt="Brand Name" />
          </a>
        </div>
        <hr class="mb-0" />
      </div>

      <!-- Sản phẩm nổi bật -->
      <div class="container trending-products mb-4 mt-1">
        <div class="heading heading-flex mb-3">
          <div class="heading-left">
            <h2 class="title">Sản phẩm nổi bật</h2>
          </div>
          <div class="heading-right">
            <div class="btn-group" role="tablist">
              <a
                id="trending-best-link"
                class="btn btn-outline-primary rounded-pill m-1"
                data-toggle="tab"
                href="#trending-best-tab"
                role="tab"
                aria-controls="trending-best-tab"
                aria-selected="true"
                :class="{ active: true }"
                >Bán chạy</a
              >
              <a
                id="trending-sale-link"
                class="btn btn-outline-primary rounded-pill m-1"
                data-toggle="tab"
                href="#trending-sale-tab"
                role="tab"
                aria-controls="trending-sale-tab"
                aria-selected="false"
                >Đang giảm giá</a
              >
            </div>
          </div>
        </div>

        <div class="tab-content tab-content-carousel just-action-icons-sm">
          <!-- Bán chạy -->
          <div
            id="trending-best-tab"
            class="tab-pane p-0 fade show active"
            role="tabpanel"
            aria-labelledby="trending-best-link"
          >
            <div
              class="owl-carousel owl-simple carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
          "nav": false,
          "dots": true,
          "margin": 20,
          "loop": false,
          "responsive": {
            "0": { "items": 1 },
            "480": { "items": 2 },
            "768": { "items": 3 },
            "992": { "items": 4 },
            "1200": { "items": 4, "nav": true, "dots": false }
          }
        }'
            >
              <div v-for="product in trendingBestProducts" :key="product.id" class="product product-7 text-center shadow">
                <figure class="product-media">
                  <span v-if="isNewProduct(product)" class="product-label label-new">SP mới</span>
                  <span
                    v-if="product.hasDiscount"
                    class="product-label label-discount"
                    style="
                      position: absolute;
                      top: 10px;
                      left: 10px;
                      background-color: #ff3333;
                      color: white;
                      padding: 2px 6px;
                      border-radius: 4px;
                    "
                  >
                    <span v-if="product.loaiGiamGiaApDung === 'Phần trăm' && product.giamPhanTram > 0"
                      >Giảm {{ product.giamPhanTram }}%</span
                    >
                    <span
                      v-else-if="
                        product.loaiGiamGiaApDung === 'Tiền mặt' ||
                        (product.loaiGiamGiaApDung === 'Tiền mặt' && product.giamToiDa > 0)
                      "
                      >Giảm {{ formatPrice(product.giamToiDa) }} VND</span
                    >
                  </span>
                  <NuxtLink :to="`/product-page?sp_id=${product.id}`">
                    <img
                      :src="product.imageUrl || '/assets/images/placeholder.jpg'"
                      alt="Product image"
                      class="product-image"
                    />
                  </NuxtLink>
                  <div class="product-action-vertical">
                    <NuxtLink to="/compare-page" class="btn-product-icon btn-compare" title="Compare">
                      <span>So sánh</span>
                    </NuxtLink>
                  </div>
                </figure>
                <div class="product-body">
                  <div class="product-cat">
                    <a href="#">{{ manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown' }}</a>
                  </div>
                  <h3 class="product-title">
                    <NuxtLink :to="`/product-page?sp_id=${product.id}`">{{ product.tenSanPham }}</NuxtLink>
                  </h3>
                  <div v-if="product.hasDiscount" class="product-price">
                    <span style="text-decoration: line-through; color: #999"
                      >{{ formatPrice(product.giaBan || 0) }} VND</span
                    >
                    <span style="color: red; margin-left: 5px">{{ formatPrice(product.giaSauKhiGiam || 0) }} VND</span>
                    <!-- Sửa ở đây -->
                  </div>
                  <div v-else class="product-price">{{ formatPrice(product.giaBan || 0) }} VND</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Đang giảm giá -->
          <div id="trending-sale-tab" class="tab-pane p-0 fade" role="tabpanel" aria-labelledby="trending-sale-link">
            <div
              class="owl-carousel owl-simple carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
          "nav": false,
          "dots": true,
          "margin": 20,
          "loop": false,
          "responsive": {
            "0": { "items": 1 },
            "480": { "items": 2 },
            "768": { "items": 3 },
            "992": { "items": 4 },
            "1200": { "items": 4, "nav": true, "dots": false }
          }
        }'
            >
              <div v-for="product in trendingSaleProducts" :key="product.id" class="product product-7 text-center shadow">
                <figure class="product-media">
                  <span v-if="isNewProduct(product)" class="product-label label-new">SP mới</span>
                  <span
                    v-if="product.hasDiscount"
                    class="product-label label-discount"
                    style="
                      position: absolute;
                      top: 10px;
                      left: 10px;
                      background-color: #ff3333;
                      color: white;
                      padding: 2px 6px;
                      border-radius: 4px;
                    "
                  >
                    <span v-if="product.loaiGiamGiaApDung === 'Phần trăm' && product.giamPhanTram > 0"
                      >Giảm {{ product.giamPhanTram }}%</span
                    >
                    <span v-else-if="product.loaiGiamGiaApDung === 'Tiền mặt' && product.giamToiDa > 0"
                      >Giảm {{ formatPrice(product.giamToiDa) }} VND</span
                    >
                  </span>
                  <NuxtLink :to="`/product-page?sp_id=${product.id}`">
                    <img
                      :src="product.imageUrl || '/assets/images/placeholder.jpg'"
                      alt="Product image"
                      class="product-image"
                    />
                  </NuxtLink>
                  <div class="product-action-vertical">
                    <NuxtLink to="/compare-page" class="btn-product-icon btn-compare" title="Compare">
                      <span>So sánh</span>
                    </NuxtLink>
                  </div>
                </figure>
                <div class="product-body">
                  <div class="product-cat">
                    <a href="#">{{ manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown' }}</a>
                  </div>
                  <h3 class="product-title">
                    <NuxtLink :to="`/product-page?sp_id=${product.id}`">{{ product.tenSanPham }}</NuxtLink>
                  </h3>
                                    <div v-if="product.hasDiscount" class="product-price">
                    <span style="text-decoration: line-through; color: #999"
                      >{{ formatPrice(product.giaBan || 0) }} VND</span
                    >
                    <span style="color: red; margin-left: 5px">{{ formatPrice(product.giaSauKhiGiam || 0) }} VND</span>
                    <!-- Sửa ở đây -->
                  </div>
                  <div v-else class="product-price">{{ formatPrice(product.giaBan || 0) }} VND</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="mb-0" />
      </div>

      <!-- Sản phẩm gợi ý -->
<div class="container for-you mb-4 mt-1">
  <div class="heading heading-flex mb-3">
    <div class="heading-left">
      <h2 class="title">Sản phẩm gợi ý</h2>
    </div>
<div class="heading-right">
  <div class="btn-group d-flex" role="tablist">
    <a
      id="recommended-all-link"
      class="btn btn-outline-primary rounded-pill m-1"
      :class="{ active: selectedManufacturer === null }"
      @click.prevent="filterRecommendedProducts(null)"
      role="tab"
      aria-controls="recommended-all-tab"
      aria-selected="true"
      >All</a
    >
    <a
      id="recommended-iphone-link"
      class="btn btn-outline-primary rounded-pill m-1"
      :class="{ active: selectedManufacturer === 1 }"
      @click.prevent="filterRecommendedProducts(1)"
      role="tab"
      aria-controls="recommended-iphone-tab"
      aria-selected="false"
      >iPhone</a
    >
    <a
      id="recommended-samsung-link"
      class="btn btn-outline-primary rounded-pill m-1"
      :class="{ active: selectedManufacturer === 2 }"
      @click.prevent="filterRecommendedProducts(2)"
      role="tab"
      aria-controls="recommended-samsung-tab"
      aria-selected="false"
      >Samsung</a
    >
    <a
      id="recommended-oppo-link"
      class="btn btn-outline-primary rounded-pill m-1"
      :class="{ active: selectedManufacturer === 4 }"
      @click.prevent="filterRecommendedProducts(4)"
      role="tab"
      aria-controls="recommended-oppo-tab"
      aria-selected="false"
      >OPPO</a
    >
    <NuxtLink to="/category-4cols" class="btn btn-outline-primary rounded-pill m-1">Xem thêm sản phẩm</NuxtLink>
  </div>
</div>
  </div>
  <div class="products">
          <div class="row justify-content-center">
            <div v-for="product in recommendedProducts" :key="product.id" class="col-6 col-md-3 col-lg-2">
              <div class="product product-2 shadow">
                <figure class="product-media">
                  <span v-if="isNewProduct(product)" class="product-label label-new">SP mới</span>
                  <span
                    v-if="product.hasDiscount"
                    class="product-label label-discount"
                    style="
                      position: absolute;
                      top: 10px;
                      left: 10px;
                      background-color: #ff3333;
                      color: white;
                      padding: 2px 6px;
                      border-radius: 4px;
                    "
                  >
                    <span v-if="product.loaiGiamGiaApDung === 'Phần trăm' && product.giamPhanTram > 0"
                      >Giảm {{ product.giamPhanTram }}%</span
                    >
                    <span v-else-if="product.loaiGiamGiaApDung === 'Tiền mặt' && product.giamToiDa > 0"
                      >Giảm {{ formatPrice(product.giamToiDa) }} VND</span
                    >
                  </span>
                  <NuxtLink :to="`/product-page?sp_id=${product.id}`">
                    <img
                      :src="product.imageUrl || '/assets/images/placeholder.jpg'"
                      alt="Product image"
                      class="product-image"
                    />
                  </NuxtLink>
                </figure>
                <div class="product-body text-center">
                  <div class="product-cat">
                    <a href="#">{{ manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown' }}</a>
                  </div>
                  <h3 class="product-title">
                    <NuxtLink :to="`/product-page?sp_id=${product.id}`">{{ product.tenSanPham }}</NuxtLink>
                  </h3>
                  <div v-if="product.hasDiscount" class="product-price" style="display: block !important">
                    <span style="text-decoration: line-through; color: #999"
                      >{{ formatPrice(product.giaBan || 0) }} VND</span
                    >
                    <span style="color: red; margin-left: 5px">{{ formatPrice(product.giaSauKhiGiam || 0) }} VND</span>
                  </div>
                  <div v-else style="color: #00aeef">{{ formatPrice(product.giaSauKhiGiam || 0) }} VND</div>
                </div>
              </div>
            </div>
          </div>
        </div>
</div>
    </main>

    <button id="scroll-top" title="Back to Top">
      <i class="icon-arrow-up"></i>
    </button>
  </div>
</template>

<script>
import IndexPage from '../store/main/index.js'

export default IndexPage
</script>

<style scoped>
/* styles.css */
.label-discount {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #ff3333;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
}

.product-2 {
  transition: transform 0.2s;
}

.product-2:hover {
  transform: scale(1.05);
}

.brand img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
.owl-carousel .brand {
  display: flex;
  justify-content: center;
  align-items: center;
}

.memory-options,
.color-options {
  margin-bottom: 20px;
}
.memory-options h5,
.color-options h5 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
}
.option-btn {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px 15px;
  text-align: center;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: border-color 0.3s;
  position: relative;
  background-color: #fff;
}
.option-btn:hover {
  border-color: #ccc;
}
.option-btn.active {
  border-color: #ff0000; /* Viền đỏ khi được chọn */
}

.color-btn {
  display: flex;
  align-items: center;
  padding: 5px 10px;
}
.color-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #ddd;
}
.color-btn.active .color-circle {
  border-color: #ff0000;
}


/* Định dạng chung cho nhãn */
.product-label {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  border-radius: 3px;
  z-index: 1;
}

/* Nhãn giảm giá (màu đỏ) */
.label-discount {
  background-color: #ff4d4d;
}

/* Nhãn "Mới" (màu xanh lá) */
.label-new {
  background-color: #1e00ff; 
}

/* Nhãn "Đã hết hàng" (màu xám) */
.label-out-of-stock {
  background-color: #6c757d;
}

.product-media {
  position: relative;
}

.product-image {
  width: 100%;
  height: auto;
}

  
  /* Nhãn HOT và MỚI */
  .label-hot,
  .label-new {
    display: inline-block;
    font-size: 10px;
    font-weight: bold;
    padding: 2px 5px;
    border-radius: 3px;
    margin-left: 5px;
  }
  
  .label-hot {
    background-color: #ff4d4d; /* Màu đỏ cho HOT */
    color: #fff;
  }
  
  .label-new {
    background-color: #28a745; /* Màu xanh lá cho MỚI */
    color: #fff;
  }



/* Slider chính */
.intro-slider-container {
  position: relative;
}

.intro-slide {
  background-size: cover;
  background-position: center;
  height: 400px; /* Điều chỉnh chiều cao slider */
  display: flex;
  align-items: center;
}

.intro-content {
  text-align: left;
}

.intro-subtitle {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.intro-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 15px;
}

.intro-price {
  font-size: 20px;
  margin-bottom: 20px;
}

.intro-price .intro-old-price {
  text-decoration: line-through;
  color: #999;
}

.text-third {
  color: #ff4d4d; /* Màu đỏ cho giá khuyến mãi */
}

.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 14px;
}

.btn-primary i {
  margin-left: 5px;
}

/* Banner bên phải */
.img-banner{
  width: 270px !important; 
  height: 118px !important;
}

.banner-right {
  display: flex;
  flex-direction: column; /* Mặc định là cột trên màn hình lớn */
  justify-content: center; /* Căn giữa theo chiều dọc */
  height: 100%;
}

.banner-right .banner-item {
  display: block;
}


/* Responsive cho màn hình nhỏ hơn (dưới 992px, tương ứng với breakpoint lg của Bootstrap) */
@media (max-width: 991.98px) {
  .logo img {
    max-width: 60% !important;
  }

  .banner-right {
    flex-direction: row; 
    flex-wrap: wrap; 
    justify-content: space-between; 
    margin-top: 1rem;
  }

  .banner-right .banner-item {
    width: 48%; 
    margin-bottom: 10px;
  }

  .banner-right .banner-item-last {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .banner-right .banner-item-last img {
    max-width: 200px !important; 
  }
}

.btn-group {
  flex-wrap: wrap; 
  justify-content: center;
  align-items: center;
}

.btn-outline-primary {
  margin: 0.25rem; 
  white-space: nowrap; 
  text-align: center; 
}


@media (max-width: 768px) {
  .btn-group {
    flex-direction: row; 
    flex-wrap: wrap; 
    justify-content: center;
  }

  .btn-outline-primary {
    flex: 0 0 48%; 
    font-size: 0.875rem; 
    padding: 0.25rem 0.5rem; 
  }

  
  .btn-group .btn-outline-primary:last-child {
    margin-bottom: 0;
  }
}


@media (min-width: 769px) and (max-width: 991px) {
  .btn-group {
    flex-wrap: wrap; 
    justify-content: center;
  }

  .btn-outline-primary {
    margin: 0.25rem; 
  }
}
  </style>