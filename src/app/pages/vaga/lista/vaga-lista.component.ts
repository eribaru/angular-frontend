import { Component, HostListener, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IVaga } from '../../../interfaces/IVaga';
import { ApiService } from '../../../services/api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-vaga-lista',
  templateUrl: './vaga-lista.component.html',
  styleUrls: ['./vaga-lista.component.scss'],
})
export class VagaListaComponent implements OnInit {
  [x: string]: any;

  vagas : IVaga[];
  public displayedColumns = [
    'nome',
    'cnpj',
    'ramo',
    'update',
    'delete',
    //public displayedColumns = ['nome', 'cnpj', 'ramo','sede','details', 'update', 'delete'
  ];
  public dataSource = new MatTableDataSource<IVaga>();
  constructor(
    private repoService: ApiService,
    private location: Location,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {
    this.vagas = [];

  }
  ngOnInit() {
    this.getAllVaga();
  }
  public getAllVaga = () => {
    this.repoService.getData('vagas').subscribe((res) => {
      this.dataSource.data = res as IVaga[];
      this.vagas   = res as IVaga[]
    });
  };

  public redirectToCreateJob = () => {
    return this._router.navigate(['vaga-adicionar/']);
  };


  public redirectToDetails = (element: IVaga) => {
    return this._router.navigate(['vaga-detalhe/' + element.id,{ state: { example: element} }]);
  };



  public redirectToUpdate = (vaga: any) => {
    //dataSource.
    return this._router.navigate(['vaga-atualizar/' + vaga.id],{ state: { example: vaga} } );
  };
  public redirectToDelete = (id: string) => {
    this.repoService.delete('vagas/' + id).subscribe((data) => {
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
    this._router.navigate(['vaga-lista']).then();
  }

}
