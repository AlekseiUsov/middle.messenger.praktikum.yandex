import { Block, TProps } from "../../../blocks";
import { profileAvatar } from "./index";

export class ProfileAvatar extends Block {
  constructor(props: TProps) {
    super({ ...props });
  }

  render() {
    return profileAvatar;
  }
}
