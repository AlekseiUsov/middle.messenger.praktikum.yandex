import { Block } from "../../blocks";
import { Link } from "../../components";
import { error } from "./index";

export class Error extends Block {
  constructor() {
    super({
      Link: new Link({
        text: "Назад к чатам",
        href: "/messenger",
      }),
    });
  }
  render(): string {
    return error;
  }
}
