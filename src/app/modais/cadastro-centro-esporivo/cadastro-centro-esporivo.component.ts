import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cadastro-centro-esporivo',
  templateUrl: './cadastro-centro-esporivo.component.html',
  styleUrls: ['./cadastro-centro-esporivo.component.css'],
})
export class CadastroCentroEsporivoComponent {
  cadastroCentro: FormGroup | any;
  localUrl: any;
  file?: File;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.centrosEsportivos();
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  centrosEsportivos() {
    this.cadastroCentro = this.formBuilder.group({
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      image: ['', Validators.required],
      parking: [false],
      steakhouse: [false],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      zipCode: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      neighborhood: [''],
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.cadastroCentro.get('image').setValue(file);
    }
  }

  cadastrarCentros() {
    if (this.cadastroCentro.valid) {
      const token = this.cookieService.get('tokenApi');
      const formData = new FormData();
      formData.append('name', this.cadastroCentro.get('name').value);
      formData.append(
        'contactNumber',
        this.cadastroCentro.get('contactNumber').value
      );
      formData.append('image', this.cadastroCentro.get('image').value);
      formData.append('parking', this.cadastroCentro.get('parking').value);
      formData.append(
        'steakhouse',
        this.cadastroCentro.get('steakhouse').value
      );
      formData.append('street', this.cadastroCentro.get('street').value);
      formData.append(
        'streetNumber',
        this.cadastroCentro.get('streetNumber').value
      );
      formData.append('zipCode', this.cadastroCentro.get('zipCode').value);
      formData.append('state', this.cadastroCentro.get('state').value);
      formData.append('city', this.cadastroCentro.get('city').value);
      formData.append(
        'neighborhood',
        this.cadastroCentro.get('neighborhood').value
      );
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http
        .post<any>(
          'https://rightgame-api.onrender.com/sportsCenters',
          formData,
          { headers }
        )
        .subscribe({
          next: (data: any) => {
            location.reload();
          },
          error: (error: any) => {
            console.log(error);
          },
        });
    } else {
      this._snackBar.open(
        'Falha ao Criar um novo Centro Esportivo!',
        'Fechar',
        {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 3000,
        }
      );
    }
  }
}
