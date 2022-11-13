import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILogin } from '../interfaces/ILogin';
import { IUsuario } from '../interfaces/IUsuario';

const apiUrlUsuario = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  // Inicializa usuário vazio
  usuarioAtual: BehaviorSubject<IUsuario> = new BehaviorSubject({} as IUsuario);
  constructor(private httpClient: HttpClient, private router: Router) {}

  public static get obterUsuarioLogado(): IUsuario | null {
    return localStorage.getItem('usuario')
      ? JSON.parse(window.atob(localStorage.getItem('usuario')!))
      : null;
  }

  public static get obterIdUsuarioLogado(): string | null {
    return localStorage.getItem('usuario')
      ? (JSON.parse(window.atob(localStorage.getItem('usuario')!)) as IUsuario)
          .id
      : null;
  }

  /**
   * Adiciona dados do usuário logado no BehaviorSubject principal
   * @param usuario
   */
  set usuarioLocal(usuario: IUsuario) {
    this.usuarioAtual.next(usuario);
  }

  get obterTokenUsuario(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return JSON.parse(window.atob(token));
  }

  get logado(): boolean {
    return !!localStorage.getItem('token');
  }

  salvaUsuarioLogadoNoLocalStorage(usuario: IUsuario) {
    localStorage.setItem('usuario', window.btoa(JSON.stringify(usuario)));
  }

  logar(usuario: IUsuario): Observable<any> {
    return this.httpClient.post<ILogin>(apiUrlUsuario + 'login/', usuario).pipe(
      tap((resposta) => {
        if (!resposta.token) {
          console.error(resposta);
          return;
        }

        localStorage.setItem(
          'token',
          window.btoa(JSON.stringify(resposta.token))
        );
        localStorage.setItem(
          'usuario',
          window.btoa(JSON.stringify(resposta.user))
        );

        this.router.navigate(['']).then();
      }),
      catchError((error) => {
        console.log('Erro ao logar', typeof error);
        throw error;
      })
    );
  }

  cadastrar(usuario: IUsuario): Observable<any> {
    return this.httpClient.post<ILogin>(apiUrlUsuario + 'api/v1/contas/registrar/', usuario).pipe(
      tap(() => {

        //this.router.navigate(['']).then();
      })
    );
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['login']).then();
  }

  logError(message: string, stack: string) {
    // Send errors to be saved here
    // The console.log is only for testing this example.
    console.log('LoggingService: ' + message);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
