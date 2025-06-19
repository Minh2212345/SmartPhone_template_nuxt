export default {
  // Global page headers for SEO and metadata
  head: {
    title: 'Mobile World - Buy Smartphones & Accessories',
    htmlAttrs: {
      lang: 'vi', // Changed to Vietnamese for localization
    },
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { name: 'keywords', content: 'smartphones, mobile accessories, iPhone, Samsung, Xiaomi, OPPO, Mobile World' },
      { name: 'description', content: 'Mobile World - Your one-stop shop for the latest smartphones and accessories in Vietnam.' },
      { name: 'author', content: 'Mobile World Team' },
      { name: 'apple-mobile-web-app-title', content: 'Mobile World' },
      { name: 'application-name', content: 'Mobile World' },
      { name: 'msapplication-TileColor', content: '#cc9966' },
      { name: 'msapplication-config', content: '/assets/images/icons/browserconfig.xml' },
      { name: 'theme-color', content: '#ffffff' },
      // Add Open Graph and Twitter Card for social sharing
      { property: 'og:title', content: 'Mobile World - Buy Smartphones & Accessories' },
      { property: 'og:description', content: 'Shop the latest smartphones and accessories at Mobile World.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://your-domain.com' }, // Replace with your production domain
      { property: 'og:image', content: '/assets/images/og-image.jpg' }, // Add an OG image
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/images/icons/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/images/icons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/assets/images/icons/favicon-16x16.png' },
      { rel: 'mask-icon', href: '/assets/images/icons/safari-pinned-tab.svg', color: '#666666' },
      { rel: 'shortcut icon', href: '/assets/images/icons/favicon.ico' },
      // Consolidated CSS, removed duplicates, and optimized loading
      { rel: 'stylesheet', href: '/assets/css/line-awesome.min.css' },
      { rel: 'stylesheet', href: '/assets/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/assets/css/plugins/magnific-popup/magnific-popup.css' },
      { rel: 'stylesheet', href: '/assets/css/plugins/owl-carousel/owl.carousel.css' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css' },
      { rel: 'stylesheet', href: '/assets/css/style.css' },
      { rel: 'stylesheet', href: '/assets/css/skins/skin-demo-4.css' },
      { rel: 'stylesheet', href: '/assets/css/demos/demo-4.css' },
      { rel: 'stylesheet', href: '/assets/css/M_Modification_index.css' }, // Moved to end for override priority
    ],
    script: [
  { src: '/assets/js/jquery.min.js', defer: true },
  { src: '/assets/js/bootstrap.bundle.min.js', defer: true },
  { src: '/assets/js/jquery.hoverIntent.min.js', defer: true },
  { src: '/assets/js/jquery.waypoints.min.js', defer: true },
  { src: '/assets/js/superfish.min.js', defer: true },
  { src: '/assets/js/owl.carousel.min.js', defer: true },
  { src: '/assets/js/bootstrap-input-spinner.js', defer: true },
  { src: '/assets/js/jquery.plugin.min.js', defer: true },
  { src: '/assets/js/jquery.magnific-popup.min.js', defer: true },
  { src: '/assets/js/jquery.countdown.min.js', defer: true }, // Chỉ giữ một nguồn
  // { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery.countdown/2.1.0/jquery.countdown.min.js', defer: true }, // Xóa dòng này
],
  },

  // Global CSS
  css: [
    '~/assets/css/main.css',
    'aos/dist/aos.css',
  ],

  // Plugins to run before rendering page
  plugins: [
    { src: '~/plugins/external-scripts.js', mode: 'client' },
    { src: '~/plugins/smooth-scroll.js', mode: 'client' },
    { src: '~/plugins/mdi.js', mode: 'client' },
    // { src: '~/plugins/axios.js', mode: 'client' }, // Added for Axios configuration
  ],

  // Auto-import components
  components: true,

  // Modules for dev and build
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/postcss8',
  ],

  // Nuxt modules
  modules: [
    '@nuxtjs/axios', // Added for HTTP requests to Backend
    '@nuxtjs/pwa', // Added for Progressive Web App support
    '@nuxtjs/sitemap', // Added for SEO
  ],

  // Axios configuration
  axios: {
    baseURL: 'http://localhost:8081/api', // Backend API base URL
    credentials: false, // No credentials needed for now
    proxy: true, // Enable proxy to avoid CORS issues
  },

  // Proxy configuration to avoid CORS
proxy: {
  '/api/': {
    target: 'http://localhost:8081',
    changeOrigin: true,
  },
},

  // PWA configuration
pwa: {
  manifest: {
    name: 'Mobile World',
    short_name: 'Mobile World',
    description: 'Shop the latest smartphones and accessories.',
    lang: 'vi',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    icons: [
      {
        src: '/assets/images/icons/favicon-16x16.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/assets/images/icons/favicon-32x32.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
},

  // Sitemap configuration
sitemap: {
  hostname: 'http://localhost:3000',
  gzip: true,
  exclude: ['/admin/**'],
  routes: async () => {
    const axios = require('axios');
    try {
      const response = await axios.get('http://localhost:3000/api/san-pham', {
        proxy: false, // Đảm bảo sử dụng proxy đã cấu hình
      });
      const products = response.data;
      return products.map((product) => `/product-page?sp_id=${product.id}`);
    } catch (error) {
      console.error('Error fetching products for sitemap:', error.message, error.response?.status);
      return [];
    }
  },
},

  // Build configuration
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    // Optimize vendor bundle
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    // Transpile external libraries if needed
    transpile: ['aos'],
  },

  // Server configuration
  server: {
    port: 3000,
    host: 'localhost',
  },

  // Environment variables
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:8081/api',
  },

  // Render options for better performance
  render: {
    static: {
      setHeaders(res) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      },
    },
  },
};