import { signIn } from "./index";
import Block from "../../blocks/Block";
import { InputField, Button, Link } from "../../components";
import {
  getFormValues,
  validateForm,
} from "../../utils/validateFields/vilidateFiels";
import { formFiels, Patters, ValidateFormMessages } from "../../types";

export class SignIn extends Block {
  constructor() {
    super({
      Login: new InputField({
        label: "Логин",
        type: "text",
        id: "login",
        name: "login",
        pattern: Patters.Login,
        errorText: ValidateFormMessages.Login,
        error: false,
        events: {
          blur: () => this.checkValidation("Login" as formFiels),
        },
      }),
      Password: new InputField({
        label: "Пароль",
        type: "password",
        id: "password",
        name: "password",
        pattern: Patters.Password,
        errorText: ValidateFormMessages.Password,
        error: false,
        events: {
          blur: () => this.checkValidation("Password" as formFiels),
        },
      }),
      Button: new Button({
        text: "Авторизоваться",
        type: "submit",
        events: {
          click: () => this.checkValidationAllFields(),
        },
      }),
      Link: new Link({
        text: "Войти",
        href: "/",
      }),
    });
  }

  checkValidation(name: formFiels) {
    const errors = validateForm(this.getContent());
    if (errors.includes(name)) {
      this.children[name].setProps({
        ...this.children[name].props,
        error: true,
      });
    } else {
      this.children[name].setProps({
        ...this.children[name].props,
        error: false,
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
      }
    }
  }

  setInputValue(name: formFiels) {
    const fields = getFormValues(this.getContent());
    this.children[name].setProps({
      fields,
    });
  }

  render(): string {
    return signIn;
  }
}
