import { TProps } from "../../../../blocks";
import { IMessageProps } from "../message";

export type TMessagesProps = {
  messages: IMessageProps[];
} & TProps;
