export enum formFiels {
  FirstName = "FirstName",
  SecondName = "SecondName",
  DisplayName = "DisplayName",
  Email = "Email",
  Login = "Login",
  Password = "Password",
  OldPassword = "OldPassword",
  PasswordTwo = "PasswordTwo",
  NewPassword = "NewPassword",
  NewPasswordRepeat = "NewPasswordRepeat",
  Phone = "Phone",
}

export type TErrors = Partial<Record<formFiels, string>>;
export type TFormValues = Partial<Record<formFiels, string>>;
