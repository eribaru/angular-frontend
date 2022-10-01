import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl+'api/v1';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(private httpClient: HttpClient,private http: HttpClient,
    private router: Router) { }

  /*public getData1 = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, apiUrl));
  }*/

  public getData = (route: string) => {
    return this.httpClient.get<Object[]>(apiUrl+"/"+route).pipe(
      tap((resposta) => {
        if(!resposta) {
          console.error(resposta);
          return;}
      }), catchError(error => {
        console.log('Erro ao listar',typeof(error))
        throw(error);
      }));
  }


  public delete = (route: string) => {
    return this.httpClient.delete(apiUrl+"/"+route).pipe(
      tap((resposta) => {
        if(!resposta) {
          console.error(resposta);
          return;}          
      }), catchError(error => {
        console.log('Erro ao delete',typeof(error))
        throw(error);
      }));
  }
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