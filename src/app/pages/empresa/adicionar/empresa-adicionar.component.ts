import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ICidade } from '../../../interfaces/ICidade';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-empresa-adicionar',
  templateUrl: './empresa-adicionar.component.html',
  styleUrls: ['./empresa-adicionar.component.css'],
})
export class EmpresaAdicionarComponent implements OnInit {
  empresaForm: FormGroup = new FormGroup({});
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
  ) {}

  ngOnInit(): void {
    this.empresaForm = this.formBuilder.group({
      cnpj: [null, [Validators.required, Validators.maxLength(16)]],
      nome: [null, Validators.required],
      ramo: [null, Validators.required],
      sede: [null, Validators.required],
    });
  }

  voltar(): void {
    this.location.back();
  }

  salvar(): void {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log(this.empresaForm.value);
    this.saveCompanyDataToApi();
    // this.location.back();
  }

  public saveCompanyDataToApi = () => {
    this.apiService.postData('empresas', this.empresaForm.value).subscribe({
      next: (data) => console.log(data),
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  };
}
