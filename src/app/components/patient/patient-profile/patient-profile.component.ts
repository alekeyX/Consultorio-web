import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';
import { Role } from '../../models/role';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
      private router: Router,
      private toastr: ToastrService
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
    Swal.fire({
      title: 'Estas Seguro?',
      text: "Los datos se eliminarán permanentemente",
      icon: 'warning',
      iconColor: '#15B9C6',
      showCancelButton: true,
      confirmButtonColor: '#15B9C6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      backdrop: '#0F7F875a'
    }).then((result) => {
      if (result.isConfirmed) {
      this.patientService.delete(id)
        .subscribe(res => {
          this.router.navigate(['/patient']);
          this.toastr.success(res.message, res.data.firstName + ' ' + res.data.lastName);
        });
      }
    });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMedic() {
    return this.currentUser && this.currentUser.role === Role.Medic;
  }

}
