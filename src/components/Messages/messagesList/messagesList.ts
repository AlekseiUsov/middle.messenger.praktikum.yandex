import Block from "../../../blocks/Block";
import { Message } from "../message/message";
import { IProps } from "../message/type";
import data from "./data.json";

const parseData = JSON.parse(JSON.stringify(data));

const list = Object.fromEntries(
  parseData.map((message: IProps, index: number) => [
    `Message_${index + 1}`,
    new Message(message),
  ])
);

export class MessagesList extends Block {
  constructor() {
    super(list);
  }

  renderMessageList(): string {
    let list = "";
    for (let i = 0; i < parseData.length; i++) {
      list += `{{{ Message_${i + 1} }}}`;
    }
    return list;
  }

  render(): string {
    return `<ul class="messages__list">${this.renderMessageList()}</ul>`;
  }
}
