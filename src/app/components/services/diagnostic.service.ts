import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Diagnostic } from '../models/diagnostic';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  create(diagnostic: Diagnostic): Observable<Diagnostic> {
    return this.httpClient.post<Diagnostic>(environment.apiUrl + '/history/diagnostic', diagnostic)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getById(id: string): Observable<Diagnostic> {
    return this.httpClient.get<Diagnostic>(environment.apiUrl + '/history/diagnostic/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id: string, diagnostic: Diagnostic): Observable<Diagnostic> {
    return this.httpClient.put<Diagnostic>(environment.apiUrl + '/history/diagnostic/' + id, diagnostic)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id: string): Observable<Diagnostic> {
    return this.httpClient.delete<Diagnostic>(environment.apiUrl + '/history/diagnostic/' + id)
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
    return throwError(errorMessage);
  }
}
