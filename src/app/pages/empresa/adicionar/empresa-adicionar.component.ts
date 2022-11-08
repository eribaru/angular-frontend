import {Component, OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, UntypedFormControl, Validators} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ICidade } from '../../../interfaces/ICidade';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstadosEnum,EstadosMapping} from 'src/app/interfaces/Estados.enum';
import {debounceTime, distinctUntilChanged, map, Observable, startWith} from "rxjs";
import {IEmpresa} from "../../../interfaces/IEmpresa";

@Component({
  selector: 'app-empresa-adicionar',
  templateUrl: './empresa-adicionar.component.html',
  styleUrls: ['./empresa-adicionar.component.css'],
})



export class EmpresaAdicionarComponent implements OnInit {
  empresaForm: FormGroup = new FormGroup({});
  estadosControl = new FormControl<EstadosEnum | null>(null, Validators.required);
  cidadesControl = new FormControl(null, Validators.required);
  statesControl = new FormControl('', Validators.required);
  public EstadosMapping = EstadosMapping;
  public estados : EstadosEnum[]= Object.values(EstadosEnum);
  estadoSelecionado = EstadosEnum;

  /** list of cidades */
  cidades: ICidade[] = [];
  cidadesCarregadas:Observable<ICidade[]>;
  options = [];


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private apiService: ApiService,
    private snackBar: MatSnackBar

  ) {
      this.cidadesCarregadas = this.cidadesControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
     map(cidade  => {
        return (cidade ? this.filter(cidade) : this.cidades.slice());
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
    this.empresaForm = this.formBuilder.group({
      cnpj: ['', [Validators.required, Validators.maxLength(16)]],
      nome: [null, Validators.required],
      ramo: [null, Validators.required],
      sede: [null, Validators.required],
    });

  }

  voltar(): void {
    this.location.back();
  }

  salvar(): void {
    console.log(this.empresaForm.value);
    this.saveCompanyDataToApi();

  }

  public saveCompanyDataToApi = () => {

    const empresa = this.empresaForm.getRawValue() as IEmpresa;
    const cidadeSelecionado = this.cidadesControl.value ;
    empresa.sede
    this.apiService.postData('empresas', empresa).subscribe({
      next: (data) => {
        this.snackBar.open('Sucesso', 'Item foi Salvo', {
          duration: 3000,
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['empresa-lista']);
      },
      error: (error) => {
        console.error('There was an error!', error);

          throw error;

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
  };
 }

}


