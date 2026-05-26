import {
  Injectable,
  inject,
} from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';

import {
  Observable,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private readonly http =
    inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:4000/chatbot';

  sendMessage(
    message: string,

    conversationHistory: Array<{
      sender: string;
      text: string;
    }>,
  ): Observable<any> {
    const history =
      conversationHistory.map(
        (item) => ({
          role:
            item.sender === 'user'
              ? 'user'
              : 'assistant',

          content: item.text,
        }),
      );

    return this.http.post(
      this.apiUrl,
      {
        message,

        history,
      },
    );
  }
}