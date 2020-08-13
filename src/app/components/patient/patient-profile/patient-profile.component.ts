import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';
import { Role } from '../../models/role';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  currentUser: any;
  patient: Patient;
  loading = false;
  avatar = true;

  constructor(
      private patientService: PatientService,
      private authenticationService: AuthenticationService,
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) {  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.getPatient(params.id)
    });
  }

  // Obtener los datos de un paciente
  getPatient(id: string) {
    this.patientService.getById(id)
    .subscribe(
      res => {
        this.patient = res;
        if ( this.patient.imagePath === 'none') {
          this.avatar = false;
        }
      },
      err => console.log(err)
    );
  }

  // Eliminar registro del paciente 
  deletePatient(id: string) {
    if (window.confirm('¿Esta seguro que quiere eliminar el registro del paciente?')) {
      this.patientService.delete(id)
        .subscribe(res => {
          this.router.navigate(['/patient']);
        });
      }
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMedic() {
    return this.currentUser && this.currentUser.role === Role.Medic;
  }

}
