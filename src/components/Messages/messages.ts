import { messages } from "./index";
import Block from "../../blocks/Block";
import { Avatar, Send } from "../../components";
import { TProps } from "../../blocks/types";
import { MessagesList } from "./messagesList/messagesList";

export class Messages extends Block {
  constructor(props: TProps) {
    super({
      Avatar: new Avatar({}),
      Send: new Send({}),
      MessagesList: new MessagesList(),
      ...props,
    });
  }

  render(): string {
    return messages;
  }
}
