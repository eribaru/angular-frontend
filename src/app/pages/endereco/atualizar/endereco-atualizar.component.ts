import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import {debounceTime, distinctUntilChanged, map, Observable, startWith} from 'rxjs';
import {Router} from '@angular/router';
import {IEndereco} from 'src/app/interfaces/IEndereco';
import {MatSnackBar} from '@angular/material/snack-bar';
import { EstadosEnum,EstadosMapping} from 'src/app/interfaces/Estados.enum';
import {ICidade} from "../../../interfaces/ICidade";
import {IEmpresa} from "../../../interfaces/IEmpresa";
import {TipoEnderecoEnum,TipoEnderecoMapping} from "../../../interfaces/TipoEndereco.enum";
import {UsuarioService} from "../../../services/usuario.service";
import {TipoContratoEnum} from "../../../interfaces/TipoContrato.enum";

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
  empresasControl = new FormControl<string | IEmpresa>('', Validators.required);
  tipoEnderecoControl = new FormControl<TipoEnderecoEnum | null>(null, Validators.required);
  public TipoEnderecoMapping = TipoEnderecoMapping;
  principal:boolean;
  public tiposEndereco:TipoEnderecoEnum[]  = Object.values(TipoEnderecoEnum);
  public EstadosMapping = EstadosMapping;
  public estados : EstadosEnum[]= Object.values(EstadosEnum);
  estadoSelecionado = EstadosEnum;

  /** list of cidades */
  cidades: ICidade[] = [];
  cidadesCarregadas:Observable<ICidade[]>;

  /** list of empresas */
  empresas: IEmpresa[] = [];
  empresasCarregadas:Observable<IEmpresa[]>;




  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService,

  ) {
    this.principal = false;
    this.empresasCarregadas = this.empresasControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      map(empresa  => {
        const name = typeof empresa === 'string' ? empresa : empresa?.nome;
        return (name ? this.filterEmpresa(name) : this.empresas.slice());
      }),
    );
    this.cidadesCarregadas = this.cidadesControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      map(cidade  => {
        const name = typeof cidade === 'string' ? cidade : cidade?.nom_cidade;
        return (name ? this.filterCidade(name) : this.cidades.slice());
      }),
    );
    const navigation = this.router.getCurrentNavigation();
    if(navigation!=null) {
      const state = navigation.extras.state as { example: IEndereco };
      if (state != null && state.example != null) {
        this.endereco = state.example;
      }
    }
  }
  getTitulo():string {
    if(this.endereco && this.endereco.apelido) {
      return  this.endereco.apelido;
    }else{
      return "";
    }
  }
  displayFnEmpresa(empresa: IEmpresa): string {
    return empresa && empresa.nome ? empresa.nome : '';
  }

  private filterCidade(value: string): ICidade[] {
    if(value.length>=3){
      this.getAllCidades();
    }
    const filterValue = value.toLowerCase();
    return this.cidades.filter(cidade => cidade.nom_cidade.toLowerCase().includes(filterValue));
  }

  private filterEmpresa(value: string): IEmpresa[] {
    if(value.length>=3){
      this.getAllEmpresas();
    }else{
      this.empresas = [];
    }
    const filterValue = value.toLowerCase();
    return this.empresas.filter(empresa => empresa.nome.toLowerCase().includes(filterValue));
  }



  ngOnInit(): void {
    this.enderecoForm = this.formBuilder.group({
      apelido: [null, [Validators.required]],
      rua: [null, Validators.required],
      numero: [null, Validators.required],
      cep: [null, Validators.required],
      bairro: [null, [Validators.required]],
      principal: [null, [Validators.required]],

      complemento: [null, Validators.required],
    });
    if(this.endereco!=null ){
      this.recuperaEmpresa();
      this.recuperaCidade();
      this.enderecoForm.controls["apelido"].setValue(this.endereco.apelido);
      this.enderecoForm.controls["rua"].setValue(this.endereco.rua);
      this.enderecoForm.controls["numero"].setValue(this.endereco.numero);
      this.enderecoForm.controls["cep"].setValue(this.endereco.cep);
      this.enderecoForm.controls["principal"].setValue(this.endereco.principal);
      this.enderecoForm.controls["bairro"].setValue(this.endereco.bairro);
      this.tipoEnderecoControl.setValue(this.endereco.tipo as TipoEnderecoEnum);
      this.enderecoForm.controls["complemento"].setValue(this.endereco.complemento);


    }
  }

  voltar(): void {
    this.location.back();
  }

  salvar(): void {
    console.log(this.enderecoForm.value);
    this.updateVagaDataToApi();

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
          cidade = data as ICidade;
          this.estadosControl.patchValue(cidade.cod_estado as EstadosEnum);
          this.estadosControl.setValue(cidade.cod_estado as EstadosEnum);
          console.log(this.estadosControl.value);
          this.cidadesControl.setValue(cidade);

        }
      });
    }
  };

  public updateVagaDataToApi = () => {

    const endereco = this.enderecoForm.getRawValue() as IEndereco;
    const empresaSelecionada : IEmpresa = this.empresasControl.value as IEmpresa ;
    endereco.empresa = empresaSelecionada.id;
    endereco.tipo = this.tipoEnderecoControl.value as TipoEnderecoEnum;
    const id_usuario = UsuarioService.obterIdUsuarioLogado;
    if (id_usuario != null) {
      endereco.usuario = id_usuario;
    }
    this.apiService.putData('enderecos/'+this.endereco.id, endereco).subscribe({
      next: () => {
        this.snackBar.open('Sucesso', 'Endereço foi salvo', {
          duration: 3000,
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['endereco-lista']).then().then();
      },
      error: (error) => {
        console.error('There was an error!', error);
        throw error;
      },
    });
  };

  displayFnCidade(cidade: ICidade): string {
    return cidade && cidade.nom_cidade ? cidade.nom_cidade : '';
  }

  // filter and return the values
  public getAllEmpresas = () => {

    this.apiService.getData('empresas?search=' + this.empresasControl.value).subscribe((res) => {
      this.empresas = res as IEmpresa[];
    });
  }
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
