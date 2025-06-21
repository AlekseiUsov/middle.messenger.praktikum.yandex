import { Block } from "../../../blocks";
import { Store, NameEvent } from "../../../store";
import { Paths } from "../../../store/types";
import { Avatar } from "../../ui";
import { chat } from "./index";
import { IChatProps } from "./types";

export class Chat extends Block {
  constructor(props: IChatProps) {
    super({
      title: props.title,
      id: props.id,
      Avatar: new Avatar({
        src: props.avatar,
      }),
      events: {
        click: () =>
          Store.set(
            NameEvent.setCurrentChat,
            Paths.currentChat,
            this.props.id as number
          ),
      },
    });
  }
  render(): string {
    return chat;
  }
}
