<template>
  <div class="chat-container">
    <button v-if="!showOptions && !showChat" @click="showOptions = true" class="chat-button">Chat ngay</button>
    
    <!-- Options panel -->
    <div v-if="showOptions && !showChat" class="options-box">
      <div class="chat-header">
        <h2 style="color: white;">Mobile World</h2>
        <button @click="showOptions = false" class="close-button">×</button>
      </div>
      <div class="options-buttons">
        <button @click="startAIChat" class="option-button">Chat với AI</button>
        <button @click="startStaffChat" class="option-button">Chat với Nhân viên</button>
      </div>
    </div>

    <!-- Chat box -->
    <div v-if="showChat" class="chat-box">
      <div class="chat-header">
        <h2 style="color: white;">{{ chatMode === 'ai' ? 'AI Assistant' : 'Nhân viên Mobile World' }}</h2>
        <button @click="closeChat" class="close-button">×</button>
      </div>
      <div class="chat-messages">
        <template v-if="chatMode === 'ai'">
          <div class="message received">Bạn cần tìm sản phẩm như nào?</div>
        </template>
        <template v-else>
          <div class="message received">Xin chào Anh/Chị! Em là nhân viên của Mobile World</div>
          <div class="message received">Em có thể giúp gì Anh/Chị?</div>
        </template>
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
  background: linear-gradient(335deg, #28a745, #08387B);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
}

.options-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  background-color: #ffffff;
  z-index: 999;
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
  background: linear-gradient(335deg, #28a745, #08387B);
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

.options-buttons {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-button {
  padding: 10px;
  background-color: #16a34a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.option-button:hover {
  background-color: #34d399;
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
  background-color: #16a34a;
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
      showOptions: false,
      showChat: false,
      chatMode: null // 'ai' or 'staff'
    }
  },
  methods: {
    startAIChat() {
      this.chatMode = 'ai';
      this.showOptions = false;
      this.showChat = true;
    },
    startStaffChat() {
      this.chatMode = 'staff';
      this.showOptions = false;
      this.showChat = true;
    },
    closeChat() {
      this.showChat = false;
      this.showOptions = false;
      this.chatMode = null;
    }
  }
}
</script>