import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // comprobar si la ruta esta restringida por rol
            if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
                // rol no autorizado, así que redirige a la página de inicio
                this.router.navigate(['/']);
                return false;
            }

            // autorizado así que devuelve verdadero
            return true;
        }

        // no ha iniciado sesión, así que redirija a la página de inicio de sesión con la URL de retorno
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
