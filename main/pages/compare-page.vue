<template>
  <div class="product-page">
    <h1 class="page-title">So sánh các mẫu điện thoại</h1>

    <div class="container">
      <div class="row">
        <div class="col-md-4 product-item" v-for="(productId, index) in selectedProducts" :key="index">
          <div class="d-flex justify-content-center mb-3">
            <select class="form-select" style="font-weight: 500; font-size: medium; margin-top: 20px;" v-model="selectedProducts[index]" @change="updateProduct(index)">
              <option v-for="product in allProducts" :key="product.id" :value="product.id">
                {{ product.tenSanPham }}
              </option>
            </select>
          </div>
          <img :src="getProductImage(productId)" :alt="getProductName(productId)" class="product-image img-fluid mx-auto d-block" />
          <h3 class="product-name text-center mt-3">
            {{ getProductNameBase(productId) }}            
          </h3>
        </div>
      </div>
    </div>

    <!-- Comparison Section -->
    <div class="container comparison-section">
      <h2 class="section-title">So sánh thông số</h2>
      <div class="comparison-grid">
        <!-- Màn hình -->
        <div class="comparison-row">
          <div class="comparison-label">Màn hình<hr class="label-line"></div>
          <div class="comparison-value" v-for="(productId, index) in selectedProducts" :key="index">
            {{ getProductDetail(productId, 'displayTech') }}<br>
            {{ getProductDetail(productId, 'screenSize') }} inch {{ getProductDetail(productId, 'typeOfScreen') }}<br>
            (theo đường chéo)
          </div>
        </div>
        <!-- Độ phân giải -->
        <div class="comparison-row">
          <div class="comparison-label">Độ phân giải<hr class="label-line"></div>
          <div class="comparison-value" v-for="(productId, index) in selectedProducts" :key="index">
            {{ getProductDetail(productId, 'resolution') }}
          </div>
        </div>
        <!-- Độ sáng -->
        <div class="comparison-row">
          <div class="comparison-label">Độ sáng<hr class="label-line"></div>
          <div class="comparison-value" v-for="(productId, index) in selectedProducts" :key="index">
            {{ getProductDetail(productId, 'brightnessStandard') }}<br>
            {{ getProductDetail(productId, 'brightnessHDR') }} <br>
            {{ getProductDetail(productId, 'brightnessOutdoor') ? `${getProductDetail(productId, 'brightnessOutdoor')}` : '—' }}
          </div>
        </div>
        <!-- Kích thước và Trọng lượng -->
        <div class="comparison-row">
          <div class="comparison-label">Chiều dài<hr class="label-line"></div>
          <div class="comparison-value" v-for="(productId, index) in selectedProducts" :key="index">
            Cao: {{ getProductDetail(productId, 'screenSize') }}<br>
          </div>
        </div>
        <!-- RAM -->
        <div class="comparison-row">
          <div class="comparison-label">RAM<hr class="label-line"></div>
          <div class="comparison-value" v-for="(productId, index) in selectedProducts" :key="index">
            {{ getProductDetail(productId, 'ram') }}
          </div>
        </div>
        <!-- Dung lượng lưu trữ -->
        <div class="comparison-row">
          <div class="comparison-label">Dung lượng lưu trữ tiêu chuẩn<hr class="label-line"></div>
          <div class="comparison-value" v-for="(productId, index) in selectedProducts" :key="index">
            {{ getProductDetail(productId, 'storage') }}
          </div>
        </div>
        <!-- Bộ nhớ ngoài -->
        <div class="comparison-row">
          <div class="comparison-label">Hỗ trợ bộ nhớ ngoài lên tới<hr class="label-line"></div>
          <div class="comparison-value" v-for="(productId, index) in selectedProducts" :key="index">
            {{ getProductDetail(productId, 'externalStorage') }}
          </div>
        </div>
        <!-- Pin -->
        <div class="comparison-row">
          <div class="comparison-label">Pin<hr class="label-line"></div>
          <div class="comparison-value" v-for="(productId, index) in selectedProducts" :key="index">
            {{ getProductDetail(productId, 'battery') }}
          </div>
        </div>
        <!-- Kháng bụi/nước -->
        <div class="comparison-row">
          <div class="comparison-label">Chỉ số kháng bụi/nước<hr class="label-line"></div>
          <div class="comparison-value" v-for="(productId, index) in selectedProducts" :key="index">
            {{ getProductDetail(productId, 'waterResistance') }}
          </div>
        </div>
        <!-- Công nghệ mạng -->
        <div class="comparison-row">
          <div class="comparison-label">Công nghệ mạng<hr class="label-line"></div>
          <div class="comparison-value" v-for="(productId, index) in selectedProducts" :key="index">
            {{ getProductDetail(productId, 'networkTech') }}
          </div>
        </div>
        <!-- Hệ điều hành -->
        <div class="comparison-row">
          <div class="comparison-label">Hệ điều hành<hr class="label-line"></div>
          <div class="comparison-value" v-for="(productId, index) in selectedProducts" :key="index">
            {{ getProductDetail(productId, 'os') }} {{ getProductDetail(productId, 'osVersion') }}
          </div>
        </div>
        <!-- Chất liệu khung -->
        <div class="comparison-row">
          <div class="comparison-label">Chất liệu khung<hr class="label-line"></div>
          <div class="comparison-value" v-for="(productId, index) in selectedProducts" :key="index">
            {{ getProductDetail(productId, 'frameMaterial') }}
          </div>
        </div>
        <!-- Chất liệu mặt lưng -->
        <div class="comparison-row">
          <div class="comparison-label">Chất liệu mặt lưng<hr class="label-line"></div>
          <div class="comparison-value" v-for="(productId, index) in selectedProducts" :key="index">
            {{ getProductDetail(productId, 'backMaterial') }}
          </div>
        </div>
        <!-- Công nghệ sạc -->
        <div class="comparison-row">
          <div class="comparison-label">Công nghệ sạc<hr class="label-line"></div>
          <div class="comparison-value" v-for="(productId, index) in selectedProducts" :key="index">
            {{ getProductDetail(productId, 'chargingTech') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCompare from '../store/product/compare-page.js'

export default ProductCompare
</script>

<style scoped>
.product-page {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  text-align: center;
  font-size: 3em;
  margin-bottom: 20px;
}

.product-image {
  max-width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
}

.product-name {
  font-size: 2em;
  font-weight: normal;
  text-transform: lowercase;
}

.product-name .version {
  font-weight: bold;
}

.section-title {
  font-size: 2em;
  margin-bottom: 20px;
}

.comparison-section {
  margin-top: 40px;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.comparison-row {
  display: contents;
}

.comparison-label {
  font-weight: bold;
  font-size: 1.4em;
  margin-bottom: 5px;
  margin-top: 5px;
  grid-column: 1 / -1; /* Span across all columns */
  
}

.label-line {
  border: 0;
  border-top: 1px solid #000;
  width: 100%; /* Độ dài bằng với phần hiển thị thông tin */
  margin: 5px auto 10px; /* Điều chỉnh khoảng cách */
}

.comparison-value {
  font-size: 1.2em;
  padding: 5px;
  border-radius: 5px;
  text-align: left;
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
  .comparison-label {
    grid-column: auto;
  }
  .comparison-value {
    margin-bottom: 10px;
  }
  .product-image {
    max-height: 200px;
  }
}
</style>