import { Block } from "../../../../../blocks";
import { messageIcon } from "./index";

export class MessageIcon extends Block {
  constructor(props: { is_read: boolean }) {
    super({
      fill: props.is_read ? "#3369f3" : "#999",
    });
  }

  render(): string {
    return messageIcon;
  }
}
