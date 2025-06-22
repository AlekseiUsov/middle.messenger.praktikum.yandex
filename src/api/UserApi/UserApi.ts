import { BaseApi } from "../BaseApi";
import { IUserChangeFormValues, IUserChangePasswordFormValues } from "./types";

export class UserApi extends BaseApi {
  constructor(endpoint: string = "/user") {
    super(endpoint);
  }

  changeUser(data: IUserChangeFormValues) {
    return this.http.put("/profile", { data });
  }

  changePassword(data: IUserChangePasswordFormValues) {
    return this.http.put("/password", { data });
  }

  changeAvatar(data: FormData) {
    return this.http.put("/profile/avatar", { data });
  }
}
