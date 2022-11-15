import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ICidade } from '../../../interfaces/ICidade';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {debounceTime, distinctUntilChanged, map, Observable, startWith} from "rxjs";
import {IEmpresa} from "../../../interfaces/IEmpresa";
import {IVaga} from "../../../interfaces/IVaga";
import {EstadosEnum, EstadosMapping} from "../../../interfaces/Estados.enum";
import {TipoContratoEnum,TipoContratoMapping} from "../../../interfaces/TipoContrato.enum";
import {TipoRegimeEnum,TipoRegimeMapping} from "../../../interfaces/TipoRegime.enum";
import {TipoPerfilEnum} from "../../../interfaces/TipoPerfil.enum";

@Component({
  selector: 'app-vaga-adicionar',
  templateUrl: './vaga-adicionar.component.html',
  styleUrls: ['./vaga-adicionar.component.css'],
})



export class VagaAdicionarComponent implements OnInit {
  vagaForm: FormGroup = new FormGroup({});
  empresasControl = new FormControl<string | IEmpresa>('', Validators.required);
  tipoContratoControl = new FormControl<TipoContratoEnum | null>(null, Validators.required);
  tipoRegimeControl = new FormControl<TipoRegimeEnum | null>(null, Validators.required);
  public TipoContratoMapping = TipoContratoMapping;
  public TipoRegimeMapping = TipoRegimeMapping;
 remoto:false;

  public tiposRegime:TipoRegimeEnum[] = Object.values(TipoRegimeEnum);
  public tiposContrato:TipoContratoEnum[]  = Object.values(TipoContratoEnum);
  estadosControl = new FormControl<EstadosEnum | null>(null, Validators.required);
  cidadesControl = new FormControl<string | ICidade>('', Validators.required);
  public EstadosMapping = EstadosMapping;
  public estados : EstadosEnum[]= Object.values(EstadosEnum);
  estadoSelecionado = EstadosEnum;

  /** list of empresas */
  empresas: IEmpresa[] = [];
  empresasCarregadas:Observable<IEmpresa[]>;




  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private apiService: ApiService,
    private snackBar: MatSnackBar

  ) {
    this.remoto = false;
      this.empresasCarregadas = this.empresasControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
     map(empresa  => {
       const name = typeof empresa === 'string' ? empresa : empresa?.nome;
        return (name ? this.filterEmpresa(name) : this.empresas.slice());
      }),
    );


  }

  displayFnCidade(cidade: ICidade): string {
    return cidade && cidade.nom_cidade ? cidade.nom_cidade : '';
  }

  displayFnEmpresa(empresa: IEmpresa): string {
    return empresa && empresa.nome ? empresa.nome : '';
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
    this.vagaForm = this.formBuilder.group({
      cargo: [null, [Validators.required]],
      area: [null, Validators.required],
      resposabilidades: [null, Validators.required],
      requisitos: [null, Validators.required],
      pcsc: [null, [Validators.required]],
      remoto: [null, Validators.required],
      local: [null, Validators.required],
      carga_horaria: [null, Validators.required],
      data_cadastro: [null, Validators.required],
      data_fechamento: [null, Validators.required],
    });

  }

  voltar(): void {
    this.location.back();
  }

  salvar(): void {
    console.log(this.vagaForm.value);
    this.saveVagaDataToApi();

  }

  public saveVagaDataToApi = () => {

    const vaga = this.vagaForm.getRawValue() as IVaga;
    const empresaSelecionada : IEmpresa = this.empresasControl.value as IEmpresa ;
    vaga.empresa = empresaSelecionada.id;
    const tipoRegimeSelecionado = this.tipoRegimeControl.value as TipoRegimeEnum;
    const tipoContratoSelecionado = this.tipoContratoControl.value as TipoContratoEnum;
    vaga.tipo_contrato = tipoContratoSelecionado;
    vaga.contratacao = tipoRegimeSelecionado;
    this.apiService.postData('vagas', vaga).subscribe({
      next: () => {
        this.snackBar.open('Sucesso', 'Item foi Salvo', {
          duration: 3000,
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['empresa-lista']).then().then();
      },
      error: (error) => {
        console.error('There was an error!', error);

          throw error;

      },
    });
  };

  // filter and return the values
 public getAllEmpresas = () => {

   this.apiService.getData('empresas?search=' + this.empresasControl.value).subscribe((res) => {
      this.empresas = res as IEmpresa[];
    });
  }


}


