export interface ChatNavigationItem {
  label: string;

  description: string;

  route: string;
}

export interface ChatMessage {
  sender: 'user' | 'bot';

  text: string;

  timestamp?: Date;

  loading?: boolean;

  suggestions?: string[];

  relatedCourses?: string[];

  navigation?: ChatNavigationItem[];
}

export interface ChatHistoryItem {
  role: 'user' | 'assistant';

  content: string;
}