import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consultar-inventario',
  templateUrl: './consultar-inventario.component.html',
  styleUrls: ['./consultar-inventario.component.css']
})

export class ConsultarInventarioComponent implements OnInit{
  @Input() idCentro: any;
  dataInventario: any;
  colunas = [
    { exibicao: 'Nome', campo: 'name' },
    { exibicao: 'Valor', campo: 'value' },
    { exibicao: 'Quantidade', campo: 'quantity' },
    { exibicao: 'Descricao', campo: 'description' },
  ];
  colunasNomes: string[] = this.colunas.map(column => column.campo);

  constructor(private activatedRoute : ActivatedRoute,
    private http: HttpClient,) { }

  ngOnInit(): void {
    this.consultarInvetario();
  }

  consultarInvetario(){
    this.http
    .get<any>('https://rightgame-api.onrender.com/sportsCenters/' + this.idCentro + '/inventory')
      .subscribe({
        next: (data: any) => {
          this.dataInventario = data.products[0].products
          console.log(this.dataInventario)
        },
        error: (error: any) => {
          console.error('There was an error!', error);
        },
      });
  }
}
