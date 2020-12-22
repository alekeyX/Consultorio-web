import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { AuthenticationService } from '../../services/authentication.service';
import { PatientService } from '../../services/patient.service';
import { Role } from '../../models/role';


@Component({
  selector: 'app-patient-add-medic',
  templateUrl: './patient-add-medic.component.html',
  styleUrls: ['./patient-add-medic.component.css']
})
export class PatientAddMedicComponent implements OnInit {

  currentUser: any;
  patients: Patient[] = [];
  loading: boolean = false;
  filterPatient: string = '';
  order: string = '';
  asc: boolean = false;

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

  // Obtener todos los pacientes excluyendo a los que el medico ya tiene registrado
  getPatients() {
    setInterval(() => {this.loading = true; }, 100);
    this.patientService.getAll().subscribe((data) => {
      data.forEach(patient => {
        let noExist = patient.medic_id.indexOf(this.currentUser._id);
        if (noExist == -1) {
          this.patients.push(patient);
        }
      });
    });
  }

  // Seleccionar un paciente para adicionar el id del medico al registro del paciente
  selectedPatient(id: string) {
    if (window.confirm('Esta seguro?')) {
      this.patientService.medicAddPatient(id, this.currentUser._id)
      .subscribe(res => {
        this.router.navigate(['/patient']);
      }, (error) => {
        console.log(error);
      });
    }
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
