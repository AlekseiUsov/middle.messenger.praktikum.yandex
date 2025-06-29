import { Block, TProps } from "../../../blocks";
import { button } from "./index";

export class Button extends Block {
  constructor(props: TProps) {
    super({ ...props });
  }
  render() {
    return button;
  }
}
