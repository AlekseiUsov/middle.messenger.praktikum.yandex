import Block from "../../../blocks/Block";
import data from "./data.json";
import { Chat } from "../chat/chat";
import { IProps } from "../chat/types";

export class ChatList extends Block {
  constructor(elements) {
    super(elements);
  }

  renderChatList(): string {
    let list = "";
    const coll = Object.values(this.children);
    for (let i = 0; i < coll.length; i++) {
      list += `{{{ Chat_${i + 1} }}}`;
    }
    return list;
  }

  render(): string {
    return `<ul class="chats__list">${this.renderChatList()}</ul>`;
  }
}
