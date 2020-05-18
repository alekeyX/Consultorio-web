import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { Role } from '../../models/role';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  isShown = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
      this.authenticationService.logout();
  }
}
// TODO instalara indicador de progreso de cargar pagina
// npm install ng2-slim-loading-bar --save
// npm install rxjs-compat --save

// https://appdividend.com/2020/02/24/angular-9-tutorial-how-to-build-angular-9-crud-app/

// paso 6