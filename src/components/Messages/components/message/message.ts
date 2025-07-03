import { Block } from "../../../../blocks";
import { Store } from "../../../../store";
import { formatTime } from "../../../../utils/formatTime/formatTime";
import { message } from "./index";
import { MessageIcon } from "./MessageIcon";
import { IMessageProps } from "./type";

export class Message extends Block {
  constructor(props: IMessageProps) {
    const { time, is_read, user_id } = props;

    super({
      ...props,
      MessageIcon: new MessageIcon({
        is_read,
      }),
      time: formatTime(time),
      isYou: user_id === Store.state.userId,
    });
  }

  render(): string {
    return message;
  }
}
