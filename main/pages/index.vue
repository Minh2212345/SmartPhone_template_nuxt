<template>
  <div class="page-wrapper">
    <main class="main">
      <!-- Hero Section -->
      <div class="container homepage-section mb-6">
        <div class="row">
          <!-- Main Slider -->
          <div class="col-lg-9">
            <div class="intro-slider-container rounded-xl overflow-hidden shadow-lg">
              <div class="intro-slider owl-carousel owl-theme owl-nav-inside owl-light" data-toggle="owl"
                :data-owl-options="owlOptions">
                <div class="intro-slide" style="background-image: url(assets/images/demos/demo-4/slider/slide-1.png)">
                  <div class="container intro-content text-left py-10">
                    <div class="row justify-content-end">
                      <div class="col-auto col-sm-7 col-md-6 col-lg-5">
                        <h3 class="intro-subtitle text-primary font-semibold text-xl mb-2">Sản phẩm mới</h3>
                        <h2 class="intro-title text-5xl font-bold text-gray-800">iPad Pro M4</h2>
                        <div class="intro-price mt-4 mb-6">
                          <span class="intro-old-price text-gray-500 line-through text-lg mr-2">36.590.000 VND</span>
                          <span class="text-primary text-3xl font-semibold">36.224.000 VND</span>
                        </div>
                        <a href="category.html"
                          class="btn btn-primary btn-round inline-flex items-center px-6 py-3 text-lg font-medium">
                          <span>Xem chi tiết</span>
                          <i class="icon-long-arrow-right ml-2"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="intro-slide" style="background-image: url(assets/images/demos/demo-4/slider/slide-2.png)">
                  <div class="container intro-content text-left py-10">
                    <div class="row justify-content-end">
                      <div class="col-auto col-sm-7 col-md-6 col-lg-5">
                        <h3 class="intro-subtitle text-primary font-semibold text-xl mb-2">Sản phẩm mới</h3>
                        <h2 class="intro-title text-5xl font-bold text-gray-800">Beats Solo 4</h2>
                        <div class="intro-price mt-4 mb-6">
                          <span class="text-primary text-3xl font-semibold">3.299.000 VND</span>
                        </div>
                        <a href="category.html"
                          class="btn btn-primary btn-round inline-flex items-center px-6 py-3 text-lg font-medium">
                          <span>Xem chi tiết</span>
                          <i class="icon-long-arrow-right ml-2"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span class="slider-loader bg-gradient-to-r from-blue-500 to-blue-600"></span>
            </div>
          </div>

          <!-- Right Banners -->
          <div class="col-lg-3">
            <div class="banner-right space-y-4">
              <div
                class="banner-item rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <a href="#">
                  <img src="assets/images/banners/banner-1.jpg" alt="Galaxy M55 5G"
                    class="img-banner w-full h-auto object-cover" />
                </a>
              </div>
              <div
                class="banner-item rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <a href="#">
                  <img src="assets/images/banners/banner-2.jpg" alt="iPad Air"
                    class="img-banner w-full h-auto object-cover" />
                </a>
              </div>
              <div
                class="banner-item banner-item-last rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <a href="#">
                  <img src="assets/images/banners/banner-3.jpg" alt="Banner 3"
                    class="img-banner w-full h-auto object-cover" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- New Arrivals -->
      <div class="container new-arrivals mb-6">
        <div class="heading heading-flex mb-4 items-center">
          <div class="heading-left">
            <h2 class="title text-3xl font-bold text-gray-800">Sản phẩm mới</h2>
          </div>
          <div class="heading-right">
            <div class="btn-group d-flex flex-wrap gap-2" role="tablist">
              <a id="new-all-link" class="btn btn-outline-primary rounded-full px-4 py-2 text-base font-medium"
                data-toggle="tab" href="#new-all-tab" role="tab" aria-controls="new-all-tab" aria-selected="true"
                :class="{ active: true }">Tất cả</a>
              <a id="new-tv-link" class="btn btn-outline-primary rounded-full px-4 py-2 text-base font-medium"
                data-toggle="tab" href="#new-tv-tab" role="tab" aria-controls="new-tv-tab"
                aria-selected="false">iPhone</a>
              <a id="new-computers-link" class="btn btn-outline-primary rounded-full px-4 py-2 text-base font-medium"
                data-toggle="tab" href="#new-computers-tab" role="tab" aria-controls="new-computers-tab"
                aria-selected="false">Samsung</a>
              <a id="new-phones-link" class="btn btn-outline-primary rounded-full px-4 py-2 text-base font-medium"
                data-toggle="tab" href="#new-phones-tab" role="tab" aria-controls="new-phones-tab"
                aria-selected="false">OPPO</a>
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
              <div v-for="product in newProducts" :key="product.id"
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
        <div class="heading heading-flex mb-4 items-center">
          <div class="heading-left">
            <h2 class="title text-3xl font-bold text-gray-800">Sản phẩm nổi bật</h2>
          </div>
          <div class="heading-right">
            <div class="btn-group d-flex flex-wrap gap-2" role="tablist">
              <a id="trending-all-link" class="btn btn-outline-primary rounded-full px-4 py-2 text-base font-medium"
                data-toggle="tab" href="#trending-all-tab" role="tab" aria-controls="trending-all-tab"
                aria-selected="true" :class="{ active: true }">Tất cả</a>
              <a id="trending-tv-link" class="btn btn-outline-primary rounded-full px-4 py-2 text-base font-medium"
                data-toggle="tab" href="#trending-tv-tab" role="tab" aria-controls="trending-tv-tab"
                aria-selected="false">iPhone</a>
              <a id="trending-computers-link"
                class="btn btn-outline-primary rounded-full px-4 py-2 text-base font-medium" data-toggle="tab"
                href="#trending-computers-tab" role="tab" aria-controls="trending-computers-tab"
                aria-selected="false">Samsung</a>
              <a id="trending-phones-link" class="btn btn-outline-primary rounded-full px-4 py-2 text-base font-medium"
                data-toggle="tab" href="#trending-phones-tab" role="tab" aria-controls="trending-phones-tab"
                aria-selected="false">OPPO</a>
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
              <div v-for="product in trendingSaleProducts" :key="product.id"
                class="product product-7 text-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <figure class="product-media relative">
                  <span v-if="isNewProduct(product)" class="product-label label-new">Mới</span>
                  <span v-if="product.hasDiscount" class="product-label label-discount">
                    <span v-if="product.loaiGiamGiaApDung === 'Phần trăm' && product.giamPhanTram > 0">Giảm {{
                      product.giamPhanTram }}%</span>
                    <span v-else-if="product.loaiGiamGiaApDung === 'Tiền mặt' && product.giamToiDa > 0">Giảm {{
                      formatPrice(product.giamToiDa) }} VND</span>
                  </span>
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
                  <div v-if="product.hasDiscount"
                    class="product-price text-xl font-medium mt-2 flex items-center justify-center gap-2">
                    <span class="text-gray-500 line-through">{{ formatPrice(product.giaBan || 0) }} VND</span>
                    <span class="text-red-600">{{ formatPrice(product.giaSauKhiGiam || 0) }} VND</span>
                  </div>
                  <div v-else class="product-price text-xl font-medium text-gray-900 mt-2">{{ formatPrice(product.giaBan
                    || 0) }} VND</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-6 border-gray-200" />
      </div>

      <!-- Recommended Products -->
      <div class="container for-you mb-6">
        <div class="heading heading-flex mb-4 items-center">
          <div class="heading-left">
            <h2 class="title text-3xl font-bold text-gray-800">Sản phẩm gợi ý</h2>
          </div>
          <div class="heading-right">
            <div class="btn-group d-flex flex-wrap gap-2" role="tablist">
              <a id="recommended-all-link" class="btn btn-outline-primary rounded-full px-4 py-2 text-base font-medium"
                :class="{ active: selectedManufacturer === null }" @click.prevent="filterRecommendedProducts(null)"
                role="tab" aria-controls="recommended-all-tab" aria-selected="true">Tất cả</a>
              <a id="recommended-iphone-link"
                class="btn btn-outline-primary rounded-full px-4 py-2 text-base font-medium"
                :class="{ active: selectedManufacturer === 1 }" @click.prevent="filterRecommendedProducts(1)" role="tab"
                aria-controls="recommended-iphone-tab" aria-selected="false">iPhone</a>
              <a id="recommended-samsung-link"
                class="btn btn-outline-primary rounded-full px-4 py-2 text-base font-medium"
                :class="{ active: selectedManufacturer === 2 }" @click.prevent="filterRecommendedProducts(2)" role="tab"
                aria-controls="recommended-samsung-tab" aria-selected="false">Samsung</a>
              <a id="recommended-oppo-link" class="btn btn-outline-primary rounded-full px-4 py-2 text-base font-medium"
                :class="{ active: selectedManufacturer === 4 }" @click.prevent="filterRecommendedProducts(4)" role="tab"
                aria-controls="recommended-oppo-tab" aria-selected="false">OPPO</a>
              <NuxtLink to="/category-4cols"
                class="btn btn-outline-primary rounded-full px-4 py-2 text-base font-medium">
                Xem thêm sản phẩm</NuxtLink>
            </div>
          </div>
        </div>
        <div class="products">
          <div class="row justify-content-center">
            <div v-for="product in recommendedProducts" :key="product.id" class="col-6 col-md-4 col-lg-3 col-xl-2">
              <div class="product product-2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <figure class="product-media relative">
                  <span v-if="isNewProduct(product)" class="product-label label-new">Mới</span>
                  <span v-if="product.hasDiscount" class="product-label label-discount">
                    <span v-if="product.loaiGiamGiaApDung === 'Phần trăm' && product.giamPhanTram > 0">Giảm {{
                      product.giamPhanTram }}%</span>
                    <span v-else-if="product.loaiGiamGiaApDung === 'Tiền mặt' && product.giamToiDa > 0">Giảm {{
                      formatPrice(product.giamToiDa) }} VND</span>
                  </span>
                  <NuxtLink :to="`/product-page?sp_id=${product.id}`">
                    <img :src="product.imageUrl || '/assets/images/placeholder.jpg'" alt="Product image"
                      class="product-image w-full h-auto object-cover rounded-t-lg" />
                  </NuxtLink>
                </figure>
                <div class="product-body p-4 text-center">
                  <div class="product-cat text-base text-gray-700">
                    <a href="#">{{ manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown' }}</a>
                  </div>
                  <h3 class="product-title text-lg font-semibold text-gray-800 mt-2">
                    <NuxtLink :to="`/product-page?sp_id=${product.id}`">{{ product.tenSanPham }}</NuxtLink>
                  </h3>
                  <div v-if="product.hasDiscount"
                    class="product-price text-xl font-medium mt-2 flex items-center justify-center gap-2">
                    <span class="text-gray-500 line-through">{{ formatPrice(product.giaBan || 0) }} VND</span>
                    <span class="text-red-600">{{ formatPrice(product.giaSauKhiGiam || 0) }} VND</span>
                  </div>
                  <div v-else class="product-price text-xl font-medium text-gray-900 mt-2">{{
                    formatPrice(product.giaSauKhiGiam || 0) }} VND</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Top Button -->
      <button id="scroll-top" title="Back to Top"
        class="fixed bottom-6 right-6 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors duration-200">
        <i class="icon-arrow-up"></i>
      </button>
    </main>
  </div>
</template>

<script>
import IndexPage from '../store/main/index.js'

export default IndexPage
</script>

<style scoped>
/* Global font-smoothing for a refined typography */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Professional color palette */
:root {
  --primary-color: #2563eb;
  --secondary-color: #dc2626;
  --text-color: #1f2937;
  --muted-color: #6b7280;
  --background-color: #f9fafb;
}

/* General styles */
.page-wrapper {
  background-color: var(--background-color);
  font-family: 'Inter', sans-serif;
  /* Optionally slightly reduce letter spacing for a refined look */
  letter-spacing: 0.3px;
}

.main {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

/* Slider styles */
.intro-slider-container {
  position: relative;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.1));
}

.intro-slide {
  background-size: cover;
  background-position: center;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.intro-content {
  max-width: 1200px;
  margin: 0 auto;
}

.intro-subtitle {
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 1.75rem;
  font-weight: 500;
  /* reduced weight for smoother look */
}

.intro-title {
  color: var(--text-color);
  line-height: 1.2;
  font-size: 4rem;
  font-weight: 600;
  /* slightly lighter than bold */
}

.intro-price .intro-old-price {
  color: var(--muted-color);
  font-size: 1.75rem;
}

.intro-price .text-primary {
  font-size: 2.5rem;
  font-weight: 500;
  /* reduced weight */
}

.btn-primary {
  background-color: var(--primary-color);
  color: rgb(2, 0, 0);
  border-radius: 9999px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-size: 1.625rem;
  font-weight: bold;
}

/* Banner styles */
.banner-right {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.img-banner {
  width: 100% !important;
  height: 120px !important;
  object-fit: cover;
  border-radius: 0.5rem;
}

/* Product labels */
.product-label {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 12px;
  font-size: 1.375rem;
  font-weight: 500;
  color: white;
  border-radius: 4px;
  z-index: 10;
}

.label-new {
  background-color: #1e40af;
}

.label-discount {
  background-color: var(--secondary-color);
}

/* Product cards */
.product-7,
.product-2 {
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  /* subtler shadow */
}

.product-7:hover,
.product-2:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.product-image {
  aspect-ratio: 1/1;
  object-fit: cover;
}

.product-body {
  padding: 1.5rem;
}

.product-cat a {
  color: var(--muted-color);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 1.375rem;
}

.product-cat a:hover {
  color: var(--primary-color);
}

.product-title a {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 1.75rem;
  font-weight: 500;
  /* smoother weight */
}

.product-price {
  color: var(--text-color);
  font-size: 2rem;
  font-weight: 500;
  /* lighter weight for a more refined look */
}

/* Button group */
.btn-group .btn-outline-primary {
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 1.8rem;
  font-weight: bold;
}

/* Scroll top button */
#scroll-top {
  z-index: 1000;
}

/* Responsive styles */
@media (max-width: 991.98px) {
  .intro-slide {
    height: 350px;
  }

  .intro-title {
    font-size: 2.5rem;
  }

  .intro-subtitle {
    font-size: 1rem;
  }

  .intro-price .text-primary {
    font-size: 1.75rem;
  }

  .intro-price .intro-old-price {
    font-size: 1rem;
  }

  .btn-primary {
    font-size: 1rem;
  }

  .banner-right {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 1.5rem;
  }

  .banner-right .banner-item {
    width: 48%;
  }

  .banner-right .banner-item-last {
    width: 100%;
    text-align: center;
  }

  .img-banner {
    height: 120px !important;
  }
}

@media (max-width: 767.98px) {
  .intro-slide {
    height: 300px;
  }

  .intro-title {
    font-size: 2rem;
  }

  .intro-subtitle {
    font-size: 0.875rem;
  }

  .intro-price .text-primary {
    font-size: 1.5rem;
  }

  .intro-price .intro-old-price {
    font-size: 0.875rem;
  }

  .btn-primary {
    font-size: 0.875rem;
  }

  .btn-group {
    justify-content: center;
  }

  .btn-group .btn-outline-primary {
    flex: 0 0 45%;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }

  .img-banner {
    height: 100px !important;
  }

  .product-title a {
    font-size: 1rem;
  }

  .product-price {
    font-size: 1.25rem;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .btn-group {
    justify-content: center;
  }

  .btn-group .btn-outline-primary {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  .product-title a {
    font-size: 1.125rem;
  }

  .product-price {
    font-size: 1.375rem;
  }
}
</style>
