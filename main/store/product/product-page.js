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
      colorMap: {}, // Dynamic color mapping from API
      isLoading: false,
      reviews: [],
      reviewStats: {
        averageRating: 4.8,
        totalReviews: 256,
        ratingDistribution: [
          { stars: 5, count: 180, percentage: 70 },
          { stars: 4, count: 51, percentage: 20 },
          { stars: 3, count: 15, percentage: 6 },
          { stars: 2, count: 8, percentage: 3 },
          { stars: 1, count: 2, percentage: 1 }
        ]
      },
      fakeReviews: [
        {
          id: 1,
          userName: 'Nguyễn Văn A',
          avatar: 'https://i.pravatar.cc/150?img=1',
          rating: 5,
          date: '2024-01-15',
          title: 'Sản phẩm tuyệt vời!',
          content: 'Mình đã sử dụng sản phẩm này được 2 tháng rồi, chất lượng rất tốt. Camera chụp ảnh đẹp, pin trâu, hiệu năng mượt mà. Rất hài lòng với sự lựa chọn này.',
          helpful: 24,
          verified: true
        },
        {
          id: 2,
          userName: 'Trần Thị B',
          avatar: 'https://i.pravatar.cc/150?img=2',
          rating: 4,
          date: '2024-01-10',
          title: 'Đáng giá tiền',
          content: 'Sản phẩm đẹp, chất lượng tốt. Màn hình sắc nét, âm thanh hay. Chỉ có điều pin hơi yếu một chút khi chơi game nặng.',
          helpful: 18,
          verified: true
        },
        {
          id: 3,
          userName: 'Lê Minh C',
          avatar: 'https://i.pravatar.cc/150?img=3',
          rating: 5,
          date: '2024-01-08',
          title: 'Xuất sắc!',
          content: 'Thiết kế đẹp, cầm nắm chắc chắn. Hiệu năng mạnh mẽ, đa nhiệm tốt. Camera selfie rất đẹp, phù hợp cho các bạn trẻ.',
          helpful: 31,
          verified: false
        },
        {
          id: 4,
          userName: 'Phạm Thị D',
          avatar: 'https://i.pravatar.cc/150?img=4',
          rating: 4,
          date: '2024-01-05',
          title: 'Hài lòng',
          content: 'Giao hàng nhanh, đóng gói cẩn thận. Máy hoạt động ổn định, không bị lag. Giá cả hợp lý so với chất lượng.',
          helpful: 15,
          verified: true
        },
        {
          id: 5,
          userName: 'Hoàng Văn E',
          avatar: 'https://i.pravatar.cc/150?img=5',
          rating: 3,
          date: '2024-01-02',
          title: 'Tạm ổn',
          content: 'Sản phẩm đúng như mô tả. Tuy nhiên cảm giác hơi nặng và dày. Camera ban đêm chưa thực sự ấn tượng.',
          helpful: 8,
          verified: false
        }
      ]
    };
  },
  computed: {
    uniqueMemories() {
      return [...new Set(this.variants.map((v) => v.bo_nho_trong_dung_luong))].sort();
    },
    uniqueColors() {
      return [...new Set(this.variants.map((v) => v.mau_sac))];
    },
    availableMemories() {
      return [
        ...new Set(
          this.variants
            .filter((v) => v.mau_sac === this.selectedVariant.mau_sac)
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
        this.fetchColorMapping()
          .then(() => this.fetchProductDetails(newSpId))
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
      await this.fetchColorMapping();
      await this.fetchProductDetails(sanPhamId);
      await this.fetchSimilarProducts();
      this.$nextTick(() => {
        this.initializeOwlCarousel();
      });
      this.isLoading = false;
    }
  },
  methods: {
    async fetchColorMapping() {
      try {
        const response = await this.$axios.get('/api/mau-sac/all');
        this.colorMap = {};
        if (response.data && Array.isArray(response.data)) {
          response.data.forEach(color => {
            if (color.mauSac && color.maMau && !color.deleted) {
              this.colorMap[color.mauSac] = color.maMau;
            }
          });
        }
      } catch (error) {
        console.error('Error fetching color mapping:', error);
        this.colorMap = {};
      }
    },
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
          this.selectedVariant = variants[0]; // Select first variant regardless of price
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
      const variant = this.variants.find(
        (v) => v.mau_sac === color && v.bo_nho_trong_dung_luong === this.selectedVariant.bo_nho_trong_dung_luong
      ) || this.variants.find((v) => v.mau_sac === color);
      if (variant) {
        this.selectedVariant = { ...variant, imel: variant.imel || null };
        console.log('Selected Variant after color change:', this.selectedVariant);
      }
    },
    selectMemory(memory) {
      const variant = this.variants.find(
        (v) => v.bo_nho_trong_dung_luong === memory && v.mau_sac === this.selectedVariant.mau_sac
      ) || this.variants.find((v) => v.bo_nho_trong_dung_luong === memory);
      if (variant) {
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
      return !!variant;
    },
    isColorAvailable(color) {
      const variant = this.variants.find(
        (v) => v.mau_sac === color && v.bo_nho_trong_dung_luong === this.selectedVariant.bo_nho_trong_dung_luong
      ) || this.variants.find((v) => v.mau_sac === color);
      return !!variant;
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
    formatReviewDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    renderStars(rating) {
      return Array.from({ length: 5 }, (_, i) => i < rating);
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