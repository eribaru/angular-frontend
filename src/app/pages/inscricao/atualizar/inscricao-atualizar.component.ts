import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IInscricao} from "../../../interfaces/IInscricao";
import {IStatus} from "../../../interfaces/IStatus";

@Component({
  selector: 'app-inscricao-atualizar',
  templateUrl: './inscricao-atualizar.component.html',
  styleUrls: ['./inscricao-atualizar.component.css']
})
export class InscricaoAtualizarComponent implements OnInit {
  public inscricao!: IInscricao;
  inscricaoForm: FormGroup = new FormGroup({});
  statusControl = new FormControl<string | IStatus>('', Validators.required);
  public statusInscricoes: IStatus[] = [];

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
    this.getAllStatusInscricoes();
    this.inscricaoForm = this.formBuilder.group({
      vaga_nome: [ null],
      feedback: [null],
      data_inscricao: [null],
      apto_entrevista: [null],
      status_nome: [null],
    });
    if(this.inscricao!=null ){
      this.inscricaoForm.controls["vaga_nome"].disable();
      this.inscricaoForm.controls["vaga_nome"].setValue(this.inscricao.vaga_nome);
      this.inscricaoForm.controls["feedback"].setValue(this.inscricao.feedback);
      this.inscricaoForm.controls["apto_entrevista"].setValue(this.inscricao.apto_entrevista);
      this.inscricaoForm.controls["status_nome"].setValue(this.inscricao.status_nome);
    }
  }



  voltar(): void {
    this.location.back();
  }

  salvar(): void {
    console.log(this.inscricaoForm.value);
    this.updateSubcriptionDataToApi();

  }



  public updateSubcriptionDataToApi = () => {
    const inscricaoCamposAtualizados = this.inscricaoForm.getRawValue() as IInscricao;
    const inscricaoAtualizada:{ feedback: string | null; vaga: string; data_inscricao: Date | string | null; fim: Date | null; id: string | null; apto_entrevista: boolean | null; status: string } = {
      apto_entrevista: this.inscricao.apto_entrevista,
      data_inscricao:  this.inscricao.data_inscricao,
      feedback: inscricaoCamposAtualizados.feedback,
      fim: inscricaoCamposAtualizados.fim,
      id: this.inscricao.id,
      status: "",
      vaga: this.inscricao.vaga
    };
    this.apiService.putData('inscricoes/'+this.inscricao.id, inscricaoAtualizada).subscribe({
      next: (data) => {
        this.snackBar.open('Sucesso', 'Item foi atualizado', {
          duration: 3000,
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['vaga-lista']).then();
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  };

  getTitulo():string {
    if(this.inscricao && this.inscricao.vaga_nome) {
      return  this.inscricao.vaga_nome;
    }else{
      return "";
    }
  }

  public getAllStatusInscricoes = () => {
    this.apiService.getData('statusInscricao').subscribe((res) => {
      this.statusInscricoes = res as IStatus[];
      for (const item of this.statusInscricoes) {
        if(item.id==this.inscricao.status){
          this.statusControl.setValue(item);
        }
      }
    });

  }

}
