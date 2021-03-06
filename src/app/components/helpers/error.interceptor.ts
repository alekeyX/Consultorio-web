import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                // cierre de sesión automático si la respuesta 401 no autorizada o 403 prohibida regresó de la API
                const currentUser = this.authenticationService.currentUserValue;
                if(currentUser){
                    this.authenticationService.logout();
                    localStorage.removeItem('currentUser');
                }
            }
            return throwError(err);
        }));
    }
}
