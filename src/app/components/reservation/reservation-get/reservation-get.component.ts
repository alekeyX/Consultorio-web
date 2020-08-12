import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { ReservationService } from '../../services/reservation.service';
import { MedicService } from '../../services/medic.service';
import { Reservation } from '../../models/reservation';
import { element } from 'protractor';

@Component({
  selector: 'app-reservation-get',
  templateUrl: './reservation-get.component.html',
  styleUrls: ['./reservation-get.component.css']
})
export class ReservationGetComponent implements OnInit {
  currentUser: any;
  reservations: Reservation[] = [];
  reservationsActive: Reservation[] = [];
  filterDates: string[] = [];
  medics: any[] = [];
  loading: boolean = false;
  allReservations: boolean = false;
  filterReservation: string = '';
  filterReservationByMedic: string = '';
  order: string = '';
  asc: boolean = false;

  constructor(
    private reservationService: ReservationService,
    private medicService: MedicService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }
  
  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getReservas();  
  }
  
  getReservas() {
    setInterval(() => {this.loading = true; }, 800);
    if (this.currentUser.role === Role.Admin) {
      this.reservationService.getAll().subscribe((data) => {
        this.reservations = data;
      this.filterDate();
      this.getMedics();
      this.ReservationsActually();
      });
    } else {
      if (this.currentUser.role === Role.Medic) {
        this.reservationService.getReservByMedic(this.currentUser._id).subscribe((data) => {
          this.reservations = data;
          this.filterDate();
          this.ReservationsActually();
        })
      } else {
        if (this.currentUser.role == Role.Patient) {
          this.reservationService.getReservByPatient(this.currentUser.firstName + ' ' + this.currentUser.lastName)
          .subscribe((data) => {
            this.reservations = data;
            this.filterDate();
            this.ReservationsActually();
          })
        }
      }
    }
  }

  getMedics() {
    this.medicService.getAll().subscribe((data) => {
      this.medics = data;
    })
  }

  removeReservation(reservation, index) {
    if (window.confirm('Esta seguro?')) {
        this.reservationService.delete(reservation._id).subscribe((data) => {
          this.reservations.splice(index, 1);
        });
    }
  }

  selectReserva(id: string) {
    this.router.navigate(['/reservation/', id]);
  }

  // Eliminar duplicados del arreglo reservations
  filterDate() {
    const resultado = Array.from(new Set(this.reservations.map(element => element.date)))
    .map(date => {
      return date = this.reservations.find(element => element.date === date).date.substring(0, 10);
    });
    return this.filterDates = resultado;
  }

  orderBy(order: string) {
    this.asc = !this.asc;
    this.order = order;
  }

  // Arreglo de solo reservaciones a partir de la fecha actual
  ReservationsActually() {
    this.reservations.forEach(element => {
      let year = parseInt(element.date.substring(0,4), 10),
      month = parseInt(element.date.substring(5,7), 10),
      day = parseInt(element.date.substring(8,10), 10);
      
      let date = new Date(year,month,day);
      let today = new Date();

      if (date > today) {
        this.reservationsActive.push(element);
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
