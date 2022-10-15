import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ICidade } from '../../../interfaces/ICidade';
import { debounceTime, distinctUntilChanged, Observable, of, startWith, switchMap } from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-empresa-adicionar',
  templateUrl: './empresa-adicionar.component.html',
  styleUrls: ['./empresa-adicionar.component.css'],
})
export class EmpresaAdicionarComponent implements OnInit {
  empresaForm: FormGroup = new FormGroup({});
  cidadesControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  //cidadesCarregadas:Observable<ICidade[]>;
  //TODO: remove
  citiesMockLResponse$: Observable<ICidade[]> = of([
    {
      cod_cidade: 894,
      cod_estado: 'GO',
      nom_cidade: 'Abadia de Goiás',
    },
    {
      cod_cidade: 1357,
      cod_estado: 'MG',
      nom_cidade: 'Abadia dos Dourados',
    },
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private apiService: ApiService
    
  ) {
   
  }

  ngOnInit(): void {
    this.empresaForm = this.formBuilder.group({
      cnpj: [null, [Validators.required, Validators.maxLength(16)]],
      nome: [null, Validators.required],
      ramo: [null, Validators.required],
      sede: [null, Validators.required],
    });
   /* this.cidadesCarregadas= this.cidadesControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '')
      })       
    );*/
  }

  voltar(): void {
    this.location.back();
  }

  salvar(): void { 
    console.log(this.empresaForm.value);
    this.saveCompanyDataToApi();
    this.location.back();
  }

  public saveCompanyDataToApi = () => {
    this.apiService.postData('empresas', this.empresaForm.value).subscribe({
      next: (data) => console.log(data),
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  };
/*
  public loaddAllCidades = () => {
    this.apiService.getData('cidades?cod_estado=MG&search='+this.cidadesControl.value).subscribe({
      next: (data) => console.log(data),
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  };*/

  // filter and return the values
  /*
  filter(val: string): Observable<ICidade[]> {
    // call the service which makes the http-request
    this.apiService.getData('cidades?cod_estado=MG&search='+this.cidadesControl.value)
     .pipe(
       map(response => response.filter(option => { 
         return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
       }))
     )
   }  */
}
