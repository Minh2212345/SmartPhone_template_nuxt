<template>
  <div class="toast-container">
    <transition-group name="toast-slide" tag="div">
      <div v-for="toast in toasts" :key="toast.id" class="toast-notification" :class="`toast-${toast.type}`"
        role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <i :class="toastIcon(toast.type)" class="toast-icon"></i>
          <strong class="toast-title">{{ toastTitle(toast.type) }}</strong>
          <button type="button" class="btn-close" @click="removeToast(toast.id)" aria-label="Close">
            <i class="bi bi-x"></i>
          </button>
        </div>
        <div class="toast-body">
          {{ toast.message }}
          <div v-if="toast.isLoading" class="loading-spinner">
            <div class="spinner-border spinner-border-sm" role="status">
              <span class="visually-hidden">Đang xử lý...</span>
            </div>
          </div>
        </div>
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

    const addToast = ({ type, message, isLoading = false, duration = 3000 }) => {
      const id = Date.now() + Math.random();
      toasts.value.push({ id, type, message, isLoading });
      if (!isLoading && duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
    };

    const removeToast = (id) => {
      toasts.value = toasts.value.filter((toast) => toast.id !== id);
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
        case 'success': return 'bi bi-check-circle-fill';
        case 'error': return 'bi bi-x-circle-fill';
        case 'warning': return 'bi bi-exclamation-triangle-fill';
        default: return 'bi bi-info-circle-fill';
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

:root {
  --success-color: #28a745;
  --error-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
}

.toast-container {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 90%;
}

.toast-notification {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  min-width: 280px;
  max-width: 360px;
  background: white;
  font-family: 'Inter', sans-serif;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.toast-success {
  border-left: 4px solid var(--success-color);
  background: linear-gradient(to right, #d4f4e2, #ffffff);
}

.toast-error {
  border-left: 4px solid var(--error-color);
  background: linear-gradient(to right, #f8d7da, #ffffff);
}

.toast-warning {
  border-left: 4px solid var(--warning-color);
  background: linear-gradient(to right, #fff3cd, #ffffff);
}

.toast-info {
  border-left: 4px solid var(--info-color);
  background: linear-gradient(to right, #d1ecf1, #ffffff);
}

.toast-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
}

.toast-icon {
  font-size: 1.25rem;
  color: inherit;
  margin-right: 0.75rem;
}

.toast-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  flex-grow: 1;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.25rem;
  transition: color 0.3s ease;
}

.btn-close:hover {
  color: #1f2937;
}

.toast-body {
  font-size: 0.875rem;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  line-height: 1.5;
}

.loading-spinner {
  display: inline-flex;
  align-items: center;
}

.spinner-border {
  color: #6b7280;
}

/* Transition styles */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-slide-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.toast-slide-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

/* Responsive Design */
@media (max-width: 768px) {
  .toast-container {
    top: 1rem;
    right: 1rem;
    max-width: 95%;
  }

  .toast-notification {
    min-width: 240px;
    max-width: 320px;
    padding: 0.75rem;
  }

  .toast-title {
    font-size: 0.875rem;
  }

  .toast-body {
    font-size: 0.75rem;
  }

  .toast-icon {
    font-size: 1rem;
  }
}
</style>
