import { AuthApi } from "../../api";
import { SignInFormValues, SignUpFormValues } from "../../api";
import { Router } from "../../router";
import { NameEvent, Paths, Store } from "../../store";

export const BASE_RESOURSES_URL = "https://ya-praktikum.tech/api/v2/resources";

class Controller {
  private api;
  constructor() {
    this.api = new AuthApi();
  }

  public async singUp(data: SignUpFormValues) {
    try {
      const res = await this.api.signUp(data);
      if (res.status === 200) {
        Router.go("/");
      } else {
        const user = JSON.parse(res.response);
        return user;
      }
    } catch (e: unknown) {
      console.log(e);
    }
  }

  public async singIn(data: SignInFormValues) {
    try {
      const res = await this.api.signIn(data);
      if (res.status === 200) {
        Router.go("/messenger");
      } else {
        const auth = JSON.parse(res.response);
        return auth;
      }
    } catch (e: unknown) {
      console.log(e);
    }
  }

  public async logOut() {
    try {
      const res = await this.api.logOut();
      if (res.status === 200) {
        Router.go("/");
      } else {
        const user = JSON.parse(res.response);
        return user;
      }
    } catch (e: unknown) {
      console.log(e);
    }
  }

  public async fetchUser() {
    try {
      const res = await this.api.fetchUser();
      const user = await JSON.parse(res.response);
      Store.set(NameEvent.setUserId, Paths.userId, user.id);

      return user;
    } catch (e: unknown) {
      console.log(e);
    }
  }
}

export const AuthController = new Controller();
