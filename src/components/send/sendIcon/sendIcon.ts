import { sendIcon } from "./index";
import Block from "../../../blocks/Block";
import { TProps } from "../../../blocks/types";

export class SendIcon extends Block {
  constructor(props: TProps) {
    super({ ...props });
  }
  render() {
    return sendIcon;
  }
}
