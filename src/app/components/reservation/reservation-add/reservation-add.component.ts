import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Reservation } from '../../models/reservation';
import { ReservationService } from '../../services/reservation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css']
})
export class ReservationAddComponent implements OnInit {

  angForm: FormGroup;
  currentUser: any;
  medicId: string;
  submitted = false;
  intervalo = 20;
  reservation: Reservation;
  daysChecked: string[] = [];
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  hours = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'];
  hours2 = [ '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  hours3 = [
    '08:00', '08:20', '08:40', '09:00', '09:20', '09:40', '10:00', '10:20', '10:40',
    '11:00', '11:20', '11:40', '12:00', '12:20', '12:40', '13:00', '13:20', '13:40',
    '13:00', '13:20', '13:40', '14:00', '14:20', '14:40', '15:00', '15:20', '15:40',
    '16:00', '16:20', '16:40', '17:00', '17:20', '17:40', '18:00'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private reservationService: ReservationService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {
  }
  
  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.createForm();
  }

  // Crear formulario angForm
  createForm() {
    this.angForm = this.fb.group({
      days: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      hours: ['', Validators.required],
      date: [''],
      medic_id: [this.currentUser._id],
      patient_id: [''],
      enable: [true],
      available: [true]
    });
  }

  onChange(day: string, isChecked: boolean): void {
    if (isChecked) {
      this.daysChecked.push(day);
    } else {
      let index = this.daysChecked.indexOf(day);
      this.daysChecked.splice(index, 1);
    }
  }

  // Enviar formulario angForm
  submitForm() {
    this.angForm.controls['days'].setValue(this.daysChecked);
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      this.reservation = this.angForm.value;
      this.reservationService.create(this.reservation).subscribe(res => {
        this.router.navigate(['reservation']);
        this.toastr.success(res.message, '');
      }, (error) => {
        this.toastr.error('Intente nuevamente', error);
      });
    }
  }

  // Cambio de valor de intervalo para cambiar la vista de intervalos de consultas
  interval(interv: number) {
    this.intervalo = interv;
  }
}
