import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Role } from '../../models/role';

@Component({
  selector: 'app-patient-get',
  templateUrl: './patient-get.component.html',
  styleUrls: ['./patient-get.component.css']
})
export class PatientGetComponent implements OnInit {
  currentUser: any;
  patients: Patient[] = [];
  loading = false;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getPatients();
  }

  getPatients() {
    setInterval(() => {this.loading = true; }, 800);
    if (this.currentUser.role === Role.Admin) {
      this.patientService.getAll().subscribe((data) => {
        this.patients = data;
      });
    } else {
      this.patientService.getPatientByMedic(this.currentUser._id).subscribe((data) => {
        this.patients = data;
      });
    }
  }

  removePatient(patient, index) {
    if (window.confirm('Esta seguro?')) {
        this.patientService.delete(patient._id).subscribe((data) => {
          this.patients.splice(index, 1);
        });
    }
  }

  selectedPatient(id: string) {
    this.router.navigate(['/patient/', id]);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

}
