import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { AuthenticationService } from '../../services/authentication.service';
import { PatientService } from '../../services/patient.service';
import { Role } from '../../models/role';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


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
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
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
        patient.medic_id.forEach(medic => {
          let noExist = medic._id.indexOf(this.currentUser._id);
          if (noExist == -1) {
            this.patients.push(patient);
          }
        });
      });
    });
  }

  // Seleccionar un paciente para adicionar el id del medico al registro del paciente
  selectedPatient(id: string) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "El paciente se añadira a tu lista",
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
        this.patientService.medicAddPatient(id, this.currentUser._id)
        .subscribe(res => {
          this.router.navigate(['/patient']);
          this.toastr.success('Paciente añadido con exito');
        }, (error) => {
          this.toastr.error('Ups algo salió mal');
        });
      }
    });
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
