import { NameEvent, Paths, Store } from "../../store";

class ChatWebSocket {
  private socket: WebSocket | null;

  constructor() {
    this.socket = null;
  }

  connect(userId: string, chatId: string, token: string) {
    if (this.socket) {
      this.disconect();
    }
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );

    this.socket.onopen = () => {
      this.sendPing();
      this.getHistoryMessages();
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          Store.set(NameEvent.getMessagesForChat, Paths.chatMessages, data);
        }
      } catch (e) {
        throw e;
      }
    };
  }

  send(value: unknown) {
    if (typeof value === "string") {
      this.socket?.send(JSON.stringify({ content: value, type: "message" }));
    }
  }

  sendPing() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: "ping" }));
    }
  }

  getHistoryMessages() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ content: "0", type: "get old" }));
    }
  }

  disconect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export const MessagesController = new ChatWebSocket();
