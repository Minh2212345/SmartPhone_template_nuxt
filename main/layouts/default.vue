<template>
  <div style="width: 100%;">
    <header class="fixed-header">
      <BaseNavbar />
    </header>
    <body style="width: 100%;margin: 0px;">
      <main class="text-neutral-800 content-with-navbar">
        <Nuxt />
      </main>
    </body>
    <footer style="width: 100%;">
      <BaseFooter />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style scoped>
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Đảm bảo header nằm trên các phần tử khác */
  background-color: #fff; /* Đảm bảo header không trong suốt */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Tùy chọn: Thêm bóng để header nổi bật */
}

.content-with-navbar {
  padding-top: 180px; 
}
</style>