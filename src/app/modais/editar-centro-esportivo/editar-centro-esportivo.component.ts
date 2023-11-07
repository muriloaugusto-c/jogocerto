import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-editar-centro-esportivo',
  templateUrl: './editar-centro-esportivo.component.html',
  styleUrls: ['./editar-centro-esportivo.component.css']
})
export class EditarCentroEsportivoComponent implements OnInit{
  editarCentro: FormGroup | any;
  @Input() idCentro: any

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router
  ){}

  ngOnInit() {
    this.centrosEsportivos()
    this.getCentros()
  }

  centrosEsportivos() {
    this.editarCentro = this.formBuilder.group({
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      photoUrls: ['', Validators.required],
      parking: [false],
      steakhouse: [false],
      street: [''],
      streetNumber: [''],
      zipCode: [''],
      state: [''],
      city: [''],
      neighborhood: ['']
    })
  }

  getCentros(){
    const token = this.cookieService.get('tokenApi')
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    this.http
      .get<any>('https://rightgame-api.onrender.com/sportsCenters?sportsCenter=' + this.idCentro, {headers})
        .subscribe({
          next: (data: any) => {
            console.log(data)
            this.editarCentro = this.formBuilder.group({
              name: [data.sportsCenters[0].name, Validators.required],
              contactNumber: [data.sportsCenters[0].contact_number, Validators.required],
              photoUrls: [data.sportsCenters[0].photo_urls, Validators.required],
              parking: [data.sportsCenters[0].parking],
              steakhouse: [data.sportsCenters[0].steakhouse],
              street: [data.sportsCenters[0].address.street],
              streetNumber: [data.sportsCenters[0].address.street_number],
              zipCode: [data.sportsCenters[0].address.zip_code],
              state: [data.sportsCenters[0].address.state],
              city: [data.sportsCenters[0].address.city],
              neighborhood: [data.sportsCenters[0].address.neighborhood]
            })
          },
          error: (error: any) => {
            console.log('There was an error!', error);
          },
        });
  }

  editarCentros(){
    if (this.editarCentro.valid) {
      const token = this.cookieService.get('tokenApi')
      const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
      const body = Object.assign({}, this.editarCentro.value);
      this.http
        .put<any>('https://rightgame-api.onrender.com/sportsCenters/' + this.idCentro, body, {headers})
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
