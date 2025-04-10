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
import { getFormValues, validateForm } from "../../utils";
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
          events: {
            click: (e) => this.closeModal(e),
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
          type: "submit",
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

  closeModal(e: unknown) {
    if (e instanceof MouseEvent) {
      e.preventDefault();

      this.setProps({
        ...this.props,
        isShowCreateChatModal: false,
      });
    }
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
      const errors = validateForm(this.getContent());

      if (errors.length) {
        this.children["MenuModalAddChatUser"].children["Input"].setProps({
          ...this.children["MenuModalAddChatUser"].children["Input"].props,
          error: true,
        });
      }

      if (!errors.length) {
        const data = getFormValues(this.getContent());

        const formValues = {
          title: data.title,
        };

        const newChat = await ChatsController.createChat(formValues);
        if (!newChat.reason) {
          Store.set(NameEvent.filterChats, Paths.searchValue, "");
        }
        this.closeModal(e);
      }
    }
  }

  render(): string {
    return chats;
  }
}
