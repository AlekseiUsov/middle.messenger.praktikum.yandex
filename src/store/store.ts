import { IStore } from "./types";

class Store {
  state: Record<string, IStore> = {};

  get() {
    return this.state;
  }

  set(path: string, value: IStore) {
    this.state[path] = value;
  }
}
const store = new Store();
export default store;
