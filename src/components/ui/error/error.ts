import { Block, TProps } from "../../../blocks";
import { error } from "./index";

export class Error extends Block {
  constructor(props: TProps) {
    super({
      ...props,
    });
  }

  render() {
    return error;
  }
}
