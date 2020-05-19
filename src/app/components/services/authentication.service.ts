import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { User } from '../models/user';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(
        private http: HttpClient,
        private router: Router
        ) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    // Inicio de Sesión
    login(username: string, password: string) {
        return this.http.post<any>(environment.apiUrl + '/signin', { username, password })
            .pipe(map(user => {
                // iniciar sesión correctamente si hay un token jwt en la respuesta
                if (user && user.token) {
                    // almacenar detalles de usuario y token jwt en local storage para mantener
                    // al usuario conectado entre actualizaciones de página
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    // Inicio de Sesión de medicos
    loginMedic(username: string, password: string) {
        return this.http.post<any>(environment.apiUrl + '/medic/signin', { username, password })
            .pipe(map(user => {
                // iniciar sesión correctamente si hay un token jwt en la respuesta
                if (user && user.token) {
                    // almacenar detalles de usuario y token jwt en local storage para mantener
                    // al usuario conectado entre actualizaciones de página
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    // Inicio de Sesión de medicos
    loginPatient(username: string, password: string) {
        return this.http.post<any>(environment.apiUrl + '/patient/signin', { username, password })
            .pipe(map(user => {
                // iniciar sesión correctamente si hay un token jwt en la respuesta
                if (user && user.token) {
                    // almacenar detalles de usuario y token jwt en local storage para mantener
                    // al usuario conectado entre actualizaciones de página
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // eliminar usuario del local storage para cerrar sesión
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['/home']);
    }
}
