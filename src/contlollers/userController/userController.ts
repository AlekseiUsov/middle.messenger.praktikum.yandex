import {
  IUserChangeFormValues,
  IUserChangePasswordFormValues,
} from "../../api/UserApi/types";
import { UserApi } from "../../api/UserApi/UserApi";

class Controller {
  private api;

  constructor() {
    this.api = new UserApi();
  }

  async changeUser(data: IUserChangeFormValues) {
    try {
      const res = await this.api.changeUser(data);
      const user = await JSON.parse(res.response);
      return user;
    } catch (e: unknown) {
      console.log(e);
    }
  }

  async createUser(data: IUserChangeFormValues) {
    try {
      const res = await this.api.changeUser(data);
      const user = await JSON.parse(res.response);
      return user;
    } catch (e: unknown) {
      console.log(e);
    }
  }

  async changePassword(data: IUserChangePasswordFormValues) {
    try {
      const res = await this.api.changePassword(data);
      const user = await JSON.parse(res.response);
      return user;
    } catch (e: unknown) {
      console.log(e);
    }
  }

  async changeAvatar(data: FormData) {
    try {
      const res = await this.api.changeAvatar(data);
      const user = await JSON.parse(res.response);
      return user;
    } catch (e: unknown) {
      console.log(e);
    }
  }
}

export const UserController = new Controller();
