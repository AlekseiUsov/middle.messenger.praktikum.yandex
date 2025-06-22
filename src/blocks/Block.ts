import Handlebars from "handlebars";
import { TChildren, TProps, TPropsAndChildren } from "./types";
import { EventBus } from "./EventBus";
import { v4 as makeId } from "uuid";

export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private _element!: HTMLElement;
  eventBus: EventBus;
  children: TChildren = {};
  props: TProps = {};
  lists: Record<string, unknown>;
  _id: string = "";

  constructor(propsAndChildren: TPropsAndChildren) {
    const { props, children, lists } =
      this._getPropsAndChildren(propsAndChildren);
    this.children = children;
    this._id = makeId();
    this.props = this._makePropsProxy({ ...props, _id: this._id });
    this.lists = this._makePropsProxy({ ...lists });
    this.eventBus = new EventBus();
    this._registerEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, (oldProps, newProps) =>
      this._componentDidUpdate(oldProps as TProps, newProps as TProps)
    );
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _addEvents(): void {
    const { events } = this.props;
    if (events) {
      Object.keys(events).forEach((eventName) => {
        if (this._element) {
          this._element.addEventListener(eventName, events[eventName]);
        }
      });
    }
  }

  private _removeEvents(): void {
    const { events } = this.props;
    if (events) {
      Object.keys(events).forEach((eventName) => {
        if (this._element)
          this._element.removeEventListener(eventName, events[eventName]);
      });
    }
  }

  private _init() {
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  dispatchComponentDidUpdate() {
    this.eventBus.emit(Block.EVENTS.FLOW_CDU);
  }

  componentDidUpdate() {}

  private _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const isPropsEqual = this._isEqual(oldProps, newProps);
    if (isPropsEqual) {
      return;
    }
    this._render();
  }

  setProps = (nextProps: TProps): void => {
    if (!nextProps) {
      return;
    }
    const oldProps = { ...this.props };
    if (!this._isEqual(this.props, nextProps)) {
      this.props = { ...this.props, ...nextProps };
    }
    const { children } = this._getPropsAndChildren(this.props);
    this.children = { ...this.children, ...children };
    this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
  };

  getContent() {
    return this._element;
  }

  _render() {
    const props = { ...this.props };
    const tmpId = Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.children).forEach(([key, child]) => {
      props[key] = `<div data-id='${child._id}'></div>`;
    });

    const fragment = this._createDocumentElement("template");
    fragment.innerHTML = Handlebars.compile(this.render())(props);
    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id='${child._id}']`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.lists).forEach(([, child]) => {
      const listCont = this._createDocumentElement("template");
      if (Array.isArray(child)) {
        child.forEach((item) => {
          if (item instanceof Block) {
            listCont.content.append(item.getContent());
          } else {
            listCont.content.append(`${item}`);
          }
        });
        const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
        if (stub) {
          stub.replaceWith(listCont.content);
        }
      }
    });

    const newElement = fragment.content.firstChild as HTMLElement;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this._removeEvents();
    this._element = newElement;
    this._addEvents();
  }

  render(): string {
    return "";
  }

  private _makePropsProxy(props: TProps) {
    return new Proxy(props, {
      get(target: TProps, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target: TProps, prop: string, value: unknown) => {
        const oldTarget = { ...target };
        target[prop] = value;
        this.eventBus.emit(Block.EVENTS.FLOW_CDM, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }
  private _getPropsAndChildren(propsAndChildren: TPropsAndChildren) {
    const children: TChildren = {};
    const props: TProps = {};
    const lists: TProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (key === "lists") {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName) as HTMLTemplateElement;
    element.setAttribute("data-id", this._id);
    return element;
  }

  private _isEqual(oldProps: TProps, newProps: TProps): boolean {
    return Object.keys(newProps).every((key) => {
      const value1 = oldProps[key];
      const value2 = newProps[key];

      return value1 === value2;
    });
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
