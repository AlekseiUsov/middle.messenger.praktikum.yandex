import { Block } from "../../blocks";
import { Link } from "../../components";
import { notFound } from "./index";

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
