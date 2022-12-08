import { Component,  OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {IInscricao} from "../../../interfaces/IInscricao";
import {UsuarioService} from "../../../services/usuario.service";
import {VerificarPermissoes} from "../../../services/guards/verificarPermissao";
import {IVaga} from "../../../interfaces/IVaga";


@Component({
  selector: 'app-inscricao-lista',
  templateUrl: './inscricao-lista.component.html',
  styleUrls: ['./inscricao-lista.component.scss'],
})
export class InscricaoListaComponent implements OnInit {
  public isRecrutador =  VerificarPermissoes.temPerfilRecrutador();
  public vaga!: IVaga;
  inscricoes : IInscricao[];

  constructor(
    private repoService: ApiService,
    private location: Location,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {
    this.inscricoes = [];
    const navigation = this._router.getCurrentNavigation();
    if(navigation!=null){
      const state = navigation.extras.state as {example: IVaga};
      if(state!=null && state.example!=null){
        this.vaga= state.example;
      }
    }
  }
  ngOnInit() {
    this.getAllInscricoes();
  }
  public getAllInscricoes = () => {
    let urlInscricoes = 'inscricoes';
    if(this.isRecrutador && UsuarioService.obterIdUsuarioLogado){
      urlInscricoes =  urlInscricoes+ '?vaga='+this.vaga.id ;
    }else{
      urlInscricoes =  urlInscricoes+ '?usuario='+UsuarioService.obterIdUsuarioLogado;
    }
    this.repoService.getData(urlInscricoes).subscribe((res) => {
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
