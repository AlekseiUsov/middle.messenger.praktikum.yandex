import { profile } from "./index";
import Block from "../../blocks/Block";
import { Button, Link, ProfileAvatar, ProfileField } from "../../components";
import { IProps } from "./types";
import { formFiels, Patters, ValidateFormMessages } from "../../types";
import { validateForm } from "../../utils/validateFields/vilidateFiels";
import { SendIcon } from "../../components/send/sendIcon/sendIcon";

export class Profile extends Block {
  constructor(props: IProps) {
    super({
      isChangePassword: props.isChangePassword,
      isEditing: props.isEditing,
      username: props.userName,
      SendIcon: new SendIcon({}),
      ProfileAvatar: new ProfileAvatar({
        userName: "Паша",
      }),
      OldPassword: new ProfileField({
        label: "Старый пароль",
        type: "password",
        id: "oldPassword",
        name: "oldPassword",
        value: "•••••••••",
        disabled: !props.isEditing,
        pattern: Patters.Password,
        errorText: ValidateFormMessages.Password,
        error: false,
        events: {
          blur: () => this.checkValidation("OldPassword" as formFiels),
        },
      }),
      Password: new ProfileField({
        label: "Новый пароль",
        type: "password",
        id: "password",
        name: "password",
        value: "•••••••••",
        disabled: !props.isEditing,
        pattern: Patters.Password,
        errorText: ValidateFormMessages.Password,
        error: false,
        events: {
          blur: () => this.checkValidation("Password" as formFiels),
        },
      }),
      PasswordTwo: new ProfileField({
        label: "Повторите новый пароль",
        type: "password",
        id: "password_two",
        name: "password_two",
        value: "•••••••••",
        disabled: !props.isEditing,
        pattern: Patters.Password,
        errorText: ValidateFormMessages.Password,
        error: false,
        events: {
          blur: () => this.checkValidation("PasswordTwo" as formFiels),
        },
      }),
      Email: new ProfileField({
        label: "Почта",
        type: "email",
        id: "email",
        name: "email",
        value: "pochta@yandex.ru",
        disabled: !props.isEditing,
        pattern: Patters.Email,
        errorText: ValidateFormMessages.Email,
        error: false,
        events: {
          blur: () => this.checkValidation("Email" as formFiels),
        },
      }),
      Login: new ProfileField({
        label: "Логин",
        type: "text",
        id: "login",
        name: "login",
        value: "login_1990",
        disabled: !props.isEditing,
        pattern: Patters.Login,
        errorText: ValidateFormMessages.Login,
        error: false,
        events: {
          blur: () => this.checkValidation("Login" as formFiels),
        },
      }),
      FirstName: new ProfileField({
        label: "Имя",
        type: "text",
        id: "first_name",
        name: "first_name",
        value: "Витя",
        disabled: !props.isEditing,
        pattern: Patters.FirstNameOrSecondName,
        errorText: ValidateFormMessages.FirstNameOrSecondName,
        error: false,
        events: {
          blur: () => this.checkValidation("FirstName" as formFiels),
        },
      }),
      SecondName: new ProfileField({
        label: "Фамилия",
        type: "text",
        id: "second_name",
        name: "second_name",
        value: "Степанов",
        disabled: !props.isEditing,
        pattern: Patters.FirstNameOrSecondName,
        errorText: ValidateFormMessages.FirstNameOrSecondName,
        error: false,
        events: {
          blur: () => this.checkValidation("SecondName" as formFiels),
        },
      }),
      DisplayName: new ProfileField({
        label: "Имя в чате",
        type: "text",
        id: "display_name",
        name: "display_name",
        value: "Витек",
        disabled: !props.isEditing,
        pattern: Patters.FirstNameOrSecondName,
        errorText: ValidateFormMessages.FirstNameOrSecondName,
        error: false,
        events: {
          blur: () => this.checkValidation("DisplayName" as formFiels),
        },
      }),
      Phone: new ProfileField({
        label: "Телефон",
        type: "tel",
        id: "phone",
        name: "phone",
        value: "+7-909-967-30-30",
        disabled: !props.isEditing,
        pattern: Patters.Phone,
        errorText: ValidateFormMessages.Phone,
        error: false,
        events: {
          blur: () => this.checkValidation("Phone" as formFiels),
        },
      }),
      Save: new Button({
        text: "Сохранить",
        type: "submit",
        events: {
          click: () => this.checkValidationAllFields(),
        },
      }),
      ChangeData: new Button({
        text: "Изменить данные",
        type: "button",
        isSecondary: true,
      }),
      ChangePassword: new Button({
        text: "Изменить данные",
        type: "button",
        isSecondary: true,
      }),
      Exit: new Link({
        text: "Выход",
        href: "/signin",
        isRed: true,
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
    return profile;
  }
}
