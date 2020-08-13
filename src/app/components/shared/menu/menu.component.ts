import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Role } from '../../models/role';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMedic() {
    return this.currentUser && this.currentUser.role === Role.Medic;
  }

  get isPatient() {
    return this.currentUser && this.currentUser.role === Role.Patient;
  }

  selected(id: string) {
    if (this.currentUser.role !== Role.Patient) {
      this.router.navigate(['/medic/', id]);
    } else {
      this.router.navigate(['/patient/', id]);
    }
  }
}
