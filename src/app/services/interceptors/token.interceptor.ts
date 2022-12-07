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
import {EventData} from "../../pages/compartilhado/event.class";
import {EventBusService} from "../event-bus.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;


  constructor(
    private usuarioService: UsuarioService,
    private _router: Router,
    private eventBusService: EventBusService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.usuarioService.obterTokenUsuario;
    // eslint-disable-next-line no-debugger
    //debugger;
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl: Array<any> = environment.apiUrl.split('/');

    if (token && requestUrl[2] === apiUrl[2]) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        },
      });
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403 || error.status === 403) {
            //this._router.navigate(['/login']).then();
            // refresh token
            //return throwError(() => error);
            return this.handle401Error(request, next);
          } else {
            return throwError(() => error);
          }
        })
      );
    } else {
      return next.handle(request);
    }
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.usuarioService.logado) {
        this.eventBusService.emit(new EventData('logout', null));
      }
    }

    return next.handle(request);
  }
}
