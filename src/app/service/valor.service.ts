import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormatarValorService {
  formatarParaReal(valor: any): string {
    const formattedValue = valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formattedValue;
  }
  formatarParaNumber(valor: string): number {
    const valorNumerico = Number(valor.replace(/[^\d]/g, '')) / 100;

    return isNaN(valorNumerico) ? 0 : valorNumerico;
  }
}
