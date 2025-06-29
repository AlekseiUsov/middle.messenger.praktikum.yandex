import { BaseApi } from "../BaseApi";

export class ChatsApi extends BaseApi {
  constructor(endpoint: string = "/chats") {
    super(endpoint);
  }

  getChats(search?: string) {
    const options = {
      offset: 0,
      limit: 10,
      title: search,
    };
    const data = search ? options : null;
    return this.http.get("", { data });
  }

  getUsers(chatId: string) {
    return this.http.get(`/${chatId}/users`, {});
  }

  createChat(data: { title: string }) {
    return this.http.post("", { data });
  }

  deleteChat(data: { chatId: number }) {
    return this.http.delete("", { data });
  }

  getToken(data: { id: number }) {
    return this.http.post(`/token/${data.id}`, {});
  }

  addUserToChat(data: { chatId: number; users: Array<number> }) {
    return this.http.put(`/users`, { data });
  }

  deleteUserFromChat(data: { chatId: number; users: Array<number> }) {
    return this.http.delete(`/users`, { data });
  }
}
