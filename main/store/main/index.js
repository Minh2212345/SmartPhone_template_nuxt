export default {
  name: 'IndexPage',
  data() {
    return {
      newProducts: [],
      iPhoneProducts: [],
      samsungProducts: [],
      oppoProducts: [],
      trendingBestProducts: [],
      trendingSaleProducts: [],
      recommendedProducts: [],
      selectedManufacturer: null, // Track the selected manufacturer for recommended products
      manufacturerMap: {
        1: 'Apple',
        2: 'Samsung',
        3: 'Xiaomi',
        4: 'OPPO',
      },
      owlOptions: {
        nav: false,
        dots: true,
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        responsive: {
          0: { items: 1 },
          480: { items: 1 },
          768: { items: 1 },
          992: { items: 1 },
          1200: { items: 1 },
        },
      },
      newProductsOwlOptions: {
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
      },
      trendingProductsOwlOptions: {
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
      },
    };
  },
  async mounted() {
    await Promise.all([
      this.fetchNewProducts(null), // All products
      this.fetchNewProducts(1), // iPhone
      this.fetchNewProducts(2), // Samsung
      this.fetchNewProducts(4), // OPPO
      this.fetchBestProducts(),
      this.fetchSaleProducts(),
      this.fetchRecommendedProducts(null), // Initially fetch all recommended products
    ]);
    this.populateSections();
    this.$nextTick(() => {
      setTimeout(() => {
        this.initializeOwlCarousel();
      }, 100);
    });
  },
  methods: {
    async fetchNewProducts(idNhaSanXuat) {
      try {
        const response = await this.$axios.get('/api/show-new-product', {
          params: { idNhaSanXuat: idNhaSanXuat },
        });
        const mappedProducts = Array.isArray(response.data)
          ? response.data.map((product) => ({
              ...product,
              tenNhaSanXuat: this.manufacturerMap[product.tenNhaSanXuat] || 'Unknown',
            }))
          : [];
        if (idNhaSanXuat === null) {
          this.newProducts = mappedProducts;
        } else if (idNhaSanXuat === 1) {
          this.iPhoneProducts = mappedProducts;
        } else if (idNhaSanXuat === 2) {
          this.samsungProducts = mappedProducts;
        } else if (idNhaSanXuat === 4) {
          this.oppoProducts = mappedProducts;
        }
      } catch (error) {
        console.error('Error fetching new products:', error.message, error.response?.status);
        if (idNhaSanXuat === null) this.newProducts = [];
        else if (idNhaSanXuat === 1) this.iPhoneProducts = [];
        else if (idNhaSanXuat === 2) this.samsungProducts = [];
        else if (idNhaSanXuat === 4) this.oppoProducts = [];
      }
    },
async fetchBestProducts() {
  try {
    const response = await this.$axios.get('/api/show-best-product', {
      params: { sortBy: 'SALES' },
    });
    console.log('Best Products Response:', response.data); // ThÃªm log Ä‘á»ƒ debug
    this.trendingBestProducts = Array.isArray(response.data)
      ? response.data.map((product) => ({
          ...product,
          tenNhaSanXuat: this.manufacturerMap[product.tenNhaSanXuat] || 'Unknown',
        }))
      : [];
  } catch (error) {
    console.error('Error fetching best products:', error.message, error.response?.status);
    this.trendingBestProducts = [];
  }
},
async fetchSaleProducts() {
  try {
    const response = await this.$axios.get('/api/show-best-product', {
      params: { sortBy: 'DISCOUNT' },
    });
    console.log('Sale Products Response:', response.data); // ThÃªm log Ä‘á»ƒ debug
    this.trendingSaleProducts = Array.isArray(response.data)
      ? response.data.map((product) => ({
          ...product,
          tenNhaSanXuat: this.manufacturerMap[product.tenNhaSanXuat] || 'Unknown',
        }))
      : [];
  } catch (error) {
    console.error('Error fetching sale products:', error.message, error.response?.status);
    this.trendingSaleProducts = [];
  }
},
async fetchRecommendedProducts(idNhaSanXuat) {
  try {
    const response = await this.$axios.get('/api/san-pham-with-variants', {
      params: { idNhaSanXuat },
    });    
    this.recommendedProducts = Array.isArray(response.data)
      ? response.data.map((product) => ({
          ...product,
          tenNhaSanXuat: this.manufacturerMap[product.tenNhaSanXuat] || 'Unknown',
        }))
      : [];
  } catch (error) {
    console.error('Error fetching recommended products:', error.message, error.response?.status);
    this.recommendedProducts = [];
  }
},
    async filterRecommendedProducts(idNhaSanXuat) {
      this.selectedManufacturer = idNhaSanXuat;
      await this.fetchRecommendedProducts(idNhaSanXuat);
    },
    populateSections() {
      // No need to filter here since data is fetched separately for each tab
    },
    isNewProduct(product) {
      if (!product.createdAt) return false;
      const createdAt = new Date(product.createdAt);
      const now = new Date();
      const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24);
      return diffInDays <= 30;
    },
    formatPrice(price) {
      return price.toLocaleString('vi-VN');
    },
    initializeOwlCarousel() {
      if (process.client) {
        this.$nextTick(() => {
          const $ = window.jQuery;
          if ($ && $.fn && $.fn.owlCarousel) {
            const $introSlider = $('.intro-slider');
            if ($introSlider.length) {
              if ($introSlider.hasClass('owl-loaded')) {
                $introSlider.trigger('destroy.owl.carousel');
                $introSlider.removeClass('owl-loaded owl-drag');
                $introSlider.find('.owl-stage-outer').children().unwrap();
                $introSlider.find('.owl-nav, .owl-dots').remove();
              }
              $introSlider.owlCarousel(this.owlOptions);
            }
            // Khá»Ÿi táº¡o cÃ¡c carousel khÃ¡c náº¿u cáº§n
            $('.owl-carousel')
              .not('.intro-slider')
              .each(function () {
                const $this = $(this);
                if ($this.hasClass('owl-loaded')) {
                  $this.trigger('destroy.owl.carousel');
                  $this.removeClass('owl-loaded owl-drag');
                  $this.find('.owl-stage-outer').children().unwrap();
                  $this.find('.owl-nav, .owl-dots').remove();
                }
                const options = $this.data('owl-options') || {};
                $this.owlCarousel(options);
              });
          } else {
            console.error('jQuery or Owl Carousel not loaded');
          }
        });
      }
    },
  },
};