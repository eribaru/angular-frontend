import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILogin } from '../interfaces/ILogin';
import { IUsuario } from '../interfaces/IUsuario';

const apiUrlUsuario = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

constructor(private httpClient: HttpClient,
            private router: Router) { }

  logar(usuario: IUsuario) : Observable<any> {

    return this.httpClient.post<ILogin>(apiUrlUsuario + "login/", usuario).pipe(
      tap((resposta) => {
        if(!resposta.token) {
          console.error(resposta);
          return;}

        localStorage.setItem('token', window.btoa (JSON.stringify(resposta.token)));
        localStorage.setItem('usuario', window.btoa(JSON.stringify(resposta.user)));

        this.router.navigate(['']);
      }));

      
  }

  cadastrar(usuario: IUsuario) : Observable<any> {

    return this.httpClient.post<ILogin>(apiUrlUsuario + "login/", usuario).pipe(
      tap((resposta) => {
        if(!resposta.token) {
          console.error(resposta);
          return;}

        localStorage.setItem('token', window.btoa (JSON.stringify(resposta.token)));
        localStorage.setItem('usuario', window.btoa(JSON.stringify(resposta.user)));

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
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
