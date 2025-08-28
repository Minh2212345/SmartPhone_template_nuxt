<template>
  <main class="main">
    <!-- eslint-disable -->
    <!-- Modern Breadcrumb -->
    <nav aria-label="breadcrumb" class="modern-breadcrumb">
      <div class="container">
        <ol class="breadcrumb-list">
          <li class="breadcrumb-item">
            <NuxtLink to="/" class="breadcrumb-link">
              <i class="fas fa-home"></i>
              <span>Trang chủ</span>
            </NuxtLink>
          </li>
          <li class="breadcrumb-item active">
            <span>
              <i class="fas fa-mobile-alt"></i>
              <span>Sản phẩm</span>
            </span>
          </li>
        </ol>
      </div>
    </nav>

    <div class="page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-9">
            <div class="toolbox">
              <div class="toolbox-left">
                <div class="toolbox-info">
                  Hiện <span>{{ products.length }} trên {{ totalItems }}</span> sản phẩm
                </div>
              </div>
              <div class="toolbox-right">
                <div class="toolbox-sort">
                  <label for="sortby">Sắp xếp theo:</label>
                  <div class="select-custom">
                    <select name="sortby" id="sortby" class="form-control" v-model="sortBy" @change="fetchProducts(0)">
                      <option value="popularity">Liên quan</option>
                      <option value="price-asc">Giá từ thấp đến cao</option>
                      <option value="price-desc">Giá từ cao đến thấp</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="products mb-3">
              <div class="row justify-content-center">
                <div class="col-6 col-md-4 col-lg-4 col-xl-3" v-for="product in products" :key="product.id">
                  <div class="modern-product-card">
                    <div class="product-card-inner">
                      <figure class="product-media">
                        <div class="product-labels">
                          <span v-if="product.hasDiscount" class="product-label label-discount">
                            <i class="fas fa-tag"></i>
                            <span v-if="product.loaiGiamGiaApDung === 'Phần trăm' && product.giamPhanTram > 0">Giảm {{
                              product.giamPhanTram }}%</span>
                            <span v-else-if="product.loaiGiamGiaApDung === 'Tiền mặt' && product.giamToiDa > 0">Giảm {{
                              formatPrice(product.giamToiDa) }} VND</span>
                          </span>
                        </div>
                        <div class="product-image-wrapper">
                          <img :src="product.imageUrl || '/assets/images/placeholder.jpg'" alt="Product image"
                            class="product-image" />
                        </div>
                        <div class="floating-actions">
                          <button class="action-btn wishlist-btn" title="Yêu thích">
                            <i class="fas fa-heart"></i>
                          </button>
                          <NuxtLink to="/compare-page" class="action-btn compare-btn" title="So sánh">
                            <i class="fas fa-balance-scale"></i>
                          </NuxtLink>
                          <NuxtLink :to="`/product-page?sp_id=${product.id}`" class="action-btn quickview-btn" title="Xem nhanh">
                            <i class="fas fa-eye"></i>
                          </NuxtLink>
                        </div>
                      </figure>
                      <div class="product-info">
                        <div class="product-brand" v-if="product.tenNhaSanXuat">
                          <span class="brand-badge">{{ product.tenNhaSanXuat }}</span>
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
                          <span v-if="product.hasDiscount && product.giaBan" class="old-price">{{ formatPrice(product.giaBan || 0) }} VND</span>
                          <span class="current-price" v-if="product.giaBan">{{ formatPrice(product.giaSauKhiGiam || product.giaBan || 0) }} VND</span>
                          <span class="current-price" v-else>Liên hệ để đặt hàng</span>
                        </div>
                        <div v-if="product.mauSacList && product.mauSacList.length" class="product-colors">
                          <div class="color-options">
                            <span
                              v-for="(mauSac, index) in product.mauSacList.slice(0, 4)"
                              :key="index"
                              :class="{ active: index === 0 }"
                              :style="{ background: getColorCode(mauSac) }"
                              class="color-dot"
                              :title="mauSac"
                            ></span>
                            <span v-if="product.mauSacList.length > 4" class="more-colors">+{{ product.mauSacList.length - 4 }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <nav aria-label="Page navigation">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 0 }">
                  <a
                    class="page-link page-link-prev"
                    href="#"
                    @click.prevent="fetchProducts(currentPage - 1)"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true"><i class="icon-long-arrow-left"></i></span>Trang trước
                  </a>
                </li>
                <li
                  class="page-item"
                  v-for="page in totalPages"
                  :key="page"
                  :class="{ active: currentPage === page - 1 }"
                >
                  <a class="page-link" href="#" @click.prevent="fetchProducts(page - 1)">{{ page }}</a>
                </li>
                <li class="page-item-total">của {{ totalPages }}</li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
                  <a
                    class="page-link page-link-next"
                    href="#"
                    @click.prevent="fetchProducts(currentPage + 1)"
                    aria-label="Next"
                  >
                    Trang sau <span aria-hidden="true"><i class="icon-long-arrow-right"></i></span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <aside class="col-lg-3 order-lg-first">
            <div class="sidebar sidebar-shop">
              <div class="widget widget-clean">
                <label>Bộ lọc:</label>
                <a href="#" class="sidebar-filter-clear" @click.prevent="clearFilters">Đặt lại</a>
              </div>

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
                <div class="collapse show">
                  <div class="widget-body">
                    <div class="filter-items">
                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="use-1"
                            v-model="selectedUseCases"
                            value="pin_trau"
                          />
                          <label class="custom-control-label" for="use-1">Thời lượng pin lớn</label>
                        </div>
                      </div>
                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="use-2"
                            v-model="selectedUseCases"
                            value="bo_nho_lon"
                          />
                          <label class="custom-control-label" for="use-2">Dung lượng bộ nhớ lớn</label>
                        </div>
                      </div>
                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="use-3"
                            v-model="selectedUseCases"
                            value="ram_lon"
                          />
                          <label class="custom-control-label" for="use-3">Dung lượng RAM lớn</label>
                        </div>
                      </div>
                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="use-4"
                            v-model="selectedUseCases"
                            value="cau_hinh_cao"
                          />
                          <label class="custom-control-label" for="use-4">Flagship</label>
                        </div>
                      </div>
                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="use-5"
                            v-model="selectedUseCases"
                            value="chup_anh_dep"
                          />
                          <label class="custom-control-label" for="use-5">Chụp ảnh đẹp</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            

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
                <div class="collapse show">
                  <div class="widget-body">
                    <div class="filter-colors">
                      <a
                        v-for="color in uniqueColors"
                        :key="color"
                        :style="{ background: getColorCode(color) }"
                        :class="{ selected: selectedColors.includes(color) }"
                        @click.prevent="toggleColor(color)"
                      >
                        <span class="sr-only">{{ color }}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

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
                <div class="collapse show" id="widget-4">
                  <div class="widget-body">
                    <div class="filter-items">
                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="brand-1"
                            v-model="selectedBrands"
                            value="1"
                          />
                          <label class="custom-control-label" for="brand-1">Apple</label>
                        </div>
                      </div>
                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="brand-2"
                            v-model="selectedBrands"
                            value="2"
                          />
                          <label class="custom-control-label" for="brand-2">Samsung</label>
                        </div>
                      </div>
                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="brand-3"
                            v-model="selectedBrands"
                            value="3"
                          />
                          <label class="custom-control-label" for="brand-3">Xiaomi</label>
                        </div>
                      </div>
                      <div class="filter-item">
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="brand-4"
                            v-model="selectedBrands"
                            value="4"
                          />
                          <label class="custom-control-label" for="brand-4">Oppo</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="widget widget-collapsible">
                <h3 class="widget-title">
                  <a
                    data-toggle="collapse"
                    href="#widget-5"
                    role="button"
                    aria-expanded="true"
                    aria-controls="widget-5"
                  >
                    Giá
                  </a>
                </h3>
                <div class="collapse show">
                  <div class="widget-body">
                    <div class="price-filter">
                      <div class="label">Hoặc nhập khoảng giá phù hợp với bạn:</div>
                      <div class="range-values">
                        <span id="min-price">{{ formatPrice(minPrice) }}đ</span>
                        <span id="max-price">{{ formatPrice(maxPrice) }}đ</span>
                      </div>
                      <div class="range-slider">
                        <div class="slider-track"></div>
                        <div
                          class="slider-range"
                          :style="{ left: minPricePercent + '%', width: maxPricePercent - minPricePercent + '%' }"
                        ></div>
                        <input
                          type="range"
                          id="min-range"
                          :min="minPriceLimit"
                          :max="maxPriceLimit"
                          v-model.number="minPrice"
                          step="10000"
                          @input="updatePriceRange"
                        />
                        <input
                          type="range"
                          id="max-range"
                          :min="minPriceLimit"
                          :max="maxPriceLimit"
                          v-model.number="maxPrice"
                          step="10000"
                          @input="updatePriceRange"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="widget">
                <h3 class="widget-title">
                  <NuxtLink to="/compare-page" class="compare-link">
                    <i class="fas fa-balance-scale"></i>
                    So sánh các sản phẩm
                  </NuxtLink>
                </h3>              
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Category4Cols from '../store/product/category-4cols.js'

export default Category4Cols
</script>

<style scoped>
/* Import FontAwesome and Google Fonts */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* General styles */
.main {
  background: linear-gradient(135deg, #e6f3ff 0%, #e6f9f0 100%);
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  padding-bottom: 2rem;
}

.page-content {
  padding-top: 1rem;
}

/* Modern Product Cards */
.modern-product-card {
  margin-bottom: 1.5rem;
  perspective: 1000px;
}

.product-card-inner {
  background: #ffffff;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 16px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.product-card-inner:hover {
  transform: translateY(-12px) rotateX(5deg);
  box-shadow: 0 35px 80px rgba(0, 0, 0, 0.15), 0 15px 35px rgba(0, 0, 0, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
}

.product-card-inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.8), rgba(16, 185, 129, 0.8), rgba(245, 101, 101, 0.8));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card-inner:hover::before {
  opacity: 1;
}

.product-media {
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  background: #ffffff;
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
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 1.35rem;
  font-weight: 700;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.05);
  animation: pulse 3s infinite;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.product-label::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.product-label:hover::before {
  left: 100%;
}

.label-new {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(16, 185, 129, 0.95) 100%);
  color: #ffffff;
  border-color: rgba(59, 130, 246, 0.3);
}

.label-discount {
  background: linear-gradient(135deg, rgba(245, 101, 101, 0.95) 0%, rgba(251, 113, 133, 0.95) 100%);
  color: #ffffff;
  border-color: rgba(245, 101, 101, 0.3);
}

.product-image-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  background: #ffffff;
  border-radius: 1rem;
  margin: 0.75rem;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1.5rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.product-card-inner:hover .product-image {
  transform: scale(1.08) rotate(2deg);
}

/* Floating Actions */
.floating-actions {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  opacity: 0;
  transform: translateX(30px) scale(0.8);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 15;
}

.product-card-inner:hover .floating-actions {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.action-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  color: #4a5568;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
}

.action-btn:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(16, 185, 129, 0.95) 100%);
  color: #ffffff;
  transform: scale(1.15) rotate(5deg);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3), 0 4px 12px rgba(16, 185, 129, 0.2);
  border-color: rgba(255, 255, 255, 0.9);
}

.action-btn.wishlist-btn:hover {
  background: linear-gradient(135deg, rgba(245, 101, 101, 0.95) 0%, rgba(251, 113, 133, 0.95) 100%);
  box-shadow: 0 8px 25px rgba(245, 101, 101, 0.3), 0 4px 12px rgba(251, 113, 133, 0.2);
}

.action-btn.compare-btn:hover {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.95) 0%, rgba(139, 92, 246, 0.95) 100%);
  box-shadow: 0 8px 25px rgba(168, 85, 247, 0.3), 0 4px 12px rgba(139, 92, 246, 0.2);
}

/* Product Info */
.product-info {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  backdrop-filter: blur(10px);
  position: relative;
}

.product-info::before {
  content: '';
  position: absolute;
  top: 0;
  left: 1.5rem;
  right: 1.5rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
}

.product-brand {
  margin-bottom: 0.5rem;
}

.brand-badge {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(16, 185, 129, 0.9) 100%);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 25px;
  font-size: 1.35rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.brand-badge:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.product-name {
  font-size: 1.6rem;
  font-weight: 700;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0.75rem 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.3s ease;
}

.product-name:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(16, 185, 129, 0.9) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.product-name a {
  color: #1a202c;
  text-decoration: none;
  transition: color 0.3s ease;
}

.product-name a:hover {
  color: #2563eb;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.stars {
  display: flex;
  gap: 3px;
}

.stars i {
  color: #fbbf24;
  font-size: 1.7rem;
  filter: drop-shadow(0 1px 2px rgba(251, 191, 36, 0.3));
  transition: all 0.2s ease;
}

.stars i:hover {
  transform: scale(1.2);
  color: #f59e0b;
}

.rating-text {
  font-size: 1.475rem;
  color: #4a5568;
  font-weight: 600;
  background: linear-gradient(135deg, #4a5568 0%, #718096 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.product-price {
  margin-bottom: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.15);
  position: relative;
  overflow: hidden;
}

.product-price::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(16, 185, 129, 0.03) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-price:hover::before {
  opacity: 1;
}

.old-price {
  font-size: 1.6rem;
  font-weight: 500;
  color: #ef4444;
  text-decoration: line-through;
  margin-right: 0.75rem;
  opacity: 0.9;
}

.current-price {
  font-size: 1.85rem;
  font-weight: 800;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(16, 185, 129, 0.9) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 4px rgba(59, 130, 246, 0.2));
  transition: all 0.3s ease;
}

.current-price:hover {
  transform: scale(1.02);
  filter: drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3));
}

/* Product Colors */
.product-colors {
  margin-bottom: 0.5rem;
}

.color-options {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.color-dot:hover,
.color-dot.active {
  border-color: #333;
  transform: scale(1.2);
}

.more-colors {
  font-size: 1.35rem;
  color: #718096;
  font-weight: 500;
  background: #f7fafc;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}


/* Toolbox */
.toolbox {
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.toolbox-info {
  font-size: 2rem;
  color: #4a5568;
}

.toolbox-info span {
  font-weight: 600;
  color: #1a202c;
}

.toolbox-sort {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toolbox-sort label {
  font-size: 1.875rem;
  color: #4a5568;
  margin: 0;
}

.select-custom select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #ffffff;
  color: #1a202c;
  font-size: 1.875rem;
}

/* Pagination */
.pagination {
  margin-top: 3rem;
}

.page-link {
  color: #4a5568;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 0.5rem 0.75rem;
  margin: 0 0.125rem;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.page-link:hover {
  background: linear-gradient(to right, rgba(0, 44, 105, 0.9), rgba(19, 173, 117, 0.9));
  color: #ffffff;
  border-color: transparent;
}

.page-item.active .page-link {
  background: linear-gradient(to right, rgba(0, 44, 105, 0.9), rgba(19, 173, 117, 0.9));
  color: #ffffff;
  border-color: transparent;
}

.page-item.disabled .page-link {
  color: #9ca3af;
  background-color: #f7fafc;
  cursor: not-allowed;
}

.page-item-total {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  color: #4a5568;
  font-size: 1.875rem;
}

/* Sidebar */
.sidebar {
  background: #ffffff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.widget {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.widget:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.widget-title {
  font-size: 2.125rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 1rem;
}

.widget-title a {
  color: #1a202c;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.widget-clean {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.sidebar-filter-clear {
  color: #ef4444;
  text-decoration: none;
  font-size: 1.875rem;
  font-weight: 500;
}

.sidebar-filter-clear:hover {
  color: #dc2626;
}

.filter-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-item {
  display: flex;
  align-items: center;
}

.custom-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.custom-control-input {
  margin: 0;
  accent-color: #2563eb;
}

.custom-control-label {
  font-size: 1.875rem;
  color: #4a5568;
  cursor: pointer;
  user-select: none;
}

.custom-control-label:hover {
  color: #1a202c;
}

/* Filter Colors */
.filter-colors {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-colors a {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-colors a:hover,
.filter-colors a.selected {
  border-color: #333;
  transform: scale(1.2);
}

/* Price Filter */
.price-filter {
  width: 100%;
}

.label {
  font-size: 1.875rem;
  color: #4a5568;
  margin-bottom: 1rem;
  font-weight: 500;
}

.range-values {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.875rem;
}

.range-values span {
  color: #1a202c;
  background: #f7fafc;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.range-slider {
  position: relative;
  width: 100%;
  height: 40px;
}

.slider-track {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 5px;
  background: #e2e8f0;
  width: 100%;
  border-radius: 5px;
  z-index: 1;
}

.slider-range {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 5px;
  background: rgba(19, 173, 117, 0.9);
  z-index: 2;
  border-radius: 5px;
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
  top: 50%;
  transform: translateY(-50%);
  margin-top: -7px;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: rgba(19, 173, 117, 0.9);
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

input[type='range']::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

input[type='range']::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  appearance: none;
  height: 5px;
}

input[type='range']::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: rgba(19, 173, 117, 0.9);
  cursor: pointer;
  pointer-events: auto;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

input[type='range']::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

input[type='range']::-moz-range-track {
  background: transparent;
}

/* Compare Link */
.compare-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(19, 173, 117, 0.9);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #e6f3ff 0%, #e6f9f0 100%);
  border: 2px solid transparent;
}

.compare-link:hover {
  background: linear-gradient(to right, rgba(0, 44, 105, 0.1), rgba(19, 173, 117, 0.1));
  border-color: rgba(19, 173, 117, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.compare-link i {
  font-size: 1.125rem;
}

/* Breadcrumb */
.modern-breadcrumb {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-item:not(:last-child)::after {
  content: '/';
  margin: 0 0.5rem;
  color: #6b7280;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.breadcrumb-link:hover {
  color: #002c69;
  text-decoration: none;
}

.breadcrumb-item.active span {
  color: #1f2937;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb-nav {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 0.5rem;
  margin: 0 0 1rem 0;
}

.breadcrumb {
  margin: 0;
  padding: 0;
  background: transparent;
}

.breadcrumb-item a {
  color: #4a5568;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-item a:hover {
  color: #2563eb;
}

.breadcrumb-item.active a {
  color: #1a202c;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 991.98px) {
  .toolbox {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
  
  .sidebar {
    margin-top: 2rem;
    order: 2;
  }
  
  .col-lg-9 {
    order: 1;
  }
}

@media (max-width: 767.98px) {
  
  .modern-product-card {
    margin-bottom: 1rem;
  }
  
  .product-card-inner {
    border-radius: 0.75rem;
  }
  
  .product-info {
    padding: 0.75rem;
  }
  
  .product-name a {
    font-size: 0.875rem;
    -webkit-line-clamp: 3;
    line-clamp: 3;
  }
  
  .current-price {
    font-size: 1.125rem;
  }
  
  .add-to-cart-btn {
    padding: 0.625rem;
    font-size: 0.875rem;
  }
  
  .sidebar {
    padding: 1rem;
  }
  
  .widget {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }
  
  .filter-colors {
    justify-content: center;
  }
  
  .range-slider {
    height: 50px;
  }
  
  input[type='range']::-webkit-slider-thumb {
    width: 22px;
    height: 22px;
  }
  
  input[type='range']::-moz-range-thumb {
    width: 22px;
    height: 22px;
  }
}

@media (max-width: 575.98px) {
  .products .row > div {
    flex: 0 0 50%;
    max-width: 50%;
  }
  
  .range-values {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .range-values span {
    font-size: 0.75rem;
  }
  
  .pagination {
    font-size: 0.875rem;
  }
  
  .page-link {
    padding: 0.375rem 0.5rem;
  }
}
</style>