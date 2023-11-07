import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cadastro-quadras',
  templateUrl: './cadastro-quadras.component.html',
  styleUrls: ['./cadastro-quadras.component.css']
})
export class CadastroQuadrasComponent {
  cadastroQuadras: FormGroup | any;
  @Input() idCentro: any;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router
  ){}

  ngOnInit() {
    this.quadras()
  }

  quadras() {
    this.cadastroQuadras = this.formBuilder.group({
      name: ['', Validators.required],
      modality: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required],
      size: [''],
      image: ['', Validators.required],
    })
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.cadastroQuadras.get('image').setValue(file);
    }
  }

  cadastrarQuadras(){
    console.log(this.cadastroQuadras)
    if (this.cadastroQuadras.valid) {
      const token = this.cookieService.get('tokenApi')
      const formData = new FormData();
      formData.append('name', this.cadastroQuadras.get('name').value);
      formData.append('modality', this.cadastroQuadras.get('modality').value);
      formData.append('description', this.cadastroQuadras.get('description').value);
      formData.append('amount', this.cadastroQuadras.get('amount').value);
      formData.append('size', this.cadastroQuadras.get('size').value);
      formData.append('image', this.cadastroQuadras.get('image').value);

      console.log(formData)
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http
        .post<any>('https://rightgame-api.onrender.com/sportsCenters/' + this.idCentro + '/sportsCourts', formData, {headers})
          .subscribe({
            next: (data: any) => {
              this.router.navigate(['/quadras/' + this.idCentro]);
              location.reload()
            },
            error: (error: any) => {
              console.log('There was an error!', error);
            },
          });
    }
  }

}
