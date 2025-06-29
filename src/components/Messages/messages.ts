import { messages } from "./index";
import {
  Avatar,
  MessagesList,
  MessagesMenu,
  SendIcon,
  Input,
  Error,
} from "../../components";
import { Block } from "../../blocks";
import { NameEvent, Store } from "../../store";
import {
  AuthController,
  ChatsController,
  MessagesController,
} from "../../contlollers";
import { IMessageProps } from "./components";
import { getFormValues } from "../../utils";

export class Messages extends Block {
  constructor({}) {
    super({
      Avatar: new Avatar({}),
      MessagesMenu: new MessagesMenu(),
      SendIcon: new SendIcon({
        isActive: true,
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
        placeHolder: "введите текст",
      }),
      Error: new Error({
        text: "",
      }),
      MessagesList: new MessagesList({
        messages: [],
      }),
    });
    Store.on(NameEvent.setCurrentChat, this.setCurrentChat.bind(this));
    Store.on(NameEvent.getMessagesForChat, this.setMessages.bind(this));
  }

  async setCurrentChat() {
    if (
      "currentChat" in Store.state &&
      typeof Store.state.currentChat === "number"
    ) {
      const { currentChat } = Store.state;

      const { id } = await AuthController.fetchUser();
      const token = await ChatsController.getToken(currentChat);
      MessagesController.connect(id, String(Store.state.currentChat), token);
    }
  }

  send() {
    const fiels = getFormValues(this.getContent());
    if (fiels.message) {
      MessagesController.send(fiels.message);

      this.setCurrentChat();
      this.setProps({
        Input: new Input({
          ...this.children["Input"].props,
          value: "",
        }),
      });
    } else {
      this.setProps({
        Error: new Error({
          ...this.children["Error"].props,
          text: "введите текст",
        }),
      });
    }
    setTimeout(() => {
      this.setProps({
        Error: new Error({
          ...this.children["Error"].props,
          text: "",
        }),
      });
    }, 3000);
  }

  setMessages() {
    this.setProps({
      MessagesList: new MessagesList({
        messages: Store.state.chatMessages as IMessageProps[],
      }),
    });
  }

  render(): string {
    return messages;
  }
}
