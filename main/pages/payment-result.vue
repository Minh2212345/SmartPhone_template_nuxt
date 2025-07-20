<template>
  <div class="container">
    <div class="result-card">
      <h2>Kết quả thanh toán</h2>
      <p v-if="$route.query.vnp_ResponseCode === '00'" class="success">
        Thanh toán thành công! Đơn hàng #{{ $route.query.vnp_TxnRef }} đã được xác nhận.
      </p>
      <p v-else class="error">
        Thanh toán thất bại. {{ errorMessage($route.query.vnp_ResponseCode) }}
      </p>
      <button class="btn-primary" @click="$router.push('/cart-page')">Quay lại giỏ hàng</button>
    </div>
    <ToastNotification ref="toast" />
  </div>
</template>

<script>
import ToastNotification from '../components/base/ToastNotification.vue'

export default {
  components: {
    ToastNotification
  },
  methods: {
    errorMessage(code) {
      const errorMessages = {
        '00': 'Giao dịch thành công',
        '01': 'Giao dịch chưa hoàn tất',
        '02': 'Giao dịch bị hủy bởi người dùng',
        '07': 'Giao dịch bị nghi ngờ gian lận',
        '09': 'Thẻ/Tài khoản không đủ số dư',
        '10': 'Không thể xác minh thẻ/tài khoản',
        '11': 'Chưa nhập OTP',
        '12': 'Thẻ/Tài khoản bị khóa',
        '13': 'Mã OTP không đúng',
        '24': 'Khách hàng hủy giao dịch',
        '51': 'Tài khoản không đủ số dư',
        '65': 'Giới hạn giao dịch vượt quá',
        '75': 'Ngân hàng từ chối giao dịch',
        '79': 'Sai mã CVV',
        '99': 'Lỗi không xác định'
      }
      return errorMessages[code] || `Mã lỗi: ${code || 'Không xác định'}`;
    }
  },
  mounted() {
    const code = this.$route.query.vnp_ResponseCode || 'Không xác định'
    if (code === '00') {
      this.$refs.toast.addToast({
        type: 'success',
        message: 'Thanh toán thành công! Bạn sẽ nhận được email xác nhận.',
        duration: 5000
      })
    } else {
      this.$refs.toast.addToast({
        type: 'error',
        message: this.errorMessage(code),
        duration: 5000
      })
    }
  }
}
</script>

<style scoped>
.result-card {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.success {
  color: #28a745;
  font-size: 1.2rem;
}

.error {
  color: #dc3545;
  font-size: 1.2rem;
}

.btn-primary {
  padding: 1rem;
  border-radius: 8px;
  background-color: #3a7bd5;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #2a5ca8;
}
</style>

