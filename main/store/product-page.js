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