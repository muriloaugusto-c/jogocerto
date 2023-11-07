import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-editar-item',
  templateUrl: './editar-item.component.html',
  styleUrls: ['./editar-item.component.css']
})
export class EditarItemComponent implements OnInit{
  editarItem: FormGroup | any;
  @Input() idCentro: any;
  @Input() idItem: any;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router
  ){}

  ngOnInit() {
    this.itens()
    this.getItens()
  }

  itens() {
    this.editarItem = this.formBuilder.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
      quantity: [0 ,Validators.required],
      description: ['', Validators.required],
    })
  }

  getItens(){
    const token = this.cookieService.get('tokenApi')
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    this.http
      .get<any>('https://rightgame-api.onrender.com/sportsCenters/' + this.idCentro + '/inventory?product=' + this.idItem, {headers})
        .subscribe({
          next: (data: any) => {
            console.log(data)
            this.editarItem = this.formBuilder.group({
              name: [data.products[0].name],
              value: [data.products[0].value],
              quantity: [data.products[0].quantity],
              description: [data.products[0].description],
            })
          },
          error: (error: any) => {
            console.log('There was an error!', error);
          },
        });
  }


  putItem(){
    if (this.editarItem.valid) {
      const token = this.cookieService.get('tokenApi')
      const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
      const body = Object.assign({}, this.editarItem.value);
      this.http
        .put<any>('https://rightgame-api.onrender.com/sportsCenters/' + this.idCentro + '/inventory/' + this.idItem, body, {headers})
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
