import {
  Component,
  ElementRef,
  OnInit,
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
export class ContatoComponent
  implements OnInit
{
  @ViewChild('chatBody')
  chatBody!: ElementRef;

  userMessage = '';

  loading = false;

  messages: ChatMessage[] = [];

  constructor(
    private readonly chatbotService: ChatbotService,
  ) {}

  ngOnInit(): void {
    this.loadConversation();
  }

  private loadConversation(): void {
    const saved =
      localStorage.getItem(
        'softsolutions_chat',
      );

    if (saved) {
      this.messages =
        JSON.parse(saved);

      return;
    }

    this.messages = [
      {
        sender: 'bot',

        text:
          'Olá 👋 Sou o assistente virtual da SoftSolutions. Posso recomendar cursos, explicar tecnologias e ajudar nos seus estudos 🚀',

        timestamp: new Date(),
      },
    ];
  }

  private saveConversation(): void {
    localStorage.setItem(
      'softsolutions_chat',

      JSON.stringify(this.messages),
    );
  }

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

    this.saveConversation();

    this.scrollToBottom();

    const conversationHistory =
      this.messages.map(
        (message) => ({
          sender: message.sender,

          text: message.text,
        }),
      );

    this.chatbotService
      .sendMessage(
        message,
        conversationHistory,
      )
      .subscribe({
        next: (response) => {
          this.messages.push({
            sender: 'bot',

            text:
              response.response ??
              'Não consegui responder no momento.',

            timestamp:
              new Date(),

            suggestions:
              response.suggestions ??
              [],

            relatedCourses:
              response.relatedCourses ??
              [],
          });

          this.loading = false;

          this.saveConversation();

          this.scrollToBottom();
        },

        error: () => {
          this.messages.push({
            sender: 'bot',

            text:
              'Erro ao conectar com o servidor.',

            timestamp:
              new Date(),
          });

          this.loading = false;

          this.saveConversation();

          this.scrollToBottom();
        },
      });
  }

  selectSuggestion(
    suggestion: string,
  ): void {
    this.userMessage =
      suggestion;

    this.sendMessage();
  }

  clearChat(): void {
    localStorage.removeItem(
      'softsolutions_chat',
    );

    this.messages = [
      {
        sender: 'bot',

        text:
          'Conversa reiniciada 👋 Como posso te ajudar agora?',

        timestamp: new Date(),
      },
    ];
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