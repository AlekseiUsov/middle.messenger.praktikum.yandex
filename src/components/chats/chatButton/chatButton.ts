import { Block } from "../../../blocks";
import { Router } from "../../../router";
import { chatButton } from "./index";

export class ChatButton extends Block {
  constructor() {
    super({
      events: {
        click: () => Router.go("/settings"),
      },
    });
  }
  render() {
    return chatButton;
  }
}
