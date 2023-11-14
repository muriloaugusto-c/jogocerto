import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ConsultarInventarioComponent } from 'src/app/modais/consultar-inventario/consultar-inventario.component';
import { CadastroQuadrasComponent } from 'src/app/modais/cadastro-quadras/cadastro-quadras.component';
import { EditarQuadrasComponent } from 'src/app/modais/editar-quadras/editar-quadras.component';
import { AgendarHorarioComponent } from 'src/app/modais/agendar-horario/agendar-horario.component';
import { FormatarValorService } from 'src/app/service/valor.service';

@Component({
  selector: 'app-quadras',
  templateUrl: './quadras.component.html',
  styleUrls: ['./quadras.component.css'],
})
export class QuadrasComponent implements OnInit {
  idCentro: any;
  dataQuadras: any;
  idUsuario: any;
  perfilUsuario: any;
  donoDoCentro: any;
  possuiToken: any;
  colunasNoDesktop = 3;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private cookieService: CookieService,
    private breakpointObserver: BreakpointObserver,
    private formatarValorService: FormatarValorService
  ) {}

  ngOnInit(): void {
    this.idUsuario = this.cookieService.get('idUsuario');
    this.perfilUsuario = this.cookieService.get('perfilLogin');
    this.idCentro = this.activatedRoute.snapshot.paramMap.get('id');
    this.listaQuadras(this.cookieService.get('idUsuario'));
    this.atualizarColunasNoDesktop();
  }

  dialogConfig = new MatDialogConfig();

  openModalConsultarInventario(): void {
    this.dialogConfig.disableClose = true;
    const modalInventario = this.dialog.open(
      ConsultarInventarioComponent,
      this.dialogConfig
    );
    modalInventario.componentInstance.idCentro = this.idCentro;
  }

  openModalCadastrarQuadras(): void {
    this.dialogConfig.disableClose = true;
    const modalInventario = this.dialog.open(
      CadastroQuadrasComponent,
      this.dialogConfig
    );
    modalInventario.componentInstance.idCentro = this.idCentro;
  }

  openModalEditarQuadras(id: any): void {
    this.dialogConfig.disableClose = true;
    const modalInventario = this.dialog.open(
      EditarQuadrasComponent,
      this.dialogConfig
    );
    modalInventario.componentInstance.idCentro = this.idCentro;
    modalInventario.componentInstance.idQuadra = id;
  }

  openModalAgendarHorario(objeto: any): void {
    this.dialogConfig.disableClose = true;

    const modalInventario = this.dialog.open(
      AgendarHorarioComponent,
      this.dialogConfig
    );
    modalInventario.componentInstance.idCentro = this.idCentro;
    modalInventario.componentInstance.idQuadra = objeto.id;
    modalInventario.componentInstance.nomeQuadra = objeto.name;
    modalInventario.componentInstance.valorHora =
      this.formatarValorService.formatarParaReal(objeto.amount);
  }

  listaQuadras(id: any) {
    this.http
      .get<any>(
        'https://rightgame-api.onrender.com/sportsCenters/' +
          this.idCentro +
          '/sportsCourts'
      )
      .subscribe({
        next: (data: any) => {
          this.dataQuadras = data.sportsCourts.map((item: any) => ({
            ...item,
            amount: this.formatarValorService.formatarParaReal(item.amount),
          }));
          if (this.idUsuario == data.sportsCenter.owner_id) {
            this.donoDoCentro = true;
          } else {
            this.donoDoCentro = false;
          }
        },
        error: (error: any) => {
          console.error('There was an error!', error);
        },
      });
  }

  excluirQuadra(id: any) {
    const token = this.cookieService.get('tokenApi');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    this.http
      .delete<any>(
        'https://rightgame-api.onrender.com/sportsCenters/' +
          this.idCentro +
          '/sportsCourts/' +
          id,
        { headers }
      )
      .subscribe({
        next: (data: any) => {
          location.reload();
        },
        error: (error: any) => {
          console.error('There was an error!', error);
        },
      });
  }

  private atualizarColunasNoDesktop(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(map((result) => (result.matches ? 1 : 3)))
      .subscribe((colunas) => (this.colunasNoDesktop = colunas));
  }
}
