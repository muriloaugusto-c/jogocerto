import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-editar-quadras',
  templateUrl: './editar-quadras.component.html',
  styleUrls: ['./editar-quadras.component.css']
})
export class EditarQuadrasComponent {
  editarQuadras: FormGroup | any;
  @Input() idCentro: any;
  @Input() idQuadra: any;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router
  ){}

  ngOnInit() {
    this.quadras();
    this.getQuadra();
  }

  quadras() {
    this.editarQuadras = this.formBuilder.group({
      name: ['', Validators.required],
      modality: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required],
      size: [''],
      photoUrls: [''],
    })
  }

  getQuadra(){
    const token = this.cookieService.get('tokenApi')
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    console.log(headers)
    this.http
      .get<any>('https://rightgame-api.onrender.com/sportsCenters/' + this.idCentro + '/sportsCourts?sportsCourt=' + this.idQuadra, {headers})
        .subscribe({
          next: (data: any) => {
            this.editarQuadras = this.formBuilder.group({
              name: [data.sportsCourts[0].name],
              modality: [data.sportsCourts[0].modality],
              description: [data.sportsCourts[0].description],
              amount: [data.sportsCourts[0].amount],
              size: [data.sportsCourts[0].size],
              photoUrls: [''],
            })
          },
          error: (error: any) => {
            console.log('There was an error!', error);
          },
        });
  }


  putQuadras(){
    if (this.editarQuadras.valid) {
      const token = this.cookieService.get('tokenApi')
      const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
      const body = Object.assign({}, this.editarQuadras.value);
      console.log(headers)
      this.http
        .put<any>('https://rightgame-api.onrender.com/sportsCenters/' + this.idCentro + '/sportsCourts/' + this.idQuadra, body, {headers})
          .subscribe({
            next: (data: any) => {
              location.reload()
            },
            error: (error: any) => {
              console.log('There was an error!', error);
            },
          });
    }
  }
}
