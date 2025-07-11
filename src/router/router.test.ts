import { Block } from "../blocks";
import { Router } from "./router";

class TestBlock extends Block {
  render() {
    return "<div>{{text}}</div>";
  }
}

const historyBack = jest.spyOn(window.history, "back");
const historyForward = jest.spyOn(window.history, "forward");
const historyPushState = jest.spyOn(window.history, "pushState");

test("use добавляет роут", () => {
  Router.use("/test", TestBlock as unknown as Block);
  expect(Router["routes"].length).toBe(1);
});

test("getRoute возвращает нужный роут", () => {
  Router.use("/foo", TestBlock as unknown as Block);
  expect(Router.getRoute("/foo")).toBeDefined();
});

test("ведет на другой history.pushState", () => {
  Router.use("/go", TestBlock as unknown as Block);
  const spy = jest.spyOn(Router, "_onRoute");
  Router.go("/otherRoute");
  expect(spy).toHaveBeenCalledWith("/otherRoute");
  expect(historyPushState).toHaveBeenCalledWith({}, "", "/otherRoute");
});

test("back вызывает history.back", () => {
  Router.back();
  expect(historyBack).toHaveBeenCalled();
});

test("forward вызывает history.forward", () => {
  Router.forward();
  expect(historyForward).toHaveBeenCalled();
});
