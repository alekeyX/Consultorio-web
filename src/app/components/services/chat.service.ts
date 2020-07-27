import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from "../models/Message";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:5000';
  private socket;
  isPatient: boolean;
  to_user_id: string = '';

  constructor(private httpClient: HttpClient) {
    this.socket = io.connect(this.url);
  }

  // Recibir id's de usuario para abrir chat
  setUsers(to_user_id, patient_medic_id, medic_id, patientSelected) {
    this.isPatient = patientSelected;
    this.to_user_id = to_user_id;
    this.socket.emit('open-chat', patient_medic_id, medic_id);
  }

  // Devolver arrays de mensajes de la bd de los usuarios de un chat
  getUser = () => {
    return Observable.create((observer) => {
      this.socket.on('open-chat', (messages) => {
          observer.next(messages);
      });
    });
  }

  // Enviar mensaje
  public sendMessage(message, isPatient) {
    this.socket.emit('new-message', message, isPatient);
  }

  // Recibir los mensajes
  public getMessages = () => {
      return Observable.create((observer) => {
          this.socket.on('new-message', (message) => {
              observer.next(message);
          });
      });
  }

  // Devolver los mensajes segun los usuarios
  // getMsg(id): Observable<Message[]> {
  //   return this.httpClient.get<Message[]>('http://localhost:4000/api' +'/chat/' + id)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   );
  // }

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
