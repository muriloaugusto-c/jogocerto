import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AceitarAgendamentosComponent } from 'src/app/modais/aceitar-agendamentos/aceitar-agendamentos.component';
import { CadastroCentroEsporivoComponent } from 'src/app/modais/cadastro-centro-esporivo/cadastro-centro-esporivo.component';
import { EditarCentroEsportivoComponent } from 'src/app/modais/editar-centro-esportivo/editar-centro-esportivo.component';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  dataCentroEsportivo: any;
  url = window.location.href;
  donoDoCentro: any;
  idUsuario: any;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {

    if(this.cookieService.get('perfilLogin') == 'OWNER'){
      this.idUsuario = this.cookieService.get('idUsuario')
      this.listaCentroEsportivoDono(this.idUsuario)
    }else{
      this.listaCentroEsportivo()
    }
  }
  dialogConfig = new MatDialogConfig();

  openModalCadastrarCentro(): void {
    this.dialogConfig.disableClose = true;
    const modalInventario = this.dialog.open(CadastroCentroEsporivoComponent, this.dialogConfig);
    //modalInventario.componentInstance.idCentro = this.idCentro;
    // modalCadastro.afterClosed().subscribe(result => {
    //   console.log('O modal foi fechado.');
    // });
  }

  openModalEditarCentro(id: any): void {
    this.dialogConfig.disableClose = true;
    const modalInventario = this.dialog.open(EditarCentroEsportivoComponent, this.dialogConfig);
    modalInventario.componentInstance.idCentro = id;
    // modalCadastro.afterClosed().subscribe(result => {
    //   console.log('O modal foi fechado.');
    // });
  }

  openModalAceitarAgendamentos(): void {
    this.dialogConfig.disableClose = true;
    const modalInventario = this.dialog.open(AceitarAgendamentosComponent, this.dialogConfig);
    //modalInventario.componentInstance.idCentro = this.idCentro;
    //modalInventario.componentInstance.idQuadra = objeto.id;
    //modalInventario.componentInstance.nomeQuadra = objeto.name;
    //modalInventario.componentInstance.valorHora = objeto.amount;
    // modalCadastro.afterClosed().subscribe(result => {
    //   console.log('O modal foi fechado.');
    // });
  }

  listaCentroEsportivo() {
    //const token = this.cookieService.get('ApiAuthCore');
    //const headers = { Authorization: token };
    //const body = { numberOfRows: '10000', numberOfRowsSkipped: '0'};
    this.http
      .get<any>('https://rightgame-api.onrender.com/sportsCenters')
        .subscribe({
          next: (data: any) => {
            console.log(data)
            this.dataCentroEsportivo = data.sportsCenters
            this.donoDoCentro = false
          },
          error: (error: any) => {
            console.error('There was an error!', error);
          },
        });
  }

  listaCentroEsportivoDono(id: any) {
    //const token = this.cookieService.get('ApiAuthCore');
    //const headers = { Authorization: token };
    //const body = { numberOfRows: '10000', numberOfRowsSkipped: '0'};
    this.http
      .get<any>('https://rightgame-api.onrender.com/sportsCenters/' + id)
        .subscribe({
          next: (data: any) => {
            this.dataCentroEsportivo = data.sportsCenters
            this.donoDoCentro = true
          },
          error: (error: any) => {
            console.error('There was an error!', error);
          },
        });
  }

  excluirCentroEsportivo(id: any){
    const token = this.cookieService.get('tokenApi')
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    this.http
      .delete<any>('https://rightgame-api.onrender.com/sportsCenters/' + id, {headers})
        .subscribe({
          next: (data: any) => {
            location.reload()
          },
          error: (error: any) => {
            console.error('There was an error!', error);
          },
        });
  }

}
