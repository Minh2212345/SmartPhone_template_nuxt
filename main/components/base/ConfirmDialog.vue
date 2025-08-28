<template>
  <div v-if="isVisible" class="confirm-overlay" @click="handleOverlayClick">
    <transition name="confirm-modal" appear>
      <div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <div class="confirm-content">
          <div class="confirm-icon-wrapper" :class="`icon-${type}`">
            <i :class="confirmIcon" class="confirm-icon"></i>
          </div>
          <div class="confirm-main">
            <div class="confirm-header">
              <h3 id="confirm-title" class="confirm-title" :class="`title-${type}`">
                {{ title }}
              </h3>
            </div>
            <div class="confirm-body">
              {{ message }}
            </div>
          </div>
        </div>
        <div class="confirm-actions">
          <button 
            class="confirm-btn confirm-btn-cancel" 
            @click="handleCancel"
            :disabled="isLoading"
          >
            <i class="fas fa-times"></i>
            {{ cancelText }}
          </button>
          <button 
            class="confirm-btn confirm-btn-confirm" 
            :class="`btn-${type}`"
            @click="handleConfirm"
            :disabled="isLoading"
          >
            <div v-if="isLoading" class="loading-spinner">
              <div class="modern-spinner"></div>
            </div>
            <i v-else :class="confirmButtonIcon" class="btn-icon"></i>
            {{ confirmText }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed } from '@vue/composition-api';

export default {
  name: 'ConfirmDialog',
  setup() {
    const isVisible = ref(false);
    const isLoading = ref(false);
    const currentConfig = ref({});

    const show = ({ 
      type = 'warning', 
      title = 'Xác nhận', 
      message = 'Bạn có chắc chắn muốn thực hiện hành động này?',
      confirmText = 'Xác nhận',
      cancelText = 'Hủy bỏ',
      onConfirm = () => {},
      onCancel = () => {},
      closeOnOverlay = true
    }) => {
      currentConfig.value = {
        type,
        title,
        message,
        confirmText,
        cancelText,
        onConfirm,
        onCancel,
        closeOnOverlay
      };
      isVisible.value = true;
      isLoading.value = false;
    };

    const hide = () => {
      isVisible.value = false;
      isLoading.value = false;
      currentConfig.value = {};
    };

    const handleConfirm = async () => {
      isLoading.value = true;
      try {
        await currentConfig.value.onConfirm();
        hide();
      } catch (error) {
        isLoading.value = false;
        console.error('Confirm action failed:', error);
      }
    };

    const handleCancel = () => {
      currentConfig.value.onCancel();
      hide();
    };

    const handleOverlayClick = (event) => {
      if (event.target === event.currentTarget && currentConfig.value.closeOnOverlay) {
        handleCancel();
      }
    };

    const type = computed(() => currentConfig.value.type || 'warning');
    const title = computed(() => currentConfig.value.title || 'Xác nhận');
    const message = computed(() => currentConfig.value.message || 'Bạn có chắc chắn muốn thực hiện hành động này?');
    const confirmText = computed(() => currentConfig.value.confirmText || 'Xác nhận');
    const cancelText = computed(() => currentConfig.value.cancelText || 'Hủy bỏ');

    const confirmIcon = computed(() => {
      switch (type.value) {
        case 'success': return 'fas fa-check-circle';
        case 'error': return 'fas fa-times-circle';
        case 'warning': return 'fas fa-exclamation-triangle';
        case 'danger': return 'fas fa-trash-alt';
        case 'info': return 'fas fa-info-circle';
        default: return 'fas fa-question-circle';
      }
    });

    const confirmButtonIcon = computed(() => {
      switch (type.value) {
        case 'success': return 'fas fa-check';
        case 'error': return 'fas fa-times';
        case 'warning': return 'fas fa-exclamation';
        case 'danger': return 'fas fa-trash';
        case 'info': return 'fas fa-info';
        default: return 'fas fa-check';
      }
    });

    return {
      isVisible,
      isLoading,
      show,
      hide,
      handleConfirm,
      handleCancel,
      handleOverlayClick,
      type,
      title,
      message,
      confirmText,
      cancelText,
      confirmIcon,
      confirmButtonIcon
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

:root {
  /* Enhanced Color Palette - Darker & More Vibrant */
  --primary-gradient: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  --success-gradient: linear-gradient(135deg, #059669 0%, #10b981 100%);
  --error-gradient: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
  --warning-gradient: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
  --danger-gradient: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  --info-gradient: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  
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

.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 2rem;
}

.confirm-dialog {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 400px;
  max-width: 500px;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-2xl);
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  transform: translateZ(0);
}

.confirm-content {
  display: flex;
  align-items: flex-start;
  padding: 2rem;
  gap: 1.5rem;
}

.confirm-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.confirm-icon-wrapper::before {
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

.confirm-icon {
  font-size: 2.7rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 2;
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.confirm-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.confirm-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #333333;
  margin: 0;
  letter-spacing: -0.025em;
}

.confirm-body {
  font-size: 1.7rem;
  color: #666666;
  line-height: 1.6;
  font-weight: 500;
}

.confirm-actions {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem 2rem;
  justify-content: flex-end;
}

.confirm-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 120px;
  position: relative;
  overflow: hidden;
}

.confirm-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.confirm-btn-cancel {
  background: rgba(108, 117, 125, 0.1);
  color: #6c757d;
  border: 1px solid rgba(108, 117, 125, 0.2);
}

.confirm-btn-cancel:hover:not(:disabled) {
  background: rgba(108, 117, 125, 0.15);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.confirm-btn-confirm {
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  position: relative;
}

.confirm-btn-confirm::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
  border-radius: 12px;
}

.confirm-btn-confirm:hover:not(:disabled)::before {
  left: 100%;
}

.confirm-btn-confirm:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  filter: brightness(1.1) saturate(1.2);
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modern-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Type-specific styles */
.icon-success {
  background: #13ad75;
}

.icon-success::before {
  background: #13ad75;
}

.btn-success {
  background: var(--success-gradient);
}

.title-success {
  color: #13ad75;
}

.icon-error {
  background: #dc2626;
}

.icon-error::before {
  background: #dc2626;
}

.btn-error {
  background: var(--error-gradient);
}

.title-error {
  color: #dc2626;
}

.icon-warning {
  background: #f59e0b;
}

.icon-warning::before {
  background: #f59e0b;
}

.btn-warning {
  background: var(--warning-gradient);
}

.title-warning {
  color: #f093fb;
}

.icon-danger {
  background: #dc2626;
}

.icon-danger::before {
  background: #dc2626;
}

.title-danger {
  color: #dc2626;
}

.icon-info {
  background: #4facfe;
}

.icon-info::before {
  background: #4facfe;
}

.btn-info {
  background: var(--info-gradient);
}

.title-info {
  color: #4facfe;
}

/* Modal transitions */
.confirm-modal-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.confirm-modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.confirm-modal-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(-50px);
}

.confirm-modal-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.confirm-modal-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.confirm-modal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .confirm-overlay {
    padding: 1rem;
  }
  
  .confirm-dialog {
    min-width: auto;
    max-width: none;
    width: 100%;
  }
  
  .confirm-content {
    padding: 1.5rem;
    gap: 1rem;
  }
  
  .confirm-icon-wrapper {
    width: 56px;
    height: 56px;
  }
  
  .confirm-icon {
    font-size: 2.75rem;
  }
  
  .confirm-title {
    font-size: 2.25rem;
  }
  
  .confirm-body {
    font-size: 1.9rem;
  }
  
  .confirm-actions {
    padding: 1rem 1.5rem 1.5rem;
    flex-direction: column-reverse;
  }
  
  .confirm-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .confirm-content {
    padding: 1.25rem;
    flex-direction: column;
    text-align: center;
  }
  
  .confirm-icon-wrapper {
    align-self: center;
    width: 48px;
    height: 48px;
  }
  
  .confirm-icon {
    font-size: 2.5rem;
  }
  
  .confirm-title {
    font-size: 2.125rem;
  }
  
  .confirm-body {
    font-size: 1.85rem;
  }
}
</style>
