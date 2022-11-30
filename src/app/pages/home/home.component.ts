import { Component, OnInit } from '@angular/core';
import {VerificarPermissoes} from "../../services/guards/verificarPermissao";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isRecrutador =  VerificarPermissoes.temPerfilRecrutador();
  constructor() { }

  ngOnInit(): void {
  }



}
