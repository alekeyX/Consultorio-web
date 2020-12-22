import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Medic } from '../models/medic';

@Injectable({
  providedIn: 'root'
})
export class MedicService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  // Crear un medico
  create(medic: any): Observable<any> {
    return this.httpClient.post<any>( environment.apiUrl + '/medic/', medic)
    .pipe(
        catchError(this.errorHandler)
    );
  }

  // Encontrar por ID
  getById(id: string):  Observable<Medic> {
    return this.httpClient.get<Medic>(environment.apiUrl + '/medic/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Obtener todos los medicos
  getAll(): Observable<Medic[]> {
    return this.httpClient.get<Medic[]>(environment.apiUrl + '/medic')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Editar medico por su id
  update(id: string, medic: any): Observable<any> {
    return this.httpClient.put<any>(environment.apiUrl + '/medic/' + id, medic)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Eliminar medico por su id
  delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(environment.apiUrl + '/medic/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error) {
    console.log(error);
    
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
        errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }
}
