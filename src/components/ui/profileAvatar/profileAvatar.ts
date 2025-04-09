import { profileAvatar } from "./index";
import Block from "../../../blocks/Block";
import { TProps } from "../../../blocks/types";

export class ProfileAvatar extends Block {
  constructor(props: TProps) {
    super({ ...props });
  }
  render() {
    return profileAvatar;
  }
}
