import { HttpClient } from '@angular/common/http';
import { CepService } from 'src/app/service/cep.service';
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
    private _snackBar: MatSnackBar,
    private cepService: CepService
  ) {}

  ngOnInit() {
    this.criarFormulario();
  }

  criarFormulario() {
    this.cadastroForm = this.formBuilder.group({
      selectedOption: [''],
      name: [''],
      email: [''],
      doc: [''],
      password: [''],
      phoneNumber: [''],
      birthdate: [''],
      street: [''],
      streetNumber: [''],
      zipCode: [''],
      state: [''],
      city: [''],
      neighborhood: [''],
    });
  }

  buscarCep() {
    const cep = this.cadastroForm.get('zipCode').value;
    if (cep && cep.length === 8) {
      this.cepService.getCepDetails(cep).subscribe(
        (data: any) => {
          this.cadastroForm.patchValue({
            state: data.uf,
            city: data.localidade,
            neighborhood: data.bairro,
            street: data.logradouro,
          });
        },
        (error: any) => {
          console.error('Erro ao buscar CEP:', error);
        }
      );
    }
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

  acessarLogin() {
    this.router.navigate(['/login']);
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
              duration: 3000,
            });
            this.acessarLogin();
          },
          error: (error: any) => {
            this._snackBar.open('Falha ao cadastrar usuário', 'Fechar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
            });
            console.log('There was an error!', error);
          },
        });
    }
  }
}
