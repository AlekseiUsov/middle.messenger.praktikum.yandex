import { search } from "./index";
import Block from "../../../blocks/Block";
import { TProps } from "../../../blocks/types";

export class Search extends Block {
  constructor(props: TProps) {
    super({ ...props });
  }
  render() {
    return search;
  }
}
