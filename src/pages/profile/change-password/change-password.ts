import { Block } from "../../../blocks";
import {
  Button,
  ProfileAvatar,
  ProfileField,
  BackButton,
} from "../../../components";
import { formFiels, Patters, ValidateFormMessages } from "../../../types";
import { getFormValues, validateForm, createFileForm } from "../../../utils";
import {
  AuthController,
  BASE_RESOURSES_URL,
  UserController,
} from "../../../contlollers";
import { changePasswordGrid } from "./index";
import { Router } from "../../../router";

export class ChangePassword extends Block {
  constructor() {
    super({
      BackButton: new BackButton({
        events: {
          click: () => {
            Router.go("/settings");
          },
        },
      }),
      ProfileAvatar: new ProfileAvatar({
        userName: "",
        events: {
          input: () => {
            const formdata = createFileForm();
            UserController.changeAvatar(formdata);
          },
        },
      }),
      OldPassword: new ProfileField({
        label: "Старый пароль",
        type: "password",
        id: "oldPassword",
        name: "oldPassword",
        value: "",
        pattern: Patters.Password,
        errorText: ValidateFormMessages.Password,
        error: false,
        events: {
          blur: () => {
            this.checkValidation(formFiels.Password);
          },
        },
      }),
      NewPassword: new ProfileField({
        label: "Новый пароль",
        type: "password",
        id: "newPassword",
        name: "newPassword",
        value: "",
        pattern: Patters.Password,
        errorText: ValidateFormMessages.Password,
        error: false,
        events: {
          blur: () => {
            this.checkValidation(formFiels.NewPassword);
          },
        },
      }),
      PasswordTwo: new ProfileField({
        label: "Повторите новый пароль",
        type: "password",
        id: "password_two",
        name: "password_two",
        value: "",
        pattern: Patters.Password,
        errorText: ValidateFormMessages.Password,
        error: false,
        events: {
          blur: () => {
            this.checkValidation(formFiels.PasswordTwo);
          },
        },
      }),
      Save: new Button({
        text: "Сохранить",
        type: "submit",
        isDisabled: false,
        events: {
          click: () => {
            this.handlePasswordSubmit();
          },
        },
      }),
    });
  }

  handlePasswordSubmit() {
    const fiels = getFormValues(this.getContent());
    const errors = validateForm(this.getContent());

    const formValue = {
      oldPassword: fiels.oldPassword,
      newPassword: fiels.newPassword,
    };

    if (fiels.password_two !== fiels.newPassword && !errors.length) {
      alert("Пароли не совпадают");
    }

    if (!errors.length && fiels.password_two === fiels.newPassword) {
      UserController.changePassword(formValue);
      this.setProps({ ...this.props, isChangePassword: false });
    }
  }

  checkValidation(name: formFiels) {
    const errors = validateForm(this.getContent());

    if (errors.includes(name)) {
      this.children[name].setProps({
        ...this.children[name].props,
        error: true,
      });
      this.children["Save"].setProps({
        isDisabled: true,
      });
    } else {
      this.children[name].setProps({
        ...this.children[name].props,
        error: false,
      });
      this.children["Save"].setProps({
        isDisabled: false,
      });
    }
  }

  checkValidationAllFields() {
    const allFiels = Object.keys(this.children);
    const errors = validateForm(this.getContent());

    for (const fiels of allFiels) {
      if (errors.includes(fiels as formFiels)) {
        this.children[fiels].setProps({
          ...this.children[fiels].props,
          error: true,
        });
        this.children["Save"].setProps({
          isDisabled: true,
        });
      } else {
        this.children[fiels].setProps({
          ...this.children[fiels].props,
          error: false,
        });
        this.children["Save"].setProps({
          isDisabled: false,
        });
      }
    }
  }

  async loadUserAvatar() {
    const user = await AuthController.fetchUser();

    this.children["ProfileAvatar"].setProps({
      avatar: user.avatar ? `${BASE_RESOURSES_URL}/${user.avatar}` : null,
    });
  }

  componentDidMount(): void {
    this.loadUserAvatar();
  }

  render(): string {
    return changePasswordGrid;
  }
}
