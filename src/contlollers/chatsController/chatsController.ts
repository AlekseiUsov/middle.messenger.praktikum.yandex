import { ChatsApi } from "../../api/ChatsApi/ChatsApi";

class ChatsController {
  private api;

  constructor() {
    this.api = new ChatsApi();
  }

  public async getChats() {
    const res = await this.api.getChats({});
    return res;
  }

  public async createChat(data: any) {
    const res = await this.api.createChat(data);
    return res;
  }
}

export default new ChatsController();
