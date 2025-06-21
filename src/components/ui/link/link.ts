import { Block, TProps } from "../../../blocks";
import { link } from "./index";

export class Link extends Block {
  constructor(props: TProps) {
    super({ ...props });
  }
  render() {
    return link;
  }
}
