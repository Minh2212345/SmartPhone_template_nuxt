import { ref } from '@vue/composition-api'

// Global confirm dialog instance
let confirmDialogRef = null

export const useConfirm = () => {
  const setConfirmRef = (ref) => {
    confirmDialogRef = ref
  }

  const confirm = ({
    type = 'warning',
    title = 'Xác nhận',
    message = 'Bạn có chắc chắn muốn thực hiện hành động này?',
    confirmText = 'Xác nhận',
    cancelText = 'Hủy bỏ',
    closeOnOverlay = true
  } = {}) => {
    return new Promise((resolve, reject) => {
      if (!confirmDialogRef) {
        console.error('ConfirmDialog ref not found. Make sure to register it in your layout.')
        reject(new Error('ConfirmDialog not available'))
        return
      }

      confirmDialogRef.show({
        type,
        title,
        message,
        confirmText,
        cancelText,
        closeOnOverlay,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      })
    })
  }

  // Convenience methods for different types
  const confirmDelete = (message = 'Bạn có chắc chắn muốn xóa? Hành động này không thể hoàn tác.') => {
    return confirm({
      type: 'danger',
      title: 'Xác nhận xóa',
      message,
      confirmText: 'Xóa',
      cancelText: 'Hủy bỏ'
    })
  }

  const confirmSave = (message = 'Bạn có muốn lưu các thay đổi?') => {
    return confirm({
      type: 'success',
      title: 'Lưu thay đổi',
      message,
      confirmText: 'Lưu',
      cancelText: 'Không lưu'
    })
  }

  const confirmLogout = (message = 'Bạn có chắc chắn muốn đăng xuất?') => {
    return confirm({
      type: 'warning',
      title: 'Đăng xuất',
      message,
      confirmText: 'Đăng xuất',
      cancelText: 'Ở lại'
    })
  }

  const confirmAction = (action, message = `Bạn có chắc chắn muốn ${action}?`) => {
    return confirm({
      type: 'info',
      title: 'Xác nhận hành động',
      message,
      confirmText: 'Thực hiện',
      cancelText: 'Hủy bỏ'
    })
  }

  return {
    setConfirmRef,
    confirm,
    confirmDelete,
    confirmSave,
    confirmLogout,
    confirmAction
  }
}
