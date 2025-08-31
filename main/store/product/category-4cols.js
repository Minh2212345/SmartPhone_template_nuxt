import { emitCartUpdate } from '~/utils/eventBus.js';

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
      colorMap: {}, // Dynamic color mapping from API
      invoiceId: null,
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
        $axios.get('/api/mau-sac/all'),
      ]);

      const manufacturerMap = {
        1: 'Apple',
        2: 'Samsung',
        3: 'Xiaomi',
        4: 'Oppo',
      };

      // Build dynamic color mapping from API
      const colorMap = {};
      if (colorsResponse.data && Array.isArray(colorsResponse.data)) {
        colorsResponse.data.forEach(color => {
          if (color.mauSac && color.maMau && !color.deleted) {
            colorMap[color.mauSac] = color.maMau;
          }
        });
      }

      const products = Array.isArray(productsResponse.data.products)
        ? productsResponse.data.products.map((product) => ({
            ...product,
            tenNhaSanXuat: manufacturerMap[product.tenNhaSanXuat] || 'Unknown',
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
        uniqueColors: colorsResponse.data || [],
        colorMap: colorMap,
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
        colorMap: {},
      };
    }
  },
  methods: {
   async fetchProducts(page) {
  console.log('fetchProducts called with page:', page, 'sortBy:', this.sortBy);
  try {
    const [productsResponse, priceRangeResponse, colorsResponse] = await Promise.all([
      this.$axios.get('/api/products', {
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
      }),
      this.$axios.get('/api/price-range'),
      this.$axios.get('/api/mau-sac/all'),
    ]);

    this.products = Array.isArray(productsResponse.data.products)
      ? productsResponse.data.products
          .filter((product) => product.imageUrl && product.giaBan > 0)
          .map((product) => ({
            ...product,
            tenNhaSanXuat: this.manufacturerMap[product.tenNhaSanXuat] || 'Unknown',
            createdAt: product.createdAt?.timestamp || product.createdAt,
            mauSacList: Array.isArray(product.mauSacList) ? product.mauSacList : [],
          }))
      : [];
    this.currentPage = productsResponse.data.currentPage || 0;
    this.totalPages = productsResponse.data.totalPages || 1;
    this.totalItems = productsResponse.data.totalItems || 0;

    this.minPrice = this.minPrice || priceRangeResponse.data.minPrice || 0;
    this.maxPrice = this.maxPrice || priceRangeResponse.data.maxPrice || 0;
    this.minPriceLimit = priceRangeResponse.data.minPrice || 0;
    this.maxPriceLimit = priceRangeResponse.data.maxPrice || 0;

    this.uniqueColors = colorsResponse.data || [];

    // Build dynamic color mapping from API
    this.colorMap = {};
    if (colorsResponse.data && Array.isArray(colorsResponse.data)) {
      colorsResponse.data.forEach(color => {
        if (color.mauSac && color.maMau && !color.deleted) {
          this.colorMap[color.mauSac] = color.maMau;
        }
      });
    }

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
    console.error('Lỗi khi lấy dữ liệu:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });
    this.$toast.error('Không thể tải dữ liệu. Vui lòng thử lại sau!');
    this.products = [];
    this.currentPage = 0;
    this.totalPages = 1;
    this.totalItems = 0;
    this.uniqueColors = [];
    this.minPrice = 0;
    this.maxPrice = 0;
    this.minPriceLimit = 0;
    this.maxPriceLimit = 0;
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
      // Use dynamic color mapping from API
      return this.colorMap[mauSac] || '#cccccc';
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
    
    async createInvoice(customerId) {
      try {
        const params = customerId ? { khachHangId: customerId } : {}
        const response = await this.$axios.post('http://localhost:8080/api/client/hoa-don-cho', {}, { params })
        this.invoiceId = response.data.id
        localStorage.setItem('invoiceId', this.invoiceId)
      } catch (error) {
        throw new Error('Lỗi khi tạo hóa đơn mới: ' + (error.response?.data?.message || error.message))
      }
    },

    async isPendingInvoice(invoiceId) {
      try {
        const response = await this.$axios.get(`http://localhost:8080/api/client/gio-hang/${invoiceId}`)
        return response.data.trangThai === 6
      } catch (error) {
        return false
      }
    },

    async addToCart(product) {
      try {
        if (!product || !product.id) {
          console.error('Vui lòng chọn sản phẩm hợp lệ!')
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

        // Thêm sản phẩm vào giỏ hàng (sử dụng product.id làm chiTietSanPhamId)
        const chiTietGioHangDTO = {
          chiTietSanPhamId: product.id,
          maImel: null,
          soLuong: 1,
          idPhieuGiamGia: null,
        };

        await this.$axios.post(
          `http://localhost:8080/api/client/gio-hang/them?idHD=${invoiceId}`,
          chiTietGioHangDTO
        );

        // Emit cart update event to sync with navbar
        emitCartUpdate();
        
        console.log(`Sản phẩm "${product.tenSanPham}" đã được thêm vào giỏ hàng!`)
        alert(`Sản phẩm "${product.tenSanPham}" đã được thêm vào giỏ hàng!`)

        // Chuyển hướng đến cart-page với invoiceId sau 2 giây
        setTimeout(() => {
          this.$router.push({
            path: '/cart-page',
            query: { invoiceId: invoiceId },
          })
        }, 2000)
      } catch (error) {
        console.error('Error adding to cart:', error)
        alert('Lỗi khi thêm sản phẩm vào giỏ hàng: ' + (error.response?.data?.message || error.message))
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