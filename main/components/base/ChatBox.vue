<template>
  <div class="chat-container">
    <button v-if="!showChat" @click="showChat = !showChat" class="chat-button">Chat ngay</button>
    <div v-if="showChat" class="chat-box">
      <div class="chat-header">
        <h2>Mobile World</h2>
        <button @click="showChat = !showChat" class="close-button">×</button>
      </div>
      <div class="chat-messages">
        <div class="message sent">Xin chào Anh/Chị! Em là trợ lý ảo của Mobile World</div>
        <div class="message sent">Em có thể giúp gì Anh/Chị ?</div>
      </div>
      <div class="chat-input">
        <input type="text" placeholder="Nhập tin nhắn..." />
        <button>→</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  position: relative;
  font-family: Arial, sans-serif;
}
.chat-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #00aaff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
}
.chat-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  background-color: #ffffff;
  z-index: 999;
}
.chat-header {
  background-color: #00aaff;
  color: white;
  padding: 10px;
  text-align: center;
  position: relative;
}
.close-button {
  position: absolute;
  top: 5px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}
.chat-messages {
  padding: 10px;
  height: 200px;
  overflow-y: auto;
  background-color: #f9f9f9;
}
.message {
  margin: 5px 0;
  padding: 8px;
  border-radius: 5px;
  max-width: 70%;
}
.sent {
  background-color: #e0f7fa;
  margin-left: 30%;
}
.received {
  background-color: #f0f0f0;
}
.chat-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #ffffff;
}
.chat-input input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.chat-input button {
  padding: 5px 10px;
  margin-left: 5px;
  background-color: #00aaff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>

<script>
export default {
  name: 'ChatBoxComponent',
  data() {
    return {
      showChat: false
    }
  }
}
</script>