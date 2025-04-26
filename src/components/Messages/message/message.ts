import { message } from "./index";
import Block from "../../../blocks/Block";
import { IProps } from "./type";

export class Message extends Block {
  constructor(props: IProps) {
    super({
      ...props,
    });
  }

  render(): string {
    return message;
  }
}
