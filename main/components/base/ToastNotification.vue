<template>
  <div class="toast-container">
    <transition-group name="toast-slide" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast-notification"
        :class="`toast-${toast.type}`"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <i :class="toastIcon(toast.type)" class="toast-icon"></i>
          <strong class="toast-title">{{ toastTitle(toast.type) }}</strong>
          <button
            type="button"
            class="btn-close"
            @click="removeToast(toast.id)"
            aria-label="Close"
          >
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
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast-notification {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 400px;
}

.toast-success {
  background-color: #d4f4e2;
  border-left: 4px solid #28a745;
}

.toast-error {
  background-color: #f8d7da;
  border-left: 4px solid #dc3545;
}

.toast-warning {
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
}

.toast-info {
  background-color: #d1ecf1;
  border-left: 4px solid #17a2b8;
}

.toast-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toast-icon {
  margin-right: 10px;
}

.toast-title {
  font-size: 1.4rem;
  font-weight: 600;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #333;
}

.toast-body {
  margin-top: 8px;
  font-size:1.4rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.loading-spinner {
  display: inline-block;
}

/* Transition styles */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.toast-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.toast-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
