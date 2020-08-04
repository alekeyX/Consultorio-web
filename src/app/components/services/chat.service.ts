import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:5000';
  private socket;

  constructor(private httpClient: HttpClient) {
    this.socket = io.connect(this.url);
  }

  public connect() {
    this.socket = io.connect(this.url);
  }

  public joinRoom(room) {
    this.socket.emit('joinRoom', room);
  }

  public leaveRoom(room) {
    this.socket.emit('leaveRoom', room);
  }

  // Enviar mensaje
  public sendMessage(message, room) {
    this.socket.emit('new-message', message, room);
  }

  // Recibir los mensajes
  public getMessages = () => {
      return Observable.create((observer) => {
          this.socket.on('new-message', (messages) => {
            observer.next(messages);              
          });
      });
  }

  public disconnect() {
    this.socket.disconnect();
  }

  getAll(to_id, from_id): Observable<Message[]> {
    return this.httpClient.get<Message[]>(environment.apiUrl + '/chat/' + to_id + '/' + from_id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getAll2(to_id, from_id): Observable<Message[]> {
    return this.httpClient.get<Message[]>(environment.apiUrl + '/chat/' + from_id + '/' + to_id)
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
