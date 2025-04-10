// export default ({ app }) => {
//   if (process.client) {
//     // Đảm bảo jQuery và Owl Carousel đã được tải từ nuxt.config.js
//     const initOwlCarousels = () => {
//       if (typeof jQuery !== 'undefined' && typeof jQuery.fn.owlCarousel !== 'undefined') {
//         $('.owl-carousel').each(function () {
//           const $element = $(this);
//           const dataOptions = $element.data('owl-options') || {};

//           // Tùy chọn mặc định cho các slider không có data-owl-options (như New Arrivals)
//           const defaultOptions = {
//             loop: true,
//             margin: 10,
//             nav: true,
//             items: 4,
//             dots: false,
//           };

//           // Kết hợp data-owl-options và defaultOptions (data-owl-options sẽ ghi đè)
//           const finalOptions = { ...defaultOptions, ...dataOptions };
//           $element.owlCarousel(finalOptions);
//         });
//       } else {
//         console.error('jQuery hoặc Owl Carousel không được tải.');
//       }
//     };

//     // Chạy khởi tạo sau khi DOM sẵn sàng
//     $(document).ready(() => {
//       initOwlCarousels();
//     });

//     // Nếu có re-render (ví dụ: trong SPA), cần khởi tạo lại
//     app.router.afterEach(() => {
//       initOwlCarousels();
//     });
//   }
// };