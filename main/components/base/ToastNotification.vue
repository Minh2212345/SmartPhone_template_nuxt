<template>
  <div class="toast-container">
    <transition-group name="toast-slide" tag="div">
      <div v-for="toast in toasts" :key="toast.id" class="toast-notification" :class="`toast-${toast.type}`"
        role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-content">
          <div class="toast-icon-wrapper">
            <i :class="toastIcon(toast.type)" class="toast-icon"></i>
          </div>
          <div class="toast-main">
            <div class="toast-header">
              <strong class="toast-title" :class="`title-${toast.type}`">{{ toastTitle(toast.type) }}</strong>
            </div>
            <div class="toast-body">
              {{ toast.message }}
              <div v-if="toast.isLoading" class="loading-spinner">
                <div class="modern-spinner"></div>
                <span class="loading-text">Đang xử lý...</span>
              </div>
            </div>
          </div>
        </div>
        <div class="toast-progress" :class="`progress-${toast.type}`"></div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api';

export default {
  name: 'ToastNotification',
  setup() {
    const toasts = ref([]);
    const maxToasts = 5; // Maximum number of toasts to show at once

    const addToast = ({ type, message, isLoading = false, duration = 1500 }) => {
      // Check for duplicate messages within the last 500ms
      const now = Date.now();
      const isDuplicate = toasts.value.some(toast => 
        toast.message === message && 
        toast.type === type && 
        (now - toast.timestamp) < 500
      );
      
      if (isDuplicate) {
        return; // Don't add duplicate toast
      }

      const id = now + Math.random();
      const newToast = { id, type, message, isLoading, timestamp: now };
      
      // Add new toast at the beginning of array (top position)
      toasts.value.unshift(newToast);
      
      // Remove excess toasts if we exceed the maximum
      if (toasts.value.length > maxToasts) {
        const excessToasts = toasts.value.splice(maxToasts);
        excessToasts.forEach(toast => {
          if (toast.timeoutId) {
            clearTimeout(toast.timeoutId);
          }
        });
      }
      
      if (!isLoading && duration > 0) {
        const timeoutId = setTimeout(() => removeToast(id), duration);
        newToast.timeoutId = timeoutId;
      }
    };

    const removeToast = (id) => {
      const index = toasts.value.findIndex((toast) => toast.id === id);
      if (index > -1) {
        const toast = toasts.value[index];
        if (toast.timeoutId) {
          clearTimeout(toast.timeoutId);
        }
        toasts.value.splice(index, 1);
      }
    };

    const toastTitle = computed(() => (type) => {
      switch (type) {
        case 'success': return 'Thành công';
        case 'error': return 'Lỗi';
        case 'warning': return 'Cảnh báo';
        default: return 'Thông báo';
      }
    });

    const toastIcon = computed(() => (type) => {
      switch (type) {
        case 'success': return 'fas fa-check-circle';
        case 'error': return 'fas fa-times-circle';
        case 'warning': return 'fas fa-exclamation-triangle';
        default: return 'fas fa-info-circle';
      }
    });

    return {
      toasts,
      addToast,
      removeToast,
      toastTitle,
      toastIcon,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

:root {
  /* Modern Color Palette - Bright & Vibrant */
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --success-gradient: linear-gradient(135deg, #13ad75 0%, #38ef7d 100%);
  --error-gradient: linear-gradient(135deg, #ee0979 0%, #ff6a00 100%);
  --warning-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --info-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  
  /* Glass Colors */
  --glass-white: rgba(255, 255, 255, 0.25);
  --glass-border: rgba(255, 255, 255, 0.18);
  
  /* Shadow System */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.toast-container {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  max-width: 90%;
  pointer-events: none;
  align-items: flex-end;
  /* Remove gap to handle spacing individually */
}

.toast-notification {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 400px;
  border-radius: 10px;
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-2xl);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  pointer-events: auto;
  transform: translateZ(0);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  /* Add consistent margin for spacing */
  margin-bottom: 1.5rem;
}

.toast-content {
  display: flex;
  align-items: flex-start;
  padding: 1.5rem;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.toast-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.toast-icon-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  opacity: 0.1;
  z-index: -1;
}

.toast-icon {
  font-size: 1.5rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 2;
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.toast-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toast-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toast-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #333333;
  text-shadow: none;
  letter-spacing: -0.025em;
}

.title-success {
  color: #13ad75;
}

.title-error {
  color: #ee0979;
}

.title-warning {
  color: #f093fb;
}

.title-info {
  color: #4facfe;
}


.toast-body {
  font-size: 1.2rem;
  color: #555555;
  line-height: 1.4;
  text-shadow: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.loading-spinner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.modern-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100%;
  border-radius: 0 0 20px 20px;
  animation: progressBar 3s linear forwards;
  z-index: 1;
}

@keyframes progressBar {
  from { width: 100%; }
  to { width: 0%; }
}

/* Toast Type Styles */
.toast-success {
  background: #ffffff;
  border-left: 5px solid #13ad75;
}

.toast-success .toast-icon-wrapper {
  background: #13ad75;
}

.toast-success .toast-icon-wrapper::before {
  background: #13ad75;
}

.toast-success .toast-progress {
  background: #13ad75;
}

.toast-error {
  background: #ffffff;
  border-left: 5px solid #ee0979;
}

.toast-error .toast-icon-wrapper {
  background: #ee0979;
}

.toast-error .toast-icon-wrapper::before {
  background: #ee0979;
}

.toast-error .toast-progress {
  background: #ee0979;
}

.toast-warning {
  background: #ffffff;
  border-left: 5px solid #f093fb;
}

.toast-warning .toast-icon-wrapper {
  background: #f093fb;
}

.toast-warning .toast-icon-wrapper::before {
  background: #f093fb;
}

.toast-warning .toast-progress {
  background: #f093fb;
}

.toast-info {
  background: #ffffff;
  border-left: 5px solid #4facfe;
}

.toast-info .toast-icon-wrapper {
  background: #4facfe;
}

.toast-info .toast-icon-wrapper::before {
  background: #4facfe;
}

.toast-info .toast-progress {
  background: #4facfe;
}

/* Enhanced Transition Animations */
.toast-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.toast-slide-move {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9) rotateY(15deg);
}

.toast-slide-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1) rotateY(0deg);
}

.toast-slide-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1) rotateY(0deg);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9) rotateY(-15deg);
}

/* Floating Animation */
.toast-notification {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Shimmer Effect */
.toast-notification::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
  border-radius: 20px;
  z-index: 1;
}

.toast-notification:hover::before {
  left: 100%;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .toast-container {
    top: 1.5rem;
    right: 1.5rem;
  }
  
  .toast-notification {
    min-width: 350px;
    max-width: 450px;
  }
  
  .toast-body {
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .toast-container {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }

  .toast-notification {
    min-width: auto;
    max-width: none;
    width: 100%;
  }

  .toast-content {
    padding: 1.25rem;
  }

  .toast-title {
    font-size: 1.125rem;
  }

  .toast-body {
    font-size: 0.9rem;
  }

  .toast-icon {
    font-size: 1.25rem;
  }
  
  .toast-icon-wrapper {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .toast-content {
    padding: 1rem;
    gap: 0.75rem;
  }

  .toast-title {
    font-size: 1rem;
  }

  .toast-body {
    font-size: 0.85rem;
  }

  .toast-icon-wrapper {
    width: 36px;
    height: 36px;
  }
  
  .toast-icon {
    font-size: 1.125rem;
  }
}
</style>
