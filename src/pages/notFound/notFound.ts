import { notFound } from "./index";
import Block from "../../blocks/Block";
import { Link } from "../../components";

export class NotFound extends Block {
  constructor() {
    super({
      Link: new Link({
        text: "Назад к чатам",
        href: "/messenger",
      }),
    });
  }
  render() {
    return notFound;
  }
}
