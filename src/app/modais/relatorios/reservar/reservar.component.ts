import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { MesService } from 'src/app/service/mes.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css'],
})
export class ReservarComponent {
  validarAgendamento: FormGroup | any;
  dataTotalQuadrasAlugadas: any;
  dataTotalQuadrasAlugadasPorMes: any;

  colunas = [
    { exibicao: 'Mês', campo: 'month' },
    { exibicao: 'Total de quadras reservadas', campo: 'completedReservations' },
  ];
  colunasNomes: string[] = this.colunas.map((column) => column.campo);

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private monthService: MesService
  ) {}

  ngOnInit() {
    this.getTotalQuadrasAlugadas();
    this.getTotalQuadrasAlugadasPorMes();
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  getTotalQuadrasAlugadas() {
    const token = this.cookieService.get('tokenApi');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    this.http
      .get<any>(
        'https://rightgame-api.onrender.com/users/reports/courtUsageStats',
        { headers }
      )
      .subscribe({
        next: (data: any) => {
          this.dataTotalQuadrasAlugadas = data.courtUsageStats;
          console.log(data);
        },
        error: (error: any) => {
          console.log('There was an error!', error);
        },
      });
  }
  getTotalQuadrasAlugadasPorMes() {
    const token = this.cookieService.get('tokenApi');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    this.http
      .get<any>(
        'https://rightgame-api.onrender.com/users/reports/courtUsageStatsByMonth',
        { headers }
      )
      .subscribe({
        next: (data: any) => {
          this.dataTotalQuadrasAlugadasPorMes = data.courtUsageStats.map(
            (item: any) => ({
              ...item,
              month: this.monthService.getNomeDoMes(item.month),
            })
          );
        },
        error: (error: any) => {
          console.log('There was an error!', error);
        },
      });
  }
}
