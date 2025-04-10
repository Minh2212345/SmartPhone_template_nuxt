<template>
    <div class="product-page">
      <!-- Header Section -->
      <h1 class="page-title">So sánh các phiên bản iPhone</h1>
  
      <!-- Product Images Section with Combobox and Screen Size -->
      <div class="container">
        <div class="row">
          <div class="col-md-4 product-item" v-for="(selectedProduct, index) in selectedProducts" :key="index">
            <!-- Combobox để chọn sản phẩm -->
            <div class="d-flex justify-content-center mb-3">
              <select class="form-select custom-select" v-model="selectedProducts[index]" @change="updateProduct(index)">
                <option v-for="product in allProducts" :key="product.name" :value="product">
                  {{ product.name }}
                </option>
              </select>
            </div>
            <img :src="selectedProduct.image" :alt="selectedProduct.name" class="product-image img-fluid mx-auto d-block" />
            <!-- Tên sản phẩm -->
            <h3 class="product-name text-center mt-3">
              {{ selectedProduct.name.split(" ")[0].toLowerCase() }}
              <span class="version">{{ selectedProduct.name.split(" ")[1].toLowerCase() }}</span>
            </h3>
            <!-- Kích thước màn hình và mô tả -->
            <div class="size-item text-center mt-2">              
              <p class="screen-description">
                {{ selectedProduct.screen.type + (selectedProduct.screen.dynamicIsland ? " với ProMotion" : "") }}
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Dung lượng lưu trữ -->
       <br>
      <div class="container storage-section">
        <h2 class="section-title">Dung lượng lưu trữ</h2>
        <div class="row">
          <div class="col-md-4 info-section text-center" v-for="(product, index) in selectedProducts" :key="index">
            <div v-for="(storage, storageIndex) in product.storage" :key="storageIndex">
              <p>{{ storage.capacity }}</p>
              <p>{{ storage.price }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Additional Info Section (Tách riêng cho từng sản phẩm) -->
      <div class="container additional-info">
        <h2 class="section-title">Màn hình</h2>
        <div class="row">
          <div class="col-md-4 info-section text-center" v-for="(product, index) in selectedProducts" :key="index">
            <p>{{ product.screen.type }}</p>
            <p>{{ product.screen.size }} (theo đường chéo)</p>
            <p v-if="product.screen.dynamicIsland">Dynamic Island</p>
            <p v-else>—</p>
            <p>{{ product.screen.resolution }} với mật độ điểm ảnh {{ product.screen.ppi }} ppi</p>
            <p>Tỷ lệ tương phản {{ product.screen.contrastRatio }} (tiêu chuẩn)</p>
            <p>Màn hình True Tone</p>
            <p>Màn hình có dải màu rộng (P3)</p>
            <p>Haptic Touch</p>
            <p>Độ sáng tối đa {{ product.screen.brightnessStandard }} nit (tiêu chuẩn)</p>
            <p>Độ sáng đỉnh {{ product.screen.brightnessHDR }} nit (HDR)</p>
            <p v-if="product.screen.brightnessOutdoor">Độ sáng đỉnh {{ product.screen.brightnessOutdoor }} nit (ngoài trời)</p>
            <p v-else>—</p>
            <p>Độ sáng tối thiểu 1 nit</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductComparison",
    data() {
      return {
        allProducts: [
          {
            name: "iPhone 15 Pro",
            image: "assets/images/demos/demo-4/products/product-5.jpg",
            screen: {
              type: "Màn hình Super Retina XDR",
              size: "Màn hình toàn phần OLED 6,1 inch",
              dynamicIsland: false,
              resolution: "Độ phân giải 2532x1170 pixel",
              ppi: 460,
              contrastRatio: "2.000.000:1",
              brightnessStandard: 800,
              brightnessHDR: 1200,
              brightnessOutdoor: null,
            },
            storage: [
              { capacity: "128GB", price: "Từ 19.999.000đ" },
              { capacity: "256GB", price: "Từ 22.999.000đ" },
              { capacity: "512GB", price: "Từ 28.999.000đ" },
            ],
          },
          {
            name: "iPhone 15",
            image: "assets/images/demos/demo-4/products/product-3.jpg",
            screen: {
              type: "Màn hình Super Retina XDR",
              size: "Màn hình toàn phần OLED 6,7 inch",
              dynamicIsland: false,
              resolution: "Độ phân giải 2778x1284 pixel",
              ppi: 458,
              contrastRatio: "2.000.000:1",
              brightnessStandard: 800,
              brightnessHDR: 1200,
              brightnessOutdoor: null,
            },
            storage: [
              { capacity: "128GB", price: "Từ 19.999.000đ" },
              { capacity: "256GB", price: "Từ 22.999.000đ" },
              { capacity: "512GB", price: "Từ 28.999.000đ" },
            ],
          },
          {
            name: "iPhone 16",
            image: "assets/images/demos/demo-4/products/product-6.jpg",
            screen: {
              type: "Màn hình Super Retina XDR",
              size: "Màn hình toàn phần OLED 6,1 inch",
              dynamicIsland: true,
              resolution: "Độ phân giải 2556x1179 pixel",
              ppi: 460,
              contrastRatio: "2.000.000:1",
              brightnessStandard: 1000,
              brightnessHDR: 1600,
              brightnessOutdoor: 2000,
            },
            storage: [
              { capacity: "128GB", price: "Từ 22.999.000đ" },
              { capacity: "256GB", price: "Từ 25.999.000đ" },
              { capacity: "512GB", price: "Từ 31.999.000đ" },
            ],
          },
          {
            name: "iPhone 16e",
            image: "assets/images/demos/demo-4/products/product-7.jpg",
            screen: {
              type: "Màn hình Super Retina XDR",
              size: "Màn hình toàn phần OLED 6,7 inch",
              dynamicIsland: true,
              resolution: "Độ phân giải 2796x1290 pixel",
              ppi: 460,
              contrastRatio: "2.000.000:1",
              brightnessStandard: 1000,
              brightnessHDR: 1600,
              brightnessOutdoor: 2000,
            },
            storage: [
              { capacity: "128GB", price: "Từ 22.999.000đ" },
              { capacity: "256GB", price: "Từ 25.999.000đ" },
              { capacity: "512GB", price: "Từ 31.999.000đ" },
            ],
          },
        ],
        selectedProducts: [], // Danh sách sản phẩm được chọn
      };
    },
    created() {
      // Khởi tạo danh sách sản phẩm được chọn ban đầu
      this.selectedProducts = [
        this.allProducts[0], // iPhone 14
        this.allProducts[1], // iPhone 15
        this.allProducts[2], // iPhone 16
      ];
    },
    methods: {
      updateProduct(index) {
        // Không cần cập nhật screenSizes nữa vì đã tích hợp trực tiếp vào product-item
      },
    },
  };
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
    font-size: 3rem; /* Tăng từ 2rem lên 2.5rem */
    margin-bottom: 20px;
}
  
  .product-image {
    max-width: 100%;
    height: auto;
  }
  
  .product-name {
    font-size: 3rem; /* Tăng từ 1.2rem lên 1.5rem */
    font-weight: normal;
    text-transform: lowercase;
}
  
  .product-name .version {
    font-weight: bold;
  }
  
  .screen-size {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .screen-description {
    font-size: 1.8rem; /* Tăng từ 0.9rem lên 1.1rem */
    color: #666;
}
  
.section-title {
    font-size: 2rem; /* Tăng từ 1.5rem lên 2rem */
    margin-bottom: 20px;
}

.info-section p {
    font-size: 1.8rem; /* Tăng kích thước chữ cho các đoạn văn trong info-section */
}
  
.storage-section {
    margin-bottom: 40px;
}

  .additional-info {
    margin-bottom: 40px;
  }
  
  .custom-select {
    width: 150px; /* Giữ nguyên chiều rộng của combobox */
    font-size: 1.8rem; /* Tăng kích thước chữ trong combobox */
}
  </style>