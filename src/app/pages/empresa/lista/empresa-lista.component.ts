import { Component, HostListener, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IEmpresa } from '../../../interfaces/IEmpresa';
import { ApiService } from '../../../services/api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-empresa-lista',
  templateUrl: './empresa-lista.component.html',
  styleUrls: ['./empresa-lista.component.scss'],
})
export class EmpresaListaComponent implements OnInit {
  [x: string]: any;
  public displayedColumns = [
    'nome',
    'cnpj',
    'ramo',
    'update',
    'delete',
    //public displayedColumns = ['nome', 'cnpj', 'ramo','sede','details', 'update', 'delete'
  ];
  public dataSource = new MatTableDataSource<IEmpresa>();
  constructor(
    private repoService: ApiService,
    private location: Location,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.getAllEmpresa();
  }
  public getAllEmpresa = () => {
    this.repoService.getData('empresas').subscribe((res) => {
      this.dataSource.data = res as IEmpresa[];
    });
  };

  public redirectToCreateCompany = () => {
    return this._router.navigate(['empresa-adicionar/']);
  };

  /*
  public redirectToDetails = (id: string) => {
    return this._router.navigate(['empresa-detalhe/' + id,{}]);
  };*/

  public redirectToUpdate = (empresa: any) => {
    //dataSource.
    return this._router.navigate(['empresa-atualizar/' + empresa.id],{ state: { example: empresa} } );
  };
  public redirectToDelete = (id: string) => {
    this.repoService.delete('empresas/' + id).subscribe((data) => {
      this.snackBar.open('Sucesso', 'Item foi apagado', {
        duration: 3000,
      });
      this.reloadComponent();
    });
  };

  voltar(): void {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['']).then();
  }

  reloadComponent() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['empresa-lista']).then();
  }

}
