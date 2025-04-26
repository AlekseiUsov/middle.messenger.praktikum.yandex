import { registration } from "./index";
import Block from "../../blocks/Block";
import { Button, Link, InputField } from "../../components";
import { formFiels, Patters, ValidateFormMessages } from "../../types";
import { validateForm } from "../../utils/validateFields/vilidateFiels";

export class Registration extends Block {
  constructor() {
    super({
      Email: new InputField({
        label: "Почта",
        type: "email",
        id: "email",
        name: "email",
        pattern: Patters.Email,
        errorText: ValidateFormMessages.Email,
        error: false,
        events: {
          blur: () => this.checkValidation("Email" as formFiels),
        },
      }),
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
      FirstName: new InputField({
        label: "Имя",
        type: "text",
        id: "first_name",
        name: "first_name",
        pattern: Patters.FirstNameOrSecondName,
        errorText: ValidateFormMessages.FirstNameOrSecondName,
        error: false,
        events: {
          blur: () => this.checkValidation("FirstName" as formFiels),
        },
      }),
      SecondName: new InputField({
        label: "Фамилия",
        type: "text",
        id: "second_name",
        name: "second_name",
        pattern: Patters.FirstNameOrSecondName,
        errorText: ValidateFormMessages.FirstNameOrSecondName,
        error: false,
        events: {
          blur: () => this.checkValidation("SecondName" as formFiels),
        },
      }),
      Phone: new InputField({
        label: "Телефон",
        type: "phone",
        id: "phone",
        name: "phone",
        pattern: Patters.Phone,
        errorText: ValidateFormMessages.Phone,
        error: false,
        events: {
          blur: () => this.checkValidation("Phone" as formFiels),
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
      PasswordTwo: new InputField({
        label: "Повторить пароль",
        type: "password",
        id: "password_two",
        name: "password_two",
        pattern: Patters.Password,
        errorText: ValidateFormMessages.Password,
        error: false,
        events: {
          blur: () => this.checkValidation("PasswordTwo" as formFiels),
        },
      }),
      Button: new Button({
        text: "Зарегистрироваться",
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

  render(): string {
    return registration;
  }
}
