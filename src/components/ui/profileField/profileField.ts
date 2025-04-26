import { profileField } from "./index";
import Block from "../../../blocks/Block";
import { TProps } from "../../../blocks/types";
import { Input } from "../inputField/Input/input";

export class ProfileField extends Block {
  constructor(props: TProps) {
    super({
      Input: new Input({ ...props }),
      ...props,
    });
  }
  render() {
    return profileField;
  }
}
