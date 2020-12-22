import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { History } from '../models/history';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  // Crear un registro
  create(history: any): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + '/history', history)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Obtener por id
  getById(id: string): Observable<History> {
    return this.httpClient.get<History>(environment.apiUrl + '/history/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Obtener historia por id del paciente
  getHistoryByPatient(id: string): Observable<History[]> {
    return this.httpClient.get<History[]>(environment.apiUrl + '/histories/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Obtener todas las historias
  getAll(): Observable<History[]> {
    return this.httpClient.get<History[]>(environment.apiUrl + '/history')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Actualizar una historia por su id y un formulario
  update(id: string, history: any): Observable<any> {
    return this.httpClient.put<any>(environment.apiUrl + '/history/' + id, history)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Eliminar una historia por su id
  delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(environment.apiUrl + '/history/' + id)
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
      errorMessage = error.error.message;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
