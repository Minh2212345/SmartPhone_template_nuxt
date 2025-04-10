// static/assets/js/demo-4.js
$(document).ready(function () {
	'use strict';
  
	if (typeof jQuery === 'undefined') {
	  console.error('jQuery không được tải.');
	  return;
	}
  
	if (typeof $.fn.owlCarousel === 'undefined') {
	  console.error('Owl Carousel không được tải.');
	  return;
	}
  
	// Khởi tạo riêng cho intro-slider
	const $introSlider = $('.intro-slider.owl-carousel');
	if ($introSlider.length) {
	  $introSlider.each(function () {
		const $this = $(this);
		// Hủy Owl Carousel cũ nếu đã khởi tạo
		if ($this.hasClass('owl-loaded')) {
		  $this.trigger('destroy.owl.carousel');
		}
  
		// Đọc tùy chọn từ data-owl-options
		const dataOptions = $this.data('owl-options') || {};
		// Tùy chọn mặc định cho intro-slider
		const defaultIntroOptions = {
		  loop: true,
		  margin: 0,
		  nav: false,
		  dots: true,
		  items: 1,
		  autoplay: true,
		  autoplayTimeout: 5000,
		  navText: ['<i class="icon-angle-left"></i>', '<i class="icon-angle-right"></i>'],
		};
		// Kết hợp data-owl-options và defaultIntroOptions (data-owl-options sẽ ghi đè)
		const finalOptions = { ...defaultIntroOptions, ...dataOptions };
		$this.owlCarousel(finalOptions);
	  });
	}
  
	// Khởi tạo cho các owl-carousel khác (trừ intro-slider)
	const $otherCarousels = $('.owl-carousel').not('.intro-slider');
	$otherCarousels.each(function () {
	  const $this = $(this);
	  // Hủy Owl Carousel cũ nếu đã khởi tạo
	  if ($this.hasClass('owl-loaded')) {
		$this.trigger('destroy.owl.carousel');
	  }
  
	  // Đọc tùy chọn từ data-owl-options
	  const dataOptions = $this.data('owl-options') || {};
	  // Tùy chọn mặc định cho các carousel khác
	  const defaultOptions = {
		loop: true,
		margin: 10,
		nav: true,
		items: 4,
		dots: false,
		navText: ['<i class="icon-angle-left"></i>', '<i class="icon-angle-right"></i>'],
	  };
	  // Kết hợp data-owl-options và defaultOptions (data-owl-options sẽ ghi đè)
	  const finalOptions = { ...defaultOptions, ...dataOptions };
	  $this.owlCarousel(finalOptions);
	});
  
	// Refresh Owl Carousel khi chuyển tab
	$('a[data-toggle="tab"]').on('shown.bs.tab', function () {
	  $('.owl-carousel').trigger('refresh.owl.carousel');
	});
  
	// Khởi tạo lại khi Nuxt chuyển route (trong SPA mode)
	if (window.$nuxt) {
	  window.$nuxt.$on('routeChanged', () => {
		// Khởi tạo lại intro-slider
		$introSlider.each(function () {
		  const $this = $(this);
		  if ($this.hasClass('owl-loaded')) {
			$this.trigger('destroy.owl.carousel');
		  }
		  const dataOptions = $this.data('owl-options') || {};
		  const defaultIntroOptions = {
			loop: true,
			margin: 0,
			nav: false,
			dots: true,
			items: 1,
			autoplay: true,
			autoplayTimeout: 5000,
			navText: ['<i class="icon-angle-left"></i>', '<i class="icon-angle-right"></i>'],
		  };
		  const finalOptions = { ...defaultIntroOptions, ...dataOptions };
		  $this.owlCarousel(finalOptions);
		});
  
		// Khởi tạo lại các carousel khác
		$otherCarousels.each(function () {
		  const $this = $(this);
		  if ($this.hasClass('owl-loaded')) {
			$this.trigger('destroy.owl.carousel');
		  }
		  const dataOptions = $this.data('owl-options') || {};
		  const defaultOptions = {
			loop: true,
			margin: 10,
			nav: true,
			items: 4,
			dots: false,
			navText: ['<i class="icon-angle-left"></i>', '<i class="icon-angle-right"></i>'],
		  };
		  const finalOptions = { ...defaultOptions, ...dataOptions };
		  $this.owlCarousel(finalOptions);
		});
	  });
	}
  
	// Countdown
	if (typeof $.fn.countdown !== 'undefined') {
	  // Deal of the day countdown
	  $('.daily-deal-countdown').each(function () {
		var $this = $(this),
		  untilDate = $this.data('until'),
		  compact = $this.data('compact');
  
		$this.countdown({
		  until: untilDate,
		  format: 'HMS',
		  padZeroes: true,
		  labels: ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'],
		  labels1: ['year', 'month', 'week', 'day', 'hour', 'minutes', 'second'],
		});
	  });
  
	  // Offer countdown
	  $('.offer-countdown').each(function () {
		var $this = $(this),
		  untilDate = $this.data('until'),
		  compact = $this.data('compact');
  
		$this.countdown({
		  until: untilDate,
		  format: 'DHMS',
		  padZeroes: true,
		  labels: ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'],
		  labels1: ['year', 'month', 'week', 'day', 'hour', 'minutes', 'second'],
		});
	  });
	} else {
	  console.error('jQuery Countdown plugin không được tải.');
	}
  });