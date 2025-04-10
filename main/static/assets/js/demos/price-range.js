const minRange = document.getElementById('min-range');
    const maxRange = document.getElementById('max-range');
    const sliderRange = document.getElementById('slider-range');
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');

    // Function to format price with commas and VND symbol
    const formatPrice = (value) => {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'đ';
    };

    // Function to update the slider range and price display
    const updateSlider = () => {
      let minVal = parseInt(minRange.value);
      let maxVal = parseInt(maxRange.value);

      // Ensure minVal is always less than maxVal
      if (minVal > maxVal) {
        [minVal, maxVal] = [maxVal, minVal];
        minRange.value = minVal;
        maxRange.value = maxVal;
      }

      // Update price display
      minPrice.textContent = formatPrice(minVal);
      maxPrice.textContent = formatPrice(maxVal);

      // Calculate the percentage positions of the thumbs
      const minPercent = ((minVal - minRange.min) / (minRange.max - minRange.min)) * 100;
      const maxPercent = ((maxVal - minRange.min) / (minRange.max - minRange.min)) * 100;

      // Update the slider range background
      sliderRange.style.left = minPercent + '%';
      sliderRange.style.width = (maxPercent - minPercent) + '%';
    };

    // Initial update
    updateSlider();

    // Add event listeners to update the slider on input
    minRange.addEventListener('input', updateSlider);
    maxRange.addEventListener('input', updateSlider);