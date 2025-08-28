<template>
  <div>
    <div v-if="isLoading || (product && selectedVariant)" :key="$route.query.sp_id" class="modern-product-page">
      <main class="main">
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
              <li class="breadcrumb-item">
                <NuxtLink to="/category-4cols" class="breadcrumb-link">
                  <i class="fas fa-mobile-alt"></i>
                  <span>Sản phẩm</span>
                </NuxtLink>
              </li>
              <li class="breadcrumb-item active">
                <span>{{ product.ten_san_pham || 'Sản phẩm' }}</span>
              </li>
            </ol>
          </div>
        </nav>

        <div class="page-content">
          <div class="container">
            <!-- Product Details Section -->
            <div class="modern-product-details">
              <div class="row">
                <!-- Product Gallery -->
                <div class="col-lg-6">
                  <div class="modern-product-gallery">
                    <div class="main-image-container">
                      <figure class="main-product-image">
                        <div class="image-wrapper">
                          <img id="product-zoom"
                            :src="selectedVariant.anh_san_pham_url || '/assets/images/placeholder.jpg'"
                            :data-zoom-image="selectedVariant.anh_san_pham_url || '/assets/images/placeholder.jpg'"
                            alt="product image" class="main-image" />
                          <div class="image-overlay">
                            <button class="zoom-btn">
                              <i class="fas fa-search-plus"></i>
                            </button>
                          </div>
                        </div>
                      </figure>

                      <!-- Thumbnail Gallery -->
                      <div class="thumbnail-gallery">
                        <div class="thumbnail-wrapper">
                          <div v-for="color in uniqueColors" :key="color.name" class="thumbnail-item"
                            :class="{ active: selectedVariant.mau_sac === color.name }"
                            @click="selectColor(color.name)">
                            <img :src="getImageForColor(color.name)" :alt="color.name" class="thumbnail-image" />
                            <div class="thumbnail-overlay"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Product Info -->
                <div class="col-lg-6">
                  <div class="modern-product-info">
                    <!-- Product Title -->
                    <div class="product-header">
                      <div class="brand-badge">
                        <i class="fas fa-star"></i>
                        <span>{{ manufacturerMap[product.nha_san_xuat] || product.nha_san_xuat || 'Premium' }}</span>
                      </div>
                      <h1 class="modern-product-title">
                        {{ product.ten_san_pham + " | Chính Hãng VN/A" }}
                      </h1>
                      <div class="product-subtitle">
                        {{ selectedVariant.bo_nho_trong_dung_luong }} - {{ selectedVariant.mau_sac }}
                      </div>
                    </div>

                    <!-- Product Rating -->
                    <div class="product-rating-section">
                      <div class="rating-stars">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                      </div>
                      <span class="rating-text">(4.8 - 256 đánh giá)</span>
                    </div>

                    <!-- Product Price -->
                    <div class="modern-price-section">
                      <div v-if="selectedVariant.has_discount" class="price-container">
                        <div class="price-main">
                          <span v-if="selectedVariant.gia_sau_khi_giam > 0" class="current-price">
                            {{ formatPrice(selectedVariant.gia_sau_khi_giam) }} VND
                          </span>
                          <span v-else class="contact-price">Liên hệ để đặt hàng</span>
                        </div>
                        <div class="price-secondary">
                          <span v-if="selectedVariant.gia_ban_dau > 0" class="old-price">
                            {{ formatPrice(selectedVariant.gia_ban_dau) }} VND
                          </span>
                          <span
                            v-if="selectedVariant.loai_giam_gia_ap_dung === 'Phần trăm' && selectedVariant.giam_phan_tram > 0"
                            class="discount-badge">
                            <i class="fas fa-tag"></i>
                            Giảm {{ selectedVariant.giam_phan_tram }}%
                          </span>
                          <span
                            v-else-if="selectedVariant.loai_giam_gia_ap_dung === 'Tiền mặt' && selectedVariant.giam_toi_da > 0"
                            class="discount-badge">
                            <i class="fas fa-tag"></i>
                            Giảm {{ formatPrice(selectedVariant.giam_toi_da) }} VND
                          </span>
                        </div>
                      </div>
                      <div v-else class="price-container">
                        <div class="price-main">
                          <span v-if="selectedVariant.gia_ban > 0" class="current-price">
                            {{ formatPrice(selectedVariant.gia_ban) }} VND
                          </span>
                          <span v-else class="contact-price">Liên hệ để đặt hàng</span>
                        </div>
                      </div>
                    </div>

                    <!-- Memory Options -->
                    <div class="modern-options-section">
                      <h5 class="options-title">
                        <i class="fas fa-memory"></i>
                        Chọn bộ nhớ
                      </h5>
                      <div class="options-grid">
                        <div v-for="memory in uniqueMemories" :key="memory" class="modern-option-btn memory-option"
                          :class="{
                            active: selectedVariant.bo_nho_trong_dung_luong === memory,
                            disabled: !isMemoryAvailable(memory),
                          }" @click="isMemoryAvailable(memory) && selectMemory(memory)">
                          <div class="option-content">
                            <span class="option-text">{{ memory }}</span>
                            <div class="option-check">
                              <i class="fas fa-check"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Color Options -->
                    <div class="modern-options-section">
                      <h5 class="options-title">
                        <i class="fas fa-palette"></i>
                        Chọn màu sắc
                      </h5>
                      <div class="options-grid">
                        <div v-for="color in uniqueColors" :key="color.name" class="modern-option-btn color-option"
                          :class="{ active: selectedVariant.mau_sac === color.name }" @click="selectColor(color.name)">
                          <div class="option-content">
                            <div class="color-preview">
                              <span class="color-circle" :style="{ backgroundColor: color.hex }"></span>
                            </div>
                            <div class="color-info">
                              <span class="color-name">{{ color.name }}</span>
                              <span class="color-price" v-if="getPriceForColor(color.name) !== null">
                                {{ formatPrice(getPriceForColor(color.name)) }} VND
                              </span>
                              <span class="color-price" v-else>Liên hệ</span>
                            </div>
                            <div class="option-check">
                              <i class="fas fa-check"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="modern-action-section">
                      <div class="action-buttons">
                        <button class="modern-btn primary" @click="addToCart">
                          <i class="fas fa-shopping-cart"></i>
                          <span>Thêm vào giỏ hàng</span>
                          <div class="btn-shine"></div>
                        </button>
                        <NuxtLink to="/cart-page" class="modern-btn secondary">
                          <i class="fas fa-credit-card"></i>
                          <span>Mua ngay</span>
                          <div class="btn-shine"></div>
                        </NuxtLink>
                      </div>
                      <div class="secondary-actions">
                        <button class="secondary-btn">
                          <i class="fas fa-heart"></i>
                          <span>Yêu thích</span>
                        </button>
                        <NuxtLink to="/compare-page" class="secondary-btn">
                          <i class="fas fa-balance-scale"></i>
                          <span>So sánh</span>
                        </NuxtLink>
                        <button class="secondary-btn specs-btn" @click="toggleSidebar">
                          <i class="fas fa-list-ul"></i>
                          <span>Thông số chi tiết</span>
                        </button>
                      </div>
                    </div>

                    <!-- Product Meta -->
                    <div class="modern-product-meta">
                      <div class="meta-item">
                        <i class="fas fa-tag"></i>
                        <span class="meta-label">Phân loại:</span>
                        <span class="meta-value">{{ manufacturerMap[product.nha_san_xuat] || product.nha_san_xuat ||
                          'Unknown' }}, Sản phẩm mới</span>
                      </div>
                      <div class="meta-item">
                        <i class="fas fa-share-alt"></i>
                        <span class="meta-label">Chia sẻ:</span>
                        <div class="social-share">
                          <a href="#" class="social-btn facebook" title="Facebook">
                            <i class="fab fa-facebook-f"></i>
                          </a>
                          <a href="#" class="social-btn twitter" title="Twitter">
                            <i class="fab fa-twitter"></i>
                          </a>
                          <a href="#" class="social-btn instagram" title="Instagram">
                            <i class="fab fa-instagram"></i>
                          </a>
                          <a href="#" class="social-btn pinterest" title="Pinterest">
                            <i class="fab fa-pinterest"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Highlight Specs -->
            <div v-if="product && selectedVariant" class="modern-highlight-specs">
              <div class="specs-header">
                <h3 class="specs-title">
                  <i class="fas fa-star"></i>
                  Thông số nổi bật
                </h3>
              </div>
              <div class="specs-grid">
                <div class="spec-item">
                  <div class="spec-icon">
                    <i class="fas fa-microchip"></i>
                  </div>
                  <div class="spec-content">
                    <span class="spec-label">CPU</span>
                    <span class="spec-value">{{ product.ten_cpu || 'Không có thông tin' }}</span>
                  </div>
                </div>
                <div class="spec-item">
                  <div class="spec-icon">
                    <i class="fas fa-desktop"></i>
                  </div>
                  <div class="spec-content">
                    <span class="spec-label">GPU</span>
                    <span class="spec-value">{{ product.ten_gpu || 'Không có thông tin' }}</span>
                  </div>
                </div>
                <div class="spec-item">
                  <div class="spec-icon">
                    <i class="fas fa-memory"></i>
                  </div>
                  <div class="spec-content">
                    <span class="spec-label">RAM</span>
                    <span class="spec-value">{{ selectedVariant.ram_dung_luong || 'Không có thông tin' }}</span>
                  </div>
                </div>
              </div>
            </div>


            <div v-if="showSidebar" class="sidebar-overlay" @click.self="showSidebar = false">
              <div class="sidebar-panel">
                <div class="sidebar-header">
                  <h5>Thông số chi tiết</h5>
                  <button class="close-btn" @click="showSidebar = false">×</button>
                </div>
                <div class="sidebar-body">
                  <img :src="selectedVariant.anh_san_pham_url || '/assets/images/placeholder.jpg'" alt="Product Image"
                    class="sidebar-image" />
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
                      <input id="customerName" v-model="orderInfo.name" type="text" class="form-control" required />
                    </div>
                    <div class="form-group">
                      <label for="phoneNumber">Số điện thoại *</label>
                      <input id="phoneNumber" v-model="orderInfo.phone" type="tel" class="form-control" required />
                    </div>
                    <div class="form-group">
                      <label for="email">Email *</label>
                      <input id="email" v-model="orderInfo.email" type="email" class="form-control" required />
                    </div>
                    <div class="form-group">
                      <label for="address">Địa chỉ giao hàng *</label>
                      <textarea id="address" v-model="orderInfo.address" class="form-control" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-pay">Thanh toán tiền mặt</button>
                    <button type="submit" class="btn btn-pay">Thanh toán VNPay</button>
                  </form>
                </div>
              </div>
            </div>

            <!-- Product Description -->
            <div v-if="selectedVariant" class="modern-product-description">
              <div class="description-header">
                <h3 class="description-title">
                  <i class="fas fa-file-alt"></i>
                  Mô tả sản phẩm
                </h3>
              </div>
              <div class="description-content">
                <p>{{ selectedVariant.ghi_chu || 'Không có mô tả chi tiết cho sản phẩm này.' }}</p>
              </div>
            </div>

            <!-- Similar Products -->
            <div class="modern-similar-products">
              <div class="similar-header">
                <h2 class="similar-title">
                  <i class="fas fa-heart"></i>
                  Những sản phẩm tương tự
                </h2>
              </div>
              <div class="similar-products-grid">
                <div v-for="similarProduct in similarProducts" :key="similarProduct.id" class="modern-similar-card">
                  <div class="similar-card-inner">
                    <figure class="similar-product-media">
                      <div class="similar-image-wrapper">
                        <NuxtLink :to="`/product-page?sp_id=${similarProduct.id}`">
                          <img :src="similarProduct.imageUrl || '/assets/images/placeholder.jpg'" alt="Product image"
                            class="similar-product-image" />
                        </NuxtLink>
                        <div class="similar-overlay">
                          <NuxtLink to="/compare-page" class="similar-compare-btn" title="So sánh">
                            <i class="fas fa-balance-scale"></i>
                          </NuxtLink>
                        </div>
                      </div>
                    </figure>
                    <div class="similar-product-info">
                      <div class="similar-brand">
                        {{ manufacturerMap[similarProduct.tenNhaSanXuat] || similarProduct.tenNhaSanXuat || 'Unknown' }}
                      </div>
                      <h3 class="similar-product-name">
                        <a href="#" @click.prevent="handleProductChange(similarProduct.id)">{{
                          similarProduct.tenSanPham
                          }}</a>
                      </h3>
                      <div class="similar-product-price">{{ formatPrice(similarProduct.giaBan || 0) }} VND</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <ToastNotification ref="toastNotification" />
  </div>
</template>

<script>
import axios from 'axios'
import ProductPage from '../store/product/product-page.js'
import ToastNotification from '../components/base/ToastNotification.vue'

export default {
  components: {
    ToastNotification,
  },
  extends: ProductPage,
  data() {
    return {
      showSidebar: false,
      showBuyNowModal: false,
      orderInfo: {
        name: '',
        phone: '',
        email: '',
        address: '',
      },
      invoiceId: null,
    }
  },
  mounted() {
    this.invoiceId = localStorage.getItem('invoiceId')
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar
    },
    async submitOrder() {
      console.log('Order submitted:', this.orderInfo)
      this.showBuyNowModal = false
      this.orderInfo = {
        name: '',
        phone: '',
        email: '',
        address: '',
      }
      this.$refs.toastNotification?.addToast({
        type: 'success',
        message: 'Đặt hàng thành công!',
        isLoading: false,
        duration: 3000,
      })
    },
    async getExistingPendingInvoice(customerId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/client/hoa-don-cho/khach-hang/${customerId}`)
        const pendingInvoices = response.data
        return pendingInvoices.find((invoice) => invoice.trangThai === 6) || null
      } catch (error) {
        console.error('Lỗi khi lấy hóa đơn chờ:', error)
        return null
      }
    },
    async checkInvoiceExists(invoiceId) {
      try {
        await axios.get(`http://localhost:8080/api/client/gio-hang/${invoiceId}`)
        return true
      } catch (error) {
        // Xử lý lỗi hóa đơn không tồn tại hoặc không ở trạng thái chờ
        if (error.response?.status === 500 || error.response?.status === 404) {
          return false
        }
        throw error
      }
    },
    async createInvoice(customerId) {
      try {
        const params = customerId ? { khachHangId: customerId } : {}
        const response = await axios.post('http://localhost:8080/api/client/hoa-don-cho', {}, { params })
        this.invoiceId = response.data.id
        localStorage.setItem('invoiceId', this.invoiceId)
      } catch (error) {
        throw new Error('Lỗi khi tạo hóa đơn mới: ' + (error.response?.data?.message || error.message))
      }
    },

    async addToCart() {
      try {
        if (!this.selectedVariant || !this.selectedVariant.ctsp_id) {
          this.$refs.toastNotification?.addToast({
            type: 'error',
            message: 'Vui lòng chọn sản phẩm hợp lệ!',
            isLoading: false,
            duration: 5000,
          })
          return
        }

        const customerId = localStorage.getItem('customerId')
        let invoiceId = localStorage.getItem('invoiceId')

        // Kiểm tra trạng thái hóa đơn hiện tại
        if (invoiceId) {
          const isPending = await this.isPendingInvoice(invoiceId)
          if (!isPending) {
            localStorage.removeItem('invoiceId')
            invoiceId = null
          }
        }

        // Nếu không có hóa đơn hoặc hóa đơn không hợp lệ, tạo hóa đơn mới
        if (!invoiceId) {
          await this.createInvoice(customerId || null)
          invoiceId = this.invoiceId
        }

        // Thêm sản phẩm vào giỏ hàng
        // Loop to add each item individually
        for (let i = 0; i < this.quantity; i++) {
          const chiTietGioHangDTO = {
            chiTietSanPhamId: this.selectedVariant.ctsp_id,
            maImel: null,
            soLuong: 1, // Always add one item at a time
            idPhieuGiamGia: null,
          };

          await axios.post(
            `http://localhost:8080/api/client/gio-hang/them?idHD=${invoiceId}`,
            chiTietGioHangDTO
          );
        }

        this.$refs.toastNotification?.addToast({
          type: 'success',
          message: `Sản phẩm "${this.product.ten_san_pham}" đã được thêm vào giỏ hàng!`,
          isLoading: false,
          duration: 3000,
        });

        // Chuyển hướng đến cart-page với invoiceId
        setTimeout(() => {
          this.$router.push({
            path: '/cart-page',
            query: { invoiceId: invoiceId },
          })
        }, 3000)
      } catch (error) {
        console.error('Error adding to cart:', error)
        this.$refs.toastNotification?.addToast({
          type: 'error',
          message: 'Lỗi khi thêm sản phẩm vào giỏ hàng: ' + (error.response?.data?.message || error.message),
          isLoading: false,
          duration: 5000,
        })
      }
    },

    // Thêm hàm kiểm tra trạng thái hóa đơn
    async isPendingInvoice(invoiceId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/client/gio-hang/${invoiceId}`)
        return response.data.trangThai === 6
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái hóa đơn:', error)
        return false
      }
    },
  },
}
</script>

<style scoped>
/* ===== CSS CUSTOM PROPERTIES ===== */
:root {
  --primary-gradient: linear-gradient(90deg, #002c69, #13ad75);
  --secondary-gradient: linear-gradient(135deg, #002c69 0%, #13ad75 100%);
  --success-gradient: linear-gradient(135deg, #13ad75 0%, #00f2fe 100%);
  --warning-gradient: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  --danger-gradient: linear-gradient(135deg, #fa709a 0%, #fee140 100%);

  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  --border-radius: 0.5rem;
  --border-radius-lg: 1rem;
  --border-radius-xl: 1.5rem;

  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ===== MODERN PRODUCT PAGE ===== */
.modern-product-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #e6f3ff 0%, #e6f9f0 100%);
  min-height: 100vh;
  font-size: calc(1rem + 0.3rem);
}

/* ===== BREADCRUMB ===== */
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
  transition: var(--transition-fast);
}

.breadcrumb-link:hover {
  color: #002c69;
  text-decoration: none;
}

.breadcrumb-item.active span {
  color: #1f2937;
  font-weight: 600;
}

/* ===== PRODUCT DETAILS ===== */
.modern-product-details {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--border-radius-xl);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* ===== PRODUCT GALLERY ===== */
.modern-product-gallery {
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: var(--border-radius-xl);
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.main-image-container {
  position: relative;
  margin-bottom: 2rem;
}

.main-product-image {
  position: relative;
  margin: 0;
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
}

.main-product-image:hover {
  transform: translateY(-5px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
}

.image-wrapper {
  position: relative;
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  aspect-ratio: 4/3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 100%;
  min-height: 400px;
  border: 2px solid rgba(0, 44, 105, 0.1);
}

.main-image {
  width: 85%;
  height: 85%;
  object-fit: contain;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.main-image:hover {
  transform: scale(1.05) rotate(1deg);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-wrapper:hover .image-overlay {
  opacity: 1;
}

.zoom-btn {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(0, 44, 105, 0.2);
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #002c69;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 25px rgba(0, 44, 105, 0.2);
}

.zoom-btn:hover {
  background: white;
  transform: scale(1.15) rotate(10deg);
  box-shadow: 0 15px 35px rgba(0, 44, 105, 0.3);
  border-color: #002c69;
}

/* ===== THUMBNAIL GALLERY ===== */
.thumbnail-gallery {
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(15px);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.thumbnail-wrapper {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.thumbnail-item {
  position: relative;
  width: 9rem;
  height: 9rem;
  border-radius: var(--border-radius-xl);
  overflow: hidden;
  cursor: pointer;
  border: 3px solid transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.thumbnail-item.active {
  border-color: #002c69;
  box-shadow: 0 0 0 4px rgba(0, 44, 105, 0.4), 0 15px 35px rgba(0, 44, 105, 0.2);
  transform: scale(1.1) translateY(-5px);
  background: rgba(0, 44, 105, 0.05);
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 1rem;
}

.thumbnail-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.thumbnail-item:hover .thumbnail-overlay {
  opacity: 1;
}

.thumbnail-item:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 15px 30px rgba(0, 44, 105, 0.25);
  border-color: rgba(0, 44, 105, 0.6);
}

.thumbnail-item:hover .thumbnail-image {
  transform: scale(1.02);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

/* ===== PRODUCT INFO SECTION ===== */
.modern-product-info {
  padding-left: 2rem;
}

.product-header {
  margin-bottom: 1.5rem;
}

.brand-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary-gradient);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  box-shadow: var(--shadow-md);
}

.modern-product-title {
  font-size: calc(2.25rem + 0.3rem);
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.product-subtitle {
  color: #6b7280;
  font-size: calc(1.125rem + 0.3rem);
  font-weight: 500;
}

/* ===== PRODUCT RATING ===== */
.product-rating-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.rating-stars {
  display: flex;
  gap: 0.25rem;
  color: #fbbf24;
  font-size: calc(1.125rem + 0.3rem);
}

.rating-text {
  color: #6b7280;
  font-weight: 500;
  font-size: calc(1rem + 0.3rem);
}

/* ===== PRICE SECTION ===== */
.modern-price-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(0, 44, 105, 0.1) 0%, rgba(19, 173, 117, 0.1) 100%);
  border-radius: var(--border-radius-lg);
  border: 1px solid rgba(0, 44, 105, 0.2);
}

.price-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.price-main .current-price {
  font-size: calc(2rem + 0.3rem);
  font-weight: 700;
  color: #dc2626;
}

.contact-price {
  font-size: calc(1.5rem + 0.3rem);
  font-weight: 600;
  color: #dc2626;
}

.price-secondary {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.old-price {
  color: #9ca3af;
  text-decoration: line-through;
  font-size: 1.125rem;
}

.discount-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--danger-gradient);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: var(--shadow-md);
}

/* ===== OPTIONS SECTION ===== */
.modern-options-section {
  margin-bottom: 2rem;
}

.options-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.options-title i {
  color: #002c69;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.modern-option-btn {
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(0, 44, 105, 0.2);
  border-radius: var(--border-radius-lg);
  padding: 1rem;
  cursor: pointer;
  transition: var(--transition);
  overflow: hidden;
}

.modern-option-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--primary-gradient);
  opacity: 0.1;
  transition: var(--transition);
}

.modern-option-btn:hover::before {
  left: 0;
}

.color-option:hover .color-circle {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.3);
}

.modern-option-btn.active {
  border-color: #002c69;
  background: linear-gradient(135deg, rgba(0, 44, 105, 0.15) 0%, rgba(19, 173, 117, 0.15) 100%);
  box-shadow: 0 0 0 3px rgba(0, 44, 105, 0.3), 0 8px 25px rgba(0, 44, 105, 0.2);
  transform: translateY(-2px);
}

.color-option.active .color-circle {
  border-color: #002c69;
  box-shadow: 0 0 0 3px rgba(0, 44, 105, 0.4), 0 6px 20px rgba(0, 0, 0, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.modern-option-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.option-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.option-text {
  font-weight: 600;
  color: #1f2937;
  flex: 1;
}

.option-check {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: var(--primary-gradient);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition);
}

.modern-option-btn.active .option-check {
  opacity: 1;
}

/* ===== COLOR OPTIONS ===== */
.color-option .option-content {
  align-items: center;
}

.color-preview {
  display: flex;
  align-items: center;
}

.color-circle {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.3);
  position: relative;
}

.color-circle::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%);
  pointer-events: none;
}

.color-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.color-name {
  font-weight: 600;
  color: #1f2937;
}

.color-price {
  font-size: calc(0.875rem + 0.3rem);
  color: #dc2626;
  font-weight: 600;
}

/* ===== ACTION SECTION ===== */
.modern-action-section {
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.modern-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--border-radius-lg);
  font-weight: 600;
  font-size: 1.3rem;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  overflow: hidden;
  min-width: 200px;
}

.modern-btn.primary {
  background: #13ad75;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.3rem;
  text-decoration: none;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 44, 105, 0.3);
}

.modern-btn.secondary {
  background: #13ad75;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.3rem;
  text-decoration: none;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 44, 105, 0.3);
}

.modern-btn.outline {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  color: #002c69;
  border: 2px solid #002c69;
}

.modern-btn:hover {
  text-decoration: none;
  color: white;
}

.modern-btn.primary:hover {
  background: #16c085;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 44, 105, 0.4);
}

.modern-btn.secondary:hover {
  background: #16c085;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 44, 105, 0.4);
}

.modern-btn.outline:hover {
  color: #002c69;
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: all 0.6s ease;
}

.modern-btn.primary .btn-shine {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
}

.modern-btn.secondary .btn-shine {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
}

.modern-btn:hover .btn-shine {
  left: 100%;
  transition: all 0.8s ease;
}

/* Enhanced button animations */
.modern-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: var(--border-radius-lg);
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  min-width: 200px;
}

.modern-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.modern-btn:hover::before {
  transform: translateX(100%);
}

.modern-btn i {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.modern-btn:hover i {
  transform: scale(1.1);
}

.modern-btn span {
  position: relative;
  z-index: 1;
}

.secondary-actions {
  display: flex;
  gap: 1rem;
}

.secondary-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 44, 105, 0.2);
  border-radius: var(--border-radius);
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
}

.secondary-btn.specs-btn {
  background: #002c69;
  color: white;
  border: 1px solid #002c69;
}

.secondary-btn.specs-btn:hover {
  background: #001a4d;
  color: white;
  border-color: #001a4d;
}

.secondary-btn:hover {
  background: rgba(0, 44, 105, 0.1);
  color: #002c69;
  text-decoration: none;
}

/* ===== PRODUCT META ===== */
.modern-product-meta {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 44, 105, 0.2);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.meta-item i {
  color: #002c69;
  width: 1.25rem;
}

.meta-label {
  font-weight: 600;
  color: #374151;
  min-width: 80px;
}

.meta-value {
  color: #6b7280;
}

.social-share {
  display: flex;
  gap: 0.5rem;
}

.social-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: var(--transition);
}

.social-btn.facebook {
  background: #1877f2;
}

.social-btn.twitter {
  background: #1da1f2;
}

.social-btn.instagram {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
}

.social-btn.pinterest {
  background: #bd081c;
}

.social-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* ===== HIGHLIGHT SPECS ===== */
.modern-highlight-specs {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--border-radius-xl);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.specs-header {
  margin-bottom: 1.5rem;
}

.specs-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.specs-title i {
  color: #002c69;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(0, 44, 105, 0.05) 0%, rgba(19, 173, 117, 0.05) 100%);
  border-radius: var(--border-radius-lg);
  border: 1px solid rgba(0, 44, 105, 0.1);
  transition: var(--transition);
}

.spec-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.spec-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--primary-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  font-size: 1.25rem;
}

.spec-content {
  flex: 1;
}

.spec-label {
  display: block;
  font-size: 1.6rem;
  font-weight: 600;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.spec-value {
  display: block;
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f2937;
}

.secondary-btn.specs-btn i {
  color: white;
}

/* ===== SIDEBAR ===== */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
}

.sidebar-panel {
  background: white;
  border-radius: var(--border-radius-xl) 0 0 var(--border-radius-xl);
  width: 100%;
  max-width: 500px;
  height: 100vh;
  overflow: hidden;
  box-shadow: var(--shadow-2xl);
  animation: slideInRight 0.3s ease-out;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: var(--primary-gradient);
  color: white;
}

.sidebar-header h5 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: var(--transition);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.sidebar-body {
  padding: 1.5rem;
  height: calc(100vh - 80px);
  overflow-y: auto;
}

.sidebar-image {
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: var(--border-radius);
  margin-bottom: 1.5rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
}

.specs-table tr {
  border-bottom: 1px solid #e5e7eb;
}

.specs-table td {
  padding: 1rem;
  vertical-align: top;
}

.specs-table td:first-child {
  font-weight: 600;
  color: #374151;
  width: 40%;
}

.specs-table td:last-child {
  color: #6b7280;
}

/* ===== MODAL ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  border-radius: var(--border-radius-xl);
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: var(--shadow-2xl);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: var(--primary-gradient);
  color: white;
}

.modal-header h5 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.modal-body {
  padding: 1.5rem;
  max-height: calc(80vh - 80px);
  overflow-y: auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: var(--transition);
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-pay {
  width: 100%;
  padding: 1rem;
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  margin-bottom: 1rem;
}

.btn-pay:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* ===== PRODUCT DESCRIPTION ===== */
.modern-product-description {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--border-radius-xl);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.description-header {
  margin-bottom: 1.5rem;
}

.description-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.description-title i {
  color: #667eea;
}

.description-content {
  color: #6b7280;
  line-height: 1.6;
  font-size: 1rem;
}

/* ===== SIMILAR PRODUCTS ===== */
.modern-similar-products {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: var(--border-radius-xl);
  padding: 2rem;
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.similar-header {
  margin-bottom: 2rem;
}

.similar-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.similar-title i {
  color: #667eea;
}

.similar-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.modern-similar-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: var(--transition);
}

.modern-similar-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

.similar-card-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.similar-product-media {
  position: relative;
  margin: 0;
}

.similar-image-wrapper {
  position: relative;
  aspect-ratio: 1;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.similar-product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: var(--transition);
}

.similar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition);
}

.similar-image-wrapper:hover .similar-overlay {
  opacity: 1;
}

.similar-compare-btn {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  text-decoration: none;
  font-size: 1.25rem;
  transition: var(--transition);
}

.similar-compare-btn:hover {
  background: white;
  transform: scale(1.1);
  text-decoration: none;
  color: #667eea;
}

.similar-product-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.similar-brand {
  font-size: 0.875rem;
  font-weight: 600;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.similar-product-name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
}

.similar-product-name a {
  color: #1f2937;
  text-decoration: none;
  transition: var(--transition);
}

.similar-product-name a:hover {
  color: #667eea;
  text-decoration: none;
}

.similar-product-price {
  font-size: calc(1.25rem + 0.3rem);
  font-weight: 700;
  color: #dc2626;
  margin-top: auto;
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 1024px) {
  .modern-product-info {
    padding-left: 0;
    margin-top: 2rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .modern-btn {
    min-width: auto;
  }
}

@media (max-width: 768px) {
  .modern-product-details {
    padding: 1.5rem;
  }

  .modern-product-title {
    font-size: 1.75rem;
  }

  .price-main .current-price {
    font-size: 1.5rem;
  }

  .options-grid {
    grid-template-columns: 1fr;
  }

  .specs-grid {
    grid-template-columns: 1fr;
  }

  .similar-products-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .secondary-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .modern-product-details {
    padding: 1rem;
  }

  .modern-product-title {
    font-size: 1.5rem;
  }

  .thumbnail-wrapper {
    justify-content: center;
  }

  .sidebar-panel,
  .modal-content {
    width: 95%;
  }
}

/* ===== ANIMATIONS ===== */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

.modern-product-details,
.modern-highlight-specs,
.modern-product-description,
.modern-similar-products {
  animation: fadeInUp 0.6s ease-out;
}

.brand-badge {
  animation: pulse 2s infinite;
}

/* ===== LOADING STATES ===== */
.loading-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}
</style>