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
  </div>
</template>

<script>
import ChatBox from '~/components/base/ChatBox.vue';

export default {
  name: 'DefaultLayout',
  components: {
    ChatBox,
  },
};
</script>

<style scoped>
.content-with-navbar {
  min-height: 60vh;
}
</style>
