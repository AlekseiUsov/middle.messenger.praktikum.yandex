import { Block } from "../../../blocks";
import { avatar } from "./index";

export class Avatar extends Block {
  constructor(props: { src?: string }) {
    super({ ...props });
  }
  render() {
    return avatar;
  }
}
