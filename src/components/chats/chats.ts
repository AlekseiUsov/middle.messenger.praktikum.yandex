import Block from "../../blocks/Block";
import { Search } from "../ui/search/search";
import { ChatList } from "./chatList/chatList";
import { chats } from "./index";

export class Chats extends Block {
  constructor() {
    super({
      Search: new Search({}),
      ChatList: new ChatList({}),
    });
  }

  render(): string {
    return chats;
  }
}
