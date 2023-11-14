import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormatDateService {
  constructor() {}

  formatarData(data: string): string {
    // Verificar se a string está no formato ISO 8601
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(data)) {
      const dataObj = new Date(data);

      if (!isNaN(dataObj.getTime())) {
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'UTC',
        };

        return dataObj.toLocaleString('pt-BR', options);
      } else {
        console.error('Data inválida');
        return 'Data inválida';
      }
    } else {
      console.error('Formato de data inválido');
      return 'Formato de data inválido';
    }
  }
}
