import {
  Button,
  ProfileAvatar,
  ProfileField,
  BackButton,
} from "../../../components";
import { formFiels, Patters, ValidateFormMessages } from "../../../types";
import {
  getFormValues,
  validateForm,
  createFileForm,
} from "../../../utils/validateFields/vilidateFiels";
import userController from "../../../contlollers/userController/userController";
import { AuthApi } from "../../../api/AuthApi/AuthApi";
import Block from "../../../blocks/Block";
import { changeUserDataGrid } from "./index";
import router from "../../../router/router";

export class ChangeUserData extends Block {
  constructor() {
    super({
      BackButton: new BackButton({
        events: {
          click: () => {
            router.go("/settings");
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
        value: "",
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
        value: "",
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
        value: "",
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
        value: "",
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

  handleUserSubmit() {
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
      userController.changeUser(formValue);
      this.setProps({ ...this.props });
    }
  }

  checkValidation(name: formFiels) {
    const errors = validateForm(this.getContent());
    console.log(errors, name);
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
    return changeUserDataGrid;
  }
}
