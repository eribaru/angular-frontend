import { Component, HostListener, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IEndereco } from '../../../interfaces/IEndereco';
import { ApiService } from '../../../services/api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {UsuarioService} from "../../../services/usuario.service";


@Component({
  selector: 'app-endereco-lista',
  templateUrl: './endereco-lista.component.html',
  styleUrls: ['./endereco-lista.component.scss'],
})
export class EnderecoListaComponent implements OnInit {
  [x: string]: any;

  enderecos : IEndereco[];
  public displayedColumns = [
    'nome',
    'cnpj',
    'ramo',
    'update',
    'delete',
    //public displayedColumns = ['nome', 'cnpj', 'ramo','sede','details', 'update', 'delete'
  ];
  public dataSource = new MatTableDataSource<IEndereco>();
  constructor(
    private repoService: ApiService,
    private location: Location,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {
    this.enderecos = [];

  }
  ngOnInit() {
    this.getAllEndereco();
  }
  public getAllEndereco = () => {
    this.repoService.getData('enderecos?usuario='+UsuarioService.obterIdUsuarioLogado).subscribe((res) => {
      this.dataSource.data = res as IEndereco[];
      this.enderecos   = res as IEndereco[]
    });
  };

  public redirectToCreateEndereco = () => {
    return this._router.navigate(['endereco-adicionar/']);
  };


  public redirectToDetails = (element: IEndereco) => {
    return this._router.navigate(['endereco-detalhe/' + element.id],{ state: { example: element} });
  };



  public redirectToUpdate = (endereco: any) => {
    //dataSource.
    return this._router.navigate(['endereco-atualizar/' + endereco.id],{ state: { example: endereco} } );
  };
  public redirectToDelete = (id: string) => {
    this.repoService.delete('enderecos/' + id).subscribe((data) => {
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
    this._router.navigate(['endereco-lista']).then();
  }

}
