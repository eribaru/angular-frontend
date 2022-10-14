import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UsuarioService } from '../usuario.service';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private usuarioService: UsuarioService,
    private _router: Router
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.usuarioService.obterTokenUsuario;
    // eslint-disable-next-line no-debugger
    debugger;
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl: Array<any> = environment.apiUrl.split('/');

    if (token && requestUrl[2] === apiUrl[2]) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        },
      });
      return next.handle(request).pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this._router.navigate(['/login']);
            // refresh token
            return throwError(error);
          } else {
            return throwError(error);
          }
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
