import { send } from "./index";
import Block from "../../../blocks/Block";
import { TProps } from "../../../blocks/types";
import { SendIcon } from "./sendIcon/sendIcon";
import { getFormValues } from "../../../utils/validateFields/vilidateFiels";
import { Input } from "../inputField/Input/input";
import chatsController from "../../../contlollers/chatsController/chatsController";

export class Send extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      SendIcon: new SendIcon({
        events: {
          click: () => {
            this.send();
          },
        },
      }),
      Input: new Input({
        type: "text",
        name: "message",
        id: "message",
      }),
    });
  }

  send() {
    const fiels = getFormValues(this.getContent());

    const formValue = {
      title: fiels.message,
    };

    chatsController.createChat(formValue);
  }

  changeInputValue() {}

  render() {
    return send;
  }
}
