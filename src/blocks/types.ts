import Block from "./Block";

export type Callback = (...args: unknown[]) => void;

export interface IEvents {
  on: () => void;
  off: () => void;
  emit: () => void;
}

export type TChildren = Record<string, Block>;
export type TProps = Record<string, unknown> & {
  events?: Record<string, Callback>;
};
export type TPropsAndChildren = TChildren | TProps;
