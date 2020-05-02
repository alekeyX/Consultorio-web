import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { User } from '../models/user';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private URL = 'http://localhost:4000/api';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<any>;

    constructor(
        private http: HttpClient,
        private router: Router
        ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    // signUp(user) {
    //     return this.http.post<any>(this.URL + '/signup', user);
    // }

    // signIn(user) {
    //     return this.http.post<any>(this.URL + '/signin', user);
    // }

    // loggedIn() {
    //     return !!localStorage.getItem('token');
    // }

    // getToken() {
    //     return localStorage.getItem('token');
    // }

    // eliminar usuario del local storage para cerrar sesión
    // logout() {
    //     localStorage.removeItem('token');
    //     this.router.navigate(['/home']);
    // }

    //
    login(username: string, password: string) {
        return this.http.post<any>(this.URL + '/signin', { username, password })
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
    }
}
