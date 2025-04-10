// static/assets/js/init-owl-carousel.js
(function($) {
    // Đợi DOM sẵn sàng
    $(document).ready(function() {
      // Khởi tạo Owl Carousel cho tất cả các phần tử có class .owl-carousel
      $('.owl-carousel').each(function() {
        const $this = $(this);
        // Đọc tùy chọn từ data-owl-options, nếu không có thì dùng tùy chọn mặc định
        const dataOptions = $this.data('owl-options') || {};
  
        // Tùy chọn mặc định cho các slider không có data-owl-options (như New Arrivals)
        const defaultOptions = {
          loop: true,
          margin: 10,
          nav: true,
          items: 4,
          dots: false,
        };
  
        // Kết hợp data-owl-options và defaultOptions (data-owl-options sẽ ghi đè)
        const finalOptions = { ...defaultOptions, ...dataOptions };
        $this.owlCarousel(finalOptions);
      });
    });
  })(jQuery);