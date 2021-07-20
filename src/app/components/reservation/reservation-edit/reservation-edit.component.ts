import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ReservationService } from '../../services/reservation.service';
import { PatientService } from '../../services/patient.service';
import { Reservation } from '../../models/reservation';
import { Medic } from '../../models/medic';
import { Patient } from '../../models/patient';
import { Role } from '../../models/role';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {

  submitted = false;
  angForm: FormGroup;
  reserva: Reservation;
  currentUser: Medic;
  patients: Patient[];
  enable = true;
  error: string;
  reservaId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private patientService: PatientService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.reservaId = this.route.snapshot.paramMap.get('id');
    this.getReservation(this.reservaId);
    this.createForm();
  }
  
  // Obtener los datos de la reservar y guardarlos en el formulario angForm
  getReservation(id: string) {
    this.reservationService.getById(id).subscribe(data => {
      this.angForm = this.fb.group({
        days: [data.days],
        dateStart: [data.dateStart],
        dateEnd: [data.dateEnd],
        date: [data.date.substring(0, 10)],
        hours: [data.hours],
        patient_id: [data.patient_id],
        enable: [data.enable],
        medic_id: [data.medic_id]
      });
      this.getPatient(data);
    });
  }

  // Crear el formulario angForm
  createForm() {
    this.angForm = this.fb.group({
      days: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      hours: ['', Validators.required],
      date: [''],
      medic_id: [''],
      patient_id: [''],
      enable: [''],
      available: ['']
    });
  }

  // Enviar formulario
  submitForm() {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "Los datos modificados se guardarán",
      icon: 'warning',
      iconColor: '#15B9C6',
      showCancelButton: true,
      confirmButtonColor: '#15B9C6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      backdrop: '#0F7F875a'
    }).then((result) => {
      this.submitted = true;
      if (!this.angForm.valid) {
      return false;
      } else {
        if (result.isConfirmed) {
        this.reserva = this.angForm.value;
        this.reserva.date += 'T00:00:00.000Z';
        if (this.angForm.value.enable === this.enable) {
          this.reserva.enable = true;
        } else {
          this.reserva.enable = false;
        }
        this.reservationService.update(this.reservaId, this.reserva).subscribe(res => {
          this.router.navigate(['reservation']);
          this.toastr.success(res.message, '');
        }, (error) => {
            this.toastr.error('Intente nuevamente', error);
          });
        }
      }
    });
  }

  // Obtener lista de pacientes del medico
  getPatient(reserva: Reservation) {
    this.patientService.getPatientByMedic(reserva.medic_id)
    .subscribe((data) => {
      this.patients = data;
    });
  }
}
