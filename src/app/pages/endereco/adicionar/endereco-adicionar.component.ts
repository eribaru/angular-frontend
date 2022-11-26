import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ICidade } from '../../../interfaces/ICidade';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {debounceTime, distinctUntilChanged, map, Observable, startWith} from "rxjs";
import {EstadosEnum, EstadosMapping} from "../../../interfaces/Estados.enum";
import {TipoEnderecoEnum,TipoEnderecoMapping} from "../../../interfaces/TipoEndereco.enum";
import {IEmpresa} from "../../../interfaces/IEmpresa";
import {IEndereco} from "../../../interfaces/IEndereco";
import {TipoRegimeEnum} from "../../../interfaces/TipoRegime.enum";
import {UsuarioService} from "../../../services/usuario.service";

@Component({
  selector: 'app-endereco-adicionar',
  templateUrl: './endereco-adicionar.component.html',
  styleUrls: ['./endereco-adicionar.component.css'],
})



export class EnderecoAdicionarComponent implements OnInit {
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

  }

  voltar(): void {
    this.location.back();
  }

  salvar(): void {
    console.log(this.enderecoForm.value);
    this.saveVagaDataToApi();

  }

  public saveVagaDataToApi = () => {

    const endereco = this.enderecoForm.getRawValue() as IEndereco;
    const empresaSelecionada : IEmpresa = this.empresasControl.value as IEmpresa ;
    endereco.empresa = empresaSelecionada.id;
    endereco.tipo = this.tipoEnderecoControl.value as TipoEnderecoEnum;
    const id_usuario = UsuarioService.obterIdUsuarioLogado;
    if (id_usuario != null) {
      endereco.usuario = id_usuario;
    }
    this.apiService.postData('enderecos', endereco).subscribe({
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


