import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-empresa-detalhe',
  templateUrl: './empresa-detalhe.component.html',
  styleUrls: ['./empresa-detalhe.component.css']
})
export class EmpresaDetalheComponent implements OnInit {

  constructor(private location: Location) {}

  ngOnInit(): void {
  }
  voltar(): void {
    this.location.back();
  }
}
