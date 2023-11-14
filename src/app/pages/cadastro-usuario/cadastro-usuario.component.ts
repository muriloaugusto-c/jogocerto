import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CadastroUsuarioComponent implements OnInit {
  cadastroForm: FormGroup | any;
  etapaAtual: number = 0; // Adicionando a propriedade etapaAtual
  selectedOption: string | any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.criarFormulario();
  }

  criarFormulario() {
    this.cadastroForm = this.formBuilder.group({
      selectedOption: ['', Validators.required],
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
      neighborhood: [''],
    });
  }

  prosseguirEtapa(etapa: number): void {
    if (etapa === 0 && this.cadastroForm.get('selectedOption').valid) {
      this.etapaAtual = 1;
    } else if (etapa === 1 && this.cadastroForm.valid) {
      this.etapaAtual = 2;
    } else if (etapa === 2 && this.cadastroForm.valid) {
      this.enviarCadastro();
    }
  }

  onSelectionChange(event: any) {
    this.selectedOption = event.value;
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  enviarCadastro() {
    const endpoint = this.selectedOption === 'padrao' ? 'users' : 'owners';

    if (this.cadastroForm.valid) {
      const headers = { 'Content-Type': 'application/json' };
      const body = Object.assign({}, this.cadastroForm.value);

      this.http
        .post<any>(`https://rightgame-api.onrender.com/${endpoint}`, body, {
          headers,
        })
        .subscribe({
          next: (data: any) => {
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
}
