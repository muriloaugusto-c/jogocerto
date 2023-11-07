import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {
  validarAgendamento: FormGroup | any;
  dataUltimos10Requisicoes: any;
  @Input() idCentro: any;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit() {
    this.getLastDezReservas()

  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  getLastDezReservas(){
    const token = this.cookieService.get('tokenApi')
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    this.http
      .get<any>('https://rightgame-api.onrender.com/users/reports/reservation-history', {headers})
        .subscribe({
          next: (data: any) => {
            this.dataUltimos10Requisicoes = data.reservationHistory
            console.log(data)
          },
          error: (error: any) => {
            console.log('There was an error!', error);
          },
        });
  }


}
