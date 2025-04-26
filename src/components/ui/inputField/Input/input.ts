import Block from "../../../../blocks/Block";
import { TProps } from "../../../../blocks/types";
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
