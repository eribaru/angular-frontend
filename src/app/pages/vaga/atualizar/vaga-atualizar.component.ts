import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ICidade } from '../../../interfaces/ICidade';
import { debounceTime, distinctUntilChanged, Observable, of, startWith, switchMap } from 'rxjs';
import {FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { IVaga } from 'src/app/interfaces/IVaga';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-vaga-atualizar',
  templateUrl: './vaga-atualizar.component.html',
  styleUrls: ['./vaga-atualizar.component.css']
})
export class VagaAtualizarComponent implements OnInit {
  public vaga !:IVaga;
  vagaForm: FormGroup = new FormGroup({});
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
    const state = navigation.extras.state as {example: IVaga};
    if(state!=null && state.example!=null){
      this.vaga= state.example;
    }
    }
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
      data_cadastro: [null, Validators.required],
      data_fechamento: [null, Validators.required],
    });
    this.vagaForm.controls["cargo"].setValue(this.vaga.cargo);
    this.vagaForm.controls["area"].setValue(this.vaga.area);
    this.vagaForm.controls["resposabilidades"].setValue(this.vaga.resposabilidades);
    this.vagaForm.controls["requisitos"].setValue(this.vaga.requisitos);
    this.vagaForm.controls["pcsc"].setValue(this.vaga.pcsc);
    this.vagaForm.controls["remoto"].setValue(this.vaga.remoto);
    this.vagaForm.controls["local"].setValue(this.vaga.local);
    this.vagaForm.controls["data_cadastro"].setValue(this.vaga.data_cadastro);
    this.vagaForm.controls["data_fechamento"].setValue(this.vaga.data_fechamento);

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
    console.log(this.vagaForm.value);
    this.updateJobDataToApi();

  }

  public updateJobDataToApi = () => {
    this.apiService.putData('vagas/'+this.vaga.id, this.vagaForm.value).subscribe({
      next: (data) => {
        this.snackBar.open('Sucesso', 'Item foi atualizado', {
          duration: 3000,
        });
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['vaga-lista']).then();
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
