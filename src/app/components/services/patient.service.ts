import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Patient } from '../models/patient';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  apiServer = 'http://localhost:4000/patients';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  create(patient): Observable<Patient> {
    return this.httpClient.post<Patient>(this.apiServer + '/patients/', JSON.stringify(patient), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getById(id): Observable<Patient> {
    return this.httpClient.get<Patient>(this.apiServer + '/patients/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getAll(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.apiServer + '/patients/')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id, patient): Observable<Patient> {
    return this.httpClient.put<Patient>(this.apiServer + '/patients/' + id, JSON.stringify(patient), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id) {
    return this.httpClient.delete<Patient>(this.apiServer + '/patients/' + id, this.httpOptions)
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
