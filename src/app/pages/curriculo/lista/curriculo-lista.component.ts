import { Component, HostListener, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ICurriculo } from '../../../interfaces/ICurriculo';
import { ApiService } from '../../../services/api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-curriculo-lista',
  templateUrl: './curriculo-lista.component.html',
  styleUrls: ['./curriculo-lista.component.scss'],
})
export class CurriculoListaComponent implements OnInit {
  [x: string]: any;

  curriculos : ICurriculo[];
  public displayedColumns = [
    'nome',
    'cnpj',
    'ramo',
    'update',
    'delete',
    //public displayedColumns = ['nome', 'cnpj', 'ramo','sede','details', 'update', 'delete'
  ];
  public dataSource = new MatTableDataSource<ICurriculo>();
  constructor(
    private repoService: ApiService,
    private location: Location,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {
    this.curriculos = [];

  }
  ngOnInit() {
    this.getAllCurriculo();
  }
  public getAllCurriculo = () => {
    this.repoService.getData('curriculos').subscribe((res) => {
      this.dataSource.data = res as ICurriculo[];
      this.curriculos   = res as ICurriculo[]
    });
  };

  public redirectToCreateJob = () => {
    return this._router.navigate(['curriculo-adicionar/']);
  };


  public redirectToDetails = (element: ICurriculo) => {
    return this._router.navigate(['curriculo-detalhe/' + element.id],{ state: { example: element} });
  };



  public redirectToUpdate = (curriculo: any) => {
    //dataSource.
    return this._router.navigate(['curriculo-atualizar/' + curriculo.id],{ state: { example: curriculo} } );
  };
  public redirectToDelete = (id: string) => {
    this.repoService.delete('curriculos/' + id).subscribe((data) => {
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
    this._router.navigate(['curriculo-lista']).then();
  }

}
