export interface IMessageProps {
  id: number;
  type: "message" | "file";
  chat_id: number;
  user_id: number;
  file: null | File;
  is_read: boolean;
  content: string;
  time: string;
}
