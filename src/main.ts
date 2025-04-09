import { Registration, Main, Profile, SignIn } from "./pages/index";

const app = document.getElementById("app") as HTMLElement;

const pages = {
  main: new Main(),
  signin: new SignIn(),
  registration: new Registration(),
  profile: new Profile({
    userName: "Витя",
    isChangePassword: true,
    isEditing: true,
  }),
};

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  if (path === "/") {
    app.replaceChildren(pages.main.getContent());
  }
  const route = path.slice(1) as keyof typeof pages;
  app.replaceChildren(pages[route].getContent());
});
