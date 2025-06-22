export default {
  name: 'Category4Cols',
  data() {
    return {
      products: [],
      currentPage: 0,
      totalPages: 1,
      totalItems: 0,
      sortBy: 'popularity',
      selectedUseCases: [],
      selectedColors: [],
      selectedBrands: [],
      minPrice: 0,
      maxPrice: 0,
      minPriceLimit: 0,
      maxPriceLimit: 0,
      manufacturerMap: {
        1: 'Apple',
        2: 'Samsung',
        3: 'Xiaomi',
        4: 'Oppo',
      },
      uniqueColors: [],
    };
  },
  computed: {
    minPricePercent() {
      return ((this.minPrice - this.minPriceLimit) / (this.maxPriceLimit - this.minPriceLimit)) * 100;
    },
    maxPricePercent() {
      return ((this.maxPrice - this.minPriceLimit) / (this.maxPriceLimit - this.minPriceLimit)) * 100;
    },
  },
  watch: {
    selectedUseCases: {
      handler() {
        this.fetchProducts(0);
      },
      deep: true,
    },
    selectedColors: {
      handler() {
        this.fetchProducts(0);
      },
      deep: true,
    },
    selectedBrands: {
      handler() {
        this.fetchProducts(0);
      },
      deep: true,
    },
    minPrice(newValue) {
      if (newValue > this.maxPrice) {
        this.minPrice = this.maxPrice;
      }
      this.fetchProducts(0);
    },
    maxPrice(newValue) {
      if (newValue < this.minPrice) {
        this.maxPrice = this.minPrice;
      }
      this.fetchProducts(0);
    },
    sortBy() {
      this.fetchProducts(0);
    },
  },
  async asyncData({ $axios, route, error }) {
    try {
      const query = route.query;
      const page = parseInt(query.page) || 0;
      const sortBy = query.sortBy || 'popularity';
      const useCases = query.useCases ? query.useCases.split(',') : [];
      const colors = query.colors ? query.colors.split(',') : [];
      const brands = query.brands ? query.brands.split(',') : [];
      const minPrice = parseFloat(query.minPrice) || 0;
      const maxPrice = parseFloat(query.maxPrice) || 0;

      const [productsResponse, priceRangeResponse, colorsResponse] = await Promise.all([
        $axios.get('/api/products', {
          params: {
            page,
            size: 20,
            sortBy,
            useCases: useCases.join(','),
            colors: colors.join(','),
            brands: brands.join(','),
            minPrice,
            maxPrice,
          },
        }),
        $axios.get('/api/price-range'),
        $axios.get('/api/colors'),
      ]);

      const products = Array.isArray(productsResponse.data.products)
        ? productsResponse.data.products.map((product) => ({
            ...product,
            tenNhaSanXuat: product.tenNhaSanXuat || 'Unknown',
            createdAt: product.createdAt?.timestamp || product.createdAt,
            mauSacList: Array.isArray(product.mauSacList) ? product.mauSacList : [],
          }))
        : [];

      return {
        products,
        currentPage: productsResponse.data.currentPage || 0,
        totalPages: productsResponse.data.totalPages || 1,
        totalItems: productsResponse.data.totalItems || 0,
        sortBy,
        selectedUseCases: useCases,
        selectedColors: colors,
        selectedBrands: brands,
        minPrice: minPrice || priceRangeResponse.data.minPrice || 0,
        maxPrice: maxPrice || priceRangeResponse.data.maxPrice || 0,
        minPriceLimit: priceRangeResponse.data.minPrice || 0,
        maxPriceLimit: priceRangeResponse.data.maxPrice || 0,
        uniqueColors: colorsResponse.data.colors || [],
      };
    } catch (err) {
      console.error('Error fetching initial data:', err.message);
      return {
        products: [],
        currentPage: 0,
        totalPages: 1,
        totalItems: 0,
        sortBy: 'popularity',
        selectedUseCases: [],
        selectedColors: [],
        selectedBrands: [],
        minPrice: 0,
        maxPrice: 0,
        minPriceLimit: 0,
        maxPriceLimit: 0,
        uniqueColors: [],
      };
    }
  },
  methods: {
    async fetchProducts(page) {
      console.log('fetchProducts called with page:', page, 'sortBy:', this.sortBy);
      try {
        const response = await this.$axios.get('/api/products', {
          params: {
            page,
            size: 20,
            sortBy: this.sortBy,
            useCases: this.selectedUseCases.join(','),
            colors: this.selectedColors.join(','),
            brands: this.selectedBrands.join(','),
            minPrice: this.minPrice,
            maxPrice: this.maxPrice,
          },
        });

        this.products = Array.isArray(response.data.products)
          ? response.data.products
              .filter((product) => product.imageUrl && product.giaBan > 0)
              .map((product) => ({
                ...product,
                tenNhaSanXuat: this.manufacturerMap[product.tenNhaSanXuat] || 'Unknown',
                createdAt: product.createdAt?.timestamp || product.createdAt,
                mauSacList: Array.isArray(product.mauSacList) ? product.mauSacList : [],
              }))
          : [];
        this.currentPage = response.data.currentPage || 0;
        this.totalPages = response.data.totalPages || 1;
        this.totalItems = response.data.totalItems || 0;

        this.$router.push({
          path: '/category-4cols',
          query: {
            page: page.toString(),
            sortBy: this.sortBy,
            useCases: this.selectedUseCases.join(','),
            colors: this.selectedColors.join(','),
            brands: this.selectedBrands.join(','),
            minPrice: this.minPrice.toString(),
            maxPrice: this.maxPrice.toString(),
          },
        });
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          config: error.config,
        });
        this.$toast.error('Không thể tải sản phẩm. Vui lòng thử lại sau!');
        this.products = [];
        this.currentPage = 0;
        this.totalPages = 1;
        this.totalItems = 0;
      }
    },
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
    formatPrice(price) {
      return price.toLocaleString('vi-VN');
    },
    getColorCode(mauSac) {
      const colorMap = {
        'Xanh Mộng Kết': '#a3d2ca',
        'Xanh Lưu Ly': '#b3cde0',
        'Hồng': '#f4c2c2',
        'Đen': '#333333',
        'Trắng': '#c1b8b8',
        'Bạc': '#c0c0c0',
        'Cam': '#ffa500',
        'Đỏ': '#ff0000',
        'Gold': '#ffd700',
        'Kem': '#fffdd0',
        'Tím': '#800080',
        'Tím Đậm': '#4b0082',
        'Titan tự nhiên': '#8a8987',
        'Vàng': '#ffff00',
        'Xám': '#808080',
        'Xanh Bạc Hà': '#98ff98',
        'Xanh Dương': '#0000ff',
        'Xanh Dương Đậm': '#00008b',
        'Xanh Dương Nhạt': '#add8e6',
        'Xanh Lá': '#008000',
        'Vàng đồng': '#b8860b',
        'Nâu': '#8b4513',
        'Không xác định': '#cccccc',
      };
      return colorMap[mauSac] || '#cccccc';
    },
    toggleColor(color) {
      if (this.selectedColors.includes(color)) {
        this.selectedColors = this.selectedColors.filter((c) => c !== color);
      } else {
        this.selectedColors.push(color);
      }
    },
    clearFilters() {
      this.selectedUseCases = [];
      this.selectedColors = [];
      this.selectedBrands = [];
      this.minPrice = this.minPriceLimit;
      this.maxPrice = this.maxPriceLimit;
      this.sortBy = 'popularity';
      this.fetchProducts(0);
    },
    updatePriceRange() {
      if (this.minPrice > this.maxPrice) {
        this.minPrice = this.maxPrice;
      }
    },
  },
  created() {
    this.fetchProducts = this.debounce(this.fetchProducts, 300);
  },
  mounted() {
    if (!this.products.length) {
      this.fetchProducts(0);
    }
    this.updatePriceRange();
  },
};