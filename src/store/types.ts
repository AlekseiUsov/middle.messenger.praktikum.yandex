export interface IStore {
  avatar: string;
  display_name: string;
  email: string;
  first_name: string;
  id: number;
  login: string;
  phone: string;
  second_name: string;
}

export enum NameEvent {
  setCurrentChat = "setCurrentChat",
  filterChats = "filterChats",
  getMessagesForChat = "getMessagesForChat",
  setUserId = "setUserId",
}

export enum Paths {
  chatMessages = "chatMessages",
  currentChat = "currentChat",
  searchValue = "searchValue",
  userId = "userId",
}
