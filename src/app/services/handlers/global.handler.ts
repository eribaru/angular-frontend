import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpRequest} from '@angular/common/http';

import { UsuarioService } from '../usuario.service';
import { ErrorService } from '../error.service';
import { NotificationService } from '../notification.service';
import {Router} from "@angular/router";
import {EventData} from "../../pages/compartilhado/event.class";
import {EventBusService} from "../event-bus.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(private injector: Injector, private _router: Router,private zone: NgZone, private usuarioService: UsuarioService,private eventBusService: EventBusService) { }

    handleError(error: Error | HttpErrorResponse) {

        const errorService = this.injector.get(ErrorService);
        const logger = this.injector.get(UsuarioService);
        const notifier = this.injector.get(NotificationService);

        let message;
        let stackTrace;

        if (error instanceof HttpErrorResponse) {
            // Server Error
            message = errorService.getServerMessage(error);
            stackTrace = errorService.getServerStack(error);
            if(error.status==0){
                notifier.showError('Servidor indisponível');
            }else {
              if (error.status == 400) {
                message = "";
                if (error.error['cnpj']) {
                  if (error.error['cnpj'].includes("empresa with this cnpj already exists.")) {
                    message += 'CNPJ já cadastrado\n';
                  }
                }
                if (error.error['email']) {
                  if (error.error['email'].includes("usuario with this email already exists.")) {
                    message += ('Email já cadastrado\n');
                  }
                }
                //Unable to log in with provided credentials
                if (error.error['non_field_errors']) {
                  if (error.error['non_field_errors'].includes("Unable to log in with provided credentials.")) {
                    message +=('Usuário ou senha inválido.\n');
                  }
                } else {
                  console.log(error.error);
                  //notifier.showError(error.error);
                }
                notifier.showError(message);
              } else {
                if (error.status == 401 ){
                  notifier.showError('Sessão expirada');

                }else{
                  if (error.status == 403 ){
                    notifier.showError('Sem autorização');
                  }else {
                    notifier.showError(message);
                  }
                }
              }
            }
        } else {
            // Client Error
            message = errorService.getClientMessage(error);
            stackTrace = errorService.getClientStack(error);
            notifier.showError(message);
        }
        // Always log errors
        logger.logError(message, stackTrace);

        console.error(error);
    }

  goToLogin() {

    this.zone.run(() => {
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
      this._router.navigate(['login']).then();
    });

  }


}
