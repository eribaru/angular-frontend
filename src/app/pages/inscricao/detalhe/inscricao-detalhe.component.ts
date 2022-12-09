import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IVaga} from "../../../interfaces/IVaga";
import {IInscricao} from "../../../interfaces/IInscricao";
import {VerificarPermissoes} from "../../../services/guards/verificarPermissao";

@Component({
  selector: 'app-inscricao-detalhe',
  templateUrl: './inscricao-detalhe.component.html',
  styleUrls: ['./inscricao-detalhe.component.css']
})
export class InscricaoDetalheComponent implements OnInit {
  public isRecrutador =  VerificarPermissoes.temPerfilRecrutador();
  public inscricao!: IInscricao;
  inscricaoForm: FormGroup = new FormGroup({});


  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private location: Location,
              private apiService: ApiService,
              private snackBar: MatSnackBar) {

    const navigation = this.router.getCurrentNavigation();
    if(navigation!=null) {
      const state = navigation.extras.state as { example: IInscricao };
      if (state != null && state.example != null) {
        this.inscricao = state.example;
      }
    }}

  ngOnInit(): void {
    this.inscricaoForm = this.formBuilder.group({
      vaga_nome: [ null],
      feedback: [null],
      data_inscricao: [null],
      apto_entrevista: [null],
      status_nome: [null],
      usuario_nome: [null],
    });
    if(this.inscricao!=null ){
        this.inscricaoForm.controls["vaga_nome"].disable();
        this.inscricaoForm.controls["vaga_nome"].setValue(this.inscricao.vaga_nome);
        this.inscricaoForm.controls["feedback"].disable();
        this.inscricaoForm.controls["feedback"].setValue(this.inscricao.feedback);
        this.inscricaoForm.controls["apto_entrevista"].disable();
        this.inscricaoForm.controls["apto_entrevista"].setValue(this.inscricao.apto_entrevista);
        this.inscricaoForm.controls["status_nome"].disable();
        this.inscricaoForm.controls["status_nome"].setValue(this.inscricao.status_nome);
        this.inscricaoForm.controls["usuario_nome"].disable();
        this.inscricaoForm.controls["usuario_nome"].setValue(this.inscricao.usuario_nome);

    }
  }

  getTitulo():string {
    if(this.inscricao && this.inscricao.vaga_nome) {
      return  this.inscricao.vaga_nome;
    }else{
      return "";
    }
  }

  voltar(): void {
    this.location.back();
  }

  public redirectToUpdate = () => {
    return this.router.navigate(['inscricao-atualizar/' + this.inscricao.id],{ state: { example: this.inscricao} } );
  };

  public excluir = () => {
    this.apiService.delete('inscricoes/' + this.inscricao.id).subscribe((data) => {
      this.snackBar.open('Sucesso', 'Item foi apagado', {
        duration: 3000,
      });
      this.reloadComponent();
    });
  };

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['inscricao-lista']).then();
  }
}
