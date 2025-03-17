import * as Pages from "./pages";
import * as Components from "./components";
import Handlebars from "handlebars";
import data from "./components/chats/data.json";

const app = document.getElementById("app") as HTMLElement;

const charts = JSON.parse(JSON.stringify(data));

const pages = {
  main: [Pages.Main],
  signin: [Pages.SignIn],
  registration: [Pages.Registration],
  profile: [Pages.Profile],
  notFound: [Pages.NotFound],
  error: [Pages.Error],
};

Object.entries(Components).forEach(([name, template]) =>
  Handlebars.registerPartial(name, template)
);

export const navigate = (page: keyof typeof pages) => {
  const [source] = pages[page];
  const template = Handlebars.compile(source);
  app.innerHTML = template(charts);
};

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  if (path === "/") {
    navigate("main");
  }
  const route = path.slice(1) as keyof typeof pages;
  navigate(route);
});
