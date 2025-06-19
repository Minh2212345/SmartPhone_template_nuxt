<template>
  <main class="main">

    <nav aria-label="breadcrumb" class="breadcrumb-nav mb-2">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><NuxtLink to="/">Trang chủ</NuxtLink></li>
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
                <div class="toolbox-info">Hiện <span>{{ products.length }} trên {{ totalItems }}</span> sản phẩm</div>
              </div>
              <div class="toolbox-right">
                <div class="toolbox-sort">
                  <label for="sortby">Sắp xếp theo:</label>
                  <div class="select-custom">
                    <select name="sortby" id="sortby" class="form-control" v-model="sortBy" @change="fetchProducts(0)">
                      <option value="popularity">Liên quan</option>
                      <option value="rating">Giá cao</option>
                      <option value="date">Giá thấp</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="products mb-3">
              <div class="row justify-content-center">
                <div class="col-6 col-md-4 col-lg-4 col-xl-3" v-for="product in products" :key="product.id">
                  <div class="product product-7 text-center">
                    <figure class="product-media">
                      <NuxtLink :to="`/product-page?sp_id=${product.id}`">
                        <img :src="product.imageUrl || '/assets/images/placeholder.jpg'" alt="Product image" class="product-image" />
                      </NuxtLink>
                      <div class="product-action-vertical">
                        <NuxtLink to="/compare-page" class="btn-product-icon btn-compare" title="Compare">
                          <span>So sánh</span>
                        </NuxtLink>
                      </div>
                    </figure>
                    <div class="product-body">
                      <div class="product-cat">
                        <NuxtLink to="/category-4cols">{{ manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown' }}</NuxtLink>
                      </div>
                      <h3 class="product-title">
                        <NuxtLink :to="`/product-page?sp_id=${product.id}`">{{ product.tenSanPham }}</NuxtLink>
                      </h3>
                      <div class="product-price">{{ formatPrice(product.giaBan || 0) }} VND</div>
                      <div class="product-nav product-nav-dots">
                        <a href="#" class="active" style="background: #edd2c8"><span class="sr-only">Color name</span></a>
                        <a href="#" style="background: #eaeaec"><span class="sr-only">Color name</span></a>
                        <a href="#" style="background: #333333"><span class="sr-only">Color name</span></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <nav aria-label="Page navigation">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 0 }">
                  <a class="page-link page-link-prev" href="#" @click.prevent="fetchProducts(currentPage - 1)" aria-label="Previous">
                    <span aria-hidden="true"><i class="icon-long-arrow-left"></i></span>Trang trước
                  </a>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page - 1 }">
                  <a class="page-link" href="#" @click.prevent="fetchProducts(page - 1)">{{ page }}</a>
                </li>
                <li class="page-item-total">của {{ totalPages }}</li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
                  <a class="page-link page-link-next" href="#" @click.prevent="fetchProducts(currentPage + 1)" aria-label="Next">
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
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Category4Cols',
  data() {
    return {
      products: [],
      currentPage: 0,
      totalPages: 1,
      totalItems: 0,
      sortBy: 'popularity',
      selectedCameraFeatures: [],
      cameraFeatures: [
        { id: 1, name: 'Chụp xóa phông', count: 3 },
        { id: 2, name: 'Chụp góc rộng', count: 0 },
        { id: 3, name: 'Quay video 4K', count: 4 },
        { id: 4, name: 'Chụp Zoom xa', count: 2 },
        { id: 5, name: 'Chụp macro', count: 2 },
        { id: 6, name: 'Chống rung', count: 1 },
        { id: 7, name: 'Quay video 8K', count: 1 },
        { id: 8, name: 'Camera AI', count: 0 },
        { id: 9, name: 'Chụp đêm', count: 10 },
      ],
      manufacturerMap: {
        1: 'Apple',
        2: 'Samsung',
        3: 'Huawei',
        4: 'Xiaomi',
        5: 'Nothing Phone',
        6: 'Redmi',
        7: 'Oppo',
      },
    };
  },
async asyncData({ $axios, error }) {
  try {
    const response = await $axios.get('/api/products', {
      params: { page: 0, size: 20, sortBy: 'popularity' },
    });
    return {
      products: Array.isArray(response.data.products)
        ? response.data.products.map(product => ({
            ...product,
            tenNhaSanXuat: product.tenNhaSanXuat || 'Unknown',
            createdAt: product.createdAt?.timestamp || product.createdAt,
          }))
        : [],
      currentPage: response.data.currentPage || 0,
      totalPages: response.data.totalPages || 1,
      totalItems: response.data.totalItems || 0,
    };
  } catch (err) {
    console.error('Error fetching initial products:', err.message);
    return {
      products: [],
      currentPage: 0,
      totalPages: 1,
      totalItems: 0,
    };
  }
},
async mounted() {
  if (!this.products.length) {
    await this.fetchProducts(0);
  }
},
  methods: {
async fetchProducts(page) {
  try {
    const response = await this.$axios.get('/api/products', {
      params: {
        page: page,
        size: 20,
        sortBy: this.sortBy,
        cameraFeatures: this.selectedCameraFeatures.join(','),
      },
    });
    this.products = Array.isArray(response.data.products)
      ? response.data.products.map(product => ({
          ...product,
          tenNhaSanXuat: this.manufacturerMap[product.tenNhaSanXuat] || 'Unknown',
          createdAt: product.createdAt?.timestamp || product.createdAt,
        }))
      : [];
    this.currentPage = response.data.currentPage || 0;
    this.totalPages = response.data.totalPages || 1;
    this.totalItems = response.data.totalItems || 0;
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });
    this.$toast.error('Không thể tải sản phẩm. Vui lòng thử lại sau!'); // Sử dụng plugin toast nếu có
    this.products = [];
    this.currentPage = 0;
    this.totalPages = 1;
    this.totalItems = 0;
  }
},
    formatPrice(price) {
      return price.toLocaleString('vi-VN');
    },
  },
};
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