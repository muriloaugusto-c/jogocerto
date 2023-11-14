import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cadastro-item',
  templateUrl: './cadastro-item.component.html',
  styleUrls: ['./cadastro-item.component.css'],
})
export class CadastroItemComponent implements OnInit {
  cadastroItem: FormGroup | any;
  @Input() idCentro: any;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.itens();
  }

  itens() {
    this.cadastroItem = this.formBuilder.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
      quantity: [''],
      description: ['', Validators.required],
    });
  }

  cadastrarItem() {
    if (this.cadastroItem.valid) {
      const token = this.cookieService.get('tokenApi');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const body = Object.assign({}, this.cadastroItem.value);
      console.log(headers);
      this.http
        .post<any>(
          'https://rightgame-api.onrender.com/sportsCenters/' +
            this.idCentro +
            '/inventory',
          body,
          { headers }
        )
        .subscribe({
          next: (data: any) => {
            location.reload();
          },
          error: (error: any) => {
            console.log('There was an error!', error);
          },
        });
    }
  }
}
