import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl + 'api/v1';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Generic post data to API
   * @param route
   * @param data
   */
  public postData = (route: string, data: object) => {
    const url = `${apiUrl}/${route}`;
    return this.httpClient.post(url, data).pipe(
      tap(console.log),
      catchError((error) => {
        console.error(error);
        return error;
      })
    );
  };

   /**
   * Generic out data to API
   * @param route
   * @param data
   */
    public putData = (route: string, data: object) => {
      const url = `${apiUrl}/${route}`;
      return this.httpClient.put(url, data).pipe(
        tap(console.log),
        catchError((error) => {
          console.error(error);
          return error;
        })
      );
    };

  /**
   * Generic parser data
   * @param route
   */
  public getData = (route: string) => {
    const url = `${apiUrl}/${route}`;
    return this.httpClient.get<object[]>(url).pipe(
      tap((resposta) => {
        if (!resposta) {
          console.error(resposta);
        }
      }),
      catchError((error) => {
        console.log('Erro ao listar', typeof error);
        throw error;
      })
    );
  };

  public delete = (route: string) => {
    return this.httpClient.delete(apiUrl + '/' + route).pipe(
      tap((resposta) => {
        if (!resposta) {
          console.error(resposta);
          return;
        }
      }),
      catchError((error) => {
        console.log('Erro ao delete', typeof error);
        throw error;
      })
    );
  };
  /*public create1 = (route: string,body:Object ) => {
    return this.http.post(this.createCompleteRoute(route, apiUrl), body, this.generateHeaders());
  }*/
  /*
  public create = (route: string,body:Object ) => {
    return this.httpClient.get<Object>( apiUrl+route).pipe(
      tap((resposta) => {
        if(!resposta) {
          console.error(resposta);
          return;}
      }), catchError(error => {
        console.log('Erro ao listar',typeof(error))
        throw(error);
      }));
    }
  }

  public update = (route: string, body:Object) => {
   return this.httpClient.put<Object>( apiUrl+route,body).pipe(
      tap((resposta) => {
        if(!resposta) {
          console.error(resposta);
          return;}
      }), catchError(error => {
        console.log('Erro ao listar',typeof(error))
        throw(error);
      }));
    }*/

  /*
   */
  /*public update1 = (route: string, body:Object) => {
    return this.http.put(this.createCompleteRoute(route, apiUrl), body, this.generateHeaders());
  }

  public delete1 = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, apiUrl));
  }*/

  /* private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }*/
}
