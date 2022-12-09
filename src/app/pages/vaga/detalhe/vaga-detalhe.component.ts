import { Component, OnInit } from '@angular/core';
import {DatePipe, Location} from '@angular/common'
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IVaga} from "../../../interfaces/IVaga";
import {IEmpresa} from "../../../interfaces/IEmpresa";
import {TipoContratoEnum, TipoContratoMapping} from "../../../interfaces/TipoContrato.enum";
import {TipoRegimeEnum, TipoRegimeMapping} from "../../../interfaces/TipoRegime.enum";
import {VerificarPermissoes} from "../../../services/guards/verificarPermissao";
import {IInscricao} from "../../../interfaces/IInscricao";
import {UsuarioService} from "../../../services/usuario.service";

@Component({
  selector: 'app-vaga-detalhe',
  templateUrl: './vaga-detalhe.component.html',
  styleUrls: ['./vaga-detalhe.component.css']
})
export class VagaDetalheComponent implements OnInit {
  public isRecrutador =  VerificarPermissoes.temPerfilRecrutador();
  public vaga!: IVaga;
  public vagaForm: FormGroup = new FormGroup({});
  public empresasControl = new FormControl<string | IEmpresa>('');
  public TipoContratoMapping = TipoContratoMapping;
  public TipoRegimeMapping = TipoRegimeMapping;
  public inscricoes: IInscricao[];
  public estaInscrito = false;
  private iInscricao: IInscricao|null = null;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private location: Location,
              private apiService: ApiService,
              private snackBar: MatSnackBar) {
    this.inscricoes =[]
    const navigation = this.router.getCurrentNavigation();
    if(navigation!=null) {
      const state = navigation.extras.state as { example: IVaga };
      if (state != null && state.example != null) {
        this.vaga = state.example;
      }
    }}



  ngOnInit(): void {

    this.vagaForm = this.formBuilder.group({
      //cargo: [null],
      area: [ null],
      resposabilidades: [null],
      requisitos: [null],
      pcsc: [null],
      remoto: [null],
      local: [null],
      tipo_contrato: [null],
      contratacao: [null],
      carga_horaria: [null],
      data_cadastro: [null],
      data_fechamento: [null],
    });

      if(this.vaga!=null ){
        this.recuperaEmpresa();
        this.getAllInscricoes();
        this.vagaForm.controls["area"].disable();
        this.vagaForm.controls["area"].setValue(this.vaga.area);
        this.vagaForm.controls["resposabilidades"].disable();
        this.vagaForm.controls["resposabilidades"].setValue(this.vaga.resposabilidades);
        this.vagaForm.controls["requisitos"].disable();
        this.vagaForm.controls["requisitos"].setValue(this.vaga.requisitos);
        this.vagaForm.controls["pcsc"].disable();
        this.vagaForm.controls["pcsc"].setValue(this.vaga.pcsc);
        this.vagaForm.controls["remoto"].disable();
        this.vagaForm.controls["remoto"].setValue(this.vaga.remoto);
        this.vagaForm.controls["local"].disable();
        this.vagaForm.controls["local"].setValue(this.vaga.local);
        this.vagaForm.controls["carga_horaria"].disable();
        this.vagaForm.controls["carga_horaria"].setValue(this.vaga.carga_horaria);
        this.vagaForm.controls["contratacao"].disable();
        this.vagaForm.controls["contratacao"].setValue(TipoRegimeMapping[this.vaga.contratacao as TipoRegimeEnum]);
        this.vagaForm.controls["tipo_contrato"].disable();
        this.vagaForm.controls["tipo_contrato"].setValue(TipoContratoMapping[this.vaga.tipo_contrato as TipoContratoEnum]);
        this.vagaForm.controls["data_cadastro"].disable();
        this.vagaForm.controls["data_cadastro"].setValue(this.vaga.data_cadastro);
        this.vagaForm.controls["data_fechamento"].disable();
        this.vagaForm.controls["data_fechamento"].setValue(this.vaga.data_fechamento);

    }

  }

  public recuperaEmpresa = () => {
    this.apiService.getDetail('empresas/' + this.vaga.empresa).subscribe((data) => {
      if(data)
        this.empresasControl.setValue(data as IEmpresa);

    });
  };

  getTitulo():string {
    if(this.vaga && this.vaga.cargo) {
      return  this.vaga.cargo;
    }else{
      return "";
    }
  }


  voltar(): void {
    this.location.back();
  }



  public redirectToUpdate = () => {
    //dataSource.
    return this.router.navigate(['vaga-atualizar/' + this.vaga.id],{ state: { example: this.vaga} } );
  };

  public excluir = () => {
    if(this.inscricoes && this.inscricoes.length>0){
      this.snackBar.open('Erro', 'Vaga tem inscrições e não pode ser apagada', {
        duration: 3000,
      });
    }else {
      this.apiService.delete('vagas/' + this.vaga.id).subscribe((data) => {
        this.snackBar.open('Sucesso', 'Item foi apagado', {
          duration: 3000,
        });
        this.reloadComponent();
      });
    }
  };


  public getAllInscricoes = () => {
    let urlInscricoes = 'inscricoes?vaga='+this.vaga.id;
    if(!this.isRecrutador && UsuarioService.obterIdUsuarioLogado){
      urlInscricoes =  urlInscricoes+ '&usuario='+UsuarioService.obterIdUsuarioLogado;
    }
    this.apiService.getData(urlInscricoes).subscribe((res) => {
      this.inscricoes   = res as IInscricao[]
      if(!this.isRecrutador &&  this.inscricoes.length===1){
        this.iInscricao =  this.inscricoes[0];
        this.estaInscrito = true;
      }
    });
  };

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['vaga-lista']).then();
  }

  seInscrever() {
    if(this.iInscricao == null && !this.estaInscrito){
      const date=new Date();
      //const dataInscricao =this.datepipe.transform(date, 'yyyy-MM-dd');
        const novaInscricao: { feedback: null; vaga: string;usuario: string | null; fim: null; apto_entrevista: boolean; status: string } = {
            apto_entrevista: false,
            feedback: null,
            fim: null,
            status: "00000000-0000-0000-0000-000000000003",
            usuario: UsuarioService.obterIdUsuarioLogado,
            vaga: this.vaga.id
        }
        this.apiService.postData('inscricoes', novaInscricao).subscribe({
        next: () => {
            this.snackBar.open('Sucesso', 'Inscrição foi salva', {
              duration: 3000,
            });
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['vaga-lista']).then().then();
        },
        error: (error) => {
            console.error('There was an error!', error);
            throw error;
        },
      });
    }
  }

  verInscricao() {
    if(this.iInscricao !=null && this.iInscricao.id!=null){
      return this.router.navigate(['inscricao-detalhe/' + this.iInscricao.id],{ state: { example: this.iInscricao} } );
    }else{
      return this.router.navigate(['inscricao-lista/' ],{ state: { example: this.vaga} } );
    }
  }
}
