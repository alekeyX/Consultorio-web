import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-get',
  templateUrl: './patient-get.component.html',
  styleUrls: ['./patient-get.component.css']
})
export class PatientGetComponent implements OnInit {
  currentUser: Patient;
  patients: Patient[] = [];
  loading = false;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.getPatients();
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  getPatients() {
    this.loading = true;
    this.patientService.getAll().subscribe((data) => {
      this.patients = data;
    });
  }

  removePatient(medic, index) {
    if (window.confirm('Esta seguro?')) {
        this.patientService.delete(medic._id).subscribe((data) => {
          this.patients.splice(index, 1);
        });
    }
  }

  selectedPatient(id: string) {
    this.router.navigate(['/patient/', id]);
  }

}
