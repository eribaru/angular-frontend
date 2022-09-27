import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../interfaces/IUsuario';

const apiUrlUsuario = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

constructor(private httpClient: HttpClient,
            private router: Router) { }

  logar(usuario: IUsuario) : Observable<any> {

    return this.httpClient.post<any>(apiUrlUsuario + "login/", usuario).pipe(
      tap((resposta) => {
        if(!resposta.sucesso) {
          console.error(resposta);
          return;}

        localStorage.setItem('token', window.btoa (JSON.stringify(resposta['token'])));
        localStorage.setItem('usuario', window.btoa(JSON.stringify(resposta['usuario'])));

        this.router.navigate(['']);
      }));

      
  }
  

  deslogar() {
      localStorage.clear();
      this.router.navigate(['login']);
  }

  get obterUsuarioLogado(): IUsuario| null {
    return localStorage.getItem  ('usuario')
      ? JSON.parse(window.atob(localStorage.getItem('usuario')!))
      : null;
  }

  get obterIdUsuarioLogado(): string| null {
    return localStorage.getItem('usuario')
      ? (JSON.parse(window.atob(localStorage.getItem('usuario')!)) as IUsuario).id
      : null;
  }

  get obterTokenUsuario(): string| null {
    return localStorage.getItem('token')
      ? JSON.parse(window.atob(localStorage.getItem('token')!))
      : null;
  }

  get logado(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
