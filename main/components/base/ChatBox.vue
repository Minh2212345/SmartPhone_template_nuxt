<template>
  <div class="chat-container">
    <button v-if="!showChat" class="chat-button" @click="openChat">Chat ngay</button>
    <div v-if="showChat" class="chat-box">
      <div class="chat-header">
        <h2 style="color: white">
          {{ chatMode === 'ai' ? 'AI Assistant' : 'Nhân viên Mobile World' }}
        </h2>
        <button class="close-button" @click="closeChat">×</button>
      </div>
      <div ref="chatMessages" class="chat-messages">
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
          {{ message.text }}
        </div>
      </div>
      <div class="chat-input">
        <input v-model="inputMessage" type="text" placeholder="Nhập tin nhắn..." @keyup.enter="sendMessage" />
        <button @click="sendMessage" :disabled="isSending">→</button>
      </div>
    </div>
  </div>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import axios from 'axios'

export default {
  name: 'ChatBoxComponent',
  data() {
    return {
      showChat: false,
      chatMode: 'ai', // Mặc định là AI
      messages: [],
      inputMessage: '',
      customerId: null, // Không hard-code nữa
      stompClient: null,
      isConnecting: false,
      isSending: false,
      subscribed: false,
    }
  },
  mounted() {
    // Lấy customerId từ localStorage khi component được khởi tạo
    this.customerId = localStorage.getItem('customerId') || null;
    if (!this.customerId) {
      console.warn('Không tìm thấy customerId trong localStorage');
    }
  },
  beforeDestroy() {
    if (this.stompClient) this.stompClient.disconnect();
  },
  methods: {
    openChat() {
      if (!this.customerId) {
        alert('Vui lòng đăng nhập để sử dụng chức năng chat!');
        return;
      }
      this.showChat = true;
      this.chatMode = 'ai';
      this.messages = [
        { sender: 'received', text: 'Tôi có thể giúp gì cho bạn?', type: 'text', time: new Date().toISOString() },
      ];
      axios
        .get(`http://localhost:8080/api/messages/${this.customerId}`)
        .then((res) => {
          // Lấy lịch sử AI
          this.messages = [
            { sender: 'received', text: 'Tôi có thể giúp gì cho bạn?', type: 'text', time: new Date().toISOString() },
            ...res.data.filter((msg) => msg.type === 'text' && msg.sender === 'ai')
          ];
          this.scrollToBottom();
        })
        .catch(() => {});
    },
    connectWebSocket() {
      if (!this.customerId) {
        console.error('Không có customerId để kết nối WebSocket');
        return;
      }
      if (this.isConnecting || (this.stompClient && this.stompClient.connected)) return;
      this.isConnecting = true;

      const socket = new SockJS('http://localhost:8080/chat-sockjs');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
        {},
        () => {
          this.isConnecting = false;
          this.subscribeToCustomerTopic();
        },
        () => {
          this.isConnecting = false;
          setTimeout(() => this.connectWebSocket(), 2000);
        }
      );
    },
    subscribeToCustomerTopic() {
      if (this.stompClient && this.stompClient.connected && !this.subscribed) {
        this.stompClient.subscribe(`/topic/customer/${this.customerId}`, (message) => {
          const msg = JSON.parse(message.body);
          if (!this.messages.some((m) => m.time === msg.time && m.text === msg.text)) {
            this.messages.push({
              sender: msg.sender === 'customer' ? 'sent' : 'received',
              text: msg.text,
              type: msg.type,
              time: msg.time,
            });
            this.scrollToBottom();
          }
        });
        this.subscribed = true;
      }
    },
    async sendMessage() {
      if (!this.inputMessage.trim() || this.isSending) return;
      if (!this.customerId) {
        alert('Vui lòng đăng nhập để gửi tin nhắn!');
        return;
      }
      this.isSending = true;

      const message = {
        type: 'text',
        text: this.inputMessage,
        sender: 'customer',
        customerId: this.customerId,
        time: new Date().toISOString(),
      };

      // Nếu đang ở AI và phát hiện từ khóa chuyển sang nhân viên
      if (
        this.chatMode === 'ai' &&
        /nhân\s*viên\s*hỗ\s*trợ|gặp\s*nhân\s*viên|liên\s*hệ\s*nhân\s*viên/i.test(this.inputMessage)
      ) {
        // Chuyển sang chat nhân viên
        this.chatMode = 'staff';
        this.messages = [
          { sender: 'received', text: 'Xin chào!', type: 'text', time: new Date().toISOString() }
        ];
        this.connectWebSocket();
        // Lấy lịch sử chat với nhân viên
        axios
          .get(`http://localhost:8080/api/messages/${this.customerId}`)
          .then((res) => {
            this.messages = [
              { sender: 'received', text: 'Xin chào!', type: 'text', time: new Date().toISOString() },
              ...res.data.map((msg) => ({
                ...msg,
                sender: msg.sender === 'customer' ? 'sent' : 'received',
              }))
            ];
            this.scrollToBottom();
          })
          .catch(() => {});
        this.inputMessage = '';
        this.isSending = false;
        return;
      }

      if (this.chatMode === 'ai') {
        try {
          const response = await axios.post('http://localhost:8080/api/chatbot', { message: this.inputMessage });
          this.messages.push({
            sender: 'received',
            text: response.data.reply,
            type: 'text',
            time: new Date().toISOString(),
          });
          this.scrollToBottom();
        } catch (error) {
          console.error('Lỗi khi gửi tin nhắn tới AI:', error);
        }
      } else if (this.stompClient && this.stompClient.connected) {
        this.stompClient.send(`/app/chat/customer/${this.customerId}`, JSON.stringify(message));
      } else {
        this.connectWebSocket();
        setTimeout(() => {
          if (this.stompClient && this.stompClient.connected) {
            this.stompClient.send(`/app/chat/customer/${this.customerId}`, JSON.stringify(message));
            this.messages.push({
              sender: 'sent',
              text: this.inputMessage,
              type: 'text',
              time: message.time,
            });
          }
        }, 1000);
      }

      this.inputMessage = '';
      this.scrollToBottom();
      this.isSending = false;
    },
    closeChat() {
      if (this.stompClient) this.stompClient.disconnect();
      this.showChat = false;
      this.chatMode = 'ai';
      this.messages = [];
      this.inputMessage = '';
      this.subscribed = false;
    },
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.chatMessages) {
          this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight;
        }
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
