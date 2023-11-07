import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AceitarAgendamentosComponent } from 'src/app/modais/aceitar-agendamentos/aceitar-agendamentos.component';
import { AgendarHorarioComponent } from 'src/app/modais/agendar-horario/agendar-horario.component';
import { CadastroQuadrasComponent } from 'src/app/modais/cadastro-quadras/cadastro-quadras.component';
import { ConsultarInventarioComponent } from 'src/app/modais/consultar-inventario/consultar-inventario.component';
import { EditarQuadrasComponent } from 'src/app/modais/editar-quadras/editar-quadras.component';

@Component({
  selector: 'app-quadras',
  templateUrl: './quadras.component.html',
  styleUrls: ['./quadras.component.css']
})
export class QuadrasComponent implements OnInit{
  idCentro: any;
  dataQuadras: any;
  idUsuario: any;
  perfilUsuario: any;
  donoDoCentro: any;
  possuiToken: any

  constructor(private activatedRoute : ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private cookieService: CookieService,
    ) { }

  ngOnInit(): void {
    this.idUsuario = this.cookieService.get('idUsuario')
    this.perfilUsuario = this.cookieService.get('perfilLogin')
    this.idCentro = this.activatedRoute.snapshot.paramMap.get("id");
    this.listaQuadras(this.cookieService.get('idUsuario'))

  }

  dialogConfig = new MatDialogConfig();

  openModalConsultarInventario(): void {
    this.dialogConfig.disableClose = true;
    const modalInventario = this.dialog.open(ConsultarInventarioComponent, this.dialogConfig);
    modalInventario.componentInstance.idCentro = this.idCentro;
    // modalCadastro.afterClosed().subscribe(result => {
    //   console.log('O modal foi fechado.');
    // });
  }

  openModalCadastrarQuadras(): void {
    this.dialogConfig.disableClose = true;
    const modalInventario = this.dialog.open(CadastroQuadrasComponent, this.dialogConfig);
    modalInventario.componentInstance.idCentro = this.idCentro;
    // modalCadastro.afterClosed().subscribe(result => {
    //   console.log('O modal foi fechado.');
    // });
  }

  openModalEditarQuadras(id: any): void {
    this.dialogConfig.disableClose = true;
    const modalInventario = this.dialog.open(EditarQuadrasComponent, this.dialogConfig);
    modalInventario.componentInstance.idCentro = this.idCentro;
    modalInventario.componentInstance.idQuadra = id;
    // modalCadastro.afterClosed().subscribe(result => {
    //   console.log('O modal foi fechado.');
    // });
  }

  openModalAgendarHorario(objeto: any): void {
    this.dialogConfig.disableClose = true;
    const modalInventario = this.dialog.open(AgendarHorarioComponent, this.dialogConfig);
    modalInventario.componentInstance.idCentro = this.idCentro;
    modalInventario.componentInstance.idQuadra = objeto.id;
    modalInventario.componentInstance.nomeQuadra = objeto.name;
    modalInventario.componentInstance.valorHora = objeto.amount;
    // modalCadastro.afterClosed().subscribe(result => {
    //   console.log('O modal foi fechado.');
    // });
  }

  listaQuadras(id: any) {
    //const token = this.cookieService.get('ApiAuthCore');
    //const headers = { Authorization: token };
    //const body = { numberOfRows: '10000', numberOfRowsSkipped: '0'};
    this.http
      .get<any>('https://rightgame-api.onrender.com/sportsCenters/' + this.idCentro + '/sportsCourts')
        .subscribe({
          next: (data: any) => {
            this.dataQuadras = data
            if(this.idUsuario == this.dataQuadras.sportsCenter.owner_id){
              this.donoDoCentro = true;
            }else{
              this.donoDoCentro = false;
            }
          },
          error: (error: any) => {
            console.error('There was an error!', error);
          },
        });
  }

  excluirQuadra(id: any){
    const token = this.cookieService.get('tokenApi')
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    this.http
      .delete<any>('https://rightgame-api.onrender.com/sportsCenters/' + this.idCentro + '/sportsCourts/' + id, {headers})
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
