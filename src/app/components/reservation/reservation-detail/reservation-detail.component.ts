import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

import { ReservationService } from '../../services/reservation.service';
import { MedicService } from '../../services/medic.service';
import { Reservation } from '../../models/reservation';
import { Role } from '../../models/role';
import Swal from 'sweetalert2';

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
  date = new Date();

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

  // Obtener los datos de una reserva por su id
  getDetail() {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.reservaService.getById(this.id).subscribe(res => {
        this.reserva = res;
        let date = new Date(res.date);
          this.reserva.dateReser = date;
          this.getMedic();
        },
        err => console.log(err)
      );
    });
  }

  // Obtener los datos del medico por su id
  getMedic() {
    this.medicService.getById(this.reserva.medic_id._id)
    .subscribe(res => {
      this.medic = res;
    })
  }

  // Eliminar el registro de la reserva
  deleteReserva(id: string) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "Los datos se eliminarán permanentemente",
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
      this.reservaService.delete(id)
        .subscribe(res => {
          this.router.navigate(['/reservations']);
        });
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
