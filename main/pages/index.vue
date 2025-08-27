<template>
  <div class="page-wrapper">
    <main class="main">
      <!-- Hero Section -->
      <div class="container homepage-section mb-6">
        <div class="row banner-row">
          <!-- Main Slider -->
          <div class="col-lg-9">
            <div class="intro-slider-container rounded-xl overflow-hidden shadow-2xl">
              <div class="intro-slider owl-carousel owl-theme owl-nav-inside owl-light" data-toggle="owl"
                :data-owl-options="owlOptions">
                <!-- iPhone 15 Pro Max Slide -->
                <div class="intro-slide hero-slide-1" style="background-image: url('/assets/images/demos/demo-4/banners/banner-7.webp')">
                  <div class="hero-gradient-overlay"></div>
                  <div class="floating-phone phone-1">
                    <i class="fas fa-mobile-alt"></i>
                  </div>
                  <div class="container intro-content text-left py-10 position-relative">
                    <div class="row justify-content-end">
                      <div class="col-auto col-sm-7 col-md-6 col-lg-5">
                        <div class="hero-badge badge-new">
                          <i class="fas fa-star"></i>
                          <span>Mới nhất</span>
                        </div>
                        <h3 class="intro-subtitle text-white font-semibold text-xl mb-2">Siêu phẩm 2024</h3>
                        <h2 class="intro-title text-5xl font-bold text-white mb-4">iPhone 15 Pro Max</h2>
                        <div class="feature-highlights mb-4">
                          <div class="feature-item">
                            <i class="fas fa-microchip"></i>
                            <span>Chip A17 Pro</span>
                          </div>
                          <div class="feature-item">
                            <i class="fas fa-camera"></i>
                            <span>Camera 48MP</span>
                          </div>
                        </div>
                        <div class="intro-price mt-4 mb-6">
                          <span class="intro-old-price text-gray-300 line-through text-lg mr-2">34.990.000 VND</span>
                          <span class="text-white text-3xl font-bold">32.990.000 VND</span>
                        </div>
                        <div class="hero-buttons">
                          <a href="category.html" class="btn btn-hero-primary">
                            <span>Mua ngay</span>
                            <i class="fas fa-shopping-cart ml-2"></i>
                          </a>
                          <a href="category.html" class="btn btn-hero-secondary">
                            <span>Xem chi tiết</span>
                            <i class="fas fa-arrow-right ml-2"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Samsung Galaxy S24 Ultra Slide -->
                <div class="intro-slide hero-slide-2" style="background-image: url('/assets/images/demos/demo-4/banners/banner-5.webp')">
                  <div class="hero-gradient-overlay"></div>
                  <div class="floating-phone phone-2">
                    <i class="fas fa-mobile-alt"></i>
                  </div>
                  <div class="container intro-content text-left py-10 position-relative">
                    <div class="row justify-content-end">
                      <div class="col-auto col-sm-7 col-md-6 col-lg-5">
                        <div class="hero-badge badge-ai">
                          <i class="fas fa-brain"></i>
                          <span>Galaxy AI</span>
                        </div>
                        <h3 class="intro-subtitle text-white font-semibold text-xl mb-2">Trí tuệ nhân tạo</h3>
                        <h2 class="intro-title text-5xl font-bold text-white mb-4">Galaxy S24 Ultra</h2>
                        <div class="feature-highlights mb-4">
                          <div class="feature-item">
                            <i class="fas fa-magic"></i>
                            <span>Galaxy AI</span>
                          </div>
                          <div class="feature-item">
                            <i class="fas fa-pen"></i>
                            <span>S Pen tích hợp</span>
                          </div>
                        </div>
                        <div class="intro-price mt-4 mb-6">
                          <span class="text-white text-3xl font-bold">29.990.000 VND</span>
                        </div>
                        <div class="hero-buttons">
                          <a href="category.html" class="btn btn-hero-primary">
                            <span>Mua ngay</span>
                            <i class="fas fa-shopping-cart ml-2"></i>
                          </a>
                          <a href="category.html" class="btn btn-hero-secondary">
                            <span>Xem chi tiết</span>
                            <i class="fas fa-arrow-right ml-2"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- OPPO Find X7 Ultra Slide -->
                <div class="intro-slide hero-slide-3" style="background-image: url('/assets/images/demos/demo-4/banners/banner-6.webp')">
                  <div class="hero-gradient-overlay"></div>
                  <div class="floating-phone phone-3">
                    <i class="fas fa-mobile-alt"></i>
                  </div>
                  <div class="container intro-content text-left py-10 position-relative">
                    <div class="row justify-content-end">
                      <div class="col-auto col-sm-7 col-md-6 col-lg-5">
                        <div class="hero-badge badge-camera">
                          <i class="fas fa-camera"></i>
                          <span>Hasselblad</span>
                        </div>
                        <h3 class="intro-subtitle text-white font-semibold text-xl mb-2">Nhiếp ảnh chuyên nghiệp</h3>
                        <h2 class="intro-title text-5xl font-bold text-white mb-4">OPPO Find X7 Ultra</h2>
                        <div class="feature-highlights mb-4">
                          <div class="feature-item">
                            <i class="fas fa-camera-retro"></i>
                            <span>Hasselblad</span>
                          </div>
                          <div class="feature-item">
                            <i class="fas fa-eye"></i>
                            <span>Zoom 120x</span>
                          </div>
                        </div>
                        <div class="intro-price mt-4 mb-6">
                          <span class="text-white text-3xl font-bold">24.990.000 VND</span>
                        </div>
                        <div class="hero-buttons">
                          <a href="category.html" class="btn btn-hero-primary">
                            <span>Mua ngay</span>
                            <i class="fas fa-shopping-cart ml-2"></i>
                          </a>
                          <a href="category.html" class="btn btn-hero-secondary">
                            <span>Xem chi tiết</span>
                            <i class="fas fa-arrow-right ml-2"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="hero-nav-dots"></div>
            </div>
          </div>

          <!-- Right Banners -->
          <div class="col-lg-3">
            <div class="banner-right">
              <!-- Banner 1 -->
              <div class="side-banner-item rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div class="relative overflow-hidden">
                  <img src="/assets/images/banners/banner-1.jpg" alt="Banner 1" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="flex items-center justify-center h-full text-center p-4">
                      <div class="text-white">
                        <h4 class="font-bold text-lg mb-2">Khuyến mãi đặc biệt</h4>
                        <p class="text-sm mb-3">Giảm giá lên đến 50%</p>
                        <button class="bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                          Xem ngay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Banner 2 -->
              <div class="side-banner-item rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div class="relative overflow-hidden">
                  <img src="/assets/images/banners/banner-2.jpg" alt="Banner 2" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-cyan-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="flex items-center justify-center h-full text-center p-4">
                      <div class="text-white">
                        <h4 class="font-bold text-lg mb-2">Sản phẩm mới</h4>
                        <p class="text-sm mb-3">Công nghệ tiên tiến nhất</p>
                        <button class="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                          Khám phá
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Banner 3 -->
              <div class="side-banner-item rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div class="relative overflow-hidden">
                  <img src="/assets/images/banners/banner-3.jpg" alt="Banner 3" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div class="absolute inset-0 bg-gradient-to-r from-green-600/80 to-teal-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="flex items-center justify-center h-full text-center p-4">
                      <div class="text-white">
                        <h4 class="font-bold text-lg mb-2">Bảo hành mở rộng</h4>
                        <p class="text-sm mb-3">Dịch vụ hậu mãi tốt nhất</p>
                        <button class="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                          Tìm hiểu
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- New Arrivals -->
      <div class="container new-arrivals mb-6">
        <div class="section-header mb-6">
          <div class="section-title-wrapper">
            <h2 class="section-title">Sản phẩm mới</h2>
            <p class="section-subtitle">Khám phá những sản phẩm công nghệ mới nhất</p>
          </div>
          <div class="filter-tabs">
            <div class="tab-group" role="tablist">
              <a id="new-all-link" class="filter-tab active" data-toggle="tab" href="#new-all-tab" role="tab">
                <i class="fas fa-th-large"></i>
                <span>All</span>
              </a>
              <a id="new-tv-link" class="filter-tab" data-toggle="tab" href="#new-tv-tab" role="tab">
                <i class="fab fa-apple"></i>
                <span>iPhone</span>
              </a>
              <a id="new-computers-link" class="filter-tab" data-toggle="tab" href="#new-computers-tab" role="tab">
                <i class="fas fa-mobile-alt"></i>
                <span>Samsung</span>
              </a>
              <a id="new-phones-link" class="filter-tab" data-toggle="tab" href="#new-phones-tab" role="tab">
                <i class="fas fa-smartphone"></i>
                <span>OPPO</span>
              </a>
            </div>
          </div>
        </div>
        <div class="tab-content tab-content-carousel">
          <div id="new-all-tab" class="tab-pane p-0 fade show active" role="tabpanel" aria-labelledby="new-all-link">
            <div class="owl-carousel owl-simple carousel-equal-height carousel-with-shadow" data-toggle="owl"
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
                  "1200": { "items": 5, "nav": true, "dots": false }
                }
              }'>
              <div v-for="product in newProducts" :key="product.id" class="modern-product-card">
                <div class="product-card-inner">
                  <figure class="product-media">
                    <div class="product-labels">
                      <span v-if="isNewProduct(product)" class="product-label label-new">
                        <i class="fas fa-star"></i>
                        <span>Mới</span>
                      </span>
                    </div>
                    <div class="product-image-wrapper">
                      <NuxtLink :to="`/product-page?sp_id=${product.id}`">
                        <img :src="product.imageUrl || '/assets/images/placeholder.jpg'" alt="Product image"
                          class="product-image" />
                      </NuxtLink>
                    </div>
                    <div class="floating-actions">
                      <button class="action-btn wishlist-btn" title="Yêu thích">
                        <i class="fas fa-heart"></i>
                      </button>
                      <NuxtLink to="/compare-page" class="action-btn compare-btn" title="So sánh">
                        <i class="fas fa-balance-scale"></i>
                      </NuxtLink>
                      <button class="action-btn quickview-btn" title="Xem nhanh">
                        <i class="fas fa-eye"></i>
                      </button>
                    </div>
                  </figure>
                  <div class="product-info">
                    <div class="product-brand">
                      <span class="brand-badge">{{ manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown' }}</span>
                    </div>
                    <h3 class="product-name">
                      <NuxtLink :to="`/product-page?sp_id=${product.id}`">{{ product.tenSanPham }}</NuxtLink>
                    </h3>
                    <div class="product-rating">
                      <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </div>
                      <span class="rating-text">(4.8)</span>
                    </div>
                    <div class="product-price">
                      <span class="current-price">{{ formatPrice(product.giaBan || 0) }} VND</span>
                    </div>
                    <button class="add-to-cart-btn">
                      <span>Thêm vào giỏ</span>
                      <i class="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Other tabs (iPhone, Samsung, OPPO) follow similar structure -->
          <div id="new-tv-tab" class="tab-pane p-0 fade" role="tabpanel" aria-labelledby="new-tv-link">
            <div class="owl-carousel owl-simple carousel-equal-height carousel-with-shadow" data-toggle="owl"
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
                  "1200": { "items": 5, "nav": true, "dots": false }
                }
              }'>
              <div v-for="product in iPhoneProducts" :key="product.id"
                class="product product-7 text-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <figure class="product-media relative">
                  <span v-if="isNewProduct(product)" class="product-label label-new">Mới</span>
                  <NuxtLink :to="`/product-page?sp_id=${product.id}`">
                    <img :src="product.imageUrl || '/assets/images/placeholder.jpg'" alt="Product image"
                      class="product-image w-full h-auto object-cover rounded-t-lg" />
                  </NuxtLink>
                  <div class="product-action-vertical absolute top-4 right-4">
                    <NuxtLink to="/compare-page"
                      class="btn-product-icon btn-compare p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
                      title="So sánh">
                      <span class="sr-only">So sánh</span>
                      <i class="icon-compare"></i>
                    </NuxtLink>
                  </div>
                </figure>
                <div class="product-body p-4">
                  <div class="product-cat text-base text-gray-700">
                    <a href="#">{{ manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown' }}</a>
                  </div>
                  <h3 class="product-title text-lg font-semibold text-gray-800 mt-2">
                    <NuxtLink :to="`/product-page?sp_id=${product.id}`">{{ product.tenSanPham }}</NuxtLink>
                  </h3>
                  <div class="product-price text-xl font-medium text-gray-900 mt-2">{{ formatPrice(product.giaBan || 0)
                  }} VND</div>
                </div>
              </div>
            </div>
          </div>
          <div id="new-computers-tab" class="tab-pane p-0 fade" role="tabpanel" aria-labelledby="new-computers-link">
            <div class="owl-carousel owl-simple carousel-equal-height carousel-with-shadow" data-toggle="owl"
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
                  "1200": { "items": 5, "nav": true, "dots": false }
                }
              }'>
              <div v-for="product in samsungProducts" :key="product.id"
                class="product product-7 text-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <figure class="product-media relative">
                  <span v-if="isNewProduct(product)" class="product-label label-new">Mới</span>
                  <NuxtLink :to="`/product-page?sp_id=${product.id}`">
                    <img :src="product.imageUrl || '/assets/images/placeholder.jpg'" alt="Product image"
                      class="product-image w-full h-auto object-cover rounded-t-lg" />
                  </NuxtLink>
                  <div class="product-action-vertical absolute top-4 right-4">
                    <NuxtLink to="/compare-page"
                      class="btn-product-icon btn-compare p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
                      title="So sánh">
                      <span class="sr-only">So sánh</span>
                      <i class="icon-compare"></i>
                    </NuxtLink>
                  </div>
                </figure>
                <div class="product-body p-4">
                  <div class="product-cat text-base text-gray-700">
                    <a href="#">{{ manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown' }}</a>
                  </div>
                  <h3 class="product-title text-lg font-semibold text-gray-800 mt-2">
                    <NuxtLink :to="`/product-page?sp_id=${product.id}`">{{ product.tenSanPham }}</NuxtLink>
                  </h3>
                  <div class="product-price text-xl font-medium text-gray-900 mt-2">{{ formatPrice(product.giaBan || 0)
                  }} VND</div>
                </div>
              </div>
            </div>
          </div>
          <div id="new-phones-tab" class="tab-pane p-0 fade" role="tabpanel" aria-labelledby="new-phones-link">
            <div class="owl-carousel owl-simple carousel-equal-height carousel-with-shadow" data-toggle="owl"
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
                  "1200": { "items": 5, "nav": true, "dots": false }
                }
              }'>
              <div v-for="product in oppoProducts" :key="product.id"
                class="product product-7 text-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <figure class="product-media relative">
                  <span v-if="isNewProduct(product)" class="product-label label-new">Mới</span>
                  <NuxtLink :to="`/product-page?sp_id=${product.id}`">
                    <img :src="product.imageUrl || '/assets/images/placeholder.jpg'" alt="Product image"
                      class="product-image w-full h-auto object-cover rounded-t-lg" />
                  </NuxtLink>
                  <div class="product-action-vertical absolute top-4 right-4">
                    <NuxtLink to="/compare-page"
                      class="btn-product-icon btn-compare p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
                      title="So sánh">
                      <span class="sr-only">So sánh</span>
                      <i class="icon-compare"></i>
                    </NuxtLink>
                  </div>
                </figure>
                <div class="product-body p-4">
                  <div class="product-cat text-base text-gray-700">
                    <a href="#">{{ manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown' }}</a>
                  </div>
                  <h3 class="product-title text-lg font-semibold text-gray-800 mt-2">
                    <NuxtLink :to="`/product-page?sp_id=${product.id}`">{{ product.tenSanPham }}</NuxtLink>
                  </h3>
                  <div class="product-price text-xl font-medium text-gray-900 mt-2">{{ formatPrice(product.giaBan || 0)
                  }} VND</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-6 border-gray-200" />
      </div>

      <!-- Trending Sale Products -->
      <div class="container trending mb-6">
        <div class="section-header mb-6">
          <div class="section-title-wrapper">
            <h2 class="section-title">Sản phẩm nổi bật</h2>
            <p class="section-subtitle">Những sản phẩm được yêu thích và bán chạy nhất</p>
          </div>
          <div class="filter-tabs">
            <div class="tab-group" role="tablist">
              <a id="trending-all-link" class="filter-tab active" data-toggle="tab" href="#trending-all-tab" role="tab">
                <i class="fas fa-fire"></i>
                <span>All</span>
              </a>
              <a id="trending-tv-link" class="filter-tab" data-toggle="tab" href="#trending-tv-tab" role="tab">
                <i class="fab fa-apple"></i>
                <span>iPhone</span>
              </a>
              <a id="trending-computers-link" class="filter-tab" data-toggle="tab" href="#trending-computers-tab" role="tab">
                <i class="fas fa-mobile-alt"></i>
                <span>Samsung</span>
              </a>
              <a id="trending-phones-link" class="filter-tab" data-toggle="tab" href="#trending-phones-tab" role="tab">
                <i class="fas fa-smartphone"></i>
                <span>OPPO</span>
              </a>
            </div>
          </div>
        </div>
        <div class="tab-content tab-content-carousel">
          <div id="trending-all-tab" class="tab-pane p-0 fade show active" role="tabpanel"
            aria-labelledby="trending-all-link">
            <div class="owl-carousel owl-simple carousel-equal-height carousel-with-shadow" data-toggle="owl"
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
                  "1200": { "items": 5, "nav": true, "dots": false }
                }
              }'>
              <div v-for="product in trendingSaleProducts" :key="product.id" class="modern-product-card">
                <div class="product-card-inner">
                  <figure class="product-media">
                    <div class="product-labels">
                      <span v-if="isNewProduct(product)" class="product-label label-new">
                        <i class="fas fa-star"></i>
                        <span>Mới</span>
                      </span>
                      <span v-if="product.hasDiscount" class="product-label label-discount">
                        <i class="fas fa-tag"></i>
                        <span v-if="product.loaiGiamGiaApDung === 'Phần trăm' && product.giamPhanTram > 0">Giảm {{
                          product.giamPhanTram }}%</span>
                        <span v-else-if="product.loaiGiamGiaApDung === 'Tiền mặt' && product.giamToiDa > 0">Giảm {{
                          formatPrice(product.giamToiDa) }} VND</span>
                      </span>
                    </div>
                    <div class="product-image-wrapper">
                      <NuxtLink :to="`/product-page?sp_id=${product.id}`">
                        <img :src="product.imageUrl || '/assets/images/placeholder.jpg'" alt="Product image"
                          class="product-image" />
                      </NuxtLink>
                    </div>
                    <div class="floating-actions">
                      <button class="action-btn wishlist-btn" title="Yêu thích">
                        <i class="fas fa-heart"></i>
                      </button>
                      <NuxtLink to="/compare-page" class="action-btn compare-btn" title="So sánh">
                        <i class="fas fa-balance-scale"></i>
                      </NuxtLink>
                      <button class="action-btn quickview-btn" title="Xem nhanh">
                        <i class="fas fa-eye"></i>
                      </button>
                    </div>
                  </figure>
                  <div class="product-info">
                    <div class="product-brand">
                      <span class="brand-badge">{{ manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown' }}</span>
                    </div>
                    <h3 class="product-name">
                      <NuxtLink :to="`/product-page?sp_id=${product.id}`">{{ product.tenSanPham }}</NuxtLink>
                    </h3>
                    <div class="product-rating">
                      <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </div>
                      <span class="rating-text">(4.8)</span>
                    </div>
                    <div class="product-price">
                      <span v-if="product.hasDiscount" class="old-price">{{ formatPrice(product.giaBan || 0) }} VND</span>
                      <span class="current-price">{{ formatPrice(product.giaSauKhiGiam || product.giaBan || 0) }} VND</span>
                    </div>
                    <button class="add-to-cart-btn">
                      <span>Thêm vào giỏ</span>
                      <i class="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-6 border-gray-200" />
      </div>

      <!-- Recommended Products -->
      <div class="container for-you mb-6">
        <div class="section-header mb-6">
          <div class="section-title-wrapper">
            <h2 class="section-title">Sản phẩm gợi ý</h2>
            <p class="section-subtitle">Được chọn lọc dành riêng cho bạn</p>
          </div>
          <div class="filter-tabs">
            <div class="tab-group" role="tablist">
              <a id="recommended-all-link" class="filter-tab" :class="{ active: selectedManufacturer === null }"
                @click.prevent="filterRecommendedProducts(null)" role="tab">
                <i class="fas fa-magic"></i>
                <span>All</span>
              </a>
              <a id="recommended-iphone-link" class="filter-tab" :class="{ active: selectedManufacturer === 1 }"
                @click.prevent="filterRecommendedProducts(1)" role="tab">
                <i class="fab fa-apple"></i>
                <span>iPhone</span>
              </a>
              <a id="recommended-samsung-link" class="filter-tab" :class="{ active: selectedManufacturer === 2 }"
                @click.prevent="filterRecommendedProducts(2)" role="tab">
                <i class="fas fa-mobile-alt"></i>
                <span>Samsung</span>
              </a>
              <a id="recommended-oppo-link" class="filter-tab" :class="{ active: selectedManufacturer === 4 }"
                @click.prevent="filterRecommendedProducts(4)" role="tab">
                <i class="fas fa-smartphone"></i>
                <span>OPPO</span>
              </a>
              <NuxtLink to="/category-4cols" class="view-more-btn">
                <span>Xem thêm</span>
                <i class="fas fa-arrow-right"></i>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="products">
          <div class="row justify-content-center">
            <div v-for="product in recommendedProducts" :key="product.id" class="col-6 col-md-4 col-lg-3 col-xl-2">
              <div class="modern-product-card">
                <div class="product-card-inner">
                  <figure class="product-media">
                    <div class="product-labels">
                      <span v-if="isNewProduct(product)" class="product-label label-new">
                        <i class="fas fa-star"></i>
                        <span>Mới</span>
                      </span>
                      <span v-if="product.hasDiscount" class="product-label label-discount">
                        <i class="fas fa-tag"></i>
                        <span v-if="product.loaiGiamGiaApDung === 'Phần trăm' && product.giamPhanTram > 0">Giảm {{
                          product.giamPhanTram }}%</span>
                        <span v-else-if="product.loaiGiamGiaApDung === 'Tiền mặt' && product.giamToiDa > 0">Giảm {{
                          formatPrice(product.giamToiDa) }} VND</span>
                      </span>
                    </div>
                    <div class="product-image-wrapper">
                      <NuxtLink :to="`/product-page?sp_id=${product.id}`">
                        <img :src="product.imageUrl || '/assets/images/placeholder.jpg'" alt="Product image"
                          class="product-image" />
                      </NuxtLink>
                    </div>
                    <div class="floating-actions">
                      <button class="action-btn wishlist-btn" title="Yêu thích">
                        <i class="fas fa-heart"></i>
                      </button>
                      <NuxtLink to="/compare-page" class="action-btn compare-btn" title="So sánh">
                        <i class="fas fa-balance-scale"></i>
                      </NuxtLink>
                      <button class="action-btn quickview-btn" title="Xem nhanh">
                        <i class="fas fa-eye"></i>
                      </button>
                    </div>
                  </figure>
                  <div class="product-info">
                    <div class="product-brand">
                      <span class="brand-badge">{{ manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown' }}</span>
                    </div>
                    <h3 class="product-name">
                      <NuxtLink :to="`/product-page?sp_id=${product.id}`">{{ product.tenSanPham }}</NuxtLink>
                    </h3>
                    <div class="product-rating">
                      <div class="stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </div>
                      <span class="rating-text">(4.8)</span>
                    </div>
                    <div class="product-price">
                      <span v-if="product.hasDiscount" class="old-price">{{ formatPrice(product.giaBan || 0) }} VND</span>
                      <span class="current-price">{{ formatPrice(product.giaSauKhiGiam || product.giaBan || 0) }} VND</span>
                    </div>
                    <button class="add-to-cart-btn">
                      <span>Thêm vào giỏ</span>
                      <i class="fas fa-shopping-cart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Top Button -->
      <button id="scroll-top" title="Back to Top">
        <i class="fas fa-arrow-up"></i>
      </button>
    </main>
  </div>
</template>

<script>
import IndexPage from '../store/main/index.js'

export default IndexPage
</script>

<style scoped>
/* Import FontAwesome and Google Fonts */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');


/* Modern Section Headers */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title-wrapper {
  text-align: left;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(to right, rgba(0, 44, 105, 0.9), rgba(19, 173, 117, 0.9));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #4a5568;
  margin: 0;
  font-weight: 400;
}

/* Filter Tabs */
.filter-tabs {
  display: flex;
  align-items: center;
}

.tab-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.75rem;
  background: #ffffff;
  color: #4a5568;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.filter-tab:hover {
  background: linear-gradient(to right, rgba(0, 44, 105, 0.9), rgba(19, 173, 117, 0.9));
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.filter-tab.active {
  background: linear-gradient(to right, rgba(0, 44, 105, 0.9), rgba(19, 173, 117, 0.9));
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.filter-tab i {
  font-size: 1rem;
}

.view-more-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(to right, rgba(0, 44, 105, 0.9), rgba(19, 173, 117, 0.9));
  color: #ffffff;
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.view-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Modern Product Cards */
.modern-product-card {
  margin-bottom: 1.5rem;
}

.product-card-inner {
  background: #ffffff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card-inner:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.product-media {
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.product-labels {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 10;
}

.product-label {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.label-new {
  background: rgba(59, 130, 246, 0.9);
  color: #ffffff;
}

.label-discount {
  background: rgba(239, 68, 68, 0.9);
  color: #ffffff;
}

.product-image-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  background-color: #ffffff;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
  transition: transform 0.3s ease;
  background-color: #ffffff;
}

.product-card-inner:hover .product-image {
  transform: scale(1.05);
}

/* Floating Actions */
.floating-actions {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.3s ease;
  z-index: 10;
}

.product-card-inner:hover .floating-actions {
  opacity: 1;
  transform: translateX(0);
}

.action-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  color: #4a5568;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.action-btn:hover {
  background: linear-gradient(to right, rgba(0, 44, 105, 0.9), rgba(19, 173, 117, 0.9));
  color: #ffffff;
  transform: scale(1.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Product Info */
.product-info {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-brand {
  margin-bottom: 0.5rem;
}

.brand-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: linear-gradient(to right, rgba(0, 44, 105, 0.9), rgba(19, 173, 117, 0.9));
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.375rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-name {
  margin: 0 0 0.75rem 0;
  flex-grow: 1;
}

.product-name a {
  color: #1a202c;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
}

.product-name a:hover {
  color: #2563eb;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.stars {
  display: flex;
  gap: 2px;
}

.stars i {
  color: #fbbf24;
  font-size: 0.875rem;
}

.rating-text {
  font-size: 0.875rem;
  color: #718096;
  font-weight: 500;
}

.product-price {
  margin-bottom: 1rem;
}

.old-price {
  font-size: 1rem;
  font-weight: 500;
  color: #9ca3af;
  text-decoration: line-through;
  margin-right: 0.5rem;
}

.current-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2563eb;
}

.add-to-cart-btn {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(to right, rgba(0, 44, 105, 0.9), rgba(19, 173, 117, 0.9));
  color: #ffffff;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.add-to-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.add-to-cart-btn:active {
  transform: translateY(0);
}

/* Hero Section Styles */
.intro-slide {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-slide-1,
.hero-slide-2, 
.hero-slide-3 {
  position: relative;
}

.hero-gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%);
  z-index: 1;
}

.intro-content {
  position: relative;
  z-index: 2;
}

/* Side Banner Styles */
.banner-right {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

.side-banner-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex: 1;
  min-height: 150px;
}

.side-banner-item:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

.side-banner-item .relative {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.side-banner-item .absolute {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.side-banner-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.side-banner-item:hover img {
  transform: scale(1.1);
}

.side-banner-item .absolute {
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: linear-gradient(to right, rgba(0, 44, 105, 0.9), rgba(19, 173, 117, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
}

.side-banner-item:hover .absolute {
  opacity: 1;
}

.side-banner-item:nth-child(2) .absolute {
  background: linear-gradient(to right, rgba(19, 173, 117, 0.9), rgba(0, 44, 105, 0.9));
}

.side-banner-item:nth-child(3) .absolute {
  background: linear-gradient(to right, rgba(0, 44, 105, 0.9), rgba(19, 173, 117, 0.9));
}

.side-banner-item .text-white {
  color: rgb(255, 255, 255);
}

.side-banner-item .font-bold {
  font-weight: 700;
}

.side-banner-item .text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.side-banner-item .mb-2 {
  margin-bottom: 0.5rem;
}

.side-banner-item .text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.side-banner-item .mb-3 {
  margin-bottom: 0.75rem;
}

.side-banner-item .bg-white {
  background-color: rgb(255, 255, 255);
}

.side-banner-item .text-blue-900 {
  color: rgb(30, 58, 138);
}

.side-banner-item .text-blue-600 {
  color: rgb(37, 99, 235);
}

.side-banner-item .text-green-600 {
  color: rgb(22, 163, 74);
}

.side-banner-item .px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.side-banner-item .py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.side-banner-item .font-semibold {
  font-weight: 600;
}

.side-banner-item button:hover {
  background-color: rgb(243, 244, 246);
}

.side-banner-item .rounded-lg {
  border-radius: 0.5rem;
}

/* Responsive adjustments */
@media (max-width: 1199.98px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .filter-tabs {
    width: 100%;
  }
  
  .tab-group {
    justify-content: center;
  }
}

@media (max-width: 991.98px) {
  .banner-right {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 1.5rem;
  }
  
  .side-banner-item {
    width: 48%;
  }
  
  .side-banner-item:last-child {
    width: 100%;
  }
}

@media (max-width: 767.98px) {
  .banner-right {
    height: 350px;
    min-height: 350px;
  }
  
  .side-banner-item {
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .filter-tab {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }
}

/* Banner Row Equal Heights */
.banner-row {
  display: flex;
  align-items: stretch;
}

.banner-row .col-lg-9,
.banner-row .col-lg-3 {
  display: flex;
  flex-direction: column;
}

/* General styles */
.page-wrapper {
  background: linear-gradient(135deg, #e6f3ff 0%, #e6f9f0 100%);
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
}

.main {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

/* Hero Section Styles */
.intro-slider-container {
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  height: 100%;
  min-height: 500px;
  background: #ffffff;
}

.intro-slide {
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.intro-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.intro-subtitle {
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 1.25rem;
  font-weight: 600;
}

.intro-title {
  color: #ffffff;
  line-height: 1.2;
  font-size: 3rem;
  font-weight: 700;
}

.intro-price .intro-old-price {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.125rem;
}

.intro-price .text-white {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
}

/* Hero badges and features */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: pulse 2s infinite;
}

.badge-new {
  background: rgba(0, 44, 105, 0.2);
  color: #e6f3ff;
}

.badge-ai {
  background: rgba(19, 173, 117, 0.2);
  color: #e6f9f0;
}

.badge-camera {
  background: rgba(0, 44, 105, 0.2);
  color: #e6f3ff;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.feature-highlights {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
}

.feature-item i {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Hero buttons */
.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-hero-primary {
  background: linear-gradient(90deg, #002c69, #13ad75);
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 44, 105, 0.3);
}

.btn-hero-primary:hover {
  background: linear-gradient(90deg, #003d7a, #16c085);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 44, 105, 0.4);
}

.btn-hero-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.5);
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.btn-hero-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
}

/* Floating phone animation */
.floating-phone {
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  animation: floatingPhone 6s ease-in-out infinite;
}

.floating-phone i {
  font-size: 8rem;
  color: rgba(255, 255, 255, 0.2);
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
}

.phone-1 i {
  transform: rotate(-15deg);
}

.phone-2 i {
  transform: rotate(10deg);
}

.phone-3 i {
  transform: rotate(-5deg);
}

@keyframes floatingPhone {
  0%, 100% {
    transform: translateY(-50%) translateX(0) scale(1);
  }
  50% {
    transform: translateY(-60%) translateX(10px) scale(1.05);
  }
}

/* Product labels */
.product-label {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  border-radius: 4px;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.label-new {
  background: rgba(59, 130, 246, 0.9);
}

.label-discount {
  background: rgba(239, 68, 68, 0.9);
}

/* Scroll top button */
#scroll-top {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 50px;
  height: 50px;
  background: linear-gradient(to right, rgba(0, 44, 105, 0.9), rgba(19, 173, 117, 0.9));
  color: #ffffff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

#scroll-top:hover {
  transform: translateY(-4px) scale(1.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Additional Product Card Styles */
.product-7,
.product-2 {
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.product-7:hover,
.product-2:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.product-image {
  aspect-ratio: 1/1;
  object-fit: contain;
  padding: 1rem;
  background-color: #ffffff;
}

.product-body {
  padding: 1.5rem;
}

.product-cat a {
  color: #718096;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 1rem;
}

.product-cat a:hover {
  color: #2563eb;
}

.product-title a {
  color: #1a202c;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
}

.product-title a:hover {
  color: #2563eb;
}

.product-price {
  color: #1a202c;
  font-size: 1.25rem;
  font-weight: 700;
}

/* Responsive styles */
@media (max-width: 991.98px) {
  .intro-slide {
    height: 500px;
  }
  
  .floating-phone {
    left: 5%;
  }
  
  .floating-phone i {
    font-size: 6rem;
  }

  .intro-title {
    font-size: 2.5rem;
  }

  .intro-subtitle {
    font-size: 1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 767.98px) {
  .intro-slide {
    height: 350px;
  }
  
  .floating-phone i {
    font-size: 4rem;
  }

  .intro-title {
    font-size: 2rem;
  }

  .intro-subtitle {
    font-size: 0.875rem;
  }
  
  .feature-highlights {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
