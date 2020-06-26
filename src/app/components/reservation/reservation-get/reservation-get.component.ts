import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-reservation-get',
  templateUrl: './reservation-get.component.html',
  styleUrls: ['./reservation-get.component.css']
})
export class ReservationGetComponent implements OnInit {
  currentUser: any;
  reservations: Reservation[] = [];
  filterDates: string[] = [];
  loading = false;
  filterReservation = '';

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.getReservas();
  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  getReservas() {
    setInterval(() => {this.loading = true; }, 800);
    this.reservationService.getAll().subscribe((data) => {
      this.reservations = data;
      this.filterDate();
    });
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

  filterDate() {
    const resultado = Array.from(new Set(this.reservations.map(element => element.date)))
    .map(date => {
      return date = this.reservations.find(element => element.date === date).date.substring(0, 10);
    });
    return this.filterDates = resultado;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
  get isMedic() {
    return this.currentUser && this.currentUser.role === Role.Medic;
  }
}
