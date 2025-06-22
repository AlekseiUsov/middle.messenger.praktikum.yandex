import { Block, TProps } from "../../../blocks";
import { SendIcon } from "../sendIcon";
import { backButton } from "./index";

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
