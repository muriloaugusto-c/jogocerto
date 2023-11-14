import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor() {}

  traduzirStatus(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'PENDENTE';
      case 'REJECTED':
        return 'REJEITADO';
      case 'CONFIRMED':
        return 'CONFIRMADO';
      case 'IN PROGRESS':
        return 'EM ANDAMENTO';
      case 'COMPLETED':
        return 'CONCLUÍDO';
      case 'CANCELED':
        return 'CANCELADO';
      default:
        return status; // Retorna o status original se não houver tradução
    }
  }
}
