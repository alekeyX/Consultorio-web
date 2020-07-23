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

  constructor(private httpClient: HttpClient) {
    this.socket = io.connect(this.url);
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  // TODO enviar id de usuario para chatear y mandar su id
  // y con los id de userTo y userFrom devolver la lista de mensajes que tienen
  public getMessages = () => {
      return Observable.create((observer) => {
          this.socket.on('new-message', (message) => {
              observer.next(message);
          });
      });
  }

  // Recibir id de usuario para abrir chat y mandarlo al servidor
  setUsers(userTo, isPatient) {
    this.isPatient = isPatient;
    this.socket.emit('open-chat', userTo);
  }

  // Dar el id de usuario elegido para un chat
  getUser = () => {
    return Observable.create((observer) => {
      this.socket.on('open-chat', (user_id) => {
          observer.next(user_id);
      });
    });
  }

  // mandar mensaje
  create(message: any): Observable<Message> {
    return this.httpClient.post<Message>(this.url + '/message/', message)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  // Devolver los mensajes segun los usuarios
  getChat(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.url + '/')
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
