import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MesService {
  mesesDoAno = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  getNomeDoMes(numeroDoMes: number): string {
    return this.mesesDoAno[numeroDoMes - 1];
  }
}
