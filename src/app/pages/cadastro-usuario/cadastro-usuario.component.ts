import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  cadastroLoginForm: FormGroup | any;
  tipoUsuarioForm: FormGroup | any;
  tipoSelecionado = false;
  selectedOption: string | any;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ){

  }
  ngOnInit() {
    this.cadastrarUsuario()
  }

  submitForm() {
    this.submitted = true;
    this.tipoSelecionado = true;
    console.log(this.selectedOption)
  }

  cadastrarUsuario() {
    this.cadastroLoginForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      doc: ['', Validators.required],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthdate: [''],
      street: [''],
      streetNumber: [''],
      zipCode: [''],
      state: [''],
      city: [''],
      neighborhood: ['']
    })
  }

  cadastrarTipoUsuario(){
    if(this.selectedOption === 'padrao'){
      this.cadastroUsuarioNormal();
    }else{
      this.cadastroDono();
    }
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  cadastroUsuarioNormal(){
    if (this.cadastroLoginForm.valid) {
      const headers = {'Content-Type': 'application/json' };
      const body = Object.assign({}, this.cadastroLoginForm.value);
      console.log(body)
      this.http
        .post<any>('https://rightgame-api.onrender.com/users', body, {headers})
          .subscribe({
            next: (data: any) => {
              console.log(data)
              this._snackBar.open('Usuário cadastrado com sucesso', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              this.router.navigate(['/login']);
            },
            error: (error: any) => {
              this._snackBar.open('Falha ao cadastrar usuário', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              console.log('There was an error!', error);
            },
          });
    }
  }

  cadastroDono(){
    if (this.cadastroLoginForm.valid) {
      const headers = {'Content-Type': 'application/json' };
      const body = Object.assign({}, this.cadastroLoginForm.value);
      this.http
        .post<any>('https://rightgame-api.onrender.com/owners', body, {headers})
          .subscribe({
            next: (data: any) => {
              this._snackBar.open('Usuário dono de centro cadastrado com sucesso', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              this.router.navigate(['/login']);
            },
            error: (error: any) => {
              this._snackBar.open('Falha ao cadastrar usuário dono de centro', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              console.log('There was an error!', error);
            },
          });
    }
  }

}
