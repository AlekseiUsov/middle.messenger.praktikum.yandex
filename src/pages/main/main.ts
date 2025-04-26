import { main } from "./index";
import Block from "../../blocks/Block";
import { Chats, Messages } from "../../components";

export class Main extends Block {
  constructor() {
    super({
      Chats: new Chats(),
      Messages: new Messages({}),
    });
  }

  render(): string {
    return main;
  }
}
