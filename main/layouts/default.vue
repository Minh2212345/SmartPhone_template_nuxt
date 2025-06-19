<template>
  <div style="width: 100%;">
    <header class="fixed-header">
      <BaseNavbar />
    </header>
    <body style="width: 100%;margin: 0px;">
      <main class="text-neutral-800 content-with-navbar">
        <Nuxt />
        <ChatComponent style="position: fixed; bottom: 20px; right: 20px;" />
      </main>
    </body>
    <footer style="width: 100%;">
      <BaseFooter />
    </footer>
  </div>
</template>


<style scoped>
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.content-with-navbar {
  padding-top: 180px;
}
</style>