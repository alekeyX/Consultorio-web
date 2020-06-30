import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ReservationService } from '../../services/reservation.service';
import { MedicService } from '../../services/medic.service';
import { Reservation } from '../../models/reservation';
import { Role } from '../../models/role';
import { Medic } from '../../models/medic';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {
  currentUser: any;
  reserva: Reservation;
  medic: any = {};
  loading = false;
  id: string;

  constructor(
    private reservaService: ReservationService,
    private medicService: MedicService,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
) {  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.getDetail();
  }

  getDetail() {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.reservaService.getById(this.id)
      .subscribe(
        res => {
          this.reserva = res;
          this.getMedic();
        },
        err => console.log(err)
      );
    });
  }

  getMedic() {
    this.medicService.getById(this.reserva.medic_id)
    .subscribe(res => {
      this.medic = res;
    })
  }

  deleteReserva(id: string) {
    if (window.confirm('Esta seguro?')) {
      this.reservaService.delete(id)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/reservations']);
        });
      }
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMedic() {
    return this.currentUser && this.currentUser.role === Role.Medic;
  }
}
