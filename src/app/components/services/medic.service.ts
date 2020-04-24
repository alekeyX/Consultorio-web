import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Medic } from '../models/medic';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  apiServer = 'http://localhost:4000/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  // Crear medico
  // create(medic): Observable<any> {
  //   return this.httpClient.post<any>(this.apiServer + '/medic/create', JSON.stringify(medic), this.httpOptions )
  //   .pipe(
  //     catchError(this.errorHandler)
  //   );

  // }
  create(medic): Observable<any> {
    return this.httpClient.post( this.apiServer + '/medic/create', medic)
    .pipe(
        catchError(this.errorHandler)
    );
}

  // Encontrar por ID
  getById(id): Observable<Medic> {
    return this.httpClient.get<Medic>(this.apiServer + '/medic/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Dar todos los medicos
  getAll(): Observable<Medic[]> {
    return this.httpClient.get<Medic[]>(this.apiServer + '/medic')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Editar medico
  update(id, medic): Observable<Medic> {
    return this.httpClient.put<Medic>(this.apiServer + '/medic/update/' + id, medic)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Eliminar medico
  delete(id): Observable<Medic> {
    return this.httpClient.delete<Medic>(this.apiServer + '/delete/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
