import { profileField } from "./index";
import Block from "../../../blocks/Block";
import { TProps } from "../../../blocks/types";

export class ProfileField extends Block {
  constructor(props: TProps) {
    super({
      ...props,
    });
  }
  render() {
    return profileField;
  }
}
