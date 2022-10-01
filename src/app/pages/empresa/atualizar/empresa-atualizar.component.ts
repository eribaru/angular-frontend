import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-empresa-atualizar',
  templateUrl: './empresa-atualizar.component.html',
  styleUrls: ['./empresa-atualizar.component.css']
})
export class EmpresaAtualizarComponent implements OnInit {

  constructor(private location: Location) {}

  ngOnInit(): void {
  }
  voltar(): void {
    this.location.back();
  }
}
