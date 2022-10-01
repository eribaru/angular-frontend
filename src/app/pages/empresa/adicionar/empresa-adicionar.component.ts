import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-empresa-adicionar',
  templateUrl: './empresa-adicionar.component.html',
  styleUrls: ['./empresa-adicionar.component.css']
})
export class EmpresaAdicionarComponent implements OnInit {

  constructor(private location: Location) {}

  ngOnInit(): void {
  }
  voltar(): void {
    this.location.back();
  }
}
