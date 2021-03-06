import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-get',
  templateUrl: './patient-get.component.html',
  styleUrls: ['./patient-get.component.css']
})
export class PatientGetComponent implements OnInit {

  currentUser: any;
  patients: Patient[] = [];
  loading: boolean = false;
  filterPatient: string = '';
  order: string = '';
  asc: boolean = false;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getPatients();
  }

  // Obtener todos los pacientes
  getPatients() {
    setInterval(() => {this.loading = true; }, 100);
    switch (this.currentUser.role) {
      case 'Admin':
        this.patientService.getAll().subscribe((data) => {
              this.patients = data;
            });
        break;
      case 'Reception':
        this.patientService.getAll().subscribe((data) => {
              this.patients = data;
            });
        break;
      default:
        this.patientService.getPatientByMedic(this.currentUser._id).subscribe((data) => {
              this.patients = data;
            });
        break;
    }
  }

  // Eliminar el registro de un paciente
  removePatient(patient, index) {
    if (window.confirm('¿Esta seguro que quiere eliminar el registro del médico?')) {
        this.patientService.delete(patient._id).subscribe((res) => {
          this.patients.splice(index, 1);
          this.toastr.success(res.message, res.data.firstName + ' ' + res.data.lastName);
        });
    }
  }

  // Navegar al perfil de un paciente por su id
  selectedPatient(id: string) {
    this.router.navigate(['/patient/', id]);
  }

  // cambiar orden de la lista de forma ascendente o descendente
  orderBy(order: string) {
    this.asc = !this.asc;
    this.order = order;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMedic() {
    return this.currentUser && this.currentUser.role === Role.Medic;
  }

}
