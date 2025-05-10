import { profile } from "./index";
import Block from "../../blocks/Block";
import { Button, Link, ProfileAvatar, ProfileField } from "../../components";
import { Patters, ValidateFormMessages } from "../../types";
import { createFileForm } from "../../utils/validateFields/vilidateFiels";
import userController from "../../contlollers/userController/userController";
import { AuthApi } from "../../api/AuthApi/AuthApi";
import router from "../../router/router";
import { BackButton } from "../../components/ui/backButton/backButton";

export class Profile extends Block {
  constructor() {
    super({
      BackButton: new BackButton({
        events: {
          click: () => {
            router.go("/messenger");
          },
        },
      }),
      ProfileAvatar: new ProfileAvatar({
        userName: "",
        events: {
          input: () => {
            const formdata = createFileForm();
            userController.changeAvatar(formdata);
          },
        },
      }),
      Email: new ProfileField({
        label: "Почта",
        type: "email",
        id: "email",
        name: "email",
        value: "",
        disabled: true,
        pattern: Patters.Email,
        errorText: ValidateFormMessages.Email,
        error: false,
      }),
      Login: new ProfileField({
        label: "Логин",
        type: "text",
        id: "login",
        name: "login",
        value: "",
        disabled: true,
        pattern: Patters.Login,
        errorText: ValidateFormMessages.Login,
        error: false,
      }),
      FirstName: new ProfileField({
        label: "Имя",
        type: "text",
        id: "first_name",
        name: "first_name",
        value: "",
        disabled: true,
        pattern: Patters.FirstNameOrSecondName,
        errorText: ValidateFormMessages.FirstNameOrSecondName,
        error: false,
      }),
      SecondName: new ProfileField({
        label: "Фамилия",
        type: "text",
        id: "second_name",
        name: "second_name",
        value: "",
        disabled: true,
        pattern: Patters.FirstNameOrSecondName,
        errorText: ValidateFormMessages.FirstNameOrSecondName,
        error: false,
      }),
      DisplayName: new ProfileField({
        label: "Имя в чате",
        type: "text",
        id: "display_name",
        name: "display_name",
        value: "",
        disabled: true,
        pattern: Patters.FirstNameOrSecondName,
        errorText: ValidateFormMessages.FirstNameOrSecondName,
        error: false,
      }),
      Phone: new ProfileField({
        label: "Телефон",
        type: "tel",
        id: "phone",
        name: "phone",
        value: "",
        disabled: true,
        pattern: Patters.Phone,
        errorText: ValidateFormMessages.Phone,
        error: false,
      }),
      ChangeData: new Button({
        text: "Изменить данные",
        type: "button",
        isSecondary: true,
        events: {
          click: () => {
            router.go("/change-userdata");
          },
        },
      }),
      ChangePassword: new Button({
        text: "Изменить пароль",
        type: "button",
        isSecondary: true,
        events: {
          click: () => {
            router.go("/change-password");
          },
        },
      }),
      Exit: new Link({
        text: "Выход",
        href: "/signin",
        isRed: true,
      }),
    });
  }

  async loadUserData() {
    const api = new AuthApi();
    const res = await api.fetchUser();
    const user = await JSON.parse(res.response);

    this.children["ProfileAvatar"].setProps({
      avatar: user.avatar
        ? `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`
        : null,
      userName: user.first_name,
    });

    this.children["FirstName"].setProps({
      value: user.first_name,
    });

    this.children["SecondName"].setProps({
      value: user.second_name,
    });

    this.children["Email"].setProps({
      value: user.email,
    });

    this.children["Login"].setProps({
      value: user.login,
    });

    this.children["DisplayName"].setProps({
      value: user.display_name,
    });

    this.children["Phone"].setProps({
      value: user.phone,
    });
  }

  componentDidMount(): void {
    this.loadUserData();
  }

  render(): string {
    return profile;
  }
}
