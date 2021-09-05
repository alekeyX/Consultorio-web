import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { ReservationService } from '../../services/reservation.service';
import { MedicService } from '../../services/medic.service';
import { Reservation } from '../../models/reservation';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Medic } from '../../models/medic';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-reservation-get',
  templateUrl: './reservation-get.component.html',
  styleUrls: ['./reservation-get.component.css']
})
export class ReservationGetComponent implements OnInit {
  
  currentUser: Medic | Patient;
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
  date = new Date();

  constructor(
    private reservationService: ReservationService,
    private medicService: MedicService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {
  }
  
  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getReservas();  
  }
  
  // Obtener las reservas
  getReservas() {
    setInterval(() => {this.loading = true; }, 100);
    switch (this.currentUser.role) {
      case Role.Admin:
        this.reservationService.getAll().subscribe((data) => {
          this.reservations = data.reverse();
          this.filterDate();
          this.getMedics();
        });
        break;
      case Role.Medic:
          this.reservationService.getReservByMedic(this.currentUser._id).subscribe((data) => {
            this.reservations = data.reverse();
            this.filterDate();
          });
        break;
      case Role.Patient:
        this.reservationService.getReservByPatient(this.currentUser._id)
        .subscribe((data) => {
          this.reservations = data.reverse();
          this.filterDate();
        });
        break;
      default:
        break;
    }
  }

    // Arreglo de solo reservaciones a partir de la fecha actual
    ReservationsActually() {
      this.allReservations = !this.allReservations;
      if(this.allReservations == true){
        this.reservations.forEach(element => {
          let year = parseInt(element.date.substring(0,4), 10),
          month = parseInt(element.date.substring(5,7), 10),
          day = parseInt(element.date.substring(8,10), 10);
          
          let date = new Date(year,month-1,day);
          let today = new Date();
    
          if (date >= today) {
            this.reservationsActive.push(element);
          }
        });
        this.reservations = this.reservationsActive;
        this.reservationsActive = [];
      } else {
        this.getReservas();
      }
    }

  // Obtener registros de los medicos
  getMedics() {
    this.medicService.getAll().subscribe((data) => {
      this.medics = data;
    })
  }

  // Eliminar una reserva por su id
  removeReservation(reservation, index) {
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
        this.reservationService.delete(reservation._id).subscribe((res) => {
          this.reservations.splice(index, 1);
          this.toastr.success(res.message, '');
        });
      }
    });
  }

  selectReserva(id: string) {
    this.router.navigate(['/reservation/', id]);
  }

  // Eliminar duplicados del arreglo reservations
  filterDate() {
    const resultado = Array.from(new Set(this.reservations.map(element => element.date)))
    .map(date => {
      return date = this.reservations.find(element => element.date === date).date;
    });
    return this.filterDates = resultado;
  }

  // Cambiar el orden ascendente/descendente
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
