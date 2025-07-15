<template>
  <div class="layout">    
    <div style="width: 100%">
        <header class="fixed-header">
          <BaseNavbar />
        </header>
        <body style="width: 100%; margin: 0px">
          <main class="text-neutral-800 content-with-navbar">
            <Nuxt />
            <ChatComponent style="position: fixed; bottom: 20px; right: 20px" />
          </main>
        </body>
        <footer style="width: 100%" v-if="$route.path !== '/login-page'">
          <BaseFooter />
        </footer>
        <div>
          <ChatBoxComponent/>
        </div>
      </div> 
    <ChatBox />
  </div>
</template>

<script>
import ChatBox from '../components/base/ChatBox.vue';

export default {
  components: {    
    ChatBox
  }
}
</script>