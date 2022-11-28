
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IEmpresa} from "../../../interfaces/IEmpresa";
import {EstadosEnum,EstadosMapping} from "../../../interfaces/Estados.enum";
import {ICidade} from "../../../interfaces/ICidade";
import {TipoEnderecoEnum,TipoEnderecoMapping} from "../../../interfaces/TipoEndereco.enum";
import {IEndereco} from "../../../interfaces/IEndereco";
import {IVaga} from "../../../interfaces/IVaga";

@Component({
  selector: 'app-endereco-detalhe',
  templateUrl: './endereco-detalhe.component.html',
  styleUrls: ['./endereco-detalhe.component.css']
})
export class EnderecoDetalheComponent implements OnInit {
  isEditable = false;
  public endereco!: IEndereco;
  enderecoForm: FormGroup = new FormGroup({});
  estadosControl = new FormControl<EstadosEnum | null>(null);
  cidadesControl = new FormControl<string | ICidade>('');
  empresasControl = new FormControl<string | IEmpresa>('');
  tipoEnderecoControl = new FormControl<TipoEnderecoEnum | null>(null);
  public TipoEnderecoMapping = TipoEnderecoMapping;
  principal:boolean;
  public tiposEndereco:TipoEnderecoEnum[]  = Object.values(TipoEnderecoEnum);
  public EstadosMapping = EstadosMapping;
  public estados : EstadosEnum[]= Object.values(EstadosEnum);
  estadoSelecionado = EstadosEnum;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private apiService: ApiService,
    private snackBar: MatSnackBar,

  ) {
    const navigation = this.router.getCurrentNavigation();
    this.principal=false;
    if(navigation!=null) {
      const state = navigation.extras.state as { example: IEndereco };
      if (state != null && state.example != null) {
        this.endereco = state.example;
        this.principal = this.endereco.principal;
      }
    }


  }

  displayFnEmpresa(empresa: IEmpresa): string {
    return empresa && empresa.nome ? empresa.nome : '';
  }

  displayFnCidade(cidade: ICidade): string {
    return cidade && cidade.nom_cidade ? cidade.nom_cidade : '';
  }



  ngOnInit(): void {
    this.enderecoForm = this.formBuilder.group({
      apelido: [null],
      rua: [null],
      numero: [null],
      cep: [null],
      bairro: [null],
      principalControl: [null],
      estado: [null],
      cidade: [null],
      tipo: [null],
      complemento: [null],
    });
    if(this.endereco!=null ){
      this.recuperaEmpresa();
      this.recuperaCidade();
      this.enderecoForm.controls["apelido"].disable();
      this.enderecoForm.controls["apelido"].setValue(this.endereco.apelido);
      this.enderecoForm.controls["rua"].disable();
      this.enderecoForm.controls["rua"].setValue(this.endereco.rua);
      this.enderecoForm.controls["numero"].disable();
      this.enderecoForm.controls["numero"].setValue(this.endereco.numero);
      this.enderecoForm.controls["cep"].disable();
      this.enderecoForm.controls["cep"].setValue(this.endereco.cep);
      this.enderecoForm.controls["principalControl"].disable();
      this.enderecoForm.controls["principalControl"].setValue(this.endereco.principal);
      this.enderecoForm.controls["bairro"].disable();
      this.enderecoForm.controls["bairro"].setValue(this.endereco.bairro);
      this.enderecoForm.controls["estado"].disable();
      //this.enderecoForm.controls["estado"].setValue(this.estado);
      //this.tipoEnderecoControl.disable();
      this.enderecoForm.controls["tipo"].disable();
      this.enderecoForm.controls["tipo"].setValue(TipoEnderecoMapping[this.endereco.tipo as TipoEnderecoEnum]);
      this.enderecoForm.controls["complemento"].disable();
      this.enderecoForm.controls["complemento"].setValue(this.endereco.complemento);
      this.estadosControl.disable();
      this.cidadesControl.disable();

    }
  }

  public recuperaEmpresa = () => {
    if (this.endereco.empresa) {
      this.apiService.getDetail('empresas/' + this.endereco.empresa).subscribe((data) => {
        if (data)
          this.empresasControl.setValue(data as IEmpresa);

      });
    }
  };

  public recuperaCidade = () => {
    if (this.endereco.cidade) {
      this.apiService.getDetail('cidades/' + this.endereco.cidade).subscribe((data) => {
        let cidade;
        if (data) {
          cidade = data as ICidade
          //TipoContratoMapping[this.endereco.tipo_contrato as TipoContratoEnum]
          this.estadosControl.setValue(cidade.cod_estado as EstadosEnum)
          this.cidadesControl.setValue(cidade.nom_cidade);
        }
      });
    }
  };

  getTitulo():string {
    if(this.endereco && this.endereco.apelido) {
      return  this.endereco.apelido;
    }else{
      return "";
    }
  }


  voltar(): void {
    this.location.back();
  }



  public redirectToUpdate = () => {
    //dataSource.
    return this.router.navigate(['endereco-atualizar/' + this.endereco.id],{ state: { example: this.endereco} } );
  };

  public excluir = () => {
    this.apiService.delete('enderecos/' + this.endereco.id).subscribe((data) => {
      this.snackBar.open('Sucesso', 'Item foi apagado', {
        duration: 3000,
      });
      this.reloadComponent();
    });
  };


  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['endereco-lista']).then();
  }
}
