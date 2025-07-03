import { ChatsApi } from "../../api/ChatsApi/ChatsApi";

class Controller {
  private api;

  constructor() {
    this.api = new ChatsApi();
  }

  public async getChats(search?: string) {
    try {
      const res = await this.api.getChats(search);
      const chats = await JSON.parse(res.response);
      return chats;
    } catch (e: unknown) {
      console.log(e);
    }
  }

  public async getUsers(chatId: string) {
    try {
      const res = await this.api.getUsers(chatId);
      const users = await JSON.parse(res.response);
      return users;
    } catch (e: unknown) {
      console.log(e);
    }
  }

  public async createChat(data: { title: string }) {
    try {
      const res = await this.api.createChat(data);
      const newChat = await JSON.parse(res.response);
      return newChat;
    } catch (e: unknown) {
      console.log(e);
    }
  }

  public async getToken(id: number) {
    try {
      const res = await this.api.getToken({ id });
      const { token } = await JSON.parse(res.response);
      return token;
    } catch (e: unknown) {
      console.log(e);
    }
  }

  public async addUserToChat({
    chatId,
    users,
  }: {
    chatId: number;
    users: Array<number>;
  }) {
    const res = await this.api.addUserToChat({ chatId, users });
    const newUser = await res.response;
    return newUser;
  }

  public async deleteChat(chatId: number) {
    const res = await this.api.deleteChat({ chatId });
    const deleteChat = await JSON.parse(res.response);
    return deleteChat;
  }

  public async deleteUserFromChat({
    chatId,
    users,
  }: {
    chatId: number;
    users: Array<number>;
  }) {
    try {
      const res = await this.api.deleteUserFromChat({ chatId, users });
      const deleteUser = res.response;
      return deleteUser;
    } catch (e: unknown) {
      console.log(e);
    }
  }
}

export const ChatsController = new Controller();
