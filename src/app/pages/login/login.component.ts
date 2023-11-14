import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  tokenLogin: any;
  perfilLogin: any;
  nomeUsuario: any;
  idUsuario: any;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.logar();
  }

  logar() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Adicionando validação de e-mail
      password: ['', [Validators.required]],
    });
  }

  linkCadastro() {
    this.router.navigate(['/cadastro']);
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  login() {
    const headers = { 'Content-Type': 'application/json' };
    const body = Object.assign({}, this.loginForm.value);
    this.http
      .post<any>('https://rightgame-api.onrender.com/sessions', body, {
        headers,
      })
      .subscribe({
        next: (data: any) => {
          this.tokenLogin = data.token.token;
          this.perfilLogin = data.user.type;
          this.nomeUsuario = data.user.name;
          this.idUsuario = data.user.id;
          this.cookieService.set('tokenApi', this.tokenLogin, { expires: 30 });
          this.cookieService.set('perfilLogin', this.perfilLogin, {
            expires: 30,
          });
          this.cookieService.set('nomeUsuario', this.nomeUsuario, {
            expires: 30,
          });
          this.cookieService.set('idUsuario', this.idUsuario, { expires: 30 });
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          if (error.status === 401) {
            this._snackBar.open('E-mail ou senha incorretos', 'Fechar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
            });
          } else {
            this._snackBar.open(
              'Erro ao fazer login. Tente novamente mais tarde.',
              'Fechar',
              {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 3000,
              }
            );
          }
        },
      });
  }
}
