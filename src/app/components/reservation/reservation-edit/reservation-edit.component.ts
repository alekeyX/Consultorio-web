import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ReservationService } from '../../services/reservation.service';
import { PatientService } from '../../services/patient.service';
import { Reservation } from '../../models/reservation';
import { Medic } from '../../models/medic';
import { Patient } from '../../models/patient';

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
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  enable = true;
  error: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private patientService: PatientService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    const id = this.route.snapshot.paramMap.get('id');
    this.getReservation(id);
    this.createForm();
    this.getPatient();
  }

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
    });
  }

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

  submitForm() {
    this.submitted = true;
    this.reserva = this.angForm.value;
    this.reserva.date += 'T00:00:00.000Z';
    if (this.angForm.value.enable === this.enable) {
      this.reserva.enable = true;
    } else {
      this.reserva.enable = false;
    }
    console.log(this.reserva);
    const id = this.route.snapshot.paramMap.get('id');
    this.reservationService.update(id, this.reserva).subscribe(res => {
      this.router.navigate(['reservation']);
    }, (error) => {
      this.error = error;
    });
  }

  getPatient() {
    this.patientService.getPatientByMedic(this.currentUser._id)
    .subscribe((data) => {
      this.patients = data;
    });
  }
}
