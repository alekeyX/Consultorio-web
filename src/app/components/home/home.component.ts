import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { Role } from '../models/role';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
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
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        // console.log(this.currentUser);
    }

    OnInit() {
        // this.loading = true;
        // this.userService.getById(this.currentUser._id).pipe(first()).subscribe(user => {
        //     this.loading = false;
            // console.log(this.currentUser);
            // this.userFromApi = user;
        // });
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
