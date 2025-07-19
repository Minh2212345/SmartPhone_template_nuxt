<template>
  <div class="chat-container">
    <button v-if="!showOptions && !showChat" class="chat-button" @click="showOptions = true">Chat ngay</button>

    <!-- Options panel -->
    <div v-if="showOptions && !showChat" class="options-box">
      <div class="chat-header">
        <h2 style="color: white;">Mobile World</h2>
        <button class="close-button" @click="showOptions = false">×</button>
      </div>
      <div class="options-buttons">
        <button class="option-button" @click="startAIChat">Chat với AI</button>
        <button class="option-button" @click="startStaffChat">Chat với Nhân viên</button>
      </div>
    </div>

    <!-- Chat box -->
    <div v-if="showChat" class="chat-box">
      <div class="chat-header">
        <h2 style="color: white;">{{ chatMode === 'ai' ? 'AI Assistant' : 'Nhân viên Mobile World' }}</h2>
        <button class="close-button" @click="closeChat">×</button>
      </div>
      <div class="chat-messages">
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
          {{ message.text }}
        </div>
      </div>
      <div class="chat-input">
        <input
          type="text"
          v-model="inputMessage"
          placeholder="Nhập tin nhắn..."
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">→</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChatBoxComponent',
  data() {
    return {
      showOptions: false,
      showChat: false,
      chatMode: null, // 'ai' or 'staff'
      messages: [],
      inputMessage: '',
    };
  },
  methods: {
    startAIChat() {
      this.chatMode = 'ai';
      this.showOptions = false;
      this.showChat = true;
      this.messages = [{ sender: 'received', text: 'Bạn cần tìm sản phẩm như nào?' }];
    },
    startStaffChat() {
      this.chatMode = 'staff';
      this.showOptions = false;
      this.showChat = true;
      this.messages = [
        { sender: 'received', text: 'Xin chào Anh/Chị! Em là nhân viên của Mobile World' },
        { sender: 'received', text: 'Em có thể giúp gì Anh/Chị?' },
      ];
    },
    closeChat() {
      this.showChat = false;
      this.showOptions = false;
      this.chatMode = null;
      this.messages = [];
      this.inputMessage = '';
    },
    async sendMessage() {
      if (!this.inputMessage.trim()) return;

      // Thêm tin nhắn của người dùng vào danh sách
      this.messages.push({ sender: 'sent', text: this.inputMessage });

      if (this.chatMode === 'ai') {
        try {
          // Gửi yêu cầu tới backend
          const response = await axios.post('/api/chatbot', {
            message: this.inputMessage,
          });

          // Thêm phản hồi từ AI vào danh sách tin nhắn
          this.messages.push({ sender: 'received', text: response.data.reply });
        } catch (error) {
          console.error('Lỗi khi gọi API:', error);
          this.messages.push({
            sender: 'received',
            text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
          });
        }
      } else {
        // Xử lý chat với nhân viên (giả lập hoặc tích hợp hệ thống chat khác)
        this.messages.push({
          sender: 'received',
          text: 'Nhân viên sẽ trả lời bạn sớm. Cảm ơn bạn đã chờ đợi!',
        });
      }

      // Xóa nội dung ô nhập liệu
      this.inputMessage = '';

      // Tự động cuộn xuống tin nhắn mới nhất
      this.$nextTick(() => {
        const chatMessages = this.$el.querySelector('.chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    },
  },
};
</script>

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
  background: linear-gradient(335deg, #002c69, #13ad75);
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
  background: linear-gradient(335deg, #002c69, #13ad75);
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
  background-color: #13ad75;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.option-button:hover {
  background-color: #0f9765;
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
  background-color: #13ad75;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>
