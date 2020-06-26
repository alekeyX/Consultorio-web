import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { ReservationService } from '../../services/reservation.service';
import { MedicService } from '../../services/medic.service';
import { Reservation } from '../../models/reservation';
import { Medic } from '../../models/medic';
import { element } from 'protractor';

@Component({
  selector: 'app-reservation-choose',
  templateUrl: './reservation-choose.component.html',
  styleUrls: ['./reservation-choose.component.css']
})
export class ReservationChooseComponent implements OnInit {
  currentUser: any;
  specialtys: string[] = [];
  specialty: string = '';
  medics: Medic[] = [];
  medic: Medic;
  reservaByMedic: Reservation[] = [];
  reservas: string[] = [];
  filterReservation = '';
  loading = false;

  constructor(
    private reservationService: ReservationService,
    private medicService: MedicService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.getSpecialty();
  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  getSpecialty() {
    this.medicService.getAll().subscribe((data) => {
      const resultado = Array.from(new Set(data.map(element => element.specialty)))
      .map(specialty => {
        return specialty = data.find(element => element.specialty === specialty).specialty;
      });
      this.specialtys = resultado;
    });
  }
  
  selectSpecialty(specialty: string) {
    this.specialty = specialty;
    this.getMedics();
  }

  getMedics() {
    this.medics.splice(0, this.medics.length);
    this.medicService.getAll().subscribe((data) => {
      data.forEach(element => {
        if(element.specialty === this.specialty) {
          this.medics.push(element);
        }
      });
    })
  }

  selectMedic(medic: Medic) {
    this.getReservasByMedic(medic);
  }

  getReservasByMedic(medic: Medic) {
    this.reservationService.getReservByMedic(medic._id)
    .subscribe(data => {
      this.loading = true;
      this.reservaByMedic = data;
      this.selectDate();
    })
  }

  selectDate() {
    const resultado = Array.from(new Set(this.reservaByMedic.map(element => element.date)))
    .map(date => {
      return date = this.reservaByMedic.find(element => element.date === date).date.substring(0, 10);
    });
    return this.reservas = resultado;
  }

  selectReserva(id: string) {
    this.router.navigate(['/reservation/', id]);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
  get isMedic() {
    return this.currentUser && this.currentUser.role === Role.Medic;
  }
  get isPatient() {
    return this.currentUser && this.currentUser.role === Role.Patient;
  }
}
