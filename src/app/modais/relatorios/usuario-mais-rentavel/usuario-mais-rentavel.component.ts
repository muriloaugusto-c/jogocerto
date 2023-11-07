import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-usuario-mais-rentavel',
  templateUrl: './usuario-mais-rentavel.component.html',
  styleUrls: ['./usuario-mais-rentavel.component.css']
})
export class UsuarioMaisRentavelComponent {
  dataUsuarioRentavel: any;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
  ){}

  ngOnInit() {
    this.getUsuarioRentavel()
  }

  getUsuarioRentavel(){
    const token = this.cookieService.get('tokenApi')
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    this.http
      .get<any>('https://rightgame-api.onrender.com/owners/reports/userMostRental', {headers})
        .subscribe({
          next: (data: any) => {
            this.dataUsuarioRentavel = data.userMostRental
          },
          error: (error: any) => {
            console.log('There was an error!', error);
          },
        });
  }
}
