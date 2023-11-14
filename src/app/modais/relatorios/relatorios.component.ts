import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { FormatDateService } from 'src/app/service/data.service';
import { TranslateService } from 'src/app/service/translateStatus.service';
import { FormatarValorService } from 'src/app/service/valor.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css'],
})
export class RelatoriosComponent implements OnInit {
  validarAgendamento: FormGroup | any;
  dataUltimos10Requisicoes: any;
  @Input() idCentro: any;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private formatDate: FormatDateService,
    private translateStatus: TranslateService,
    private valorService: FormatarValorService
  ) {}

  ngOnInit() {
    this.getLastDezReservas();
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  getIconByStatus(status: string): string {
    switch (status) {
      case 'CONCLUÍDO':
        return 'check_circle_outline';
      case 'PENDENTE':
        return 'access_time';
      case 'CANCELADO':
      case 'REJEITADO':
        return 'cancel';
      case 'EM ANDAMENTO':
        return 'timelapse';
      case 'CONFIRMADO':
        return 'check';
      default:
        return '';
    }
  }

  getColorByStatus(status: string): string {
    switch (status) {
      case 'CONCLUÍDO':
        return 'green';
      case 'PENDENTE':
        return 'blue';
      case 'CANCELADO':
      case 'REJEITADO':
        return 'red';
      case 'EM ANDAMENTO':
        return 'yellow';
      case 'CONFIRMADO':
        return '#43A047';
      default:
        return 'transparent'; // cor padrão ou transparente
    }
  }

  getLastDezReservas() {
    const token = this.cookieService.get('tokenApi');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    this.http
      .get<any>(
        'https://rightgame-api.onrender.com/users/reports/reservation-history',
        { headers }
      )
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.dataUltimos10Requisicoes = data.reservationHistory.map(
            (item: any) => ({
              ...item,
              start_time: this.formatDate.formatarData(item.start_time),
              end_time: this.formatDate.formatarData(item.end_time),
              status: this.translateStatus.traduzirStatus(item.status),
              amount: this.valorService.formatarParaReal(
                Math.round(Number(item.amount))
              ),
            })
          );
          console.log(this.dataUltimos10Requisicoes);
        },
        error: (error: any) => {
          console.log('There was an error!', error);
        },
      });
  }
}
