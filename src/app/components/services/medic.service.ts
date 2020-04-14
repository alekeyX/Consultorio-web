import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Medic } from '../models/medic';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  apiServer = 'http://localhost:4000/medics';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  // Crear medico
  create(medic): Observable<Medic> {
    return this.httpClient.post<Medic>(this.apiServer + '/medic/create', JSON.stringify(medic), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Encontrar por ID
  getById(id): Observable<Medic> {
    return this.httpClient.get<Medic>(this.apiServer + '/medic/' + id)
    .pipe(
      // map((res: Response) => {
      //   return res || {}
      // }),
      catchError(this.errorHandler)
    );
  }

   // Get por id
  //  getMedic(id): Observable<any> {
  //   const url = `${this.apiServer}/medic/${id}`;
  //   return this.httpClient.get(url, this.httpOptions).pipe(
  //     map((res: Response) => {
  //       return res || {};
  //     }),
  //     catchError(this.errorHandler)
  //   );
  // }

  // Dar todos los medicos
  getAll(): Observable<Medic[]> {
    return this.httpClient.get<Medic[]>(this.apiServer + '/medics')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Editar medico
  update(id, medic): Observable<Medic> {
    return this.httpClient.put<Medic>(this.apiServer + '/medic/edit' + id, JSON.stringify(medic), this.httpOptions)
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
