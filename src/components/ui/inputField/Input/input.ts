import { Block, TProps } from "../../../../blocks";
import { input } from "./index";

export class Input extends Block {
  constructor(props: TProps) {
    super({
      ...props,
    });
  }

  render() {
    return input;
  }
}
