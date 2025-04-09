import { send } from "./index";
import Block from "../../blocks/Block";
import { TProps } from "../../blocks/types";
import { SendIcon } from "./sendIcon/sendIcon";

export class Send extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      SendIcon: new SendIcon({}),
    });
  }
  render() {
    return send;
  }
}
