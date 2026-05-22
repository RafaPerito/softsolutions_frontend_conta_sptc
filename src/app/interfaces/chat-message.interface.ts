export interface ChatMessage {
  sender: 'user' | 'bot';

  text: string;

  timestamp?: Date;

  loading?: boolean;
}