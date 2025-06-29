import { BaseApi } from "../BaseApi";
import { SignInFormValues, SignUpFormValues } from "./types";

export class AuthApi extends BaseApi {
  constructor(endpoint: string = "/auth") {
    super(endpoint);
  }

  signUp(data: SignUpFormValues) {
    return this.http.post("/signup", {
      data,
    });
  }

  signIn(data: SignInFormValues) {
    return this.http.post("/signin", {
      data,
    });
  }

  logOut() {
    return this.http.post("/logout", {});
  }

  fetchUser() {
    return this.http.get("/user", {});
  }
}
