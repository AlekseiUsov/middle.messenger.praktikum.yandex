import * as Pages from "./pages";
import * as Components from "./components";
import Handlebars from "handlebars";

const app = document.getElementById("app") as HTMLElement;

const pages = {
  main: [Pages.Main],
};

Object.entries(Components).forEach(([name, template]) =>
  Handlebars.registerPartial(name, template)
);
const [source, context] = pages["main"];
const template = Handlebars.compile(source);
app.innerHTML = template(context);
