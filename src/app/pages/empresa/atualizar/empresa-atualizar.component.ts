import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ICidade } from '../../../interfaces/ICidade';
import { debounceTime, distinctUntilChanged, Observable, of, startWith, switchMap } from 'rxjs';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { IEmpresa } from 'src/app/interfaces/IEmpresa';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-empresa-atualizar',
  templateUrl: './empresa-atualizar.component.html',
  styleUrls: ['./empresa-atualizar.component.css']
})
export class EmpresaAtualizarComponent implements OnInit {
  public empresa !:IEmpresa;
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
    
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private apiService: ApiService,
    private snackBar: MatSnackBar
    
  ) {
    const navigation = this.router.getCurrentNavigation();
    if(navigation!=null){
    const state = navigation.extras.state as {example: IEmpresa};
    if(state!=null && state.example!=null){
      this.empresa= state.example;
    }
    }
  }

  ngOnInit(): void {
    this.empresaForm = this.formBuilder.group({
      cnpj: [null, [Validators.required, Validators.maxLength(16)]],
      nome: [null, Validators.required],
      ramo: [null, Validators.required],
      sede: [null, Validators.required],
    });
    this.empresaForm.controls["cnpj"].setValue(this.empresa.cnpj);
    this.empresaForm.controls["nome"].setValue(this.empresa.nome);
    this.empresaForm.controls["ramo"].setValue(this.empresa.ramo);
    this.empresaForm.controls["sede"].setValue(this.empresa.sede);
   
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
    this.updateCompanyDataToApi();
   
  }

  public updateCompanyDataToApi = () => {
    this.apiService.putData('empresas/'+this.empresa.id, this.empresaForm.value).subscribe({
      next: (data) => {
        this.snackBar.open('Sucesso', 'Item foi atualizado', {
          duration: 3000,
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['empresa-lista']);
      },
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
