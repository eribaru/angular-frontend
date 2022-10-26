import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { UsuarioService } from '../usuario.service';
import { ErrorService } from '../error.service';
import { NotificationService } from '../notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(private injector: Injector) { }

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
                if (error.error['cnpj']) {
                  if (error.error['cnpj'].includes("empresa with this cnpj already exists.")) {
                    notifier.showError('CNPJ já cadastrado');
                  }
                } else {
                  if (error.error['email']) {
                    if (error.error['email'].includes("usuario with this email already exists.")) {
                      notifier.showError('Usuário já cadastrado');
                    }
                  } else {
                    if (error.error['cpf']) {
                      if (error.error['cpf'].includes("usuario with this cpf already exists.")) {
                        notifier.showError('Usuário já cadastrado');
                      }
                    } else {
                      notifier.showError(error.error.non_field_errors);
                    }
                  }
                }
              } else {
                notifier.showError(message);
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
}
