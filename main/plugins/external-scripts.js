export default ({ app }) => {
    if (process.client) {
      const jQueryScript = document.createElement('script');
      jQueryScript.src = '/assets/js/jquery.min.js';
      jQueryScript.async = false;
      document.head.appendChild(jQueryScript);
  
      jQueryScript.onload = () => {
        const scripts = [
          '/assets/js/jquery.plugin.min.js',           
          '/assets/js/owl.carousel.min.js',
          '/assets/js/bootstrap.bundle.min.js',
          '/assets/js/jquery.hoverIntent.min.js',
          '/assets/js/jquery.waypoints.min.js',
          '/assets/js/superfish.min.js',
          '/assets/js/bootstrap-input-spinner.js',
          '/assets/js/jquery.magnific-popup.min.js',
          '/assets/js/main.js',
          '/assets/js/demos/demo-4.js',
          '/assets/js/nouislider.min.js',
          '/assets/js/wNumb.js',
        ];
  
        scripts.forEach((src) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = false;
          document.head.appendChild(script);
        });
      };
    }
  };