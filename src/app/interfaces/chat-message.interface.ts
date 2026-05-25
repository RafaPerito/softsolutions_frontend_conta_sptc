export interface ChatMessage {
  sender: 'user' | 'bot';

  text: string;

  timestamp?: Date;

  loading?: boolean;

  suggestions?: string[];

  relatedCourses?: string[];
}

export interface ChatHistoryItem {
  role: 'user' | 'assistant';

  content: string;
}