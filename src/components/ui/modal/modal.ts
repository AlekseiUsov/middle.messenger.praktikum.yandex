import { Block, TProps } from "../../../blocks";
import { modal } from "./index";

export class Modal extends Block {
  constructor(props: TProps) {
    super({
      ...props,
      events: {
        submit: (e: unknown) => {
          if (e instanceof SubmitEvent) {
            e.preventDefault();
          }
        },
      },
    });
  }

  render() {
    return modal;
  }
}
