import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ICidade } from '../../../interfaces/ICidade';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, of, startWith, switchMap } from 'rxjs';
import {FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../../../services/notification.service';


@Component({
  selector: 'app-empresa-adicionar',
  templateUrl: './empresa-adicionar.component.html',
  styleUrls: ['./empresa-adicionar.component.css'],
})
export class EmpresaAdicionarComponent implements OnInit {
  cnpjmask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
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

  }

  ngOnInit(): void {
    this.empresaForm = this.formBuilder.group({
      cnpj: ['', [Validators.required, Validators.maxLength(16)]],
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
