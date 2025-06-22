import { Block, TProps } from "../../../blocks";
import { inputField, Input } from "./index";

export class InputField extends Block {
  constructor(props: TProps) {
    super({
      Input: new Input({ ...props }),
      ...props,
    });
  }

  render() {
    return inputField;
  }
}
