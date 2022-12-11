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
      data_fechamento: [null],
    });

  }

  voltar(): void {
    this.location.back();
  }

  salvar(): void {
    console.log(this.vagaForm.value);

    if (this.vagaForm.valid && this.empresasControl.valid && this.tipoRegimeControl.invalid && this.tipoContratoControl.valid) {
      this.saveVagaDataToApi();
    }else{
      if(this.vagaForm.invalid){
        Object.keys(this.vagaForm.controls).forEach(field => { // {1}
          const control = this.vagaForm.get(field);            // {2}
          if(control!=null)
            control.markAsTouched({ onlySelf: true });       // {3}
        });
      }
      if(this.tipoRegimeControl.invalid) {
        this.tipoRegimeControl.markAsTouched({ onlySelf: true });
      }
      if(this.tipoContratoControl.invalid) {
        this.tipoContratoControl.markAsTouched({ onlySelf: true });
      }
      if(this.empresasControl.invalid) {
        this.empresasControl.markAsTouched({ onlySelf: true });
      }
      this.snackBar.open('Erro no prenchimento', 'Prrencha todos os campos.', {
        duration: 3000,
      });
      return;
    }
  }

  public saveVagaDataToApi = () => {

    const vaga = this.vagaForm.getRawValue() as IVaga;
    const empresaSelecionada: IEmpresa = this.empresasControl.value as IEmpresa;
    vaga.empresa = empresaSelecionada.id;
    vaga.tipo_contrato = this.tipoContratoControl.value as TipoContratoEnum;
    vaga.contratacao = this.tipoRegimeControl.value as TipoRegimeEnum;
      this.apiService.postData('vagas', vaga).subscribe({
        next: () => {
          this.snackBar.open('Sucesso', 'Vaga foi salva', {
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

  // filter and return the values
 public getAllEmpresas = () => {

   this.apiService.getData('empresas?search=' + this.empresasControl.value).subscribe((res) => {
      this.empresas = res as IEmpresa[];
    });
  }


}


