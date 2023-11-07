import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConsultarInventarioComponent } from 'src/app/modais/consultar-inventario/consultar-inventario.component';
import { AgendamentosComponent } from 'src/app/modais/relatorios/agendamentos/agendamentos.component';
import { GastosComponent } from 'src/app/modais/relatorios/gastos/gastos.component';
import { RecebidoComponent } from 'src/app/modais/relatorios/recebido/recebido.component';
import { RelatoriosComponent } from 'src/app/modais/relatorios/relatorios.component';
import { ReservarComponent } from 'src/app/modais/relatorios/reservar/reservar.component';
import { UsuarioMaisRentavelComponent } from 'src/app/modais/relatorios/usuario-mais-rentavel/usuario-mais-rentavel.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  logado: any
  nomeUsuario: any;
  telaRelatorio: any;
  relatorios: any;

  constructor(
    private cookieService: CookieService,
    //private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
  ){}
  dialogConfig = new MatDialogConfig();

  ngOnInit(): void {
    this.nomeUsuario = this.cookieService.get('nomeUsuario')
    if(this.cookieService.check('tokenApi')){
      this.logado = true;
    }else{
      this.logado = false;
    }

    if(this.cookieService.get('perfilLogin') === 'USER'){
      this.telaRelatorio = true;
    }

    if(this.cookieService.get('perfilLogin') === 'OWNER'){
      this.relatorios = true;
    }
  }

  openModalRelatorios(): void {
    this.dialogConfig.disableClose = true;
    this.dialog.open(RelatoriosComponent, this.dialogConfig);
  }
  openModalGastos(): void {
    this.dialogConfig.disableClose = true;
    this.dialog.open(GastosComponent, this.dialogConfig);
  }

  openModalReservas(): void {
    this.dialogConfig.disableClose = true;
    this.dialog.open(ReservarComponent, this.dialogConfig);
  }

  openModalGanhos(): void {
    this.dialogConfig.disableClose = true;
    this.dialog.open(RecebidoComponent, this.dialogConfig);
  }

  openModalAgendamentos(): void{
    this.dialogConfig.disableClose = true;
    this.dialog.open(AgendamentosComponent, this.dialogConfig);
  }

  openModalUsuarioRentavel(): void{
    this.dialogConfig.disableClose = true;
    this.dialog.open(UsuarioMaisRentavelComponent, this.dialogConfig);
  }


  redirect(){
    this.router.navigate(['/']);
  }

  logout(){
    this.cookieService.delete('tokenApi')
    this.cookieService.delete('perfilLogin')
    this.cookieService.delete('nomeUsuario')
    this.cookieService.delete('idUsuario')
    this.router.navigate(['/']);
    this.logado = false;
  }

  acessarLogin(){
    this.router.navigate(['/login']);
  }
}
