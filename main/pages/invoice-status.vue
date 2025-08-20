<template>
  <div v-if="order" class="order-details-container">
    <div class="order-header">
      <h1>Chi tiết đơn hàng {{ order.maHoaDon }} - {{ getStatusNameById(order.trangThai) }}</h1>
    </div>

    <div class="status-timeline">
      <div v-for="(status, index) in orderStatuses" :key="index" class="status-item" :class="{ active: isStatusActive(status.id), current: isCurrentStatus(status.id) }">
        <span><i :class="status.icon"></i></span>
        <span>{{ status.name }}</span>
        <span>{{ getStatusTimestamp(status.id) }}</span>
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
        <p>Số lượng: 1</p> <!-- This seems to be hardcoded, the DTO doesn't have quantity per item -->
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
      orderStatuses: [
        { id: 1, name: 'Chờ xác nhận', icon: 'las la-file-invoice' },
        { id: 2, name: 'Đã xác nhận', icon: 'las la-check-circle' },
        { id: 3, name: 'Chờ vận chuyển', icon: 'las la-box' },
        { id: 4, name: 'Đang vận chuyển', icon: 'las la-shipping-fast' },
        { id: 5, name: 'Đã giao hàng', icon: 'las la-truck' },
        { id: 6, name: 'Đã hủy', icon: 'las la-times-circle' },
        { id: 7, name: 'Yêu cầu hủy', icon: 'las la-undo' },
        { id: 8, name: 'Đã hoàn thành', icon: 'las la-calendar-check' },
      ],
    }
  },
  computed: {
    canCancelOrder() {
      // Only allow cancellation if the order status is 'Chờ xác nhận'
      return this.order && this.order.trangThai === 1;
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
        const response = await axios.put(`http://localhost:8080/api/hoa-don/${this.order.id}/update-status?trangThai=6`);
        this.order = response.data;
        alert('Đã hủy đơn hàng thành công.');
        this.fetchOrderDetail(this.order.id); // Refresh order details
      } catch (error) {
        console.error('Lỗi khi hủy đơn hàng:', error);
        alert('Hủy đơn hàng thất bại.');
      }
    },
    getStatusNameById(statusId) {
      const status = this.orderStatuses.find(s => s.id === statusId);
      return status ? status.name : 'Không xác định';
    },
    getStatusIcon(statusId) {
      const status = this.orderStatuses.find(s => s.id === statusId);
      return status ? status.icon : 'las la-question-circle';
    },
    isStatusActive(statusId) {
      if (!this.order) return false;
      // A status is active if its ID is less than or equal to the current status ID.
      // This makes the timeline linear.
      return statusId <= this.order.trangThai;
    },
    isCurrentStatus(statusId) {
      return this.order && this.order.trangThai === statusId;
    },
    getStatusTimestamp(statusId) {
      const status = this.statusTimeline.find(s => s.trangThai === statusId);
      return status ? this.formatDateTime(status.thoiGian) : '';
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
.order-details-container {
  font-family: Arial, sans-serif;  
  margin: 0 auto;
  padding: 20px;  
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

span i {
  font-size: 32px;
}

.cancel-btn {
  background-color: #ff0000;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;  
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

.order-time h2 {
  font-size: 16px;
  margin-bottom: 5px;
}

.status-timeline {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  position: relative;
}

.status-timeline::before {
  content: '';
  position: absolute;
  top: 15px;
  left: calc(0% + 6px); 
  right: calc(0% + 6px);
  height: 2px;
  background-color: #ddd;
  z-index: 1;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  position: relative;
  flex: 1;
}

.status-item span {  
  padding: 0 10px;
  color: #666;
}

.status-item.active span {
  color: #00ac09;
  font-weight: bold;
}

.status-item.current span {
  color: #2289ff; /* Blue color for current status */
}

.status-item::before {
  content: '';
  width: 12px;
  height: 12px;
  background-color: #ddd;
  border-radius: 50%;
  margin-bottom: 5px;
  z-index: 2;
}

.status-item.active::before {
  background-color: #00ac09;
}

.status-item.current::before {
  background-color: #2289ff; /* Blue color for current status */
}

.status-item.active + .status-item.active::after {
  content: '';
  position: absolute;
  top: 15px;
  left: -50%;
  width: 100%;
  height: 2px;
  background-color: #00ac09;
  z-index: 1;
}

.divider {
  text-align: center;
  margin: 20px 0;
  padding: 10px 0;
  border-top: 1px solid #eee;  
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

.info-section.recipient {
  width: 48.8%;
  background-color: #f5f5f5;
  border-radius: 15px 15px;
  padding: 10px 10px;
}

.info-section.payment {
  width: 48.8%;
  background-color: #f5f5f5;
  border-radius: 15px 15px;
  padding: 10px 10px;
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