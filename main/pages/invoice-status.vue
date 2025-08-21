<template>
  <div v-if="order" class="order-details-container">
    <div class="order-header">
      <h1>Chi tiết đơn hàng {{ order.maHoaDon }} - {{ getStatusNameById(order.trangThai) }}</h1>
    </div>

    <!-- Status Timeline -->
    <div class="order-section my-5">
      <div class="timeline-container" :class="{ 'single-status': order.loaiDon === 'trực tiếp' }">
        <div v-for="(status, index) in timelineStatuses" :key="index" class="timeline-step" :class="{
          'completed': status.completed,
          'current': status.current,
          'canceled': status.title === 'Đã hủy'
        }">
          <div class="step-circle">
            <i :class="status.icon"></i>
          </div>
          <div class="step-content">
            <h6 class="step-title">{{ status.title }}</h6>
            <p class="step-time">{{ status.time }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="divider-right">
      <button v-if="canCancelOrder" @click="cancelOrder" class="cancel-btn">Hủy Đơn Hàng</button>
    </div>

    <div class="info-row">
      <div class="info-section recipient">
        <h2>THÔNG TIN NHẬN HÀNG</h2>
        <div class="recipient-info">
          <p><strong>Người nhận:</strong> {{ order.tenKhachHang }} - {{ order.soDienThoaiKhachHang }}</p>
          <p><strong>Địa chỉ:</strong> {{ order.diaChiKhachHang }}</p>
        </div>
      </div>
      <div class="info-section payment">
        <h2>THÔNG TIN THANH TOÁN</h2>
        <div class="payment-method">
          <p><strong>{{ order.loaiDon }}</strong></p>
        </div>
      </div>
    </div>

    <div class="divider-left">
      <strong>THÔNG TIN SẢN PHẨM</strong>
    </div>

    <div v-for="product in order.sanPhamChiTietInfos" :key="product.chiTietSanPhamId" class="product-container">
      <div class="product-info">
        <img :src="product.duongDan" alt="">
        <div class="product-details">
          <p><strong>{{ product.tenSanPham }} {{ product.mauSac }} {{ product.dungLuongRam }}/{{ product.dungLuongBoNhoTrong }}</strong></p>
          <p class="price">{{ formatCurrency(product.giaBan) }}</p>
        </div>
      </div>
      <div class="quantity">
        <p>Số lượng: 1</p>
      </div>
    </div>
  </div>
  <div v-else class="text-center p-8">
    <p>Đang tải thông tin đơn hàng...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OrderDetails',
  data() {
    return {
      order: null,
      statusTimeline: [],
      timelineStatuses: [],
    }
  },
  computed: {
    canCancelOrder() {
      return this.order && this.order.trangThai === 0; // Changed from 1 to 0 based on new mapping
    }
  },
  mounted() {
    const orderId = this.$route.query.orderId;
    if (orderId) {
      this.fetchOrderDetail(orderId);
    }
  },
  methods: {
    async fetchOrderDetail(orderId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/hoa-don/${orderId}/detail`);
        this.order = response.data;
        if (response.data.lichSuHoaDon && Array.isArray(response.data.lichSuHoaDon)) {
          this.statusTimeline = response.data.lichSuHoaDon.sort((a, b) => new Date(a.thoiGian) - new Date(b.thoiGian));
        } else {
          this.statusTimeline = [];
        }
        this.updateTimelineStatuses();
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
        alert('Không thể tải thông tin chi tiết đơn hàng.');
      }
    },
    async cancelOrder() {
      if (!confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
        return;
      }
      try {
        const response = await axios.put(`http://localhost:8080/api/hoa-don/${this.order.id}/cancel`);
        this.order = response.data;
        alert('Đã hủy đơn hàng thành công.');
        this.fetchOrderDetail(this.order.id); // Refresh order details
      } catch (error) {
        console.error('Lỗi khi hủy đơn hàng:', error);
        alert(error.response.data.message || 'Hủy đơn hàng thất bại.');
      }
    },
    mapStatusIdToName(statusId) {
      const statusMap = {
        0: 'Chờ xác nhận',
        1: 'Chờ giao hàng',
        2: 'Đang giao',
        3: 'Hoàn thành',
        4: 'Đã hủy',
      };
      return statusMap[statusId] || 'Không xác định';
    },
    getStatusNameById(statusId) {
        return this.mapStatusIdToName(statusId);
    },
    updateTimelineStatuses() {
      if (!this.order) return;

      if (this.order.loaiDon === 'trực tiếp') {
        this.timelineStatuses = [
          {
            title: 'Hoàn thành',
            time: this.formatDateTime(this.order.ngayTao) || 'Đang chờ',
            icon: 'las la-check-circle',
            completed: true,
            current: true,
          },
        ];
      } else {
        this.timelineStatuses = [
          { title: 'Chờ xác nhận', time: 'Đang chờ', icon: 'las la-hourglass-split', completed: false, current: false },
          { title: 'Chờ giao hàng', time: 'Đang chờ', icon: 'las la-box', completed: false, current: false },
          { title: 'Đang giao', time: 'Đang chờ', icon: 'las la-shipping-fast', completed: false, current: false },
          { title: 'Hoàn thành', time: 'Đang chờ', icon: 'las la-calendar-check', completed: false, current: false },
        ];

        const status = this.mapStatusIdToName(this.order.trangThai);

        if (status === 'Đã hủy') {
          this.timelineStatuses = [
            {
              title: 'Đã hủy',
              time: this.formatDateTime(this.order.ngayTao) || 'Đang chờ',
              icon: 'las la-times-circle',
              completed: false,
              current: true,
            },
          ];
        } else {
            const statusIndex = this.timelineStatuses.findIndex(s => s.title === status);

            this.timelineStatuses.forEach((item, index) => {
                const historyItem = this.statusTimeline.find(h => this.mapStatusIdToName(h.trangThai) === item.title);
                item.time = historyItem ? this.formatDateTime(historyItem.thoiGian) : 'Đang chờ';

                if (index < statusIndex) {
                    item.completed = true;
                    item.current = false;
                } else if (index === statusIndex) {
                    item.completed = true;
                    item.current = true;
                } else {
                    item.completed = false;
                    item.current = false;
                }
            });
        }
      }
    },
    formatDateTime(dateTime) {
      if (!dateTime) return '';
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateTime).toLocaleDateString('vi-VN', options);
    },
    formatCurrency(value) {
      if (!value) return '0 VNĐ';
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }
  }
}
</script>

<style scoped>
/* General Styles */
.order-details-container {
  font-family: Arial, sans-serif;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.order-header h1 {
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.order-section {
  margin-bottom: 20px;
}

/* Timeline Styles from Admin */
.timeline-container {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: flex-start; /* Align items to the start for better text alignment */
  max-width: 100%;
  margin: 0 auto;
}

.timeline-container::before {
  content: '';
  position: absolute;
  top: 35px; /* Adjust position to be in the middle of the circle */
  left: 5%;
  right: 5%;
  height: 4px;
  background: #e0e0e0; /* A neutral background color */
  border-radius: 2px;
  z-index: 1;
}

.timeline-step {
  position: relative;
  text-align: center;
  flex: 1;
  padding: 0 10px;
  z-index: 2;
}

.step-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem; /* Increased icon size */
  z-index: 2;
  margin: 0 auto 1rem;
  transition: all 0.4s ease;
  background: #bdc3c7; /* Default gray */
  color: white;
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.timeline-step.completed .step-circle {
  background: #27ae60; /* Green for completed */
}

.timeline-step.current .step-circle {
  background: #3498db; /* Blue for current */
  transform: scale(1.1);
}

.timeline-step.canceled .step-circle {
  background: #e74c3c; /* Red for canceled */
}

.step-content {
  padding: 0 0.5rem;
}

.step-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #34495e;
}

.step-time {
  font-size: 0.85rem;
  color: #7f8c8d;
  margin-top: 0.25rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .timeline-container {
    flex-direction: column;
    align-items: center;
  }
  .timeline-container::before {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
  }
  .timeline-step {
    margin-bottom: 2rem;
    width: 100%;
  }
}

/* Other existing styles */
.cancel-btn {
  background-color: #ff0000;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.divider-right {
  text-align: right;
  padding: 10px 0;
  border-top: 1px solid #eee;
}

.divider-left {
  text-align: left;
  margin: 20px 0;
  padding: 10px 0;
  border-top: 1px solid #eee;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.info-section.recipient, .info-section.payment {
  width: 48.8%;
  background-color: #f5f5f5;
  border-radius: 15px;
  padding: 10px;
}

.info-section h2 {
  font-size: 16px;
  margin: 5px 0;
}

.recipient-info, .payment-method {
  margin-bottom: 15px;
  line-height: 1.5;
}

.product-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.product-info {
  display: flex;
  align-items: flex-start;
}

.product-info img {
  width: 80px;
  height: auto;
  margin-right: 10px;
}

.product-details {
  display: flex;
  flex-direction: column;
}

.price {
  color: #2289ff;
  font-weight: bold;
}

.quantity {
  color: #666;
}
</style>