<template>
  <div class="account-page">
    <!-- User Info Section -->
    <div class="user-info">
      <h1>Someone Name</h1>
      <p class="phone">09****206</p>
    </div>

    <div class="divider"></div>

    <!-- Main Content Area -->
    <div class="content-container">
      <!-- Left Sidebar -->
      <div class="sidebar">
        <NuxtLink to="/" class="section-title"><h3>Trang chủ</h3></NuxtLink>
        <hr />
        <div class="menu-section">
          <ul class="menu-list">
            <li><NuxtLink to="/history-apge" class="light-purchase-btn" style="padding: 5px 5px">Lịch sử mua hàng</NuxtLink></li>
            <li><NuxtLink to="">Tra cứu bảo hành</NuxtLink></li>
            <li><NuxtLink to="/client-page">Tài khoản của bạn</NuxtLink></li>              
            <li class="logout">Thoát tài khoản</li>
          </ul>
        </div>
      </div>

      <!-- Right Content -->
      <div class="main-content">
        <div class="section-headerContent">
          <h3>Tất cả: 1 đơn hàng</h3>
        </div>

        <p class="accumulated-amount">Tổng tiền tích lũy từ 01/01/2024</p>
        <p class="date-range">01/12/2020 - 22/04/2025</p>

        <div class="divider"></div>

        <div class="filter-tabs">
          <span class="active">Tất cả</span>
          <span>Chờ xác nhận</span>
          <span>Đã xác nhận</span>
          <span>Đang vận chuyển</span>
          <span>Đã giao hàng</span>
          <span>Đã huỷ</span>
        </div>

        <div class="order-table">
          <div class="table-row headerContent">
            <div class="table-cell">
              <img src="/assets/images/products/table/product-1.jpg" alt="" />
            </div>
            <div class="table-cell">Iphone 16 / 128Gb / Trắng</div>
            <div class="table-cell"></div>
            <div class="table-cell"></div>
            <div class="table-cell">12/09/2023 14:48</div>
          </div>

          <div class="order-card">
            <div class="order-status delivered">Đã giao hàng</div>
            <div class="order-price">400.000đ</div>
            <button class="view-detail">Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountPage',
  // Có thể thêm data, methods nếu cần
}
</script>

<style scoped>
.light-purchase-btn {
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(153deg, #ffffff, #5b7c99);
  color: #333;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
}

.account-page {
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}

.user-info h1 {
  font-size: 24px;
  margin-bottom: 5px;
}

.phone,
.member-type {
  margin: 5px 0;
  color: #666;
}

.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 15px 0;
}

.content-container {
  display: flex;
  gap: 30px;
}

.sidebar {
  width: 250px;
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
  height: fit-content;
}

.menu-section {
  height: auto;
}

.section-title {
  font-size: 18px;
  margin-bottom: 20px;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  padding: 10px 0;
  cursor: pointer;
  font-size: 14px;
  border-bottom: 1px solid #e0e0e0;
}

.menu-list li:last-child {
  border-bottom: none;
}

.menu-list li.logout {
  color: #f44336;
  margin-top: 15px;
}

.main-content {
  flex: 1;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.section-header h3 {
  margin: 0;
  font-size: 18px;
}

.accumulated-amount,
.date-range {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
}

.filter-tabs {
  display: flex;
  gap: 15px;
  margin: 15px 0;
  flex-wrap: wrap;
}

.filter-tabs span {
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
}

.filter-tabs span.active {
  color: #ff5722;
  font-weight: bold;
  border-bottom: 2px solid #ff5722;
}

.order-table {
  width: 100%;
  margin-top: 20px;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  padding: 10px 0;
}

.table-row.headerContent {
  font-weight: bold;
  border-bottom: 2px solid #e0e0e0;
}

.table-cell {
  flex: 1;
  padding: 5px;
}

.order-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.order-status {
  font-size: 14px;
  padding: 3px 8px;
  border-radius: 4px;
}

.order-status.delivered {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.order-price {
  font-weight: bold;
  color: #ff5722;
}

.view-detail {
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
}

.view-detail:hover {
  background-color: #f5f5f5;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .light-purchase-btn {
    padding: 5px 5px !important;
    font-size: 14px;
  }

  .content-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    margin-bottom: 20px;
  }

  .filter-tabs {
    overflow-x: auto;
    padding-bottom: 10px;
  }

  .table-row,
  .order-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .table-cell {
    width: 100%;
    padding: 5px 0;
  }
}
</style>
