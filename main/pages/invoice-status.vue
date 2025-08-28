<template>
  <div class="min-h-screen" style="background: linear-gradient(135deg, #e6f3ff 0%, #e6f9f0 100%);">
    <!-- Enhanced Breadcrumb Navigation -->
    <div class="container mx-auto px-6 py-4 max-w-8xl">
      <nav class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-lg rounded-2xl px-6 py-4 mb-2">
        <div class="flex items-center gap-3 text-2xl">
          <NuxtLink to="/" class="text-gray-500 hover:text-[#13ad75] transition-colors duration-200">
            <i class="las la-home"></i>
            Trang chủ
          </NuxtLink>
          <i class="las la-chevron-right text-gray-400"></i>
          <NuxtLink to="/order-page" class="text-gray-500 hover:text-[#13ad75] transition-colors duration-200">
            Đơn hàng
          </NuxtLink>
          <i class="las la-chevron-right text-gray-400"></i>
          <span class="text-[#13ad75] font-medium">Chi tiết đơn hàng</span>
        </div>
      </nav>
    </div>

    <div v-if="order" class="container mx-auto px-6 pb-8 max-w-8xl">
      <!-- Enhanced Order Header -->
      <header class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 mb-2 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-[#13ad75]/10 to-[#13ad75]/15"></div>
        <div class="relative">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-6">
              <div class="w-16 h-16 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-2xl flex items-center justify-center shadow-lg">
                <i class="las la-receipt text-3xl text-white"></i>
              </div>
              <div>
                <h1 class="text-5xl font-bold text-gray-900 mb-1">Chi tiết đơn hàng #{{ order.maHoaDon }}</h1>
                <p class="text-2xl text-gray-600">Theo dõi trạng thái và thông tin đơn hàng của bạn</p>
              </div>
            </div>
            <div class="text-right">
              <div class="inline-flex items-center px-6 py-3 rounded-2xl text-2xl font-medium border-2"
                   :class="getStatusClass(order.trangThai)">
                <i :class="getStatusIcon(order.trangThai)" class="mr-3 text-2xl"></i>
                {{ getStatusNameById(order.trangThai) }}
              </div>
            </div>
          </div>
          
          <!-- Order Info Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/70 transition-all duration-300">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#13ad75]/20 rounded-xl flex items-center justify-center">
                  <i class="las la-calendar text-2xl text-[#13ad75]"></i>
                </div>
                <div>
                  <p class="text-xl text-gray-600">Ngày đặt hàng</p>
                  <p class="text-2xl font-semibold text-gray-900">{{ formatDate(order.ngayTao) }}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/70 transition-all duration-300">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#13ad75]/20 rounded-xl flex items-center justify-center">
                  <i class="las la-credit-card text-2xl text-[#13ad75]"></i>
                </div>
                <div>
                  <p class="text-xl text-gray-600">Phương thức</p>
                  <p class="text-2xl font-semibold text-gray-900">{{ order.loaiDon }}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/70 transition-all duration-300">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-[#13ad75]/20 rounded-xl flex items-center justify-center">
                  <i class="las la-money-bill text-2xl text-[#13ad75]"></i>
                </div>
                <div>
                  <p class="text-xl text-gray-600">Tổng tiền</p>
                  <p class="text-2xl font-semibold text-[#13ad75]">{{ formatCurrency(order.tongTienSauGiam) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Enhanced Status Timeline -->
      <div class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 mb-2 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-[#13ad75]/5 to-[#13ad75]/10"></div>
        <div class="relative">
          <div class="flex items-center gap-4 mb-2">
            <div class="w-12 h-12 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-xl flex items-center justify-center">
              <i class="las la-route text-2xl text-white"></i>
            </div>
            <div>
              <h2 class="text-4xl font-bold text-gray-900">Trạng thái đơn hàng</h2>
              <p class="text-2xl text-gray-600 mt-1">Theo dõi tiến trình xử lý đơn hàng của bạn</p>
            </div>
          </div>
          
          <div class="modern-status-timeline" :class="{ 'single-status': order.loaiDon === 'trực tiếp' }">
            <div v-for="(status, index) in timelineStatuses" :key="index" 
                 class="status-item" 
                 :class="{
                   'status-completed': status.completed && !status.canceled && status.title !== 'Đã hủy',
                   'status-current': status.current && !status.canceled && status.title !== 'Đã hủy',
                   'status-pending': !status.completed && !status.current && !status.canceled && status.title !== 'Đã hủy',
                   'status-canceled': status.canceled || status.title === 'Đã hủy' || order.trangThai === 4
                 }">
              <div class="status-circle">
                <div class="status-icon-wrapper">
                  <i :class="status.icon" class="status-icon"></i>
                </div>
                <div class="status-pulse"></div>
                <div class="status-glow"></div>
              </div>
              <div class="status-content">
                <h3 class="status-title">{{ status.title }}</h3>
                <p class="status-time">{{ status.time }}</p>
                <div class="status-description">{{ getStatusDescription(status.title) }}</div>
              </div>
              <div v-if="index < timelineStatuses.length - 1" class="status-connector"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cancel Order Button - Moved to bottom -->
      <div v-if="canCancelOrder" class="mb-2">
        <div class="bg-white/90 backdrop-blur-xl border border-red-200/50 shadow-xl rounded-3xl p-8 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-red-50/50 to-red-100/30"></div>
          <div class="relative">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <i class="las la-exclamation-triangle text-2xl text-white"></i>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">Hủy đơn hàng</h3>
                  <p class="text-lg text-gray-600">Bạn có thể hủy đơn hàng này khi chưa được xác nhận</p>
                </div>
              </div>
              <button @click="cancelOrder" 
                      class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-2xl hover:from-red-700 hover:to-red-900 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-xl border border-red-500/40 hover:brightness-110 hover:saturate-125">
                <i class="las la-times mr-3 text-xl"></i>
                Hủy đơn hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Information Sections -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-2">
        <!-- Recipient Information -->
        <div class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-[#13ad75]/5 to-[#13ad75]/10"></div>
          <div class="relative">
            <div class="flex items-center gap-4 mb-2">
              <div class="w-12 h-12 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-xl flex items-center justify-center">
                <i class="las la-user text-2xl text-white"></i>
              </div>
              <h2 class="text-3xl font-bold text-gray-900">Thông tin nhận hàng</h2>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                <i class="las la-user-circle text-2xl text-[#13ad75]"></i>
                <div>
                  <p class="text-xl text-gray-600">Người nhận</p>
                  <p class="text-2xl font-semibold text-gray-900">{{ order.tenKhachHang }}</p>
                </div>
              </div>
              
              <div class="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                <i class="las la-phone text-2xl text-[#13ad75]"></i>
                <div>
                  <p class="text-xl text-gray-600">Số điện thoại</p>
                  <p class="text-2xl font-semibold text-gray-900">{{ order.soDienThoaiKhachHang }}</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                <i class="las la-map-marker-alt text-2xl text-[#13ad75] mt-1"></i>
                <div>
                  <p class="text-xl text-gray-600">Địa chỉ giao hàng</p>
                  <p class="text-2xl font-semibold text-gray-900 leading-relaxed">{{ order.diaChiKhachHang }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Information -->
        <div class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-[#13ad75]/5 to-[#13ad75]/10"></div>
          <div class="relative">
            <div class="flex items-center gap-4 mb-2">
              <div class="w-12 h-12 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-xl flex items-center justify-center">
                <i class="las la-credit-card text-2xl text-white"></i>
              </div>
              <h2 class="text-3xl font-bold text-gray-900">Thông tin thanh toán</h2>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                <i class="las la-money-check text-2xl text-[#13ad75]"></i>
                <div>
                  <p class="text-xl text-gray-600">Phương thức thanh toán</p>
                  <p class="text-2xl font-semibold text-gray-900">{{ order.loaiDon }}</p>
                </div>
              </div>
              
              <div class="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
                <i class="las la-calculator text-2xl text-[#13ad75]"></i>
                <div>
                  <p class="text-xl text-gray-600">Tổng tiền thanh toán</p>
                  <p class="text-3xl font-bold text-[#13ad75]">{{ formatCurrency(order.tongTienSauGiam) }}</p>
                </div>
              </div>
              
              <div class="p-4 bg-[#13ad75]/10 border border-[#13ad75]/30 rounded-2xl">
                <div class="flex items-center gap-3">
                  <i class="las la-info-circle text-[#13ad75] text-2xl"></i>
                  <div>
                    <p class="text-xl font-medium text-gray-800">Trạng thái thanh toán</p>
                    <p class="text-2xl text-gray-600">{{ getPaymentStatus(order.trangThai) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Information -->
      <div class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-[#13ad75]/5 to-[#13ad75]/10"></div>
        <div class="relative">
          <div class="flex items-center gap-4 mb-2">
            <div class="w-12 h-12 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-xl flex items-center justify-center">
              <i class="las la-box text-2xl text-white"></i>
            </div>
            <div>
              <h2 class="text-4xl font-bold text-gray-900">Thông tin sản phẩm</h2>
              <p class="text-2xl text-gray-600">{{ order.sanPhamChiTietInfos.length }} sản phẩm trong đơn hàng</p>
            </div>
          </div>
          
          <div class="space-y-6">
            <div v-for="product in order.sanPhamChiTietInfos" :key="product.chiTietSanPhamId" 
                 class="bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:bg-white/70 transition-all duration-300 hover:shadow-lg">
              <div class="flex items-start gap-6">
                <div class="relative">
                  <img :src="product.duongDan" :alt="product.tenSanPham" 
                       class="w-24 h-24 object-contain rounded-2xl bg-white p-2 shadow-md" />
                  <div class="absolute -top-2 -right-2 bg-[#13ad75] text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                </div>
                
                <div class="flex-1">
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ product.tenSanPham }}</h3>
                  
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
                    <div class="flex items-center gap-2 p-3 bg-white/60 rounded-xl border border-white/30">
                      <i class="las la-palette text-[#13ad75]"></i>
                      <div>
                        <p class="text-lg text-gray-600">Màu sắc</p>
                        <p class="text-xl font-semibold">{{ product.mauSac }}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-2 p-3 bg-white/60 rounded-xl border border-white/30">
                      <i class="las la-memory text-[#13ad75]"></i>
                      <div>
                        <p class="text-lg text-gray-600">RAM</p>
                        <p class="text-xl font-semibold">{{ product.dungLuongRam }}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-2 p-3 bg-white/60 rounded-xl border border-white/30">
                      <i class="las la-hdd text-[#13ad75]"></i>
                      <div>
                        <p class="text-lg text-gray-600">Bộ nhớ</p>
                        <p class="text-xl font-semibold">{{ product.dungLuongBoNhoTrong }}</p>
                      </div>
                    </div>
                    
                    <div class="flex items-center gap-2 p-3 bg-white/60 rounded-xl border border-white/30">
                      <i class="las la-tag text-[#13ad75]"></i>
                      <div>
                        <p class="text-lg text-gray-600">Số lượng</p>
                        <p class="text-xl font-semibold">1</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="text-2xl text-gray-600">Giá:</span>
                      <span class="text-3xl font-bold text-[#13ad75]">{{ formatCurrency(product.giaBan) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    
    <!-- Loading State -->
    <div v-else class="container mx-auto px-6 py-16 max-w-8xl">
      <div class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-16 text-center">
        <div class="w-16 h-16 bg-gradient-to-br from-[#13ad75] to-[#13ad75] rounded-2xl flex items-center justify-center mx-auto mb-2 animate-pulse">
          <i class="las la-spinner la-spin text-3xl text-white"></i>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Đang tải thông tin đơn hàng...</h2>
        <p class="text-2xl text-gray-600">Vui lòng chờ trong giây lát</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useConfirm } from '~/composables/useConfirm';

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
        this.$root.$toast.addToast({
          type: 'error',
          message: 'Không thể tải thông tin chi tiết đơn hàng.'
        });
      }
    },
    getStatusClass(statusId) {
      const classes = {
        0: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        1: 'bg-blue-100 text-blue-800 border-blue-300',
        2: 'bg-purple-100 text-purple-800 border-purple-300',
        3: 'bg-green-100 text-green-800 border-green-300',
        4: 'bg-red-100 text-red-800 border-red-300'
      };
      return classes[statusId] || 'bg-gray-100 text-gray-800 border-gray-300';
    },
    getStatusIcon(statusId) {
      const icons = {
        0: 'las la-clock',
        1: 'las la-box',
        2: 'las la-shipping-fast',
        3: 'las la-check-circle',
        4: 'las la-times-circle'
      };
      return icons[statusId] || 'las la-question-circle';
    },
    getPaymentStatus(statusId) {
      if (statusId === 3) return 'Đã thanh toán';
      if (statusId === 4) return 'Đã hủy';
      return 'Chưa thanh toán';
    },
    formatDate(dateTime) {
      if (!dateTime) return '';
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateTime).toLocaleDateString('vi-VN', options);
    },
    getTimelineProgressStyle() {
      if (!this.timelineStatuses.length) return {};
      
      // Tính phần trăm progress dựa trên số bước completed
      const completedSteps = this.timelineStatuses.filter(status => status.completed).length;
      const totalSteps = this.timelineStatuses.length;
      const progressPercent = totalSteps > 1 ? ((completedSteps - 1) / (totalSteps - 1)) * 100 : 100;
      
      // Nếu đơn hàng bị hủy, dùng màu đỏ
      if (this.order && this.order.trangThai === 4) {
        return {
          '--progress-width': '100%',
          '--progress-color': '#ef4444'
        };
      }
      
      return {
        '--progress-width': `${Math.max(0, Math.min(100, progressPercent))}%`,
        '--progress-color': '#13ad75'
      };
    },
    async cancelOrder() {
      const { confirm } = useConfirm();
      
      try {
        const confirmed = await confirm({
          type: 'danger',
          title: 'Xác nhận hủy đơn hàng',
          message: 'Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này không thể hoàn tác.',
          confirmText: 'Hủy đơn hàng',
          cancelText: 'Giữ đơn hàng'
        });

        if (!confirmed) return;

        const response = await axios.put(`http://localhost:8080/api/hoa-don/${this.order.id}/cancel`);
        this.order = response.data;
        
        // Show success toast
        this.$root.$toast.addToast({
          type: 'success',
          message: 'Đã hủy đơn hàng thành công. Đang chuyển về trang chủ...'
        });
        
        // Redirect to home page after 1.5 seconds
        setTimeout(() => {
          this.$router.push('/');
        }, 1500);
      } catch (error) {
        console.error('Lỗi khi hủy đơn hàng:', error);
        
        // Show error toast
        this.$root.$toast.addToast({
          type: 'error',
          message: error.response?.data?.message || 'Hủy đơn hàng thất bại.'
        });
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
    getStatusDescription(statusTitle) {
      const descriptions = {
        'Chờ xác nhận': 'Đơn hàng đang chờ được xác nhận từ cửa hàng',
        'Chờ giao hàng': 'Đơn hàng đã được xác nhận và đang chuẩn bị giao',
        'Đang giao': 'Đơn hàng đang trên đường giao đến bạn',
        'Hoàn thành': 'Đơn hàng đã được giao thành công',
        'Đã hủy': 'Đơn hàng đã được hủy theo yêu cầu'
      };
      return descriptions[statusTitle] || '';
    },
    updateTimelineStatuses() {
      if (!this.order) return;

      const currentStatusName = this.mapStatusIdToName(this.order.trangThai);

      // If the order is explicitly cancelled (trangThai === 4) or if the mapped name is "Đã hủy"
      // (which implies a backend issue where 3 is sent for cancelled orders)
      if (this.order.trangThai === 4 || currentStatusName === 'Đã hủy') {
        this.timelineStatuses = [
          {
            title: 'Đã hủy',
            time: this.formatDate(this.order.ngayTao) || 'Đang chờ',
            icon: 'las la-times-circle',
            completed: true,
            current: true,
            canceled: true,
          },
        ];
        return;
      }

      if (this.order.loaiDon === 'trực tiếp') {
        this.timelineStatuses = [
          {
            title: 'Hoàn thành',
            time: this.formatDate(this.order.ngayTao) || 'Đang chờ',
            icon: 'las la-check-circle',
            completed: true,
            current: true,
          },
        ];
      } else {
        this.timelineStatuses = [
          { title: 'Chờ xác nhận', time: 'Đang chờ', icon: 'las la-exclamation-circle', completed: false, current: false },
          { title: 'Chờ giao hàng', time: 'Đang chờ', icon: 'las la-box', completed: false, current: false },
          { title: 'Đang giao', time: 'Đang chờ', icon: 'las la-shipping-fast', completed: false, current: false },
          { title: 'Hoàn thành', time: 'Đang chờ', icon: 'las la-calendar-check', completed: false, current: false },
        ];

        // Workaround: If backend sends 3 for cancelled orders, force display as "Đã hủy"
        if (this.order.trangThai === 3 && Array.isArray(this.order.lichSuHoaDon) && this.order.lichSuHoaDon.some(item => item.hanhDong.includes('Hủy đơn hàng'))) {
            this.timelineStatuses = [
                {
                    title: 'Đã hủy',
                    time: this.formatDate(this.order.ngayTao) || 'Đang chờ',
                    icon: 'las la-times-circle',
                    completed: true,
                    current: true,
                    canceled: true,
                },
            ];
            return;
        }

        const status = this.mapStatusIdToName(this.order.trangThai);
        const statusIndex = this.timelineStatuses.findIndex(s => s.title === status);

        this.timelineStatuses.forEach((item, index) => {
            const historyItem = this.statusTimeline.find(h => this.mapStatusIdToName(h.trangThai) === item.title);
            item.time = historyItem ? this.formatDate(historyItem.thoiGian) : 'Đang chờ';

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
/* CSS Custom Properties */
:root {
  --primary-color: #13ad75;
  --primary-light: #13ad75;
  --primary-dark: #0f8a5f;
  --secondary-color: #002c69;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  --info-color: #3b82f6;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Modern Status Timeline */
.modern-status-timeline {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 100%;
  margin: 0 auto;
  padding: 3rem 0;
  gap: 2rem;
}

/* Status Item */
.status-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  padding: 1rem;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Status Connector */
.status-connector {
  position: absolute;
  top: 3rem;
  right: -2rem;
  width: 4rem;
  height: 4px;
  background: linear-gradient(90deg, 
    rgba(200, 200, 200, 0.3) 0%, 
    rgba(200, 200, 200, 0.5) 100%);
  border-radius: 2px;
  z-index: 1;
}

.status-item.status-completed .status-connector {
  background: linear-gradient(90deg, 
    #10b981 0%, 
    #13ad75 100%);
  box-shadow: 0 0 8px rgba(19, 173, 117, 0.3);
}

.status-item.status-current .status-connector {
  background: linear-gradient(90deg, 
    #10b981 50%, 
    rgba(200, 200, 200, 0.5) 100%);
  box-shadow: 0 0 8px rgba(19, 173, 117, 0.3);
}


/* Status Circle */
.status-circle {
  position: relative;
  width: 6rem;
  height: 6rem;
  margin-bottom: 1.5rem;
  z-index: 4;
}

.status-icon-wrapper {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  border: 4px solid white;
  box-shadow: var(--shadow-xl);
  backdrop-filter: blur(10px);
}

.status-icon {
  font-size: 2rem;
  transition: all 0.4s ease;
}

/* Status Pulse Effect */
.status-pulse {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  animation: statusPulse 2s ease-in-out infinite;
}

/* Status Glow Effect */
.status-glow {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border-radius: 50%;
  z-index: 0;
  opacity: 0;
  animation: statusGlow 3s ease-in-out infinite;
}

/* Status States - Color-coded */

/* Pending Status - Gray */
.status-item.status-pending .status-icon-wrapper {
  background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
  color: white;
}

.status-item.status-pending .status-pulse {
  background: radial-gradient(circle, rgba(156, 163, 175, 0.3) 0%, transparent 70%);
}

.status-item.status-pending .status-glow {
  background: linear-gradient(45deg, transparent 0%, rgba(156, 163, 175, 0.2) 25%, transparent 50%, rgba(156, 163, 175, 0.2) 75%, transparent 100%);
}

/* Completed Status - Green */
.status-item.status-completed .status-icon-wrapper {
  background: linear-gradient(135deg, #10b981 0%, #13ad75 100%);
  color: white;
  transform: scale(1.05);
  box-shadow: var(--shadow-xl), 0 0 20px rgba(19, 173, 117, 0.4);
}

.status-item.status-completed .status-pulse {
  background: radial-gradient(circle, rgba(19, 173, 117, 0.4) 0%, transparent 70%);
  opacity: 1;
}

.status-item.status-completed .status-glow {
  background: linear-gradient(45deg, transparent 0%, rgba(19, 173, 117, 0.3) 25%, transparent 50%, rgba(19, 173, 117, 0.3) 75%, transparent 100%);
  opacity: 1;
}

/* Current Status - Blue */
.status-item.status-current .status-icon-wrapper {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  transform: scale(1.15);
  box-shadow: var(--shadow-2xl), 0 0 30px rgba(59, 130, 246, 0.6);
  animation: currentGlow 2s ease-in-out infinite alternate;
}

.status-item.status-current .status-pulse {
  background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
  opacity: 1;
  animation: statusPulse 1.5s ease-in-out infinite;
}

.status-item.status-current .status-glow {
  background: linear-gradient(45deg, transparent 0%, rgba(59, 130, 246, 0.3) 25%, transparent 50%, rgba(59, 130, 246, 0.3) 75%, transparent 100%);
  opacity: 1;
  animation: statusGlow 2s ease-in-out infinite;
}

/* Canceled Status - Red */
.status-item.status-canceled .status-icon-wrapper {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  transform: scale(1.05);
  box-shadow: var(--shadow-xl), 0 0 20px rgba(239, 68, 68, 0.4);
}

.status-item.status-canceled .status-pulse {
  background: radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%);
  opacity: 1;
}

.status-item.status-canceled .status-glow {
  background: linear-gradient(45deg, transparent 0%, rgba(239, 68, 68, 0.3) 25%, transparent 50%, rgba(239, 68, 68, 0.3) 75%, transparent 100%);
  opacity: 1;
}

/* Status Content */
.status-content {
  padding: 0 0.5rem;
  transition: all 0.4s ease;
}

.status-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--gray-800);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: all 0.4s ease;
}

.status-time {
  font-size: 1.1rem;
  color: var(--gray-600);
  margin: 0 0 0.5rem 0;
  font-weight: 500;
  transition: all 0.4s ease;
}

.status-description {
  font-size: 0.95rem;
  color: var(--gray-500);
  margin: 0;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
  max-width: 200px;
}

/* Enhanced States for Content */
.status-item.status-completed .status-title {
  color: var(--primary-color);
  text-shadow: 0 1px 2px rgba(19, 173, 117, 0.2);
}

.status-item.status-current .status-title {
  color: var(--info-color);
  transform: scale(1.05);
  text-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

.status-item.status-canceled .status-title {
  color: var(--danger-color);
  text-shadow: 0 1px 2px rgba(239, 68, 68, 0.2);
}

.status-item.status-completed .status-time,
.status-item.status-current .status-time {
  color: var(--gray-700);
  font-weight: 600;
}

/* Single Status Layout */
.modern-status-timeline.single-status {
  justify-content: center;
}

.modern-status-timeline.single-status .status-item {
  max-width: 300px;
}

/* Keyframe Animations */
@keyframes statusPulse {
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.4;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes statusGlow {
  0% {
    transform: rotate(0deg);
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: rotate(360deg);
    opacity: 0.3;
  }
}

@keyframes currentGlow {
  0% {
    box-shadow: var(--shadow-2xl), 0 0 20px rgba(59, 130, 246, 0.4);
  }
  100% {
    box-shadow: var(--shadow-2xl), 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Hover Effects */
.status-item:hover .status-icon-wrapper {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

.status-item.status-completed:hover .status-icon-wrapper,
.status-item.status-current:hover .status-icon-wrapper {
  animation: float 2s ease-in-out infinite;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .modern-status-timeline {
    padding: 2rem 0;
    gap: 1.5rem;
  }
  
  .status-circle {
    width: 5rem;
    height: 5rem;
  }
  
  .status-title {
    font-size: 1.25rem;
  }
  
  .status-time {
    font-size: 1rem;
  }
  
  .status-description {
    font-size: 0.875rem;
  }
}

@media (max-width: 768px) {
  .modern-status-timeline {
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    gap: 2rem;
  }
  
  .status-item {
    margin-bottom: 2rem;
    width: 100%;
    max-width: 350px;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 1.5rem;
    box-shadow: var(--shadow-lg);
  }
  
  .status-circle {
    margin: 0 2rem 0 0;
    flex-shrink: 0;
  }
  
  .status-content {
    flex: 1;
    padding: 0;
  }
  
  .status-title {
    text-align: left;
    margin-bottom: 0.5rem;
  }
  
  .status-time {
    text-align: left;
  }
  
  .status-description {
    text-align: left;
    max-width: none;
  }
  
  .status-connector {
    display: none;
  }
}

@media (max-width: 480px) {
  .status-circle {
    width: 4rem;
    height: 4rem;
    margin-right: 1.5rem;
  }
  
  .timeline-title {
    font-size: 1rem;
  }
  
  .timeline-time {
    font-size: 0.8rem;
  }
}

/* Enhanced Glassmorphism Effects */
.bg-white\/90 {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.backdrop-blur-xl {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* Enhanced Shadow System */
.shadow-xl {
  box-shadow: var(--shadow-xl);
}

.shadow-lg {
  box-shadow: var(--shadow-lg);
}

.shadow-md {
  box-shadow: var(--shadow-md);
}

/* Enhanced Hover Effects */
.hover\:shadow-xl:hover {
  box-shadow: var(--shadow-xl);
}

.hover\:shadow-lg:hover {
  box-shadow: var(--shadow-lg);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Enhanced Transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.duration-200 {
  transition-duration: 200ms;
}

.duration-300 {
  transition-duration: 300ms;
}

/* Enhanced Typography */
.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

/* Enhanced Colors */
.text-\[#13ad75\] {
  color: var(--primary-color);
}

.bg-\[#13ad75\] {
  background-color: var(--primary-color);
}

.border-\[#13ad75\]\/30 {
  border-color: rgba(19, 173, 117, 0.3);
}

.bg-\[#13ad75\]\/10 {
  background-color: rgba(19, 173, 117, 0.1);
}

.bg-\[#13ad75\]\/20 {
  background-color: rgba(19, 173, 117, 0.2);
}
</style>