import Block from "../../../blocks/Block";
import { chat } from "./index";
import { IProps } from "./types";

export class Chat extends Block {
  constructor(props: IProps) {
    super({
      isYou: props.isYou,
      message: props.message,
      userName: props.userName,
      when: props.when,
      newMessage: props.newMessages,
    });
  }
  render(): string {
    return chat;
  }
}
