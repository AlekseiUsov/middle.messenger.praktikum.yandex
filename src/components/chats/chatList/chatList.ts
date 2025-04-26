import Block from "../../../blocks/Block";
import data from "./data.json";
import { Chat } from "../chat/chat";
import { IProps } from "../chat/types";

const parseData = JSON.parse(JSON.stringify(data));

const list = Object.fromEntries(
  parseData.map((chat: IProps, index: number) => [
    `Chat_${index + 1}`,
    new Chat(chat),
  ])
);

export class ChatList extends Block {
  constructor({}) {
    super(list);
  }

  renderChatList(): string {
    let list = "";
    for (let i = 0; i < parseData.length; i++) {
      list += `{{{ Chat_${i + 1} }}}`;
    }
    return list;
  }

  render(): string {
    return `<ul class="chats__list">${this.renderChatList()}</ul>`;
  }
}
