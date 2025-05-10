import Block from "../../blocks/Block";
import { Search } from "../ui/search/search";
import { ChatList } from "./chatList/chatList";
import { chats } from "./index";
import { Chat } from "./chat/chat";

export class Chats extends Block {
  constructor({ chats }) {
    super({
      Search: new Search({}),
      ChatList: new ChatList(
        Object.fromEntries(
          chats.map((chat: any, index: number) => [
            `Chat_${index + 1}`,
            new Chat(chat),
          ])
        )
      ),
    });
  }

  render(): string {
    return chats;
  }
}
