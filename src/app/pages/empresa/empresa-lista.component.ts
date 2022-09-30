
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IEmpresa } from '../../interfaces/IEmpresa';
import { ApiService } from '../../services/api.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-empresa-lista',
  templateUrl: './empresa-lista.component.html',
  styleUrls: ['./empresa-lista.component.css']
})
export class EmpresaListaComponent implements OnInit {
  [x: string]: any;
  public displayedColumns = ['nome', 'cnpj', 'ramo','sede','details', 'update', 'delete'
];
  public dataSource = new MatTableDataSource<IEmpresa>();
  constructor(private repoService: ApiService,private location: Location) { }
  ngOnInit() {
    this.getAllEmpresa();
  }
  public getAllEmpresa = () => {
    this.repoService.getData('empresas')
    .subscribe(res => {
      this.dataSource.data = res as IEmpresa[];
    })
  }

  public redirectToDetails = (id: string) => {
    
  }
  public redirectToUpdate = (id: string) => {
    
  }
  public redirectToDelete = (id: string) => {
    
  }

  voltar(): void {
    this.location.back();
  }
}