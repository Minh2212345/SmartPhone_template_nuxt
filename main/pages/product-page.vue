<template>
  <div class="page-wrapper" :key="$route.query.sp_id">
    <main class="main">
      <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
        <div class="container d-flex align-items-center">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><NuxtLink to="/">Trang chủ</NuxtLink></li>
            <li class="breadcrumb-item"><NuxtLink to="/category-4cols">Sản phẩm</NuxtLink></li>
            <li class="breadcrumb-item active" aria-current="page">{{ product.ten_san_pham || 'Sản phẩm' }}</li>
          </ol>
        </div>
      </nav>

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
                        :src="selectedVariant.anh_san_pham_url || '/assets/images/placeholder.jpg'"
                        :data-zoom-image="selectedVariant.anh_san_pham_url || '/assets/images/placeholder.jpg'"
                        alt="product image"
                      />
                      <a href="#" id="btn-product-gallery" class="btn-product-gallery">
                        <i class="icon-arrows"></i>
                      </a>
                    </figure>
                    <div id="product-zoom-gallery" class="product-image-gallery">
                      <a
                        v-for="color in uniqueColors"
                        :key="color.name"
                        class="product-gallery-item"
                        :class="{ active: selectedVariant.mau_sac === color.name }"
                        href="#"
                        :data-image="getImageForColor(color.name)"
                        :data-zoom-image="getImageForColor(color.name)"
                        @click.prevent="selectColor(color.name)"
                      >
                        <img :src="getImageForColor(color.name)" alt="product variant" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="product-details">
                  <h1 class="product-title">
                    {{ product.ten_san_pham }} - {{ selectedVariant.bo_nho_trong_dung_luong }}
                  </h1>
                  <div class="memory-options">
                    <h5>Chọn bộ nhớ</h5>
                    <div class="d-flex flex-wrap">
                      <div
                        v-for="memory in uniqueMemories"
                        :key="memory"
                        class="option-btn"
                        :class="{
                          active: selectedVariant.bo_nho_trong_dung_luong === memory,
                          disabled: !isMemoryAvailable(memory),
                        }"
                        @click="isMemoryAvailable(memory) && selectMemory(memory)"
                      >
                        {{ memory }}<br />{{ formatPrice(getPriceForMemory(memory)) }} đ
                        <span class="check-icon"><i class="fas fa-check"></i></span>
                      </div>
                    </div>
                  </div>

                  <div class="details-filter-row details-row-size">
                    <div class="color-options">
                      <h5>Chọn màu để xem giá và chi nhánh có hàng</h5>
                      <div class="d-flex flex-wrap">
                        <div
                          v-for="color in uniqueColors"
                          :key="color.name"
                          class="option-btn color-btn"
                          :class="{ active: selectedVariant.mau_sac === color.name }"
                          @click="selectColor(color.name)"
                        >
                          <span class="color-circle" :style="{ backgroundColor: color.hex }"></span>
                          {{ color.name }}<br />{{ formatPrice(getPriceForColor(color.name)) }} đ
                          <span class="check-icon"><i class="fas fa-check"></i></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="details-filter-row details-row-size">
                    <label for="qty">Số lượng:</label>
                    <div class="product-details-quantity">
                      <input
                        type="number"
                        id="qty"
                        class="form-control"
                        v-model="quantity"
                        min="1"
                        max="10"
                        step="1"
                        data-decimals="0"
                        required
                      />
                    </div>
                  </div>

                  <div class="product-details-action">
                    <a href="#" class="btn-product btn-cart" @click.prevent="addToCart"
                      ><span>Thêm vào giỏ hàng</span></a
                    >
                    <div class="details-action-wrapper">
                      <a href="#" class="btn-product btn-compare" title="Compare"><span>So sánh</span></a>
                    </div>
                  </div>

                  <div class="product-details-footer">
                    <div class="product-cat">
                      <span>Phân loại:</span>
                      <a href="#">{{ manufacturerMap[product.nha_san_xuat] || product.nha_san_xuat || 'Unknown' }}</a
                      >,
                      <a href="#">Sản phẩm mới</a>
                    </div>
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
                </div>
              </div>
            </div>
          </div>

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
                  <p>{{ selectedVariant.ghi_chu || 'Không có mô tả chi tiết cho sản phẩm này.' }}</p>
                </div>
              </div>
              <div class="tab-pane fade" id="product-info-tab" role="tabpanel" aria-labelledby="product-info-link">
                <div class="product-desc-content">
                  <h3>Thông số kỹ thuật</h3>
                  <div class="specs-table">
                    <table class="table table-bordered">
                      <tbody>
                        <tr>
                          <td>CPU</td>
                          <td>{{ product.ten_cpu || 'Không có thông tin' }}</td>
                        </tr>
                        <tr>
                          <td>GPU</td>
                          <td>{{ product.ten_gpu || 'Không có thông tin' }}</td>
                        </tr>
                        <tr>
                          <td>Camera sau</td>
                          <td>{{ product.thong_so_camera_sau || 'Không có thông tin' }}</td>
                        </tr>
                        <tr>
                          <td>Camera trước</td>
                          <td>{{ product.thong_so_camera_truoc || 'Không có thông tin' }}</td>
                        </tr>
                        <tr>
                          <td>RAM</td>
                          <td>{{ selectedVariant.ram_dung_luong || 'Không có thông tin' }}</td>
                        </tr>
                        <tr>
                          <td>Bộ nhớ trong</td>
                          <td>{{ selectedVariant.bo_nho_trong_dung_luong || 'Không có thông tin' }}</td>
                        </tr>
                        <tr>
                          <td>Màu sắc</td>
                          <td>{{ selectedVariant.mau_sac || 'Không có thông tin' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
                          </div>
                        </div>
                        <span class="review-date">12/03/2025</span>
                      </div>
                      <div class="col">
                        <h4>Hiệu năng mạnh mẽ</h4>
                        <div class="review-content">
                          <p>Pin trâu tốt - đẹp - sang - mạnh - hơi nóng máy tí thui</p>
                        </div>
                        <div class="review-action">
                          <a href="#"><i class="icon-thumbs-up"></i>Có ích (2)</a>
                          <a href="#"><i class="icon-thumbs-down"></i>Không có ích (0)</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="review">
                    <div class="row no-gutters">
                      <div class="col-auto">
                        <h4><a href="#">Nguyễn Thành Nhân</a></h4>
                        <div class="ratings-container">
                          <div class="ratings">
                            <div class="ratings-val" style="width: 100%"></div>
                          </div>
                        </div>
                        <span class="review-date">19/2/2025</span>
                      </div>
                      <div class="col">
                        <h4>Thời lượng pin cực khủng</h4>
                        <div class="review-content">
                          <p>SVIP nên giữ thời gian lâu hơn 2 năm</p>
                        </div>
                        <div class="review-action">
                          <a href="#"><i class="icon-thumbs-up"></i>Có ích (0)</a>
                          <a href="#"><i class="icon-thumbs-down"></i>Không có ích (0)</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 class="title text-center mb-4">Những sản phẩm tương tự</h2>
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
            <div
              v-for="similarProduct in similarProducts"
              :key="similarProduct.id"
              class="product product-7 text-center"
            >
              <figure class="product-media">
                <NuxtLink :to="`/product-page?sp_id=${similarProduct.id}`">
                  <img
                    :src="similarProduct.imageUrl || '/assets/images/placeholder.jpg'"
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
                  <a href="#">{{
                    manufacturerMap[similarProduct.tenNhaSanXuat] || similarProduct.tenNhaSanXuat || 'Unknown'
                  }}</a>
                </div>
                <h3 class="product-title">
                  <a href="#" @click.prevent="handleProductChange(similarProduct.id)">{{
                    similarProduct.tenSanPham
                  }}</a>
                </h3>
                <div class="product-price">{{ formatPrice(similarProduct.giaBan || 0) }} VND</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ProductPage',
  data() {
    return {
      product: {},
      variants: [],
      selectedVariant: {},
      quantity: 1,
      similarProducts: [],
      manufacturerMap: {
        1: 'Apple',
        2: 'Samsung',
        3: 'Xiaomi',
        4: 'OPPO',
      },
      colorMap: {
        'Xanh Mộng Kết': '#a3d2ca',
        'Xanh Lưu Ly': '#b3cde0',
        Hồng: '#f4c2c2',
        Đen: '#333333',
        Trắng: '#ffffff',
        Bạc: '#c0c0c0',
        Cam: '#ffa500',
        Đỏ: '#ff0000',
        Gold: '#ffd700',
        Kem: '#fffdd0',
        Tím: '#800080',
        'Tím Đậm': '#4b0082',
        'Titan tự nhiên': '#8a8987',
        Vàng: '#ffff00',
        Xám: '#808080',
        'Xanh Bạc Hà': '#98ff98',
        'Xanh Dương': '#0000ff',
        'Xanh Dương Đậm': '#00008b',
        'Xanh Dương Nhạt': '#add8e6',
        'Xanh Lá': '#008000',
        'Vàng đồng': '#b8860b',
        Nâu: '#8b4513',
      },
      isLoading: false, // Thêm trạng thái loading
    }
  },
  computed: {
    uniqueMemories() {
      return [...new Set(this.variants.map((v) => v.bo_nho_trong_dung_luong))].sort()
    },
    uniqueColors() {
      return [...new Set(this.variants.map((v) => v.mau_sac))].map((name) => ({
        name,
        hex: this.colorMap[name] || '#ccc',
      }))
    },
    availableMemories() {
      return [
        ...new Set(
          this.variants.filter((v) => v.mau_sac === this.selectedVariant.mau_sac).map((v) => v.bo_nho_trong_dung_luong)
        ),
      ].sort()
    },
  },
  watch: {
    '$route.query.sp_id'(newSpId, oldSpId) {
      if (newSpId && newSpId !== oldSpId) {
        this.isLoading = true
        // Reset dữ liệu trước khi fetch mới
        this.product = {}
        this.variants = []
        this.selectedVariant = {}
        this.similarProducts = []
        this.fetchProductDetails(newSpId)
          .then(() => {
            return this.fetchSimilarProducts()
          })
          .then(() => {
            this.$nextTick(() => {
              this.initializeOwlCarousel()
            })
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },
  },
  async mounted() {
    const sanPhamId = this.$route.query.sp_id
    if (sanPhamId) {
      this.isLoading = true
      await this.fetchProductDetails(sanPhamId)
      await this.fetchSimilarProducts()
      this.$nextTick(() => {
        this.initializeOwlCarousel()
      })
      this.isLoading = false
    }
  },  
  methods: {
    async fetchProductDetails(sanPhamId) {
  try {
    // Reset dữ liệu trước khi fetch
    this.product = {};
    this.variants = [];
    this.selectedVariant = {};

    const response = await this.$axios.get('/api/chi-tiet-san-pham', {
      params: { sanPhamId },
    });
    if (Array.isArray(response.data) && response.data.length > 0) {
      this.variants = response.data.map((item) => ({
        sp_id: item.sp_id,
        ten_san_pham: item.ten_san_pham,
        sp_ma: item.sp_ma,
        sp_created_at: item.sp_created_at,
        nha_san_xuat: item.nha_san_xuat,
        ten_cpu: item.ten_cpu,
        ten_gpu: item.ten_gpu,
        thong_so_camera_sau: item.thong_so_camera_sau,
        thong_so_camera_truoc: item.thong_so_camera_truoc,
        ctsp_id: item.ctsp_id,
        gia_ban: item.gia_ban,
        ctsp_ma: item.ctsp_ma,
        id_imel: item.id_imel,
        mau_sac: item.mau_sac,
        ram_dung_luong: item.ram_dung_luong,
        bo_nho_trong_dung_luong: item.bo_nho_trong_dung_luong,
        anh_san_pham_url: item.anh_san_pham_url,
        ghi_chu: item.ghi_chu,
      }));
      this.product = {
        sp_id: this.variants[0].sp_id,
        ten_san_pham: this.variants[0].ten_san_pham,
        nha_san_xuat: this.variants[0].nha_san_xuat,
        ten_cpu: this.variants[0].ten_cpu,
        ten_gpu: this.variants[0].ten_gpu,
        thong_so_camera_sau: this.variants[0].thong_so_camera_sau,
        thong_so_camera_truoc: this.variants[0].thong_so_camera_truoc,
      };
      this.selectedVariant = { ...this.variants[0] }; // Deep copy để đảm bảo reactive
    } else {
      this.variants = [];
      this.product = {};
      this.selectedVariant = {};
    }
  } catch (error) {
    console.error('Error fetching product details:', error.message, error.response?.status);
    this.variants = [];
    this.product = {};
    this.selectedVariant = {};
  }
},
    async fetchSimilarProducts() {
      try {
        const response = await this.$axios.get('/api/suggested-products')
        this.similarProducts = Array.isArray(response.data)
          ? response.data
              .filter((p) => p.id !== this.product.sp_id)
              .slice(0, 5)
              .map((product) => ({
                ...product,
                tenNhaSanXuat: this.manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown',
              }))
          : []
        // Khởi tạo lại Owl Carousel sau khi dữ liệu được cập nhật
        this.$nextTick(() => {
          this.initializeOwlCarousel()
        })
      } catch (error) {
        console.error('Error fetching suggested products:', error.message, error.response?.status)
        this.similarProducts = []
      }
    },
    selectColor(color) {
      const variant =
        this.variants.find((v) => v.mau_sac === color && this.availableMemories.includes(v.bo_nho_trong_dung_luong)) ||
        this.variants.find((v) => v.mau_sac === color)
      if (variant) {
        this.selectedVariant = variant
      }
    },
    selectMemory(memory) {
      const variant =
        this.variants.find((v) => v.bo_nho_trong_dung_luong === memory && v.mau_sac === this.selectedVariant.mau_sac) ||
        this.variants.find((v) => v.bo_nho_trong_dung_luong === memory)
      if (variant) {
        this.selectedVariant = variant
      }
    },
    getImageForColor(color) {
      const variant = this.variants.find((v) => v.mau_sac === color)
      return variant ? variant.anh_san_pham_url : '/assets/images/placeholder.jpg'
    },
    getPriceForMemory(memory) {
      const variant =
        this.variants.find((v) => v.bo_nho_trong_dung_luong === memory && v.mau_sac === this.selectedVariant.mau_sac) ||
        this.variants.find((v) => v.bo_nho_trong_dung_luong === memory)
      return variant ? variant.gia_ban : 0
    },
    getPriceForColor(color) {
      const variant = this.variants.find((v) => v.mau_sac === color)
      return variant ? variant.gia_ban : 0
    },
    isMemoryAvailable(memory) {
      return this.availableMemories.includes(memory)
    },
    formatPrice(price) {
      return Number(price).toLocaleString('vi-VN')
    },
    addToCart() {
      console.log('Added:', {
        productId: this.product.sp_id,
        variantId: this.selectedVariant.ctsp_id,
        totalItems: this.quantity,
      })
    },
    initializeOwlCarousel() {
  if (process.client) {
    this.$nextTick(() => {
      const $ = window.jQuery;
      if ($ && $.fn && $.fn.owlCarousel) {
        const $carousel = $('.owl-carousel');
        if ($carousel.length) {
          // Hủy carousel cũ nếu tồn tại
          if ($carousel.hasClass('owl-loaded')) {
            try {
              $carousel.trigger('destroy.owl.carousel');
              $carousel.removeClass('owl-loaded owl-drag');
              $carousel.find('.owl-stage-outer').children().unwrap();
              $carousel.find('.owl-nav, .owl-dots').remove();
            } catch (e) {
              console.warn('Error destroying Owl Carousel:', e);
            }
          }
          // Khởi tạo carousel mới
          const options = $carousel.data('owl-options') || {
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
          };
          $carousel.owlCarousel(options);
        } else {
          console.warn('No carousel elements found');
        }
      } else {
        console.warn('jQuery or Owl Carousel not loaded');
      }
    });
  }
},
handleProductChange(newSpId) {
  const currentSpId = this.$route.query.sp_id;
  if (newSpId && newSpId !== currentSpId) {
    this.isLoading = true;
    this.$router.push({ path: '/product-page', query: { sp_id: newSpId } });
  }
},
  },
}
</script>

<style scoped>
.specs-table {
  margin-bottom: 30px;
}
.spec-btn {
  width: 100%;
  height: auto;
  margin-bottom: 30px;
}
.product-gallery-item {
  padding-bottom: 10px;
}
.option-btn {
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  min-width: 90px;
}
.option-btn.active {
  border-color: #007bff;
  background-color: #e7f1ff;
}
.option-btn.disabled {
  border-color: #cccccc;
  background-color: #f0f0f0;
  color: #999999;
  cursor: not-allowed;
}
.check-icon {
  position: absolute;
  top: -10px;
  right: -10px;
  display: none;
  color: #007bff;
}
.option-btn.active .check-icon {
  display: block;
}
.color-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.color-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
</style>
