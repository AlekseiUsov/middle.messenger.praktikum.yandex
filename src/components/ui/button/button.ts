import { button } from "./index";
import Block from "../../../blocks/Block";
import { TProps } from "../../../blocks/types";

export class Button extends Block {
  constructor(props: TProps) {
    super({ ...props });
  }
  render() {
    return button;
  }
}
