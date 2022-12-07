import { Component,  OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {IInscricao} from "../../../interfaces/IInscricao";


@Component({
  selector: 'app-inscricao-lista',
  templateUrl: './inscricao-lista.component.html',
  styleUrls: ['./inscricao-lista.component.scss'],
})
export class InscricaoListaComponent implements OnInit {

  inscricoes : IInscricao[];

  constructor(
    private repoService: ApiService,
    private location: Location,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {
    this.inscricoes = [];

  }
  ngOnInit() {
    this.getAllCurriculo();
  }
  public getAllCurriculo = () => {
    this.repoService.getData('inscricoes').subscribe((res) => {
      this.inscricoes   = res as IInscricao[]
    });
  };




  public redirectToDetails = (element: IInscricao) => {
    return this._router.navigate(['inscricao-detalhe/' + element.id],{ state: { example: element} });
  };



  public redirectToUpdate = (inscricao: any) => {
    return this._router.navigate(['inscricao-atualizar/' + inscricao.id],{ state: { example: inscricao} } );
  };
  public redirectToDelete = (id: string) => {
    this.repoService.delete('inscricoes/' + id).subscribe((data) => {
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
    this._router.navigate(['inscricao-lista']).then();
  }

}
