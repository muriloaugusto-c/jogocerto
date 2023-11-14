import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormatDateService } from 'src/app/service/data.service';
import { FormatarValorService } from 'src/app/service/valor.service';

@Component({
  selector: 'app-aceitar-agendamentos',
  templateUrl: './aceitar-agendamentos.component.html',
  styleUrls: ['./aceitar-agendamentos.component.css'],
})
export class AceitarAgendamentosComponent implements OnInit {
  validarAgendamento: FormGroup | any;
  dataAgendamentos: any;
  @Input() idCentro: any;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private formatDate: FormatDateService,
    private valorService: FormatarValorService
  ) {}

  ngOnInit() {
    this.getAgendamentos();
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  itens() {
    this.validarAgendamento = this.formBuilder.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
      quantity: [0, Validators.required],
      description: ['', Validators.required],
    });
  }

  getAgendamentos() {
    const token = this.cookieService.get('tokenApi');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    this.http
      .get<any>(
        'https://rightgame-api.onrender.com/reservations/' +
          this.cookieService.get('idUsuario'),
        { headers }
      )
      .subscribe({
        next: (data: any) => {
          this.dataAgendamentos = data.reservations.map((item: any) => ({
            ...item,
            start_time: this.formatDate.formatarData(item.start_time),
            end_time: this.formatDate.formatarData(item.end_time),
            amount: this.valorService.formatarParaReal(
              Math.round(Number(item.amount))
            ),
          }));
        },
        error: (error: any) => {
          console.log('There was an error!', error);
        },
      });
  }

  aceitarAgendamento(id: any) {
    const token = this.cookieService.get('tokenApi');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    this.http
      .put<any>(
        'https://rightgame-api.onrender.com/reservations/' + id + '/accept',
        {},
        { headers }
      )
      .subscribe({
        next: (data: any) => {
          this.getAgendamentos();
          this._snackBar.open('Agendamento aceito', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
          });
        },
        error: (error: any) => {
          console.log('There was an error!', error);
        },
      });
  }

  recusarAgendamento(id: any) {
    const token = this.cookieService.get('tokenApi');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    this.http
      .put<any>(
        'https://rightgame-api.onrender.com/reservations/' + id + '/reject',
        {},
        { headers }
      )
      .subscribe({
        next: (data: any) => {
          this.getAgendamentos();
          this._snackBar.open('Agendamento recusado', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
          });
        },
        error: (error: any) => {
          console.log('There was an error!', error);
        },
      });
  }
}
