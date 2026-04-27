import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuscaService } from '../_service/busca.service';
import { BuscaItem } from '../_service/busca.types';

@Component({
  selector: 'app-busca-semantica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './busca-semantica.component.html',
  styleUrl: './busca-semantica.component.css'
})
export class BuscaSemanticaComponent {
  termo = '';
  arquivoAudio: File | null = null;
  transcricao = '';
  resultados: BuscaItem[] = [];
  carregando = false;
  erro = '';

  constructor(private buscaService: BuscaService) {}

  onAudioSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.arquivoAudio = input.files?.[0] ?? null;
  }

  buscarTexto(): void {
    const query = this.termo.trim();

    if (!query) {
      this.erro = 'Digite um termo para buscar.';
      this.resultados = [];
      return;
    }

    this.carregando = true;
    this.erro = '';
    this.transcricao = '';
    this.resultados = [];

    this.buscaService.buscarTexto(query).subscribe({
      next: (res) => {
        this.resultados = res.results ?? [];
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível realizar a busca.';
        this.resultados = [];
        this.carregando = false;
      }
    });
  }

  buscarVoz(): void {
    if (!this.arquivoAudio) {
      this.erro = 'Selecione um áudio antes de buscar.';
      return;
    }

    this.carregando = true;
    this.erro = '';
    this.transcricao = '';
    this.resultados = [];

    this.buscaService.buscarPorVoz(this.arquivoAudio).subscribe({
      next: (res) => {
        this.transcricao = res.transcription ?? '';
        this.resultados = res.results ?? [];
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Não foi possível processar o áudio.';
        this.transcricao = '';
        this.resultados = [];
        this.carregando = false;
      }
    });
  }
}