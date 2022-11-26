import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import {debounceTime, distinctUntilChanged, map, Observable, startWith} from 'rxjs';
import {Router} from '@angular/router';
import {IEndereco} from 'src/app/interfaces/IEndereco';
import {MatSnackBar} from '@angular/material/snack-bar';
import { EstadosEnum,EstadosMapping} from 'src/app/interfaces/Estados.enum';
import {TipoRegimeEnum, TipoRegimeMapping} from "../../../interfaces/TipoRegime.enum";
import {ICidade} from "../../../interfaces/ICidade";
import {IEmpresa} from "../../../interfaces/IEmpresa";

@Component({
  selector: 'app-endereco-atualizar',
  templateUrl: './endereco-atualizar.component.html',
  styleUrls: ['./endereco-atualizar.component.css']
})
export class EnderecoAtualizarComponent implements OnInit {
  public endereco!: IEndereco;
  enderecoForm: FormGroup = new FormGroup({});
  estadosControl = new FormControl<EstadosEnum | null>(null, Validators.required);
  cidadesControl = new FormControl<string | ICidade>('', Validators.required);
  public TipoRegimeMapping = TipoRegimeMapping;
  principal:false;
  public EstadosMapping = EstadosMapping;
  public estados : EstadosEnum[]= Object.values(EstadosEnum);
  estadoSelecionado = EstadosEnum;

  /** list of cidades */
  cidades: ICidade[] = [];
  cidadesCarregadas:Observable<ICidade[]>;
  public tiposRegime:TipoRegimeEnum[] = Object.values(TipoRegimeEnum);


  /** list of enderecos */
  enderecos: IEndereco[] = [];
  //cidadesCarregadas:Observable<ICidade[]>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private apiService: ApiService,
    private snackBar: MatSnackBar )
  {
    const navigation = this.router.getCurrentNavigation();
    if(navigation!=null){
    const state = navigation.extras.state as {example: IEndereco};
    if(state!=null && state.example!=null){
      this.endereco= state.example;
    }
    }
    this.principal = false;
    this.cidadesCarregadas = this.cidadesControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      map(cidade  => {
        const name = typeof cidade === 'string' ? cidade : cidade?.nom_cidade;
        return (name ? this.filter(name) : this.cidades.slice());
      }),
    );
  }

  private filter(value: string): ICidade[] {
    if(value.length>=3){
      this.getAllCidades();
    }
    const filterValue = value.toLowerCase();
    return this.cidades.filter(cidade => cidade.nom_cidade.toLowerCase().includes(filterValue));
  }



  ngOnInit(): void {
    this.enderecoForm = this.formBuilder.group({
      cargo: [null, [Validators.required]],
      area: [null, Validators.required],
      resposabilidades: [null, Validators.required],
      requisitos: [null, Validators.required],
      pcsc: [null, [Validators.required]],
      remoto: [null, Validators.required],
      carga_horaria: [null, Validators.required],
      local: [null, Validators.required],
      data_cadastro: [null, Validators.required],
      data_fechamento: [null, Validators.required],
    });
    this.recuperaEndereco();
    /*this.enderecoForm.controls["cargo"].setValue(this.endereco.cargo);
    this.enderecoForm.controls["area"].setValue(this.endereco.area);
    this.enderecoForm.controls["resposabilidades"].setValue(this.endereco.resposabilidades);
    this.enderecoForm.controls["carga_horaria"].setValue(this.endereco.carga_horaria);
    this.enderecoForm.controls["requisitos"].setValue(this.endereco.requisitos);
    this.enderecoForm.controls["pcsc"].setValue(this.endereco.pcsc);
    this.enderecoForm.controls["remoto"].setValue(this.endereco.remoto);
    this.enderecoForm.controls["local"].setValue(this.endereco.local);
    this.enderecoForm.controls["data_cadastro"].setValue(this.endereco.data_cadastro);
    this.enderecoForm.controls["data_fechamento"].setValue(this.endereco.data_fechamento);
    this.tipoContratoControl.setValue(this.endereco.tipo_contrato as TipoContratoEnum);
    this.tipoRegimeControl.setValue(this.endereco.contratacao as TipoRegimeEnum);*/
  }
  displayFnCidade(cidade: ICidade): string {
    return cidade && cidade.nom_cidade ? cidade.nom_cidade : '';
  }


  voltar(): void {
    this.location.back();
  }

  salvar(): void {
    console.log(this.enderecoForm.value);
    this.updateEnderecoDataToApi();

  }

  public recuperaEndereco = () => {
    this.apiService.getDetail('cidades/' + this.endereco.cidade).subscribe((data) => {
      if(data)
        this.cidadesControl.setValue(data as ICidade);

    });
  };

  public updateEnderecoDataToApi = () => {
    const cidadeSelecionada : ICidade = this.cidadesControl.value as ICidade ;
    const enderecoAtualizada = this.enderecoForm.getRawValue() as IEndereco;
    enderecoAtualizada.cidade = cidadeSelecionada.cod_cidade;
   // enderecoAtualizada.tipo_contrato = this.tipoContratoControl.value as TipoContratoEnum;
    this.apiService.putData('enderecos/'+this.endereco.id, enderecoAtualizada).subscribe({
      next: (data) => {
        this.snackBar.open('Sucesso', 'Item foi atualizado', {
          duration: 3000,
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['endereco-lista']).then();
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  };

  public loaddAllCidades = () => {
    this.apiService.getData('cidades?cod_estado=MG&search='+this.cidadesControl.value).subscribe({
      next: (data) => console.log(data),
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  };

  // filter and return the values
  public getAllCidades = () => {
    const estadoSelecionado : EstadosEnum = this.estadosControl.value as EstadosEnum;
    const estado = Object.keys(EstadosEnum)[Object.values(EstadosEnum).indexOf(estadoSelecionado)];
    if(estado){
      this.apiService.getData('cidades?cod_estado=' +  estado + '&search=' + this.cidadesControl.value).subscribe((res) => {
        this.cidades = res as ICidade[];
      });
    }
  }

}
