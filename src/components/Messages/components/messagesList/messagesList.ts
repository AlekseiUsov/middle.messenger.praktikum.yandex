import { Block } from "../../../../blocks";
import { Message, IMessageProps } from "../message";
import { TMessagesProps } from "./type";

export class MessagesList extends Block {
  constructor({ messages }: TMessagesProps) {
    super(
      Object.fromEntries(
        (messages || []).map((message: IMessageProps, index: number) => [
          `Message_${index + 1}`,
          new Message(message),
        ])
      )
    );
  }

  renderMessageList(): string {
    const length = Object.values(this.children).length;
    let list = "";
    for (let i = 0; i < length; i++) {
      list += `{{{ Message_${i + 1} }}}`;
    }
    return list;
  }

  render(): string {
    const result = `<ul class="messages__list">${this.renderMessageList()}</ul>`;
    return result;
  }
}
