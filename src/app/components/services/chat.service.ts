import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:5000';
  private socket;
  isPatient: boolean;

  constructor() {
    this.socket = io.connect(this.url);
  }

  // Recibir id's de usuario para abrir chat
  setUsers(to_user_id, patient_id, medic_id, patientSelected) {
    this.isPatient = patientSelected;
    this.socket.emit('open-chat', to_user_id);
    let data = {
      'patient_id': patient_id,
      'medic_id': medic_id
    }
    this.socket.emit('get-message', data)
  }

  // Devolver arrays de mensajes de la bd de los usuarios de un chat
  getUser = () => {
    return Observable.create((observer) => {
      this.socket.on('open-chat', (to_user_id) => {
          observer.next(to_user_id);
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
