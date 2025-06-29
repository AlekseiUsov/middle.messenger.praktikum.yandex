import {
  Registration,
  Main,
  Profile,
  SignIn,
  NotFound,
  Error,
  ChangePassword,
  ChangeUserData,
} from "./pages/index";
import { Router } from "./router";

document.addEventListener("DOMContentLoaded", () => {
  Router.use("/", new SignIn());
  Router.use("/messenger", new Main());
  Router.use("/sign-up", new Registration());
  Router.use("/settings", new Profile());
  Router.use("/not-found", new NotFound());
  Router.use("*", new Error());
  Router.use("/change-password", new ChangePassword());
  Router.use("/change-userdata", new ChangeUserData()).start();
});
