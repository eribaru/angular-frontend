import { Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { VerificarPermissoes } from 'src/app/services/guards/verificarPermissao';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  temPermissaoCandidato : boolean = VerificarPermissoes.temPerfilCanditado();
  temPermissaoRecrutador : boolean = VerificarPermissoes.temPerfilRecrutador();
  constructor(private usuarioService: UsuarioService) { }
  
  ngOnInit(): void {
  }

  deslogar(){
    this.usuarioService.deslogar();
  }
}