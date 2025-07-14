<template>
  <!-- eslint-disable -->
  <div class="page-wrapper" :key="$route.query.sp_id" v-if="isLoading || (product && selectedVariant)">
    <main class="main">
      <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
        <div class="container d-flex align-items-center">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <NuxtLink to="/">Trang chủ</NuxtLink>
            </li>
            <li class="breadcrumb-item">
              <NuxtLink to="/category-4cols">Sản phẩm</NuxtLink>
            </li>
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
                  <div v-if="selectedVariant.has_discount" class="product-price">
                    <span style="text-decoration: line-through; color: #999"
                      >{{ formatPrice(selectedVariant.gia_ban_dau) }} VND</span
                    >
                    <span style="color: red; margin-left: 5px"
                      >{{ formatPrice(selectedVariant.gia_sau_khi_giam) }} VND</span
                    >
                    <span
                      v-if="selectedVariant.loai_giam_gia_ap_dung === 'Phần trăm' && selectedVariant.giam_phan_tram > 0"
                      class="badge badge-danger ml-2"
                      >Giảm {{ selectedVariant.giam_phan_tram }}%</span
                    >
                    <span
                      v-else-if="
                        selectedVariant.loai_giam_gia_ap_dung === 'Tiền mặt' && selectedVariant.giam_toi_da > 0
                      "
                      class="badge badge-danger ml-2"
                      >Giảm {{ formatPrice(selectedVariant.giam_toi_da) }} VND</span
                    >
                  </div>
                  <div v-else class="product-price" style="color: #00aeef">
                    {{ formatPrice(selectedVariant.gia_ban) }} VND
                  </div>
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
                        {{ memory }}<br />
                        <span class="check-icon"><i class="fas fa-check"></i></span>
                      </div>
                    </div>
                  </div>

                  <div class="details-filter-row details-row-size">
                    <div class="color-options">
                      <h5>Chọn màu để xem giá sản phẩm</h5>
                      <div class="d-flex flex-wrap">
                        <div
                          v-for="color in uniqueColors"
                          :key="color.name"
                          class="option-btn color-btn"
                          :class="{ active: selectedVariant.mau_sac === color.name }"
                          @click="selectColor(color.name)"
                        >
                          <span class="color-circle" :style="{ backgroundColor: color.hex }"></span>
                          {{ color.name }}<br />{{ formatPrice(getPriceForColor(color.name)) }}
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
                    <a href="#" class="btn-product btn-cart ml-2" @click.prevent="showBuyNowModal = true"
                      ><span>Mua ngay</span></a
                    >
                    <div class="details-action-wrapper">                      
                      <NuxtLink to="/compare-page" class="btn-product btn-compare"  title="Compare"><span>So sánh</span></NuxtLink>
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

          <div class="highlight-specs" v-if="product && selectedVariant">
            <h3>Thông số nổi bật</h3>
            <div class="row">
              <div class="col-md-4">
                <i class="fas fa-microchip mr-2"></i>
                <strong>CPU:</strong> {{ product.ten_cpu || 'Không có thông tin' }}
              </div>
              <div class="col-md-4">
                <i class="fas fa-desktop mr-2"></i>
                <strong>GPU:</strong> {{ product.ten_gpu || 'Không có thông tin' }}
              </div>
              <div class="col-md-4">
                <i class="fas fa-memory mr-2"></i>
                <strong>RAM:</strong> {{ selectedVariant.ram_dung_luong || 'Không có thông tin' }}
              </div>
            </div>
          </div>

          <div class="product-desc-content mb-4" v-if="selectedVariant">
            <button class="btn btn-primary mt-3" @click="toggleSidebar">Xem thông số chi tiết</button>
          </div>

          <div v-if="showSidebar" class="sidebar-overlay" @click.self="showSidebar = false">
            <div class="sidebar-panel">
              <div class="sidebar-header">
                <h5>Thông số chi tiết</h5>
                <button class="close-btn" @click="showSidebar = false">×</button>
              </div>
              <div class="sidebar-body">
                <img
                  :src="selectedVariant.anh_san_pham_url || '/assets/images/placeholder.jpg'"
                  alt="Product Image"
                  class="sidebar-image"
                />
                <table class="specs-table">
                  <tr>
                    <td><i class="fas fa-shield-alt mr-2"></i>Chỉ số chống bụi và nước</td>
                    <td>{{ product.chi_so_khang_bui_nuoc || 'Không có thông tin' }}</td>
                  </tr>
                  <tr>
                    <td><i class="fas fa-network-wired mr-2"></i>Công nghệ mạng</td>
                    <td>{{ product.ten_cong_nghe_mang || 'Không có thông tin' }}</td>
                  </tr>
                  <tr>
                    <td><i class="fas fa-cogs mr-2"></i>Hệ điều hành</td>
                    <td>
                      {{ product.he_dieu_hanh || 'Không có thông tin' }} (Phiên bản:
                      {{ product.phien_ban || 'Không có thông tin' }})
                    </td>
                  </tr>
                  <tr>
                    <td><i class="fas fa-sd-card mr-2"></i>Hỗ trợ bộ nhớ ngoài</td>
                    <td>{{ product.ho_tro_bo_nho_ngoai || 'Không có thông tin' }}</td>
                  </tr>
                  <tr>
                    <td><i class="fas fa-battery-full mr-2"></i>Dung lượng pin</td>
                    <td>{{ product.dung_luong_pin || 'Không có thông tin' }}</td>
                  </tr>
                  <tr>
                    <td><i class="fas fa-sim-card mr-2"></i>Loại SIM</td>
                    <td>{{ product.cac_loai_sim_ho_tro || 'Không có thông tin' }}</td>
                  </tr>
                  <tr>
                    <td><i class="fas fa-cube mr-2"></i>Chất liệu khung</td>
                    <td>{{ product.chat_lieu_khung || 'Không có thông tin' }}</td>
                  </tr>
                  <tr>
                    <td><i class="fas fa-square mr-2"></i>Chất liệu mặt lưng</td>
                    <td>{{ product.chat_lieu_mat_lung || 'Không có thông tin' }}</td>
                  </tr>
                  <tr>
                    <td><i class="fas fa-charging-station mr-2"></i>Công nghệ sạc</td>
                    <td>{{ product.cong_nghe_ho_tro || 'Không có thông tin' }}</td>
                  </tr>
                  <tr>
                    <td><i class="fas fa-mobile-alt mr-2"></i>Thông tin màn hình</td>
                    <td>{{ screenInfo }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Buy Now Modal -->
          <div v-if="showBuyNowModal" class="modal-overlay" @click.self="showBuyNowModal = false">
            <div class="modal-content">
              <div class="modal-header">
                <h5>Thông tin đặt hàng</h5>
                <button class="close-btn" @click="showBuyNowModal = false">×</button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="submitOrder">
                  <div class="form-group">
                    <label for="customerName">Họ và tên *</label>
                    <input
                      type="text"
                      id="customerName"
                      class="form-control"
                      v-model="orderInfo.name"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="phoneNumber">Số điện thoại *</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      class="form-control"
                      v-model="orderInfo.phone"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      class="form-control"
                      v-model="orderInfo.email"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="address">Địa chỉ giao hàng *</label>
                    <textarea
                      id="address"
                      class="form-control"
                      v-model="orderInfo.address"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" class="btn btn-pay">Thanh toán tiền mặt</button>
                  <button type="submit" class="btn btn-pay">Thanh toán VNPay</button>
                </form>
              </div>
            </div>
          </div>

          <div class="product-desc-content mb-4" v-if="selectedVariant">
            <h3>Mô tả sản phẩm</h3>
            <p>{{ selectedVariant.ghi_chu || 'Không có mô tả chi tiết cho sản phẩm này.' }}</p>
          </div>

          <div class="reviews mb-4" v-if="selectedVariant">
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
import ProductPage from '../store/product/product-page.js'

export default {
  extends: ProductPage,
  data() {
    return {
      showSidebar: false,
      showBuyNowModal: false,
      orderInfo: {
        name: '',
        phone: '',
        email: '',
        address: ''
      }
    }
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar
    },
    submitOrder() {      
      console.log('Order submitted:', this.orderInfo)
      this.showBuyNowModal = false
      
      this.orderInfo = {
        name: '',
        phone: '',
        email: '',
        address: ''
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  max-width: 500px;
  position: relative;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.form-group textarea {
  min-height: 100px;
}

/* Tăng cỡ chữ cho các phần thông tin bên ngoài */
.product-title,
.product-price,
.memory-options h5,
.color-options h5,
.product-details-footer,
.product-desc-content p,
.reviews h3,
.reviews h4,
.review-content p,
.review-date,
.highlight-specs {
  font-size: 1.8rem;
}

.highlight-specs {
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 5px;
}

.highlight-specs .row div {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.sidebar-panel {
  width: 400px;
  background: #fff;
  height: 100vh; /* Sử dụng 100% chiều cao viewport */
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.sidebar-header h5 {
  font-size: 1.8rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
}

.btn.btn-pay {
  background-color: #2d53ff;
  color: white;
}

.sidebar-body {
  font-size: 1.5rem;
  height: calc(100% - 60px); /* Chiều cao còn lại sau header */
  overflow-y: auto; /* Cho phép cuộn theo chiều dọc */
  padding-right: 5px; /* Thêm padding để tránh cuộn ngang */
}

.sidebar-image {
  width: 100%;
  height: auto;
  margin-bottom: 15px;
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.specs-table td {
  padding: 10px;  
}

.specs-table td:first-child {
  font-weight: bold;
  width:50%;
}

.specs-table td i {
  margin-right: 8px;
}

.specs-table tr:hover {
  background-color: #f1f1f1;
}

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

.option-btn.active .check-icon {
  display: block;
}
.check-icon {
  display: none;
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #34d399;
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
}
</style>