import { Block } from "../../../blocks";
import { Chat, IChatProps } from "../chat";
import { IChatsProps } from "../types";

export class ChatList extends Block {
  constructor({ chats }: IChatsProps) {
    super(
      Object.fromEntries(
        chats.map((chat: IChatProps, index: number) => [
          `Chat_${index + 1}`,
          new Chat(chat),
        ])
      )
    );
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
    const result = `<ul class="chats__list">${this.renderChatList()}</ul>`;
    return result;
  }
}
