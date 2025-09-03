<template>
  <div class="chat-container">
    <!-- Chat Button with Animation -->
    <button v-if="!showChat" class="chat-button" @click="openChat">
      <div class="chat-button-content">
        <svg class="chat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="chat-text">Chat ngay</span>
      </div>
      <div class="chat-pulse"></div>
    </button>

    <!-- Chat Box -->
    <div v-if="showChat" class="chat-box">
      <!-- Header -->
      <div class="chat-header">
        <div class="header-content">
          <div class="status-indicator">
            <div class="status-dot" :class="{ 'online': chatMode === 'ai', 'staff': chatMode === 'staff' }"></div>
          </div>
          <div class="header-info">
            <h3 class="header-title">
              {{ chatMode === 'ai' ? 'AI Mobile World' : 'Nhân viên Mobile World' }}
            </h3>
            <span class="header-subtitle">
              {{ chatMode === 'ai' ? 'Luôn sẵn sàng hỗ trợ' : 'Đang hoạt động' }}
            </span>
          </div>
          <button class="close-button" @click="closeChat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Messages Area -->
      <div ref="chatMessages" class="chat-messages">
        <div v-for="(message, index) in messages" :key="index"
             :class="['message-wrapper', message.sender]">
          <div class="message" :class="message.sender">
            <div class="message-content">
              {{ message.text }}
            </div>
            <div class="message-time">
              {{ formatTime(message.time) }}
            </div>
          </div>
        </div>

        <!-- Typing indicator -->
        <div v-if="isTyping" class="message-wrapper received">
          <div class="message received typing-indicator">
            <div class="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Suggestions -->
      <div v-if="chatMode === 'ai' && messages.length <= 1" class="suggestions">
        <div class="suggestion-title">Gợi ý nhanh:</div>
        <div class="suggestion-chips">
          <button class="suggestion-chip" @click="sendSuggestion('Tôi cần tư vấn sản phẩm')">
            📱 Tư vấn sản phẩm
          </button>
          <button class="suggestion-chip" @click="sendSuggestion('Kiểm tra bảo hành')">
            🛡️ Kiểm tra bảo hành
          </button>
          <button class="suggestion-chip" @click="sendSuggestion('nhân viên hỗ trợ')">
            👨‍💼 Nhân viên hỗ trợ
          </button>
        </div>
      </div>

      <!-- Input Area -->
      <div class="chat-input-area">
        <div class="input-hint" v-if="chatMode === 'ai'">
          💡 Để chat với nhân viên, hãy gõ: <strong>"nhân viên hỗ trợ"</strong>
        </div>
        <div class="chat-input">
          <div class="input-wrapper">
            <input
              v-model="inputMessage"
              type="text"
              :placeholder="chatMode === 'ai' ? 'Nhập câu hỏi của bạn...' : 'Nhập tin nhắn...'"
              @keyup.enter="sendMessage"
              :disabled="isSending"
              class="message-input"
            />
            <button
              @click="sendMessage"
              :disabled="isSending || !inputMessage.trim()"
              class="send-button"
              :class="{ 'sending': isSending }"
            >
              <svg v-if="!isSending" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
              </svg>
              <div v-else class="sending-spinner"></div>
            </button>
          </div>
        </div>
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
      chatMode: 'ai',
      messages: [],
      inputMessage: '',
      customerId: null,
      stompClient: null,
      isConnecting: false,
      isSending: false,
      subscribed: false,
      isTyping: false,
    }
  },
  mounted() {
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
        {
          sender: 'received',
          text: 'Xin chào! Tôi có thể giúp gì cho bạn? 😊',
          type: 'text',
          time: new Date().toISOString()
        },
      ];

      axios.get(`http://localhost:8080/api/messages/${this.customerId}`)
        .then((res) => {
          this.messages = [
            {
              sender: 'received',
              text: 'Xin chào! Tôi có thể giúp gì cho bạn? 😊',
              type: 'text',
              time: new Date().toISOString()
            },
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

      const userMessage = {
        sender: 'sent',
        text: this.inputMessage,
        type: 'text',
        time: new Date().toISOString(),
      };

      const message = {
        type: 'text',
        text: this.inputMessage,
        sender: 'customer',
        customerId: this.customerId,
        time: new Date().toISOString(),
      };

      // Check for staff transfer keywords
      if (
        this.chatMode === 'ai' &&
        /nhân\s*viên\s*hỗ\s*trợ|gặp\s*nhân\s*viên|liên\s*hệ\s*nhân\s*viên/i.test(this.inputMessage)
      ) {
        this.chatMode = 'staff';
        this.messages = [
          { sender: 'received', text: 'Đang chuyển bạn đến nhân viên hỗ trợ...', type: 'text', time: new Date().toISOString() },
          { sender: 'received', text: 'Xin chào! Tôi là nhân viên hỗ trợ của Mobile World. Tôi có thể giúp gì cho bạn?', type: 'text', time: new Date().toISOString() }
        ];
        this.connectWebSocket();
        this.inputMessage = '';
        this.isSending = false;
        return;
      }

      if (this.chatMode === 'ai') {
        this.messages.push(userMessage); // <-- chỉ push khi là AI
        this.scrollToBottom();
        this.isTyping = true;
        try {
          const response = await axios.post('http://localhost:8080/api/chatbot', { message: this.inputMessage });
          this.isTyping = false;
          this.messages.push({
            sender: 'received',
            text: response.data.reply,
            type: 'text',
            time: new Date().toISOString(),
          });
          this.scrollToBottom();
        } catch (error) {
          this.isTyping = false;
          console.error('Lỗi khi gửi tin nhắn tới AI:', error);
          this.messages.push({
            sender: 'received',
            text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.',
            type: 'text',
            time: new Date().toISOString(),
          });
        }
      } else if (this.stompClient && this.stompClient.connected) {
        // Không push vào messages ở đây, chỉ gửi lên server
        this.stompClient.send(`/app/chat/customer/${this.customerId}`, JSON.stringify(message));
      } else {
        this.connectWebSocket();
        setTimeout(() => {
          if (this.stompClient && this.stompClient.connected) {
            this.stompClient.send(`/app/chat/customer/${this.customerId}`, JSON.stringify(message));
          }
        }, 1000);
      }

      this.inputMessage = '';
      this.scrollToBottom();
      this.isSending = false;
    },

    sendSuggestion(text) {
      this.inputMessage = text;
      this.sendMessage();
    },

    closeChat() {
      if (this.stompClient) this.stompClient.disconnect();
      this.showChat = false;
      this.chatMode = 'ai';
      this.messages = [];
      this.inputMessage = '';
      this.subscribed = false;
      this.isTyping = false;
    },

    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.chatMessages) {
          this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight;
        }
      });
    },

    formatTime(timeString) {
      const date = new Date(timeString);
      return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    },
  },
};
</script>

<style scoped>
.chat-container {
  position: relative;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Chat Button */
.chat-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 64px;
  height: 64px;
  background: linear-gradient(90deg, #002c69, #13ad75);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  overflow: hidden;
}

.chat-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.chat-button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  z-index: 2;
}

.chat-icon {
  width: 24px;
  height: 24px;
  stroke-width: 2;
}

.chat-text {
  font-size: 10px;
  font-weight: 600;
  margin-top: 2px;
}

.chat-pulse {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: linear-gradient(90deg, #002c69, #13ad75);
  animation: pulse 2s infinite;
  z-index: 1;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

/* Chat Box */
.chat-box {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 380px;
  height: 600px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  z-index: 999;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Header */
.chat-header {
  background: linear-gradient(90deg, #002c69, #13ad75);
  color: white;
  padding: 20px;
  position: relative;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-indicator {
  display: flex;
  align-items: center;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
}

.status-dot.online {
  background: #4ade80;
  box-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
}

.status-dot.staff {
  background: #f59e0b;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
}

.header-info {
  flex: 1;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
  color: #ffffff;
}

.header-subtitle {
  font-size: 12px;
  opacity: 0.8;
  font-weight: 400;
}

.close-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.close-button svg {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}

/* Messages */
.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f8fafc;
  scroll-behavior: smooth;
}

.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

.message-wrapper {
  display: flex;
  margin-bottom: 16px;
}

.message-wrapper.sent {
  justify-content: flex-end;
}

.message-wrapper.received {
  justify-content: flex-start;
}

.message {
  max-width: 75%;
  border-radius: 18px;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.4;
  position: relative;
}

.message.sent {
  background: linear-gradient(90deg, #002c69, #13ad75);
  color: white;
  border-bottom-right-radius: 6px;
}

.message.received {
  background: white;
  color: #374151;
  border: 1px solid #e5e7eb;
  border-bottom-left-radius: 6px;
}

.message-content {
  word-wrap: break-word;
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
  margin-top: 4px;
  text-align: right;
}

.message.received .message-time {
  text-align: left;
}

/* Typing Indicator */
.typing-indicator {
  padding: 16px;
}

.typing-dots {
  display: flex;
  gap: 4px;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  background: #9ca3af;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out both;
}

.typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.typing-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* Suggestions */
.suggestions {
  padding: 16px 20px;
  background: white;
  border-top: 1px solid #e5e7eb;
}

.suggestion-title {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
  font-weight: 500;
}

.suggestion-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.suggestion-chip {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #374151;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.suggestion-chip:hover {
  background: #667eea;
  color: white;
  transform: translateY(-1px);
}

/* Input Area */
.chat-input-area {
  background: white;
  border-top: 1px solid #e5e7eb;
}

.input-hint {
  padding: 8px 20px;
  background: #fef3c7;
  color: #92400e;
  font-size: 12px;
  text-align: center;
  border-top: 1px solid #fde68a;
}

.chat-input {
  padding: 20px;
}

.input-wrapper {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.message-input {
  flex: 1;
  border: 2px solid #e5e7eb;
  border-radius: 24px;
  padding: 12px 20px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  background: #f9fafb;
}

.message-input:focus {
  border-color: #667eea;
  background: white;
}

.message-input:disabled {
  opacity: 0.5;
}

.send-button {
  width: 48px;
  height: 48px;
  background: linear-gradient(90deg, #002c69, #13ad75);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.send-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.send-button svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.sending-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 480px) {
  .chat-box {
    width: 100vw;
    height: 100vh;
    bottom: 0;
    right: 0;
    border-radius: 0;
  }

  .chat-button {
    bottom: 20px;
    right: 20px;
  }
}
</style>
