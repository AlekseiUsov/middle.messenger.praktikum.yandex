import {
  IUserChangeFormValues,
  IUserChangePasswordFormValues,
} from "../../api/UserApi/types";
import { UserApi } from "../../api/UserApi/UserApi";

class UserController {
  private api;

  constructor() {
    this.api = new UserApi();
  }

  async changeUser(data: IUserChangeFormValues) {
    const res = await this.api.changeUser(data);
    return res;
  }

  async changePassword(data: IUserChangePasswordFormValues) {
    const res = await this.api.changePassword(data);
    return res;
  }

  async changeAvatar(data: FormData) {
    const res = await this.api.changeAvatar(data);
    return res;
  }
}

export default new UserController();
