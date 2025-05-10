import { backButton } from "./index";
import Block from "../../../blocks/Block";
import { TProps } from "../../../blocks/types";
import { SendIcon } from "../send/sendIcon/sendIcon";

export class BackButton extends Block {
  constructor(props: TProps) {
    super({
      SendIcon: new SendIcon({}),
      ...props,
    });
  }

  render() {
    return backButton;
  }
}
