import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { Role } from '../models/role';
import { User } from '../models/user';
import { Medic } from '../models/medic';
import { Patient } from '../models/patient';

const users: User[] = [
    { _id: '1', username: 'admin', password: 'admin', email: 'Admin', role: Role.Admin },
    { _id: '2', username: 'user', password: 'user', email: 'Normal', role: Role.User },
    { _id: '3', username: 'medic', password: 'medic', email: 'Medic', role: Role.Medic },
    { _id: '4', username: 'patient', password: 'patient', email: 'patient', role: Role.Patient }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // envolver en observable retrasado para simular la llamada API del servidor
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                default:
                    // pasar por cualquier solicitud no manejada anteriormente
                    return next.handle(request);
            }

        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) { return error('Nombre de usuario incorrecto'); }
            return ok({
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: `fake-jwt-token.${user._id}`
            });
        }

        function getUsers() {
            if (!isAdmin() || !isMedic) { return unauthorized(); }
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) { return unauthorized(); }

            // only admins can access other user records
            if (!isAdmin() && currentUser()._id !== idFromUrl()) { return unauthorized(); }

            const user = users.find(x => x._id === idFromUrl());
            return ok(user);
        }

        // funciones de ayuda

        function ok( body ) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'unauthorized' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }

        function isAdmin() {
            return isLoggedIn() && currentUser().role === Role.Admin;
        }

        function isMedic() {
            return isLoggedIn() && currentUser().role === Role.Medic;
        }

        function isPatient() {
            return isLoggedIn() && currentUser().role === Role.Patient;
        }

        function currentUser() {
            if (!isLoggedIn()) { return; }
            // tslint:disable-next-line:radix
            const id = headers.get('Authorization').split('.')[1];
            return users.find(x => x._id === id);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            // tslint:disable-next-line:radix
            return urlParts[urlParts.length - 1];
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};