import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CadastroItemComponent } from 'src/app/modais/cadastro-item/cadastro-item.component';
import { CadastroQuadrasComponent } from 'src/app/modais/cadastro-quadras/cadastro-quadras.component';
import { ConsultarInventarioComponent } from 'src/app/modais/consultar-inventario/consultar-inventario.component';
import { EditarItemComponent } from 'src/app/modais/editar-item/editar-item.component';
import { EditarQuadrasComponent } from 'src/app/modais/editar-quadras/editar-quadras.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit{
  idCentro: any;
  dataInventario: any;
  idUsuario: any;
  donoDoCentro: any;

  constructor(private activatedRoute : ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private cookieService: CookieService,
    ) { }

  ngOnInit(): void {
    this.idUsuario = this.cookieService.get('idUsuario')
    this.idCentro = this.activatedRoute.snapshot.paramMap.get("id");
    this.listaInventario()

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

  openModalCadastrarItem(): void {
    this.dialogConfig.disableClose = true;
    const modalInventario = this.dialog.open(CadastroItemComponent, this.dialogConfig);
    modalInventario.componentInstance.idCentro = this.idCentro;
    // modalCadastro.afterClosed().subscribe(result => {
    //   console.log('O modal foi fechado.');
    // });
  }

  openModalEditarItem(id: any): void {
    this.dialogConfig.disableClose = true;
    const modalInventario = this.dialog.open(EditarItemComponent, this.dialogConfig);
    modalInventario.componentInstance.idCentro = this.idCentro;
    modalInventario.componentInstance.idItem = id;
    // modalCadastro.afterClosed().subscribe(result => {
    //   console.log('O modal foi fechado.');
    // });
  }

  listaInventario() {
    //const token = this.cookieService.get('ApiAuthCore');
    //const headers = { Authorization: token };
    //const body = { numberOfRows: '10000', numberOfRowsSkipped: '0'};
    this.http
      .get<any>('https://rightgame-api.onrender.com/sportsCenters/' + this.idCentro + '/inventory')
        .subscribe({
          next: (data: any) => {
            this.dataInventario = data.products[0]
          },
          error: (error: any) => {
            console.error('There was an error!', error);
          },
        });
  }

  excluirItem(id: any){
    const token = this.cookieService.get('tokenApi')
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
    this.http
      .delete<any>('https://rightgame-api.onrender.com/sportsCenters/' + this.idCentro + '/inventory/' + id, {headers})
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
