<template>
  <main class="main">
    <!-- Modern Breadcrumb -->
    <nav aria-label="breadcrumb" class="modern-breadcrumb">
      <div class="container">
        <ol class="breadcrumb-list">
          <li class="breadcrumb-item">
            <NuxtLink to="/" class="breadcrumb-link">
              <i class="fas fa-home"></i>
              <span>Trang chủ/ </span>
            </NuxtLink>
          </li>
          <li class="breadcrumb-item active">
            <span>
              <i class="fas fa-balance-scale"></i>
              <span>So sánh</span>
            </span>
          </li>
        </ol>
      </div>
    </nav>

    <div class="page-content">
      <div class="container">
        <!-- Modern Page Header -->
        <div class="page-header">
          <div class="header-content">
            <div class="hero-badge badge-compare">
              <i class="fas fa-balance-scale"></i>
              <span>So sánh sản phẩm</span>
            </div>
            <h3 class="intro-subtitle">Công cụ so sánh thông minh</h3>
            <h1 class="intro-title">So sánh điện thoại</h1>
            <p class="page-subtitle">Chọn và so sánh chi tiết thông số kỹ thuật của các sản phẩm yêu thích</p>
          </div>
        </div>

        <!-- Product Selection Cards -->
        <div class="product-selection-section">
          <div class="row">
            <div class="col-lg-4 col-md-6" v-for="(productId, index) in selectedProducts" :key="index">
              <div class="modern-compare-card">
                <div class="card-header">
                  <div class="product-selector">
                    <label class="selector-label">
                      <i class="fas fa-mobile-alt"></i>
                      Chọn sản phẩm {{ index + 1 }}
                    </label>
                    <div class="select-wrapper">
                      <select class="modern-select" v-model="selectedProducts[index]" @change="updateProduct(index)">
                        <option value="" disabled>-- Chọn sản phẩm --</option>
                        <option v-for="product in allProducts" :key="product.id" :value="product.id">
                          {{ product.tenSanPham }}
                        </option>
                      </select>
                      <i class="fas fa-chevron-down select-icon"></i>
                    </div>
                  </div>
                </div>
                
                <div class="card-body" v-if="productId">
                  <div class="product-image-wrapper">
                    <img :src="getProductImage(productId)" :alt="getProductName(productId)" class="product-image" />
                    <div class="image-overlay">
                      <div class="product-badge">
                        <i class="fas fa-star"></i>
                        <span>So sánh</span>
                      </div>
                    </div>
                  </div>
                  <div class="product-info">
                    <h3 class="product-name">
                      {{ getProductNameBase(productId) }}
                    </h3>
                    <div class="product-quick-specs">
                      <div class="spec-item">
                        <i class="fas fa-microchip"></i>
                        <span>{{ getProductDetail(productId, 'ram') }}</span>
                      </div>
                      <div class="spec-item">
                        <i class="fas fa-hdd"></i>
                        <span>{{ getProductDetail(productId, 'storage') }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card-body empty-state" v-else>
                  <div class="empty-content">
                    <i class="fas fa-mobile-alt"></i>
                    <p>Chọn sản phẩm để so sánh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modern Comparison Section -->
        <div class="comparison-section" v-if="selectedProducts.some(id => id)">
          <div class="section-header">
            <h2 class="section-title">
              <i class="fas fa-chart-bar"></i>
              So sánh thông số chi tiết
            </h2>
            <p class="section-subtitle">Thông tin chi tiết và so sánh các thông số kỹ thuật</p>
          </div>

          <div class="comparison-table-wrapper">
            <div class="comparison-table">
              <!-- Display Section -->
              <div class="spec-category">
                <div class="category-header">
                  <i class="fas fa-tv"></i>
                  <span>Màn hình & Hiển thị</span>
                </div>
              </div>

              <div class="comparison-row">
                <div class="spec-label">
                  <i class="fas fa-desktop"></i>
                  <span>Công nghệ màn hình</span>
                </div>
                <div class="spec-values">
                  <div class="spec-value" v-for="(productId, index) in selectedProducts" :key="index">
                    <div class="value-content" v-if="productId">
                      {{ getProductDetail(productId, 'displayTech') }}<br>
                      <small>{{ getProductDetail(productId, 'screenSize') }}" {{ getProductDetail(productId, 'typeOfScreen') }}</small>
                    </div>
                    <div class="empty-value" v-else>—</div>
                  </div>
                </div>
              </div>

              <div class="comparison-row">
                <div class="spec-label">
                  <i class="fas fa-expand"></i>
                  <span>Độ phân giải</span>
                </div>
                <div class="spec-values">
                  <div class="spec-value" v-for="(productId, index) in selectedProducts" :key="index">
                    <div class="value-content" v-if="productId">
                      {{ getProductDetail(productId, 'resolution') }}
                    </div>
                    <div class="empty-value" v-else>—</div>
                  </div>
                </div>
              </div>

              <div class="comparison-row">
                <div class="spec-label">
                  <i class="fas fa-sun"></i>
                  <span>Độ sáng</span>
                </div>
                <div class="spec-values">
                  <div class="spec-value" v-for="(productId, index) in selectedProducts" :key="index">
                    <div class="value-content" v-if="productId">
                      <div>Tiêu chuẩn: {{ getProductDetail(productId, 'brightnessStandard') }}</div>
                      <div>HDR: {{ getProductDetail(productId, 'brightnessHDR') }}</div>
                      <div v-if="getProductDetail(productId, 'brightnessOutdoor')">
                        Ngoài trời: {{ getProductDetail(productId, 'brightnessOutdoor') }}
                      </div>
                    </div>
                    <div class="empty-value" v-else>—</div>
                  </div>
                </div>
              </div>

              <!-- Performance Section -->
              <div class="spec-category">
                <div class="category-header">
                  <i class="fas fa-microchip"></i>
                  <span>Hiệu năng & Bộ nhớ</span>
                </div>
              </div>

              <div class="comparison-row">
                <div class="spec-label">
                  <i class="fas fa-memory"></i>
                  <span>RAM</span>
                </div>
                <div class="spec-values">
                  <div class="spec-value" v-for="(productId, index) in selectedProducts" :key="index">
                    <div class="value-content highlight" v-if="productId">
                      {{ getProductDetail(productId, 'ram') }}
                    </div>
                    <div class="empty-value" v-else>—</div>
                  </div>
                </div>
              </div>

              <div class="comparison-row">
                <div class="spec-label">
                  <i class="fas fa-hdd"></i>
                  <span>Bộ nhớ trong</span>
                </div>
                <div class="spec-values">
                  <div class="spec-value" v-for="(productId, index) in selectedProducts" :key="index">
                    <div class="value-content highlight" v-if="productId">
                      {{ getProductDetail(productId, 'storage') }}
                    </div>
                    <div class="empty-value" v-else>—</div>
                  </div>
                </div>
              </div>

              <div class="comparison-row">
                <div class="spec-label">
                  <i class="fas fa-sd-card"></i>
                  <span>Bộ nhớ ngoài</span>
                </div>
                <div class="spec-values">
                  <div class="spec-value" v-for="(productId, index) in selectedProducts" :key="index">
                    <div class="value-content" v-if="productId">
                      {{ getProductDetail(productId, 'externalStorage') }}
                    </div>
                    <div class="empty-value" v-else>—</div>
                  </div>
                </div>
              </div>

              <!-- Battery & Charging Section -->
              <div class="spec-category">
                <div class="category-header">
                  <i class="fas fa-battery-full"></i>
                  <span>Pin & Sạc</span>
                </div>
              </div>

              <div class="comparison-row">
                <div class="spec-label">
                  <i class="fas fa-battery-three-quarters"></i>
                  <span>Dung lượng pin</span>
                </div>
                <div class="spec-values">
                  <div class="spec-value" v-for="(productId, index) in selectedProducts" :key="index">
                    <div class="value-content highlight" v-if="productId">
                      {{ getProductDetail(productId, 'battery') }}
                    </div>
                    <div class="empty-value" v-else>—</div>
                  </div>
                </div>
              </div>

              <div class="comparison-row">
                <div class="spec-label">
                  <i class="fas fa-charging-station"></i>
                  <span>Công nghệ sạc</span>
                </div>
                <div class="spec-values">
                  <div class="spec-value" v-for="(productId, index) in selectedProducts" :key="index">
                    <div class="value-content" v-if="productId">
                      {{ getProductDetail(productId, 'chargingTech') }}
                    </div>
                    <div class="empty-value" v-else>—</div>
                  </div>
                </div>
              </div>

              <!-- Design & Build Section -->
              <div class="spec-category">
                <div class="category-header">
                  <i class="fas fa-cube"></i>
                  <span>Thiết kế & Chất liệu</span>
                </div>
              </div>

              <div class="comparison-row">
                <div class="spec-label">
                  <i class="fas fa-shield-alt"></i>
                  <span>Chất liệu khung</span>
                </div>
                <div class="spec-values">
                  <div class="spec-value" v-for="(productId, index) in selectedProducts" :key="index">
                    <div class="value-content" v-if="productId">
                      {{ getProductDetail(productId, 'frameMaterial') }}
                    </div>
                    <div class="empty-value" v-else>—</div>
                  </div>
                </div>
              </div>

              <div class="comparison-row">
                <div class="spec-label">
                  <i class="fas fa-mobile-alt"></i>
                  <span>Chất liệu mặt lưng</span>
                </div>
                <div class="spec-values">
                  <div class="spec-value" v-for="(productId, index) in selectedProducts" :key="index">
                    <div class="value-content" v-if="productId">
                      {{ getProductDetail(productId, 'backMaterial') }}
                    </div>
                    <div class="empty-value" v-else>—</div>
                  </div>
                </div>
              </div>

              <div class="comparison-row">
                <div class="spec-label">
                  <i class="fas fa-tint"></i>
                  <span>Kháng nước/bụi</span>
                </div>
                <div class="spec-values">
                  <div class="spec-value" v-for="(productId, index) in selectedProducts" :key="index">
                    <div class="value-content" v-if="productId">
                      {{ getProductDetail(productId, 'waterResistance') }}
                    </div>
                    <div class="empty-value" v-else>—</div>
                  </div>
                </div>
              </div>

              <!-- Connectivity Section -->
              <div class="spec-category">
                <div class="category-header">
                  <i class="fas fa-wifi"></i>
                  <span>Kết nối & Hệ điều hành</span>
                </div>
              </div>

              <div class="comparison-row">
                <div class="spec-label">
                  <i class="fas fa-signal"></i>
                  <span>Công nghệ mạng</span>
                </div>
                <div class="spec-values">
                  <div class="spec-value" v-for="(productId, index) in selectedProducts" :key="index">
                    <div class="value-content" v-if="productId">
                      {{ getProductDetail(productId, 'networkTech') }}
                    </div>
                    <div class="empty-value" v-else>—</div>
                  </div>
                </div>
              </div>

              <div class="comparison-row">
                <div class="spec-label">
                  <i class="fas fa-cog"></i>
                  <span>Hệ điều hành</span>
                </div>
                <div class="spec-values">
                  <div class="spec-value" v-for="(productId, index) in selectedProducts" :key="index">
                    <div class="value-content" v-if="productId">
                      {{ getProductDetail(productId, 'os') }} {{ getProductDetail(productId, 'osVersion') }}
                    </div>
                    <div class="empty-value" v-else>—</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div class="empty-comparison-state" v-else>
          <div class="empty-content">
            <i class="fas fa-balance-scale"></i>
            <h3>Chưa có sản phẩm để so sánh</h3>
            <p>Hãy chọn ít nhất một sản phẩm để bắt đầu so sánh thông số kỹ thuật</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ProductCompare from '../store/product/compare-page.js'

export default ProductCompare
</script>

<style scoped>
/* Import FontAwesome and Google Fonts */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* CSS Custom Properties */
:root {
  --primary-gradient: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(16, 185, 129, 0.9) 100%);
  --secondary-gradient: linear-gradient(135deg, rgba(168, 85, 247, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%);
  --accent-gradient: linear-gradient(135deg, rgba(245, 101, 101, 0.9) 0%, rgba(251, 113, 133, 0.9) 100%);
  --background-gradient: linear-gradient(135deg, #e6f3ff 0%, #e6f9f0 100%);
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 20px 60px rgba(0, 0, 0, 0.2);
}

/* General Styles */
.main {
  background: var(--background-gradient);
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  padding-bottom: 2rem;
}

.page-content {
  padding-top: 1rem;
}

/* Modern Breadcrumb */
.modern-breadcrumb {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  text-decoration: none;
  font-size: 1.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
}

.breadcrumb-link:hover {
  background: var(--primary-gradient);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.breadcrumb-item.active span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a5568;
  font-size: 1.875rem;
  font-weight: 600;
  background: var(--primary-gradient);
  background-clip: text;
}

/* Page Header */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%);
  border-radius: 2rem;
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
  backdrop-filter: blur(20px);
  z-index: -1;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 1.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: pulse 3s infinite;
}

.badge-compare {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(16, 185, 129, 0.9) 100%);
  color: #ffffff;
  border-color: rgba(59, 130, 246, 0.3);
}

.intro-subtitle {
  font-size: 2.25rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.intro-title {
  font-size: 4.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #4a5568 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.page-subtitle {
  font-size: 1.875rem;
  color: #4a5568;
  font-weight: 400;
  line-height: 1.6;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 12px 40px rgba(59, 130, 246, 0.2);
  }
}

/* Product Selection Section */
.product-selection-section {
  margin-bottom: 3rem;
}

.modern-compare-card {
  background: #ffffff;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  margin-bottom: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.modern-compare-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: rgba(59, 130, 246, 0.3);
}

.card-header {
  background: var(--primary-gradient);
  padding: 1.5rem;
  color: #ffffff;
}

.product-selector {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.selector-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.875rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
}

.select-wrapper {
  position: relative;
}

.modern-select {
  width: 100%;
  padding: 1rem 3rem 1rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  color: #1a202c;
  font-size: 1.875rem;
  font-weight: 500;
  appearance: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modern-select:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
}

.select-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #4a5568;
  font-size: 1.25rem;
  pointer-events: none;
}

.card-body {
  padding: 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-image-wrapper {
  position: relative;
  aspect-ratio: 1;
  background: #ffffff;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  overflow: hidden;
  border: 2px solid rgba(59, 130, 246, 0.1);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1.5rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modern-compare-card:hover .product-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0;
  transform: translateX(20px) scale(0.8);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modern-compare-card:hover .image-overlay {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.product-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--primary-gradient);
  color: #ffffff;
  border-radius: 25px;
  font-size: 1.35rem;
  font-weight: 600;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: var(--shadow-md);
}

.product-info {
  flex-grow: 1;
}

.product-name {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 1rem 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-quick-specs {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 0.75rem;
  border: 1px solid rgba(59, 130, 246, 0.1);
  font-size: 1.875rem;
  font-weight: 500;
  color: #1a202c;
}

.spec-item i {
  color: #3b82f6;
  font-size: 1.25rem;
}

/* Empty State */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
}

.empty-content {
  color: #9ca3af;
}

.empty-content i {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-content p {
  font-size: 1.875rem;
  margin: 0;
}

/* Section Headers */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  line-height: 1.2;
}

.section-subtitle {
  font-size: 1.875rem;
  color: #4a5568;
  font-weight: 400;
  margin: 0;
}

/* Comparison Table */
.comparison-table-wrapper {
  background: #ffffff;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.comparison-table {
  width: 100%;
}

.spec-category {
  background: var(--primary-gradient);
  color: #ffffff;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2.125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.comparison-row {
  display: grid;
  grid-template-columns: 300px 1fr;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  transition: all 0.3s ease;
}

.comparison-row:hover {
  background: rgba(59, 130, 246, 0.02);
}

.comparison-row:last-child {
  border-bottom: none;
}

.spec-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: rgba(59, 130, 246, 0.05);
  border-right: 1px solid rgba(59, 130, 246, 0.1);
  font-size: 1.875rem;
  font-weight: 600;
  color: #1a202c;
  position: sticky;
  left: 0;
  z-index: 10;
}

.spec-label i {
  color: #3b82f6;
  font-size: 1.25rem;
  min-width: 20px;
}

.spec-values {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.spec-value {
  padding: 1.5rem 2rem;
  border-right: 1px solid rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  min-height: 80px;
}

.spec-value:last-child {
  border-right: none;
}

.value-content {
  font-size: 1.875rem;
  color: #1a202c;
  line-height: 1.5;
  font-weight: 500;
}

.value-content.highlight {
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  font-size: 2rem;
}

.value-content small {
  font-size: 1.6rem;
  color: #4a5568;
  font-weight: 400;
}

.empty-value {
  font-size: 2rem;
  color: #9ca3af;
  font-weight: 300;
}

/* Empty Comparison State */
.empty-comparison-state {
  text-align: center;
  padding: 4rem 2rem;
  background: #ffffff;
  border-radius: 1.5rem;
  box-shadow: var(--shadow-lg);
  margin-top: 2rem;
}

.empty-comparison-state .empty-content {
  max-width: 500px;
  margin: 0 auto;
}

.empty-comparison-state i {
  font-size: 5rem;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  display: block;
}

.empty-comparison-state h3 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 1rem;
}

.empty-comparison-state p {
  font-size: 1.875rem;
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .comparison-row {
    grid-template-columns: 250px 1fr;
  }
  
  .spec-label {
    font-size: 1.6rem;
    padding: 1.25rem 1.5rem;
  }
  
  .spec-value {
    padding: 1.25rem 1.5rem;
  }
  
  .value-content {
    font-size: 1.6rem;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 2rem 0;
    margin-bottom: 2rem;
  }
  
  .hero-badge {
    font-size: 1.4rem;
    padding: 0.6rem 1.25rem;
  }
  
  .intro-subtitle {
    font-size: 1.875rem;
  }
  
  .intro-title {
    font-size: 2.5rem;
  }
  
  .page-subtitle {
    font-size: 1.6rem;
  }
  
  .section-title {
    font-size: 2.25rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .comparison-row {
    grid-template-columns: 1fr;
  }
  
  .spec-label {
    border-right: none;
    border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  }
  
  .spec-values {
    grid-template-columns: 1fr;
  }
  
  .spec-value {
    border-right: none;
    border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  }
  
  .spec-value:last-child {
    border-bottom: none;
  }
  
  .breadcrumb-link {
    font-size: 1.6rem;
    padding: 0.375rem 0.75rem;
  }
  
  .breadcrumb-item.active span {
    font-size: 1.6rem;
  }
  
  .selector-label {
    font-size: 1.6rem;
  }
  
  .modern-select {
    font-size: 1.6rem;
    padding: 0.875rem 2.5rem 0.875rem 0.875rem;
  }
  
  .product-name {
    font-size: 1.75rem;
  }
  
  .spec-item {
    font-size: 1.6rem;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 1.5rem 0;
    margin-bottom: 1.5rem;
  }
  
  .hero-badge {
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
  }
  
  .intro-subtitle {
    font-size: 1.6rem;
  }
  
  .intro-title {
    font-size: 2rem;
  }
  
  .page-subtitle {
    font-size: 1.475rem;
  }
  
  .section-title {
    font-size: 1.875rem;
  }
  
  .section-subtitle {
    font-size: 1.475rem;
  }
  
  .card-header {
    padding: 1.25rem;
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  .spec-label {
    font-size: 1.475rem;
    padding: 1rem;
  }
  
  .spec-value {
    padding: 1rem;
  }
  
  .value-content {
    font-size: 1.475rem;
  }
  
  .value-content.highlight {
    font-size: 1.6rem;
  }
  
  .empty-comparison-state {
    padding: 3rem 1.5rem;
  }
  
  .empty-comparison-state h3 {
    font-size: 2rem;
  }
  
  .empty-comparison-state p {
    font-size: 1.6rem;
  }
}
</style>