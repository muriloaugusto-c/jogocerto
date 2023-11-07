import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-recebido',
  templateUrl: './recebido.component.html',
  styleUrls: ['./recebido.component.css']
})
export class RecebidoComponent {
  validarAgendamento: FormGroup | any;
  dataTotalRecebido: any;
  dataTotalPorMes: any;

  colunas = [
    { exibicao: 'Mês', campo: 'month' },
    { exibicao: 'Total recebido', campo: 'totalReceived' },
  ];
  colunasNomes: string[] = this.colunas.map(column => column.campo);

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
  ){}

  ngOnInit() {
    this.getTotalRecebido()
    this.getTotalRecebidoPorMes()
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  getTotalRecebido(){
    const token = this.cookieService.get('tokenApi')
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    this.http
      .get<any>('https://rightgame-api.onrender.com/owners/reports/totalReceived', {headers})
        .subscribe({
          next: (data: any) => {
            this.dataTotalRecebido = data.totalReceived
          },
          error: (error: any) => {
            console.log('There was an error!', error);
          },
        });
  }
  getTotalRecebidoPorMes(){
    const token = this.cookieService.get('tokenApi')
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    this.http
      .get<any>('https://rightgame-api.onrender.com/owners/reports/totalReceivedByMonth', {headers})
        .subscribe({
          next: (data: any) => {
            this.dataTotalPorMes = data.totalReceivedByMonth
            console.log(data)
          },
          error: (error: any) => {
            console.log('There was an error!', error);
          },
        });
  }
}
