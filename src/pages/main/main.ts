import { main } from "./index";
import Block from "../../blocks/Block";
import { Chats, Messages } from "../../components";
import { ChatsApi } from "../../api/ChatsApi/ChatsApi";
import data from "../../components/chats/chatList/data.json";

const parseData = JSON.parse(JSON.stringify(data));

export class Main extends Block {
  constructor() {
    super({
      Chats: new Chats({
        chats: [],
      }),
      Messages: new Messages({}),
    });
  }

  async loadChats() {
    const api = new ChatsApi();
    const res = await api.getChats({});
    const chats = await JSON.parse(res.response);
    this.children["Chats"].setProps({ chats });
  }

  componentDidMount(): void {
    this.loadChats();
  }

  render(): string {
    return main;
  }
}
