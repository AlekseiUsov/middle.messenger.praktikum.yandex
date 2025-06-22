import { EventBus } from "../blocks/EventBus";
import { NameEvent, Paths } from "./types";

class Storage extends EventBus {
  state: Record<string, unknown> = {
    searchValue: "",
  };

  get() {
    return this.state;
  }

  set(event: NameEvent, path: Paths, value: unknown) {
    this.state[path] = value;
    this.emit(event);
  }
}
export const Store = new Storage();
