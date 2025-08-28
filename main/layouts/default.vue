<!-- layouts/default.vue -->
<template>
  <div class="layout">
    <!-- Header -->
    <header class="fixed-header">
      <BaseNavbar />
    </header>

    <!-- Main content -->
    <main class="text-neutral-800 content-with-navbar">
      <Nuxt />
      <ChatComponent style="position: fixed; bottom: 20px; right: 20px" />
    </main>

    <!-- Footer -->
    <footer v-if="$route.path !== '/login-page'" style="width: 100%; height: 100%;">
      <BaseFooter />
    </footer>

    <!-- ChatBox -->
    <ChatBox />
    
    <!-- Global Confirm Dialog -->
    <ConfirmDialog ref="confirmDialog" />
    
    <!-- Global Toast Notification -->
    <ToastNotification ref="toastNotification" />
  </div>
</template>

<script>
import ChatBox from '~/components/base/ChatBox.vue';
import ConfirmDialog from '~/components/base/ConfirmDialog.vue';
import ToastNotification from '~/components/base/ToastNotification.vue';
import { useConfirm } from '~/composables/useConfirm';

export default {
  name: 'DefaultLayout',
  components: {
    ChatBox,
    ConfirmDialog,
    ToastNotification,
  },
  mounted() {
    // Register the confirm dialog globally
    const { setConfirmRef } = useConfirm();
    setConfirmRef(this.$refs.confirmDialog);
    
    // Make toast notification globally available
    this.$root.$toast = this.$refs.toastNotification;
  },
};
</script>

<style scoped>
.content-with-navbar {
  min-height: 60vh;
}
</style>
