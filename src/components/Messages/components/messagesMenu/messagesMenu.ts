import { Block } from "../../../../blocks";
import { messagesMenu } from "./index";
import { MessagesButton, MenuItem } from "../../components";
import { Modal, Button, InputField } from "../../../ui";
import { Patters, ValidateFormMessages } from "../../../../types";
import { getFormValues, validateForm } from "../../../../utils";
import { ChatsController } from "../../../../contlollers";
import { NameEvent, Paths, Store } from "../../../../store";

export class MessagesMenu extends Block {
  constructor() {
    super({
      isMenuOpen: false,
      isShowMenuModalAddUser: false,
      isShowMenuModalRemoveUser: false,
      MenuButton: new MessagesButton({
        events: {
          click: () => this.showMenu(),
        },
      }),
      MenuItemAdd: new MenuItem({
        text: "добавить пользователя",
        events: {
          click: () => {
            this.showMenumodalAddUser();
            this.showMenu();
          },
        },
      }),
      MenuItemRemove: new MenuItem({
        text: "удалить пользователя",
        isRed: true,
        events: {
          click: () => {
            this.showMenumodalRemoveUser();
            this.showMenu();
          },
        },
      }),
      MenuItemRemoveChat: new MenuItem({
        text: "удалить чат",
        isRed: true,
        events: {
          click: () => this.deleteChat(),
        },
      }),
      MenuModalAddUser: new Modal({
        title: "Добавить пользователя",
        Close: new Button({
          text: "x",
          events: {
            click: (e) => this.closeModal(e),
          },
        }),
        Input: new InputField({
          type: "text",
          id: "id",
          name: "id",
          pattern: Patters.Id,
          value: "",
          errorText: ValidateFormMessages.Id,
          placeholder: "Добавьте id пользователя",
        }),
        Button: new Button({
          text: "добавить",
          type: "submit",
          events: {
            click: (e) => this.checkValidation(e),
          },
        }),
      }),
      MenuModalRemoveUser: new Modal({
        Close: new Button({
          text: "x",
          events: {
            click: (e) => this.closeModal(e),
          },
        }),
        Input: new InputField({
          type: "text",
          id: "id",
          name: "id",
          value: "",
          pattern: Patters.Id,
          errorText: ValidateFormMessages.Id,
          placeholder: "Добавьте id пользователя",
        }),
        Button: new Button({
          text: "удалить",
          type: "submit",
          events: {
            click: (e) => this.checkValidation(e),
          },
        }),
        title: "Удалите пользователя",
      }),
    });
  }

  showMenu() {
    this.setProps({
      ...this.props,
      isMenuOpen: !this.props.isMenuOpen,
    });
  }

  closeModal(e: unknown) {
    if (e instanceof MouseEvent) {
      e.preventDefault();

      if (this.props.isShowMenuModalAddUser) {
        this.setProps({
          ...this.props,
          isShowMenuModalAddUser: false,
        });
      }

      if (this.props.isShowMenuModalRemoveUser) {
        this.setProps({
          ...this.props,
          isShowMenuModalRemoveUser: false,
        });
      }
    }
  }

  checkValidation(e: unknown) {
    if (e instanceof MouseEvent) {
      e.preventDefault();
      const errors = validateForm(this.getContent());

      if (errors.length) {
        if (this.props.isShowMenuModalAddUser) {
          this.children["MenuModalAddUser"].children["Input"].setProps({
            ...this.children["MenuModalAddUser"].children["Input"].props,
            error: true,
          });
        }

        if (this.props.isShowMenuModalRemoveUser) {
          this.children["MenuModalRemoveUser"].children["Input"].setProps({
            ...this.children["MenuModalRemoveUser"].children["Input"].props,
            error: true,
          });
        }
      }

      if (!errors.length) {
        const data = getFormValues(this.getContent());

        this.children["MenuModalAddUser"].children["Input"].setProps({
          ...this.children["MenuModalAddUser"].children["Input"].props,
          error: false,
        });

        const formValues = {
          users: [Number(data.id)],
          chatId: Store.state.currentChat as number,
        };

        if (this.props.isShowMenuModalAddUser) {
          ChatsController.addUserToChat(formValues);
        }

        if (this.props.isShowMenuModalRemoveUser) {
          ChatsController.deleteUserFromChat(formValues);
        }
        this.closeModal(e);
      }
    }
  }

  deleteChat() {
    ChatsController.deleteChat(Store.state.currentChat as number);
    Store.set(NameEvent.setCurrentChat, Paths.currentChat, null);
    Store.set(NameEvent.filterChats, Paths.searchValue, "");
    this.showMenu();
  }

  showMenumodalAddUser() {
    this.setProps({
      ...this.props,
      isShowMenuModalAddUser: true,
    });
  }

  async showMenumodalRemoveUser() {
    const chatId = Store.state.currentChat as string;
    const users = await ChatsController.getUsers(chatId);

    this.children["MenuModalRemoveUser"].setProps({
      users,
    });

    this.setProps({
      ...this.props,
      isShowMenuModalRemoveUser: true,
    });
  }

  render(): string {
    return messagesMenu;
  }
}
