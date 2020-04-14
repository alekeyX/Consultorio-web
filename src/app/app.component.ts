import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './components/services/authentication.service';
import { Role } from './components/models/role';
import { User } from './components/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.currentUser = this.authenticationService.currentUserValue;
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  get isAdmin() {
      return this.currentUser && this.currentUser.role === Role.Admin;
  }

}
