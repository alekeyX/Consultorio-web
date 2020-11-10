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
  isShown: boolean = false;
  avatar: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (this.currentUser) {
      if (this.currentUser.imagePath !== 'none') {
      this.avatar = true;
    }}
  }

  ngOnInit(): void {}

  // cerrar sesion
  logout() {
    this.authenticationService.logout();
  }

  // Seleccionar perfil
  selected(id: string) {
    if (this.currentUser.role !== Role.Patient) {
      this.router.navigate(['/medic/', id]);
    } else {
      this.router.navigate(['/patient/', id]);
    }
  }
}
