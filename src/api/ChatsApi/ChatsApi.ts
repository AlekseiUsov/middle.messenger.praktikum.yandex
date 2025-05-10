import { BaseApi } from "../BaseApi/BaseApi";

export class ChatsApi extends BaseApi {
  constructor(endpoint: string = "/chats") {
    super(endpoint);
  }

  getChats(data: any) {
    return this.http.get("", { data });
  }

  createChat(data: any) {
    return this.http.post("", { data });
  }
}
