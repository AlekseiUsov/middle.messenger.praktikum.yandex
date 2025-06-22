import { Block, TProps } from "../../../blocks";
import { modal } from "./index";

export class Modal extends Block {
  constructor(props: TProps) {
    super({
      ...props,
    });
  }

  render() {
    return modal;
  }
}
