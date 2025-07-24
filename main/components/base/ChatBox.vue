<template>
  <div class="chat-container">
    <button v-if="!showOptions && !showChat" class="chat-button" @click="showOptions = true">Chat ngay</button>

    <!-- Options panel -->
    <div v-if="showOptions && !showChat" class="options-box">
      <div class="chat-header">
        <h2 style="color: white">Mobile World</h2>
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
        <h2 style="color: white">{{ chatMode === 'ai' ? 'AI Assistant' : 'Nhân viên Mobile World' }}</h2>
        <button class="close-button" @click="closeChat">×</button>
      </div>
      <div ref="chatMessages" class="chat-messages">
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
          {{ message.text }}
        </div>
      </div>
      <div class="chat-input">
        <input v-model="inputMessage" type="text" placeholder="Nhập tin nhắn..." @keyup.enter="sendMessage" />
        <button @click="sendMessage">→</button>
      </div>
    </div>
  </div>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import axios from 'axios'

// Polyfill cho global
if (typeof global === 'undefined') {
  window.global = window
}

export default {
  name: 'ChatBoxComponent',
  data() {
    return {
      showOptions: false,
      showChat: false,
      chatMode: null, // 'ai' or 'staff'
      messages: [],
      inputMessage: '',
      customerId: 1, // Giả định, trong thực tế lấy từ auth
      stompClient: null,
      chatMessages: null,
      isConnecting: false,
    }
  },
  mounted() {
    this.connectWebSocket()
  },
  beforeDestroy() {
    if (this.stompClient) this.stompClient.disconnect()
  },
  methods: {
    connectWebSocket() {
      if (this.isConnecting || (this.stompClient && this.stompClient.connected)) return
      this.isConnecting = true

      const socket = new SockJS('http://localhost:8080/chat-sockjs')
      this.stompClient = Stomp.over(socket)
      this.stompClient.connect(
        {},
        () => {
          console.log('WebSocket connected for customer')
          this.isConnecting = false
          if (this.chatMode === 'staff') {
            this.subscribeToCustomerTopic()
          }
        },
        (error) => {
          console.error('WebSocket connection error:', error)
          this.isConnecting = false
          setTimeout(() => this.connectWebSocket(), 2000)
        }
      )
    },
    subscribeToCustomerTopic() {
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.subscribe(`/topic/customer/${this.customerId}`, (message) => {
          const msg = JSON.parse(message.body)
          this.messages.push({
            sender: msg.sender, // Phân biệt nhân viên và khách hàng
            text: msg.text,
            type: msg.type,
            time: msg.time,
          })
          this.scrollToBottom()
        })
      }
    },
    startAIChat() {
      this.chatMode = 'ai'
      this.showOptions = false
      this.showChat = true
      this.messages = [
        { sender: 'received', text: 'Bạn cần tìm sản phẩm như nào?', type: 'text', time: new Date().toISOString() },
      ]
      fetch(`http://localhost:8080/api/messages/${this.customerId}`)
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok')
          return res.json()
        })
        .then((data) => {
          this.messages = data.filter((msg) => msg.type === 'text' && msg.sender === 'ai')
          this.$nextTick(() => {
            if (this.chatMessages) {
              this.chatMessages.scrollTop = this.chatMessages.scrollHeight
            }
          })
        })
        .catch((error) => {
          console.log('Toast:', { type: 'error', message: 'Lỗi khi tải lịch sử tin nhắn AI' })
          console.error('Error fetching AI messages:', error)
        })
    },
    startStaffChat() {
      this.chatMode = 'staff'
      this.showOptions = false
      this.showChat = true
      this.messages = [
        {
          sender: 'received',
          text: 'Xin chào Anh/Chị! Em là nhân viên của Mobile World',
          type: 'text',
          time: new Date().toISOString(),
        },
        { sender: 'received', text: 'Em có thể giúp gì Anh/Chị?', type: 'text', time: new Date().toISOString() },
      ]
      fetch(`http://localhost:8080/api/messages/${this.customerId}`)
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok')
          return res.json()
        })
        .then((data) => {
          this.messages = data
          this.scrollToBottom()
          if (this.stompClient && this.stompClient.connected) {
            this.subscribeToCustomerTopic()
          } else {
            this.connectWebSocket()
          }
        })
        .catch((error) => {
          console.error('Error fetching messages:', error)
        })
    },
    formatTime(time) {
      if (!time) return ''
      return new Date(time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    },
    sendMessage() {
      if (!this.inputMessage.trim()) return

      const message = {
        type: 'text',
        text: this.inputMessage,
        sender: 'customer',
        customerId: this.customerId,
        time: new Date().toISOString(),
      }

      this.messages.push({ ...message, sender: 'sent' })
      if (this.chatMode === 'ai') {
        axios
          .post('http://localhost:8080/api/chatbot', { message: this.inputMessage })
          .then((response) => {
            this.messages.push({
              sender: 'received',
              text: response.data.reply,
              type: 'text',
              time: new Date().toISOString(),
            })
            this.scrollToBottom()
          })
          .catch((error) => {
            console.error('Lỗi khi gọi API:', error)
          })
      } else if (this.stompClient && this.stompClient.connected) {
        this.stompClient.send(`/app/chat/customer/${this.customerId}`, JSON.stringify(message))
      } else {
        this.connectWebSocket()
        setTimeout(() => {
          if (this.stompClient && this.stompClient.connected) {
            this.stompClient.send(`/app/chat/customer/${this.customerId}`, JSON.stringify(message))
          }
        }, 1000)
      }

      this.inputMessage = ''
      this.scrollToBottom()
    },
    closeChat() {
      if (this.stompClient) this.stompClient.disconnect()
      this.showChat = false
      this.showOptions = false
      this.chatMode = null
      this.messages = []
      this.inputMessage = ''
    },
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.chatMessages) {
          this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight
        }
      })
    },
  },
}
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
