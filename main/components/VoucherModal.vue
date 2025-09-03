<template>
  <div v-if="visible" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-8 max-w-2xl w-full mx-4 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-[#13ad75]/5 to-[#13ad75]/10"></div>
      <div class="relative">
        <div class="flex justify-between items-center mb-4">
          <h5 class="text-3xl font-bold text-gray-900">Chọn phiếu giảm giá</h5>
          <button class="w-10 h-10 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 flex items-center justify-center text-gray-600 hover:text-[#13ad75] hover:bg-white/80 transition-all duration-300" @click="closeModal">
            <i class="las la-times text-xl"></i>
          </button>
        </div>
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 mb-4 max-h-96 overflow-y-auto">
          <div v-if="loading" class="text-center">
            <i class="las la-spinner la-spin text-4xl text-[#13ad75]"></i>
            <p class="text-xl text-gray-600 mt-2">Đang tải danh sách phiếu giảm giá...</p>
          </div>
          <div v-else-if="vouchers.length === 0" class="text-center">
            <p class="text-xl text-gray-600">Không có phiếu giảm giá nào phù hợp.</p>
          </div>
          <div v-else class="space-y-4">
            <div v-for="voucher in vouchers" :key="voucher.id" class="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/30 cursor-pointer hover:bg-white/90 hover:shadow-lg transition-all duration-300" @click="selectVoucher(voucher.ma)">
              <div class="flex justify-between items-center">
                <div>
                  <h4 class="text-2xl font-semibold text-gray-900">{{ voucher.tenPhieuGiamGia }}</h4>
                  <p class="text-lg text-gray-600">{{ voucher.moTa }}</p>
                  <p class="text-lg text-gray-600">Hóa đơn tối thiểu: {{ voucher.hoaDonToiThieu.toLocaleString('vi-VN') }} ₫</p>
                  <p class="text-lg text-gray-600">Ngày kết thúc: {{ new Date(voucher.ngayKetThuc).toLocaleDateString('vi-VN') }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xl font-bold text-[#13ad75]">{{ formatDiscount(voucher) }}</p>
                  <button class="mt-2 inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#13ad75] to-[#13ad75] text-white rounded-xl hover:from-[#0f8a5f] hover:to-[#0f8a5f] transition-all duration-300 font-medium shadow-md hover:shadow-lg text-lg">
                    Chọn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <button class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-2xl hover:from-gray-600 hover:to-gray-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-xl" @click="closeModal">
            <i class="las la-times mr-3"></i>Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    customerId: {
      type: [String, Number],
      required: false,
      default: null,
    },
  },
  data() {
    return {
      vouchers: [],
      loading: false,
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.fetchVouchers();
      }
    },
  },
  methods: {
    async fetchVouchers() {
      this.loading = true;
      try {
        const params = {
          totalPrice: this.totalPrice,
        };
        if (this.customerId) {
          params.khachHangId = this.customerId;
        }
        const response = await axios.get('http://localhost:8080/api/phieu-giam-gia/applicable-vouchers', { params });
        this.vouchers = response.data;
      } catch (error) {
        console.error('Lỗi khi tải danh sách phiếu giảm giá:', error);
        // Optionally, show a toast notification here
      } finally {
        this.loading = false;
      }
    },
    formatDiscount(voucher) {
      if (voucher.loaiPhieuGiamGia === 'Phần trăm') {
        return `Giảm ${voucher.phanTramGiamGia}% (tối đa ${voucher.soTienGiamToiDa.toLocaleString('vi-VN')} ₫)`;
      } else {
        return `Giảm ${voucher.soTienGiamToiDa.toLocaleString('vi-VN')} ₫`;
      }
    },
    selectVoucher(voucherCode) {
      this.$emit('voucher-selected', voucherCode);
      this.closeModal();
    },
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>
