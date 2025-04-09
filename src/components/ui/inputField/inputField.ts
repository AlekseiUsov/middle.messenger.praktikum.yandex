import { inputField } from "./index";
import Block from "../../../blocks/Block";
import { Input } from "./Input/input";
import { TProps } from "../../../blocks/types";

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
