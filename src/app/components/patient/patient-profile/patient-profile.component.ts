import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  currentUser: Patient;
  patient: Patient;
  id: string;

  constructor(
      private patientService: PatientService,
      private authenticationService: AuthenticationService,
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) {  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.patientService.getById(this.id)
        .subscribe(
          res => {
            this.patient = res;
          },
          err => console.log(err)
        );
    });
  }

  deletePatient(id: string) {
    if (window.confirm('Esta seguro?')) {
      this.patientService.delete(id)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/patient']);
        });
      }
  }

}
