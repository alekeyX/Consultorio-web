import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Exam } from '../models/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  create(exam: Exam): Observable<Exam> {
    return this.httpClient.post<Exam>(environment.apiUrl + '/history/exam', exam)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getById(id: string): Observable<Exam> {
    return this.httpClient.get<Exam>(environment.apiUrl + '/history/exam/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id: string, exam: Exam): Observable<Exam> {
    return this.httpClient.put<Exam>(environment.apiUrl + '/history/exam/' + id, exam)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Eliminar una historia por su id
  delete(id: string): Observable<Exam> {
    return this.httpClient.delete<Exam>(environment.apiUrl + '/history/exam/' + id)
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
