import { Block } from "../../../../../blocks";
import { menuItem } from "./index";
import { TMenuItemProps } from "./types";

export class MenuItem extends Block {
  constructor(props: TMenuItemProps) {
    super({
      ...props,
      text: props.text,
      isRed: props.isRed,
    });
  }

  render(): string {
    return menuItem;
  }
}
