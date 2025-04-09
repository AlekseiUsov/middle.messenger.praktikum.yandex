import { link } from "./index";
import Block from "../../../blocks/Block";
import { TProps } from "../../../blocks/types";

export class Link extends Block {
  constructor(props: TProps) {
    super({ ...props });
  }
  render() {
    return link;
  }
}
