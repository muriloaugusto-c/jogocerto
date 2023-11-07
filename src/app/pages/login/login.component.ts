import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup | any;
  tokenLogin: any
  perfilLogin: any
  nomeUsuario: any
  idUsuario: any

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ){}
  ngOnInit() {
    this.logar()
  }

  logar() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
  })
  }

  linkCadastro(){
    this.router.navigate(['/cadastro']);
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  login(){
    const headers = {'Content-Type': 'application/json' };
    const body = Object.assign({}, this.loginForm.value);
    this.http
      .post<any>('https://rightgame-api.onrender.com/sessions', body, {headers})
        .subscribe({
          next: (data: any) => {
            this.tokenLogin = data.token.token
            this.perfilLogin = data.user.type
            this.nomeUsuario = data.user.name
            this.idUsuario = data.user.id
            this.cookieService.set('tokenApi', this.tokenLogin, { expires: 30})
            this.cookieService.set('perfilLogin', this.perfilLogin, { expires: 30})
            this.cookieService.set('nomeUsuario', this.nomeUsuario, { expires: 30 })
            this.cookieService.set('idUsuario', this.idUsuario, { expires: 30 })
            this.router.navigate(['/']);
          },
          error: (error: any) => {
            this._snackBar.open('E-mail ou senha incorretos', 'Fechar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            console.log('There was an error!', error);
          },
        });
  }
}
