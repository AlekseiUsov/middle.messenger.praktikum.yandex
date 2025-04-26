import { avatar } from "./index";
import Block from "../../../blocks/Block";

export class Avatar extends Block {
  constructor(props: { src?: string }) {
    super({ ...props });
  }
  render() {
    return avatar;
  }
}
