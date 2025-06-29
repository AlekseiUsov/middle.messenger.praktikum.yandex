import { Block } from "../../blocks";
import {
  Button,
  ProfileAvatar,
  ProfileField,
  BackButton,
} from "../../components";
import { Patters, ValidateFormMessages } from "../../types";
import { createFileForm } from "../../utils";
import { profile } from "./index";
import { Router } from "../../router";
import {
  AuthController,
  BASE_RESOURSES_URL,
  UserController,
} from "../../contlollers";

export class Profile extends Block {
  constructor() {
    super({
      BackButton: new BackButton({
        events: {
          click: () => {
            Router.go("/messenger");
          },
        },
      }),
      ProfileAvatar: new ProfileAvatar({
        events: {
          input: () => this.loadNewAvatar(),
        },
      }),
      Email: new ProfileField({
        label: "Почта",
        type: "email",
        id: "email",
        name: "email",
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
            Router.go("/change-userdata");
          },
        },
      }),
      ChangePassword: new Button({
        text: "Изменить пароль",
        type: "button",
        isSecondary: true,
        events: {
          click: () => {
            Router.go("/change-password");
          },
        },
      }),
      Exit: new Button({
        text: "Выход",
        type: "submit",
        isThird: true,
        events: {
          click: () => {
            AuthController.logOut();
          },
        },
      }),
    });
  }

  async loadUserData() {
    const user = await AuthController.fetchUser();
    this.children["ProfileAvatar"].setProps({
      avatar: user.avatar ? `${BASE_RESOURSES_URL}/${user.avatar}` : null,
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

  async loadNewAvatar() {
    const formdata = createFileForm();
    const user = await UserController.changeAvatar(formdata);

    this.children["ProfileAvatar"].setProps({
      avatar: `${BASE_RESOURSES_URL}/${user.avatar}`,
    });
  }

  componentDidMount(): void {
    this.loadUserData();
  }

  render(): string {
    return profile;
  }
}
