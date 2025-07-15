<template>
  <div class="order-details-container">
    <div class="order-header">
      <h1>Chi tiết đơn hàng DH123456 - Đặt Hàng Thành Công</h1>
    </div>

    <div class="order-section">
      <div class="order-time">
        <h2>Đơn hàng đã đặt</h2>        
      </div>
    </div>

    <div class="status-timeline">
      <div class="status-item active">
        <span><i class="las la-file-invoice"></i></span>
        <span>Đơn hàng đã đặt</span>
        <span>15:32 01-7-2024</span>
      </div>
      <div class="status-item active">
        <span><i class="las la-mail-bulk"></i></span>
        <span>Chờ xác nhận</span>
      </div>
      <div class="status-item">
        <span><i class="las la-box"></i></span>
        <span>Chờ giao hàng</span>
      </div>
      <div class="status-item">
        <span><i class="las la-shipping-fast"></i></span>
        <span>Vận chuyển</span>
      </div>
      <div class="status-item">
        <span><i class="las la-calendar-check"></i></span>
        <span>Hoàn thành</span>
      </div>
    </div>

    <div class="divider-right">
      <button class="cancel-btn">Hủy Đơn Hàng</button>
    </div>

    <div class="info-row">
      <div class="info-section recipient">
        <h2>THÔNG TIN NHẬN HÀNG</h2>
        <div class="recipient-info">
          <p><strong>Người nhận:</strong> Nguyễn Phùng Dũng - 0395561234</p>
          <p><strong>Địa chỉ:</strong> Hoàng Quốc Việt, Phường Cố Nhuế 1, Quận Bắc Tú Liêm, Hà Nội</p>
        </div>
      </div>
      <div class="info-section payment">
        <h2>THÔNG TIN THANH TOÁN</h2>
        <div class="payment-method">
          <p><strong>Thanh toán online</strong></p>
        </div>
      </div>
    </div>

    <div class="divider-left">
      <strong>THÔNG TIN SẢN PHẨM</strong>
    </div>

    <div class="product-container">
      <div class="product-info">
        <img src="assets/images/products/table/product-1.jpg" alt="">
        <div class="product-details">
          <p><strong>Iphone 16 Trắng 128GB</strong></p>
          <p class="price">19.190.000 đ</p>
        </div>
      </div>
      <div class="quantity">
        <p>Số lượng: 1</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetails',
  data() {
    return {}
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