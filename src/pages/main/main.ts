import { Block } from "../../blocks";
import { ChatList, Chats, Messages } from "../../components";
import { ChatsController } from "../../contlollers";
import { NameEvent, Store } from "../../store";
import { main } from "./index";

export class Main extends Block {
  constructor() {
    super({
      isOpenChat: false,
      Chats: new Chats({
        chats: [],
      }),
      Messages: new Messages({}),
    });
    Store.on(NameEvent.filterChats, this.loadChats.bind(this));
    Store.on(NameEvent.setCurrentChat, this.setIsShowChat.bind(this));
    Store.on(NameEvent.setUserId, this.setUserId.bind(this));
  }

  async loadChats() {
    const chats = await ChatsController.getChats(
      Store.state.searchValue as string
    );
    if (chats.reason) {
      this.children["Chats"].setProps({
        isError: true,
      });
    } else {
      this.children["Chats"].setProps({
        ChatList: new ChatList({
          chats,
        }),
      });
    }
  }

  setUserId() {}

  setIsShowChat() {
    if ("currentChat" in Store.state && Store.state.currentChat) {
      this.setProps({
        ...this.props,
        isOpenChat: true,
      });
    } else {
      this.setProps({
        ...this.props,
        isOpenChat: false,
      });
      this.loadChats();
    }
  }

  componentDidMount(): void {
    this.loadChats();
  }

  render(): string {
    return main;
  }
}
