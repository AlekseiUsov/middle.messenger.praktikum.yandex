import { Block } from "../../blocks";
import {
  Modal,
  Button,
  InputField,
  ChatList,
  ChatButton,
  Search,
} from "../../components";
import { ChatsController } from "../../contlollers";
import { NameEvent, Paths, Store } from "../../store";
import { getFormValues } from "../../utils";
import { chats } from "./index";
import { IChatsProps } from "./types";

export class Chats extends Block {
  constructor({ chats }: IChatsProps) {
    super({
      isError: false,
      isShowCreateChatModal: false,
      MenuModalAddChatUser: new Modal({
        Close: new Button({
          text: "x",
          type: "button",
          events: {
            click: () => this.closeModal(),
          },
        }),
        Input: new InputField({
          type: "text",
          id: "title",
          name: "title",
          placeholder: "название чата",
        }),
        Button: new Button({
          text: "создать чат",
          type: "button",
          events: {
            click: (e: unknown) => {
              this.createChat(e);
            },
          },
        }),
      }),
      ChatButton: new ChatButton(),
      Search: new Search({}),
      CreateChat: new Button({
        text: "создать чат",
        type: "button",
        events: {
          click: () => {
            this.showCreateChatModal();
          },
        },
      }),
      ChatList: new ChatList({
        chats,
      }),
    });
  }

  closeModal() {
    this.setProps({
      ...this.props,
      isShowCreateChatModal: false,
    });
  }

  showCreateChatModal() {
    this.setProps({
      ...this.props,
      isShowCreateChatModal: !this.props.isShowCreateChatModal,
    });
  }

  async createChat(e: unknown) {
    if (e instanceof MouseEvent) {
      e.preventDefault();

      const { title } = getFormValues(this.getContent());

      const formValues = {
        title,
      };

      const newChat = await ChatsController.createChat(formValues);
      if (!newChat.reason) {
        Store.set(NameEvent.filterChats, Paths.searchValue, "");
        this.closeModal();
      } else {
        this.children["MenuModalAddChatUser"].children["Input"].setProps({
          ...this.children["MenuModalAddChatUser"].children["Input"].props,
          error: true,
          errorText: newChat.reason,
        });
      }
    }
  }

  render(): string {
    return chats;
  }
}
