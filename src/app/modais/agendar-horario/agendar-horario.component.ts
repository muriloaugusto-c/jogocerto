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
import { FormatarValorService } from 'src/app/service/valor.service';

interface SelecaoHora {
  value: string;
  value2: string;
  viewValue: string;
}

@Component({
  selector: 'app-agendar-horario',
  templateUrl: './agendar-horario.component.html',
  styleUrls: ['./agendar-horario.component.css'],
})
export class AgendarHorarioComponent implements OnInit {
  horariosJaAgendados: any;
  perfilUsuario: any;
  agendarHorario: FormGroup | any;
  @Input() idCentro: any;
  @Input() idQuadra: any;
  @Input() nomeQuadra: any;
  @Input() valorHora: any;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    private formatarValorService: FormatarValorService
  ) {}

  ngOnInit() {
    this.perfilUsuario = this.cookieService.get('perfilLogin');
    this.agendar();
    this.horariosAgendados();
  }

  horarios: SelecaoHora[] = [
    { value: '09:00:00', value2: '10:00:00', viewValue: '09:00 | 10:00' },
    { value: '10:00:00', value2: '11:00:00', viewValue: '10:00 | 11:00' },
    { value: '11:00:00', value2: '12:00:00', viewValue: '11:00 | 12:00' },
    { value: '12:00:00', value2: '13:00:00', viewValue: '12:00 | 13:00' },
    { value: '13:00:00', value2: '14:00:00', viewValue: '13:00 | 14:00' },
    { value: '14:00:00', value2: '15:00:00', viewValue: '14:00 | 15:00' },
    { value: '15:00:00', value2: '16:00:00', viewValue: '15:00 | 16:00' },
    { value: '16:00:00', value2: '17:00:00', viewValue: '16:00 | 17:00' },
    { value: '17:00:00', value2: '18:00:00', viewValue: '17:00 | 18:00' },
    { value: '18:00:00', value2: '19:00:00', viewValue: '18:00 | 19:00' },
    { value: '19:00:00', value2: '20:00:00', viewValue: '19:00 | 20:00' },
    { value: '20:00:00', value2: '21:00:00', viewValue: '20:00 | 21:00' },
    { value: '21:00:00', value2: '22:00:00', viewValue: '21:00 | 22:00' },
    { value: '22:00:00', value2: '23:00:00', viewValue: '22:00 | 23:00' },
  ];

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  agendar() {
    this.agendarHorario = this.formBuilder.group({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      amount: [
        this.formatarValorService.formatarParaNumber(this.valorHora),
        Validators.required,
      ],
      selectedDate: [null, Validators.required],
    });
  }

  selectedDate: Date | null = null;
  formattedDate: any;

  onDateChange(event: any) {
    const selectedHora = this.agendarHorario.get('startTime').value;
    this.updateTime(selectedHora);
  }

  acessarLogin() {
    this.router.navigate(['/login']);
  }

  updateTime(selectedHora: SelecaoHora | any) {
    if (selectedHora) {
      const selectedDate = this.agendarHorario.get('selectedDate').value;
      const startTime =
        selectedDate.toISOString().slice(0, 10) + ' ' + selectedHora.value;
      const endTime =
        selectedDate.toISOString().slice(0, 10) + ' ' + selectedHora.value2;

      const isTimeSlotAvailable = this.isTimeSlotAvailable(startTime, endTime);

      if (isTimeSlotAvailable) {
        this.agendarHorario.patchValue({
          startTime: startTime,
          endTime: endTime,
        });
      } else {
        this._snackBar.open(
          'Horário indisponível. Escolha outro horário.',
          'Fechar',
          {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
          }
        );
      }

      delete this.agendarHorario.value.selectedDate;
    }
  }

  isTimeSlotAvailable(startTime: string, endTime: string): boolean {
    const selectedStart = new Date(startTime);
    const selectedEnd = new Date(endTime);

    for (const reserva of this.horariosJaAgendados.reservations) {
      const reservaStart = new Date(reserva.start_time);
      reservaStart.setHours(reservaStart.getHours() + 3);
      const reservaEnd = new Date(reserva.end_time);
      reservaEnd.setHours(reservaEnd.getHours() + 3);

      if (
        (selectedStart >= reservaStart && selectedStart < reservaEnd) ||
        (selectedEnd > reservaStart && selectedEnd <= reservaEnd) ||
        (selectedStart <= reservaStart && selectedEnd >= reservaEnd)
      ) {
        return false;
      }
    }

    return true;
  }

  horariosAgendados() {
    this.http
      .get<any>(
        `https://rightgame-api.onrender.com/sportsCenters/${this.idCentro}/sportsCourts/${this.idQuadra}/reservations`
      )
      .subscribe({
        next: (data: any) => {
          this.horariosJaAgendados = data;
        },
        error: (error: any) => {
          console.error('There was an error!', error);
        },
      });
  }

  agendamentoHorario() {
    if (this.agendarHorario.valid) {
      const token = this.cookieService.get('tokenApi');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const body = Object.assign({}, this.agendarHorario.value);
      this.http
        .post<any>(
          'https://rightgame-api.onrender.com/sportsCenters/' +
            this.idCentro +
            '/sportsCourts/' +
            this.idQuadra +
            '/reservations',
          body,
          { headers }
        )
        .subscribe({
          next: (data: any) => {
            this._snackBar.open(
              'Solicitação da reserva enviado com sucesso!',
              'Fechar',
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
              }
            );
          },
          error: (error: any) => {
            if (error.error.message === 'Date/time cannot be in the past') {
              this._snackBar.open('A data/hora está no passado!', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
              });
            }
            if (error.error.message === 'Reservation Time is Already in use') {
              this._snackBar.open('Horário já está reservado!', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
              });
            }
            console.log('There was an error!', error);
          },
        });
    }
  }
}
