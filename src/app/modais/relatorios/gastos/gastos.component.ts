import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { MesService } from 'src/app/service/mes.service';
import { FormatarValorService } from 'src/app/service/valor.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
})
export class GastosComponent {
  validarAgendamento: FormGroup | any;
  dataTotalGasto: any;
  dataTotalPorMes: any;

  colunas = [
    { exibicao: 'Mês', campo: 'month' },
    { exibicao: 'Total gasto', campo: 'totalSpent' },
  ];
  colunasNomes: string[] = this.colunas.map((column) => column.campo);

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private mesService: MesService,
    private formatarValorService: FormatarValorService
  ) {}

  ngOnInit() {
    this.getTotalGasto();
    this.getTotalGastoPorMes();
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  getTotalGasto() {
    const token = this.cookieService.get('tokenApi');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    this.http
      .get<any>('https://rightgame-api.onrender.com/users/reports/totalSpent', {
        headers,
      })
      .subscribe({
        next: (data: any) => {
          this.dataTotalGasto = this.formatarValorService.formatarParaReal(
            data.totalSpent
          );
        },
        error: (error: any) => {
          console.log('There was an error!', error);
        },
      });
  }
  getTotalGastoPorMes() {
    const token = this.cookieService.get('tokenApi');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    this.http
      .get<any>(
        'https://rightgame-api.onrender.com/users/reports/totalSpentByMonth',
        { headers }
      )
      .subscribe({
        next: (data: any) => {
          this.dataTotalPorMes = data.totalSpentByMonth.map((item: any) => ({
            ...item,
            month: this.mesService.getNomeDoMes(item.month),
            totalSpent: this.formatarValorService.formatarParaReal(
              item.totalSpent
            ),
          }));
        },
        error: (error: any) => {
          console.log('There was an error!', error);
        },
      });
  }
}
