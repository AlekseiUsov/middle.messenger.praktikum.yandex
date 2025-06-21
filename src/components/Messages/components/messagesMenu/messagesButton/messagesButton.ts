import { Block, TProps } from "../../../../../blocks";
import { messagesButton } from "./index";

export class MessagesButton extends Block {
  constructor(props: TProps) {
    super({ ...props });
  }

  render(): string {
    return messagesButton;
  }
}
