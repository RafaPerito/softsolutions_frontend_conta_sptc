import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import {
  CommonModule,
} from '@angular/common';

import {
  FormsModule,
} from '@angular/forms';

import {
  ChatbotService,
} from '../_service/chatbot.service';

import {
  ChatMessage,
} from '../interfaces/chat-message.interface';

@Component({
  selector: 'app-contato',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
  ],

  templateUrl:
    './contato.component.html',

  styleUrl:
    './contato.component.css',
})
export class ContatoComponent {
  @ViewChild('chatBody')
  chatBody!: ElementRef;

  userMessage = '';

  loading = false;

  messages: ChatMessage[] = [
    {
      sender: 'bot',

      text:
        'Olá 👋 Sou o assistente virtual da SoftSolutions. Como posso te ajudar hoje?',
    },
  ];

  constructor(
    private readonly chatbotService: ChatbotService,
  ) {}

  sendMessage(): void {
    if (
      !this.userMessage.trim() ||
      this.loading
    ) {
      return;
    }

    const message =
      this.userMessage.trim();

    this.messages.push({
      sender: 'user',
      text: message,
      timestamp: new Date(),
    });

    this.userMessage = '';

    this.loading = true;

    this.scrollToBottom();

    this.chatbotService
      .sendMessage(message)
      .subscribe({
        next: (response) => {
          this.messages.push({
            sender: 'bot',

            text:
              response.response ??
              'Não consegui responder no momento.',
          });

          this.loading = false;

          this.scrollToBottom();
        },

        error: () => {
          this.messages.push({
            sender: 'bot',

            text:
              'Erro ao conectar com o servidor.',
          });

          this.loading = false;

          this.scrollToBottom();
        },
      });
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatBody) {
        this.chatBody.nativeElement.scrollTop =
          this.chatBody.nativeElement.scrollHeight;
      }
    }, 100);
  }
}