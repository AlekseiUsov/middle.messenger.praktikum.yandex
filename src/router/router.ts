import { Block } from "../blocks";
import { Route } from "./route";

class Tracer {
  routes: Route[] = [];
  history: History | null = null;
  __currentRoute: Route | null = null;
  __rootQuery: string = "";
  static __instance: Tracer | null = null;

  constructor(rootQuery: string) {
    if (Tracer.__instance) {
      return Tracer.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this.__currentRoute = null;
    this.__rootQuery = rootQuery;

    Tracer.__instance = this;
  }

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, { rootQuery: this.__rootQuery });

    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      this._onRoute(target.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this.__currentRoute && this.__currentRoute !== route) {
      this.__currentRoute.leave();
    }
    this.__currentRoute = route;
    route.navigate(pathname);
  }

  go(pathname: string) {
    this.history?.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history?.back();
  }

  forward() {
    this.history?.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export const Router = new Tracer("#app");
