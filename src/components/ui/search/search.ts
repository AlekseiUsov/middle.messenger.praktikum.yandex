import { Block } from "../../../blocks";
import { Store, NameEvent, Paths } from "../../../store";
import { debounce, getFormValues } from "../../../utils";
import { Input } from "../inputField";
import { search } from "./index";

export class Search extends Block {
  private debouncedSetInputValue: () => void;

  constructor({}) {
    super({
      Input: new Input({
        type: "search",
        id: "search",
        name: "search",
        events: {
          input: () => this.debouncedSetInputValue(),
        },
      }),
    });
    this.debouncedSetInputValue = debounce(() => {
      const { search } = getFormValues(this.getContent());
      Store.set(NameEvent.filterChats, Paths.searchValue, search as string);
    }, 500);
  }

  render() {
    return search;
  }
}
