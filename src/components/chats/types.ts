import { TProps } from "../../blocks/types";
import { IChatProps } from "./chat/types";

export type IChatsProps = {
  chats: IChatProps[];
} & TProps;
