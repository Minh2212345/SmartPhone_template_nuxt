<template>
  <!-- eslint-disable -->
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
import ProductPage from '../store/product/product-page.js';

export default ProductPage;
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
