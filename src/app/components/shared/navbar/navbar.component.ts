import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { Role } from '../../models/role';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: any;
  isShown = false;
  avatar = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser) {
      if (this.currentUser.imagePath === 'none') {
      this.avatar = false;
    }}
  }

  ngOnInit(): void {
  }

  logout() {
      this.authenticationService.logout();
  }

  selected(id: string) {
    if (this.currentUser.role !== Role.Patient) {
      this.router.navigate(['/medic/', id]);
    } else {
      this.router.navigate(['/patient/', id]);
    }
  }
}
// TODO instalara indicador de progreso de cargar pagina
// npm install ng2-slim-loading-bar --save
// npm install rxjs-compat --save

// https://appdividend.com/2020/02/24/angular-9-tutorial-how-to-build-angular-9-crud-app/

// paso6
