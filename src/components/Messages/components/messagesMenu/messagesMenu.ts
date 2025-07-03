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
          type: "button",
          events: {
            click: () => this.closeModal(),
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
          type: "button",
          events: {
            click: (e) => this.checkValidation(e),
          },
        }),
      }),
      MenuModalRemoveUser: new Modal({
        Close: new Button({
          text: "x",
          type: "button",
          events: {
            click: () => this.closeModal(),
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
          text: "удалить",
          type: "button",
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

  closeModal() {
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

  async checkValidation(e: unknown) {
    if (e instanceof MouseEvent) {
      e.preventDefault();

      const { id } = getFormValues(this.getContent());
      const errors = validateForm(this.getContent());

      const formValues = {
        users: [Number(id)],
        chatId: Store.state.currentChat as number,
      };

      if (this.props.isShowMenuModalAddUser && (errors.length || !id)) {
        this.children["MenuModalAddUser"].children["Input"].setProps({
          ...this.children["MenuModalAddUser"].children["Input"].props,
          error: true,
        });

        setTimeout(
          () =>
            this.children["MenuModalAddUser"].children["Input"].setProps({
              ...this.children["MenuModalAddUser"].children["Input"].props,
              error: false,
            }),
          3000
        );
      }

      if (this.props.isShowMenuModalAddUser && !errors.length && id) {
        const res = await ChatsController.addUserToChat(formValues);

        if (res !== "OK") {
          this.children["MenuModalAddUser"].children["Input"].setProps({
            ...this.children["MenuModalAddUser"].children["Input"].props,
            error: true,
            errorText: res,
          });

          setTimeout(
            () =>
              this.children["MenuModalAddUser"].children["Input"].setProps({
                ...this.children["MenuModalAddUser"].children["Input"].props,
                error: false,
                errorText: ValidateFormMessages.Id,
              }),
            3000
          );
        } else {
          this.closeModal();
        }
      }

      if (this.props.isShowMenuModalRemoveUser && (errors.length || !id)) {
        this.children["MenuModalRemoveUser"].children["Input"].setProps({
          ...this.children["MenuModalRemoveUser"].children["Input"].props,
          error: true,
        });

        setTimeout(
          () =>
            this.children["MenuModalRemoveUser"].children["Input"].setProps({
              ...this.children["MenuModalRemoveUser"].children["Input"].props,
              error: false,
            }),
          3000
        );
      }

      if (this.props.isShowMenuModalRemoveUser && !errors.length && id) {
        const res = await ChatsController.deleteUserFromChat(formValues);

        if (res !== "OK") {
          this.children["MenuModalRemoveUser"].children["Input"].setProps({
            ...this.children["MenuModalAddUser"].children["Input"].props,
            error: true,
            errorText: res,
          });

          setTimeout(
            () =>
              this.children["MenuModalRemoveUser"].children["Input"].setProps({
                ...this.children["MenuModalRemoveUser"].children["Input"].props,
                error: false,
                errorText: ValidateFormMessages.Id,
              }),
            3000
          );
        } else {
          this.closeModal();
        }
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
