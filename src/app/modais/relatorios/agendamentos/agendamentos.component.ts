import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css']
})
export class AgendamentosComponent {
  validarAgendamento: FormGroup | any;
  dataTotalAgendamentos: any;
  dataTotalAgendamentosPorMes: any;

  colunas = [
    { exibicao: 'Mês', campo: 'month' },
    { exibicao: 'Total agendado ', campo: 'completedReservations' },
  ];
  colunasNomes: string[] = this.colunas.map(column => column.campo);

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
  ){}

  ngOnInit() {
    this.getTotalAgendado()
    this.getTotalAgendadoPorMes()
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  getTotalAgendado(){
    const token = this.cookieService.get('tokenApi')
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    this.http
      .get<any>('https://rightgame-api.onrender.com/owners/reports/courtUsageTotal', {headers})
        .subscribe({
          next: (data: any) => {
            this.dataTotalAgendamentos = data.courtUsageTotal
          },
          error: (error: any) => {
            console.log('There was an error!', error);
          },
        });
  }

  getTotalAgendadoPorMes(){
    const token = this.cookieService.get('tokenApi')
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    this.http
      .get<any>('https://rightgame-api.onrender.com/owners/reports/courtUsageByMonth', {headers})
        .subscribe({
          next: (data: any) => {
            this.dataTotalAgendamentosPorMes = data.courtUsageByMonth
            console.log(data)
          },
          error: (error: any) => {
            console.log('There was an error!', error);
          },
        });
  }
}
