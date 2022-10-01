import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresa-adicionar',
  templateUrl: './empresa-adicionar.component.html',
  styleUrls: ['./empresa-adicionar.component.css']
})
export class EmpresaAdicionarComponent implements OnInit {

  empresaForm: FormGroup = new FormGroup({});
  

  constructor(private formBuilder: FormBuilder,private location: Location) {}


  
  ngOnInit(): void {
    this.empresaForm = this.formBuilder.group({
      cnpj: [null, [Validators.required, Validators.maxLength(16)]],
      nome: [null, Validators.required],
      ramo: [null, Validators.required]
    });
  }

  get f() { return this.empresaForm.controls; }
  voltar(): void {
    this.location.back();
  }

  salvar(): void {
    this.location.back();
  }
}
