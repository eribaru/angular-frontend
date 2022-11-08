import {Component, OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, UntypedFormControl, Validators} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ICidade } from '../../../interfaces/ICidade';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSelect} from "@angular/material/select";
import { EstadosEnum,EstadosMapping} from 'src/app/interfaces/Estados.enum';
import {TipoPerfilEnum} from "../../../interfaces/TipoPerfil.enum";
import {IEmpresa} from "../../../interfaces/IEmpresa";
import {map, Observable, startWith} from "rxjs";
export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-empresa-adicionar',
  templateUrl: './empresa-adicionar.component.html',
  styleUrls: ['./empresa-adicionar.component.css'],
})



export class EmpresaAdicionarComponent implements OnInit {
  cnpjmask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  empresaForm: FormGroup = new FormGroup({});
  estadosControl = new FormControl<EstadosEnum | null>(null, Validators.required);
  cidadesControl = new FormControl('', Validators.required);
  public EstadosMapping = EstadosMapping;
  public estados = Object.values(EstadosEnum);
  estadoSelecionado = EstadosEnum;
  enumKeys=Object.keys(EstadosEnum);
  ufs = Object.keys;

  /** list of cidades */
  //cidades: []  ;
  //cidadesCarregadas:Observable<any>;
  options = [];
  //filteredOptions: Observable<any>;
  filteredStates: Observable<State[]>;

  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
    },
  ];



  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private apiService: ApiService,
    private snackBar: MatSnackBar

  ) {
   // this.filteredOptions = this.cidadesControl.valueChanges.pipe(
    //  startWith(''),
    //  debounceTime(400),
    //  distinctUntilChanged(),
    //  switchMap(val => {
    //    return this.filter(val || '')
    //  })
    //)
    //this.cidadesCarregadas = this.cidadesControl.valueChanges.pipe(
     // startWith(''),
      //debounceTime(400),
      //distinctUntilChanged(),
     // map(state => {
      //  return (state ? this.filter(state) : this.cidades.slice());
     // }),
   // );*/
   this.enumKeys=Object.keys(this.estadoSelecionado);

    this.filteredStates = this.cidadesControl.valueChanges.pipe(
      startWith(''),
      map((state) => (state ? this._filterStates(state) : this.states.slice())),
    );



      //switchMap(val => {
      //  if(val !=null && val.length>3){
      //    return this.filter(val || '')
      //  }else{
     ''//     return [];
      //  }

      //})
    //)
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
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
    this.apiService.postData('empresas', this.empresaForm.value).subscribe({
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
 // public getAllCidades = () => {
  //  this.apiService.getData('cidades?cod_estado=' +  estado+ '&search=' + this.cidadesControl.value).subscribe((res) => {
 //     this.cidades = res as ICidade[];
  //  });
 // };
  //filter(val: string): Observable<any> {

  //  this.apiService.getData('cidades?cod_estado=' +  estado+ '&search=' + this.cidadesControl.value)
   //   .pipe(
  //      map(response => response.filter(option => {
   //       return option..toLowerCase().indexOf(val.toLowerCase()) === 0
   //     }))
   //   )
 // }

  //__filter(val: string): ICidade[] {
    // call the service which makes the http-request

    //const estadoSelecionado = this.estadosControl.value as EstadosEnum;
    //const estado  = EstadosMapping[estadoSelecionado];
    /*
    response = this.apiService.getData('cidades?cod_estado=' +  estado+ '&search=' + this.cidadesControl.value)
      .pipe(
        map(response => response.filter(cidade => {
         // return cidade.toLowerCase().indexOf(val.toLowerCase()) === 0;
        }))
      );*/
    //return this.cidades?.filter(option => option.toLowerCase().includes(val));
   //}





}


