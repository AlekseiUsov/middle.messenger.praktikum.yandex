import { AuthApi } from "../../api/AuthApi/AuthApi";
import { SignInFormValues, SignUpFormValues } from "../../api/AuthApi/types";
import Router from "../../router/router";

class AuthController {
  private api;
  constructor() {
    this.api = new AuthApi();
  }

  public async singUp(data: SignUpFormValues) {
    try {
      const res = await this.api.signUp(data);
      if (res.status === 200) {
      }
    } catch {}
  }

  public async singIn(data: SignInFormValues) {
    const res = await this.api.signIn(data);
    if (res.status === 200 || res.status === 400) {
      Router.go("/messenger");
    }
    if (res.status === 500) {
      Router.go("*");
    }
    if (res.status === 404) {
      Router.go("/not-found");
    }
  }
}

export default new AuthController();
