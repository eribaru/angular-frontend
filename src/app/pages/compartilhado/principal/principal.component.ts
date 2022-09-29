import { Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }
  
  ngOnInit(): void {
  }

  deslogar(){
    this.usuarioService.deslogar();
  }
}