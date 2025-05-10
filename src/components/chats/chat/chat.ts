import Block from "../../../blocks/Block";
import { chat } from "./index";
import { IChatProps } from "./types";

export class Chat extends Block {
  constructor(props: IChatProps) {
    super({
      isYou: props.isYou,
      message: props.message,
      title: props.title,
      when: props.when,
      newMessage: props.newMessages,
    });
  }
  render(): string {
    return chat;
  }
}
