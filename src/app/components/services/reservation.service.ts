import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  create(reserva): Observable<Reservation> {
    return this.httpClient.post<Reservation>(environment.apiUrl + '/reservation', reserva)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getById(id): Observable<Reservation> {
    return this.httpClient.get<Reservation>(environment.apiUrl + '/reservation/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getReservByMedic(id): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiUrl + '/reservations/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getAll(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiUrl + '/reservation')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(id, reservation): Observable<Reservation> {
    return this.httpClient.put<Reservation>(environment.apiUrl + '/reservation/' + id, reservation)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id) {
    return this.httpClient.delete<Reservation>(environment.apiUrl + '/reservation/' + id)
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
