import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  // Crear un paciente
  create(patient: any): Observable<Patient> {
    return this.httpClient.post<Patient>(environment.apiUrl + '/patient/', patient)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Obtener por di
  getById(id: string): Observable<Patient> {
    return this.httpClient.get<Patient>(environment.apiUrl + '/patient/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Obtener pacientes por id de medico
  getPatientByMedic(id: string): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(environment.apiUrl + '/patients/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Obtener todos los pacientes
  getAll(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(environment.apiUrl + '/patient')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Actualizar un paciente por id
  update(id: string, patient: any): Observable<Patient> {
    return this.httpClient.put<Patient>(environment.apiUrl + '/patient/' + id, patient)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Eliminar un paciente por id
  delete(id: string) {
    return this.httpClient.delete<Patient>(environment.apiUrl + '/patient/' + id)
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
