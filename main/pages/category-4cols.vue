<template>
  <main class="main">
    <!-- eslint-disable -->
    <nav aria-label="breadcrumb" class="breadcrumb-nav mb-2">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <NuxtLink to="/">Trang chủ</NuxtLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <NuxtLink to="/category-4cols">Sản phẩm</NuxtLink>
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
        <div class="product product-7 text-center shadow">
          <figure class="product-media">
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
            <span
              v-if="product.hasDiscount && product.giaBan"
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
          </figure>
          <div class="product-body">
            <div class="product-cat">
              <!-- <NuxtLink to="/category-4cols">{{
                product.tenNhaSanXuat
              }}</NuxtLink> -->
            </div>
            <h3 class="product-title">
              <NuxtLink :to="`/product-page?sp_id=${product.id}`">{{ product.tenSanPham }}</NuxtLink>
            </h3>
            <div v-if="product.giaBan">
              <div v-if="product.hasDiscount" class="product-price">
                <span style="text-decoration: line-through; color: #999"
                  >{{ formatPrice(product.giaBan) }} VND</span
                >
                <span style="color: red; margin-left: 5px"
                  >{{ formatPrice(product.giaSauKhiGiam) }} VND</span
                >
              </div>
              <div v-else class="product-price">{{ formatPrice(product.giaBan) }} VND</div>
            </div>
            <div v-else class="product-price" style="color: #333; font-weight: bold">
              Liên hệ để đặt hàng
            </div>
            <div class="product-nav product-nav-dots">
              <a
                v-for="(mauSac, index) in product.mauSacList"
                :key="index"
                :class="{ active: index === 0 }"
                :style="{ background: getColorCode(mauSac) }"
                href="#"
              >
                <span class="sr-only">{{ mauSac }}</span>
              </a>
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


                <div>
                <h3 class="widget-title">
                  <NuxtLink to="/compare-page"
                    data-toggle="collapse"                    
                    role="button"
                    aria-expanded="true"
                    aria-controls="widget-2"
                  >
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
body {
  font-family: 'Roboto', sans-serif;
  margin: 20px;
}

.price-filter {
  width: 100%;
  max-width: 300px;
  margin: 20px 0;
}

.range-values {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 14px;
}

.range-values span {
  color: #333;
}

.range-slider {
  position: relative;
  width: 100%;
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
  background: #ff6200;
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
  background: #ff0000;
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
  font-size: 14px;
}

.filter-colors a {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin: 3px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
}

.filter-colors a.selected {
  border-color: #333;
}

@media (max-width: 768px) {
  .price-filter {
    max-width: 100%;
  }

  .range-values {
    font-size: 12px;
  }

  .label {
    font-size: 12px;
  }

  input[type='range']::-webkit-slider-thumb {
    width: 20px;
    height: 20px;
  }

  input[type='range']::-moz-range-thumb {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 576px) {
  .range-values {
    flex-direction: column;
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
