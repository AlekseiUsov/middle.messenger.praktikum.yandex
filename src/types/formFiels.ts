export enum formFiels {
  FirstName = "First_name",
  SecondName = "Second_name",
  DisplayName = "Display_name",
  Email = "Email",
  Login = "Login",
  Password = "Password",
  NewPassword = "NewPassword",
  NewPasswordRepeat = "NewPasswordRepeat",
  Phone = "Phone",
}

export type TErrors = Partial<Record<formFiels, string>>;
export type TFormValues = Partial<Record<formFiels, string>>;
