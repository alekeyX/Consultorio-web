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

  create(history): Observable<History> {
    return this.httpClient.post<History>(environment.apiUrl + '/history', history)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getById(id): Observable<History> {
    return this.httpClient.get<History>(environment.apiUrl + '/history/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getHistoryByPatient(id): Observable<History[]> {
    return this.httpClient.get<History[]>(environment.apiUrl + '/histories/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getAll(): Observable<History[]> {
    return this.httpClient.get<History[]>(environment.apiUrl + '/history')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id, history): Observable<History> {
    return this.httpClient.put<History>(environment.apiUrl + '/history/' + id, history)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id) {
    return this.httpClient.delete<History>(environment.apiUrl + '/History/' + id)
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
