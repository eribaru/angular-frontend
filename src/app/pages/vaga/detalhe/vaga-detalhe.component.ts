import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-vaga-detalhe',
  templateUrl: './vaga-detalhe.component.html',
  styleUrls: ['./vaga-detalhe.component.css']
})
export class VagaDetalheComponent implements OnInit {

  constructor(private location: Location) {}

  ngOnInit(): void {
  }
  voltar(): void {
    this.location.back();
  }
}
