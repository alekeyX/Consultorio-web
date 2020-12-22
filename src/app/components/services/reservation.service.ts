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

  // Crear reservas
  create(reserva: any): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + '/reservation', reserva)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Obtener reserva por id
  getById(id: string): Observable<Reservation> {
    return this.httpClient.get<Reservation>(environment.apiUrl + '/reservation/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Obtener reservas por id del medico
  getReservByMedic(id: string): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiUrl + '/reservations/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Obtener reservas por id del paciente
  getReservByPatient(id: string): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiUrl + '/reservations/patient/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Obtener todas las reservas
  getAll(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiUrl + '/reservation')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Actualizar una reserva por id
  update(id: string, reservation: any): Observable<any> {
    return this.httpClient.put<any>(environment.apiUrl + '/reservation/' + id, reservation)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Eliminar una reserva por id
  delete(id: string): Observable<any> {
    return this.httpClient.delete<any>(environment.apiUrl + '/reservation/' + id)
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
