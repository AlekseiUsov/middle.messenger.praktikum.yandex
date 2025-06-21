import { Block, TProps } from "../../../blocks";
import { sendIcon } from "./index";

export class SendIcon extends Block {
  constructor(props: TProps) {
    super({ ...props });
  }
  render() {
    return sendIcon;
  }
}
