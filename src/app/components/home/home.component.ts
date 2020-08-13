import { Component } from '@angular/core';
import { Role } from '../models/role';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    loading = false;
    currentUser: any;
    userFromApi: any;
    username: string;

    constructor(
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    OnInit() {

    }

    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }

    get isMedic() {
    return this.currentUser && this.currentUser.medic.role === Role.Medic;
    }

    get isPatient() {
        return this.currentUser && this.currentUser.patient.role === Role.Patient;
    }
}
