import { Block, TProps } from "../../../blocks";
import { profileField } from "./index";

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
