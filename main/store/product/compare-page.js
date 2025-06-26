import axios from 'axios';

export default {
  name: 'ProductCompare',
  data() {
    return {
      allProducts: [],
      selectedProducts: [],
      productDetails: {},
    };
  },
  async created() {
    try {
      const response = await axios.get('/api/products/compare');
      this.allProducts = response.data;
      this.selectedProducts = this.allProducts.slice(0, 3).map(product => product.id);
      await Promise.all(this.selectedProducts.map(id => this.fetchProductDetails(id)));
    } catch (error) {
      console.error('Error loading products:', error);
    }
  },
  methods: {
    async updateProduct(index) {
      const productId = this.selectedProducts[index];
      await this.fetchProductDetails(productId);
    },
    async fetchProductDetails(id) {
      try {
        const response = await axios.get(`/api/products/details/${id}`);
        this.$set(this.productDetails, id, this.convertProductDetails(response.data));
      } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
      }
    },
    convertProductDetails(data) {
      return {
        id: data.id || null,
        tenSanPham: data.tenSanPham || 'Không có thông tin',
        anhSanPhamUrl: data.anhSanPhamUrl || '/assets/images/placeholder.jpg',
        giaBan: data.giaBan || 0,
        ram: data.ram || 'Không có thông tin',
        storage: data.storage || null,
        battery: data.battery || 'Không có thông tin',
        waterResistance: data.waterResistance || 'Không có thông tin',
        networkTech: data.networkTech || 'Không có thông tin',
        os: data.os || 'Không có thông tin',
        osVersion: data.osVersion || '',
        externalStorage: data.externalStorage || 'Không có thông tin',
        simType: data.simType || '',
        frameMaterial: data.frameMaterial || 'Không có thông tin',
        backMaterial: data.backMaterial || 'Không có thông tin',
        chargingTech: data.chargingTech || 'Không có thông tin',
        displayTech: data.displayTech || 'Không có thông tin',
        resolution: data.resolution || 'Không có thông tin',
        screenSize: data.screenSize || '0', // Cao
        width: data.width || '0', // Rộng
        depth: data.depth || '0', // Dày
        weight: data.weight || '0', // Trọng lượng
        brightnessStandard: data.brightnessStandard || '0',
        brightnessHDR: data.brightnessHDR || '0',
        brightnessOutdoor: data.brightnessOutdoor || null,
        typeOfScreen: data.typeOfScreen || 'Không có thông tin',
        dynamicIsland: data.dynamicIsland || false,
        ppi: data.ppi || 0,
        contrastRatio: data.contrastRatio || 'Không có thông tin',
      };
    },
    getProductDetail(productId, key) {
      return this.productDetails[productId]?.[key] || '—';
    },
    getProductImage(productId) {
      return this.productDetails[productId]?.anhSanPhamUrl || '/assets/images/placeholder.jpg';
    },
    getProductName(productId) {
      return this.productDetails[productId]?.tenSanPham || '—';
    },
    getProductNameBase(productId) {
      return this.getProductName(productId);
    },
  },
};