import { Block } from "../../../blocks";
import {
  Button,
  ProfileAvatar,
  ProfileField,
  BackButton,
  Error,
} from "../../../components";
import { formFiels, Patters, ValidateFormMessages } from "../../../types";
import { getFormValues, validateForm, createFileForm } from "../../../utils";
import {
  AuthController,
  BASE_RESOURSES_URL,
  UserController,
} from "../../../contlollers";
import { changeUserDataGrid } from "./index";
import { Router } from "../../../router";

export class ChangeUserData extends Block {
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
      Email: new ProfileField({
        label: "Почта",
        type: "email",
        id: "email",
        name: "email",
        disabled: false,
        pattern: Patters.Email,
        errorText: ValidateFormMessages.Email,
        error: false,
        events: {
          blur: () => {
            this.checkValidation(formFiels.Email);
          },
        },
      }),
      Login: new ProfileField({
        label: "Логин",
        type: "text",
        id: "login",
        name: "login",
        disabled: false,
        pattern: Patters.Login,
        errorText: ValidateFormMessages.Login,
        error: false,
        events: {
          blur: () => {
            this.checkValidation(formFiels.Login);
          },
        },
      }),
      FirstName: new ProfileField({
        label: "Имя",
        type: "text",
        id: "first_name",
        name: "first_name",
        disabled: false,
        pattern: Patters.FirstNameOrSecondName,
        errorText: ValidateFormMessages.FirstNameOrSecondName,
        error: false,
        events: {
          blur: () => {
            this.checkValidation(formFiels.FirstName);
          },
        },
      }),
      SecondName: new ProfileField({
        label: "Фамилия",
        type: "text",
        id: "second_name",
        name: "second_name",
        disabled: false,
        pattern: Patters.FirstNameOrSecondName,
        errorText: ValidateFormMessages.FirstNameOrSecondName,
        error: false,
        events: {
          blur: () => {
            this.checkValidation(formFiels.SecondName);
          },
        },
      }),
      DisplayName: new ProfileField({
        label: "Имя в чате",
        type: "text",
        id: "display_name",
        name: "display_name",
        disabled: false,
        pattern: Patters.FirstNameOrSecondName,
        errorText: ValidateFormMessages.FirstNameOrSecondName,
        error: false,
        events: {
          blur: () => {
            this.checkValidation(formFiels.DisplayName);
          },
        },
      }),
      Phone: new ProfileField({
        label: "Телефон",
        type: "tel",
        id: "phone",
        name: "phone",
        value: "",
        disabled: false,
        pattern: Patters.Phone,
        errorText: ValidateFormMessages.Phone,
        error: false,
        events: {
          blur: () => {
            this.checkValidation(formFiels.Phone);
          },
        },
      }),
      Error: new Error({
        text: "",
      }),
      Save: new Button({
        text: "Сохранить",
        type: "submit",
        isDisabled: false,
        events: {
          click: () => {
            this.checkValidationAllFields();
            this.handleUserSubmit();
          },
        },
      }),
    });
  }

  async handleUserSubmit() {
    const fiels = getFormValues(this.getContent());
    const errors = validateForm(this.getContent());

    const formValue = {
      first_name: fiels.first_name,
      second_name: fiels.second_name,
      display_name: fiels.display_name,
      login: fiels.login,
      email: fiels.email,
      phone: fiels.phone,
    };

    if (!errors.length) {
      const user = await UserController.changeUser(formValue);
      if (user?.reason) {
        if (user.reason) {
          this.children["Error"].setProps({
            text: user.reason,
          });
          setTimeout(() => {
            this.children["Error"].setProps({
              text: "",
            });
          }, 3000);
        }
      }
      this.loadUserData();
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

  componentDidMount(): void {
    this.loadUserData();
  }

  render(): string {
    return changeUserDataGrid;
  }
}
