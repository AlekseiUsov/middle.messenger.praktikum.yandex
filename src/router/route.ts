import { Block, TProps } from "../blocks";

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  const element = block.getContent();
  if (root) {
    root.replaceChildren(element);
    block.dispatchComponentDidMount();
  }
}

export class Route {
  _pathname: string;
  _blockClass: Block;
  _block: Block | null;
  _props: TProps;

  constructor(pathname: string, view: Block, props: TProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    this._block = this._blockClass;
    render(this._props.rootQuery as string, this._block as Block);
    return;
  }
}
