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
      isLoading: false,
    };
  },
  computed: {
    uniqueMemories() {
      return [...new Set(this.variants.map((v) => v.bo_nho_trong_dung_luong))].sort();
    },
    uniqueColors() {
      return [...new Set(this.variants.map((v) => v.mau_sac))].map((name) => ({
        name,
        hex: this.colorMap[name] || '#ccc',
      }));
    },
    availableMemories() {
      return [
        ...new Set(
          this.variants
            .filter((v) => v.mau_sac === this.selectedVariant.mau_sac && (v.gia_ban != null && v.gia_ban > 0 || v.gia_sau_khi_giam != null && v.gia_sau_khi_giam > 0))
            .map((v) => v.bo_nho_trong_dung_luong)
        ),
      ].sort();
    },
    screenInfo() {
      const {
        ten_cong_nghe_man_hinh,
        chuan_man_hinh,
        kich_thuoc,
        do_phan_giai,
        do_sang_toi_da,
        tan_so_quet,
        kieu_man_hinh,
      } = this.product;
      const parts = [];
      if (ten_cong_nghe_man_hinh) parts.push(`Công nghệ: ${ten_cong_nghe_man_hinh}`);
      if (chuan_man_hinh) parts.push(`Chuẩn: ${chuan_man_hinh}`);
      if (kich_thuoc) parts.push(`Kích thước: ${kich_thuoc}`);
      if (do_phan_giai) parts.push(`Độ phân giải: ${do_phan_giai}`);
      if (do_sang_toi_da) parts.push(`Độ sáng: ${do_sang_toi_da}`);
      if (tan_so_quet) parts.push(`Tần số quét: ${tan_so_quet}Hz`);
      if (kieu_man_hinh) parts.push(`Kiểu: ${kieu_man_hinh}`);
      return parts.length > 0 ? parts.join(', ') : 'Không có thông tin';
    },
    isProductAvailable() {
      return this.variants.some((v) => (v.gia_ban != null && v.gia_ban > 0) || (v.gia_sau_khi_giam != null && v.gia_sau_khi_giam > 0));
    },
  },
  watch: {
    '$route.query.sp_id'(newSpId, oldSpId) {
      if (newSpId && newSpId !== oldSpId) {
        this.isLoading = true;
        this.product = {};
        this.variants = [];
        this.selectedVariant = {};
        this.similarProducts = [];
        this.fetchProductDetails(newSpId)
          .then(() => this.fetchSimilarProducts())
          .then(() => {
            this.$nextTick(() => {
              this.initializeOwlCarousel();
            });
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
  },
  async mounted() {
    const sanPhamId = this.$route.query.sp_id;
    if (sanPhamId) {
      this.isLoading = true;
      await this.fetchProductDetails(sanPhamId);
      await this.fetchSimilarProducts();
      this.$nextTick(() => {
        this.initializeOwlCarousel();
      });
      this.isLoading = false;
    }
  },
  methods: {
    async fetchProductDetails(sanPhamId) {
      try {
        this.isLoading = true;
        const response = await this.$axios.get('/api/chi-tiet-san-pham', {
          params: { sanPhamId },
        });
        const variants = response.data;
        if (variants.length > 0) {
          this.product = variants[0];
          this.variants = variants;
          this.selectedVariant = variants.find((v) => v.gia_ban != null && v.gia_ban > 0) || variants[0];
        } else {
          this.product = {};
          this.variants = [];
          this.selectedVariant = {};
        }
      } catch (error) {
        console.error('Error fetching product details:', error.message);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchSimilarProducts() {
      try {
        const response = await this.$axios.get('/api/suggested-products');
        this.similarProducts = Array.isArray(response.data)
          ? response.data
              .filter((p) => p.id !== this.product.sp_id)
              .slice(0, 5)
              .map((product) => ({
                ...product,
                tenNhaSanXuat: this.manufacturerMap[product.tenNhaSanXuat] || product.tenNhaSanXuat || 'Unknown',
              }))
          : [];
        this.$nextTick(() => {
          this.initializeOwlCarousel();
        });
      } catch (error) {
        console.error('Error fetching suggested products:', error.message, error.response?.status);
        this.similarProducts = [];
      }
    },
    selectColor(color) {
      if (!this.isProductAvailable) return;
      const variant = this.variants.find(
        (v) => v.mau_sac === color && v.bo_nho_trong_dung_luong === this.selectedVariant.bo_nho_trong_dung_luong
      ) || this.variants.find((v) => v.mau_sac === color);
      if (variant && ((variant.gia_ban != null && variant.gia_ban > 0) || (variant.gia_sau_khi_giam != null && variant.gia_sau_khi_giam > 0))) {
        this.selectedVariant = { ...variant, imel: variant.imel || null };
        console.log('Selected Variant after color change:', this.selectedVariant);
      }
    },
    selectMemory(memory) {
      if (!this.isProductAvailable) return;
      const variant = this.variants.find(
        (v) => v.bo_nho_trong_dung_luong === memory && v.mau_sac === this.selectedVariant.mau_sac
      ) || this.variants.find((v) => v.bo_nho_trong_dung_luong === memory);
      if (variant && ((variant.gia_ban != null && variant.gia_ban > 0) || (variant.gia_sau_khi_giam != null && variant.gia_sau_khi_giam > 0))) {
        this.selectedVariant = { ...variant, imel: variant.imel || null };
        console.log('Selected Variant after memory change:', this.selectedVariant);
      }
    },
    getImageForColor(color) {
      const variant = this.variants.find((v) => v.mau_sac === color);
      return variant ? (variant.anh_san_pham_url || '/assets/images/placeholder.jpg') : '/assets/images/placeholder.jpg';
    },
    getPriceForMemory(memory) {
      const variant =
        this.variants.find((v) => v.bo_nho_trong_dung_luong === memory && v.mau_sac === this.selectedVariant.mau_sac) ||
        this.variants.find((v) => v.bo_nho_trong_dung_luong === memory);
      return variant ? (variant.gia_ban != null && variant.gia_ban > 0 ? variant.gia_ban : null) : null;
    },
    getPriceForColor(color) {
      const variant = this.variants.find(
        (v) => v.mau_sac === color && v.bo_nho_trong_dung_luong === this.selectedVariant.bo_nho_trong_dung_luong
      );
      if (!variant) return null;
      const price = variant.has_discount ? variant.gia_sau_khi_giam : variant.gia_ban;
      return price != null && price > 0 ? price : null;
    },
    isMemoryAvailable(memory) {
      const variant =
        this.variants.find((v) => v.bo_nho_trong_dung_luong === memory && v.mau_sac === this.selectedVariant.mau_sac) ||
        this.variants.find((v) => v.bo_nho_trong_dung_luong === memory);
      return variant && ((variant.gia_ban != null && variant.gia_ban > 0) || (variant.gia_sau_khi_giam != null && variant.gia_sau_khi_giam > 0));
    },
    isColorAvailable(color) {
      const variant = this.variants.find(
        (v) => v.mau_sac === color && v.bo_nho_trong_dung_luong === this.selectedVariant.bo_nho_trong_dung_luong
      ) || this.variants.find((v) => v.mau_sac === color);
      return variant && ((variant.gia_ban != null && variant.gia_ban > 0) || (variant.gia_sau_khi_giam != null && variant.gia_sau_khi_giam > 0));
    },
    formatPrice(price) {
      return price != null && price > 0 ? Number(price).toLocaleString('vi-VN') : 'Liên hệ để đặt hàng';
    },
    addToCart() {
      if (!this.isProductAvailable) {
        this.$refs.toastNotification?.addToast({
          type: 'warning',
          message: 'Sản phẩm hiện không có sẵn. Vui lòng liên hệ để đặt hàng!',
          isLoading: false,
          duration: 3000,
        });
        return;
      }
      console.log('Added:', {
        productId: this.product.sp_id,
        variantId: this.selectedVariant.ctsp_id,
        imel: this.selectedVariant.imel,
        totalItems: this.quantity,
      });
      // Existing addToCart logic remains unchanged
    },
    async buyNow() {
      if (!this.isProductAvailable) {
        this.$refs.toastNotification?.addToast({
          type: 'warning',
          message: 'Sản phẩm hiện không có sẵn. Vui lòng liên hệ để đặt hàng!',
          isLoading: false,
          duration: 3000,
        });
        return;
      }
      try {
        const response = await this.$axios.post('/api/client/them-gio-hang', {
          productId: this.product.sp_id,
          variantId: this.selectedVariant.ctsp_id,
          imel: this.selectedVariant.imel,
          totalItems: this.quantity,
        });
        const invoiceId = response.data.hoaDonId;
        this.$refs.toastNotification?.addToast({
          type: 'success',
          message: 'Đã thêm sản phẩm vào giỏ hàng! Đang chuyển hướng...',
          isLoading: false,
          duration: 3000,
        });
        setTimeout(() => {
          this.$router.push({
            path: '/cart-page',
            query: { invoiceId: invoiceId },
          });
        }, 3000);
      } catch (error) {
        console.error('Error during buy now:', error);
        this.$refs.toastNotification?.addToast({
          type: 'error',
          message: 'Lỗi khi mua hàng: ' + (error.response?.data?.message || error.message),
          isLoading: false,
          duration: 5000,
        });
      }
    },
    async isPendingInvoice(invoiceId) {
      try {
        const response = await this.$axios.get(`http://localhost:8080/api/client/gio-hang/${invoiceId}`);
        return response.data.trangThai === 6;
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái hóa đơn:', error);
        return false;
      }
    },
    handleImageError(event) {
      console.error('Image failed to load:', event.target.src);
      event.target.src = '/assets/images/placeholder.jpg';
    },
    initializeOwlCarousel() {
      if (process.client) {
        this.$nextTick(() => {
          const $ = window.jQuery;
          if ($ && $.fn && $.fn.owlCarousel) {
            const $carousel = $('.owl-carousel');
            if ($carousel.length) {
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
};