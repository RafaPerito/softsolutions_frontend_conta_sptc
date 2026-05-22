import { Injectable, inject } from '@angular/core';

import {
  HttpClient,
} from '@angular/common/http';

import { Observable } from 'rxjs';

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
  ): Observable<any> {
    return this.http.post(
      this.apiUrl,
      {
        message,
      },
    );
  }
}