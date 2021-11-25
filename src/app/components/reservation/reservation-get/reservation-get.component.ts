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
  allReservations: Reservation[] = [];
  reservationsActive: Reservation[] = [];
  filterDates: string[] = [];
  medics: any[] = [];
  loading: boolean = false;
  changeReservations: boolean = false;
  reserved: boolean = false;
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
    this.orderBy('date');
  }
  
  // Obtener las reservas
  getReservas() {
    setInterval(() => {this.loading = true; }, 100);
    switch (this.currentUser.role) {
      case Role.Admin:
        this.reservationService.getAll().subscribe((data) => {
          this.reservations = data;
          this.allReservations = data;
          this.filterDate();
          this.getMedics();
          this.filter();
        });
        break;
      case Role.Medic:
          this.reservationService.getReservByMedic(this.currentUser._id).subscribe((data) => {
            this.reservations = data;
            this.allReservations = data;
            this.filterDate();
            this.filter();
          });
        break;
      case Role.Patient:
        this.reservationService.getReservByPatient(this.currentUser._id)
        .subscribe((data) => {
          this.reservations = data;
          this.allReservations = data;
          this.filterDate();
        });
        break;
      default:
        break;
    }
  }

  // Arreglo de solo reservaciones a partir de la fecha actual
  ReservationsActually() {
    this.changeReservations = !this.changeReservations;
    this.filter();
  }
  
  getReserved() {
    this.reserved = !this.reserved;
    this.filter();
  }

  filter() {
    let auxList = [];
    if (this.reserved === true && this.changeReservations === true) {
      this.allReservations.forEach(element => {
        let date = new Date(element.date)
        let today = new Date();
        if(element.patient_id != null && date >= today) {
          element.dateReser = date;
          auxList.push(element);
        }
      });
      this.reservations = auxList;
    } else {
      switch (this.reserved || this.changeReservations){
        case (this.reserved == false && this.changeReservations == true):
          this.allReservations.forEach(element => {
            let date = new Date(element.date)
            let today = new Date();
            if(date >= today) {
              element.dateReser = date;
              auxList.push(element);
            }
          });
          this.reservations = auxList;
          break;
        case (this.reserved == true && this.changeReservations == false):
          this.allReservations.forEach(element => {
            if(element.patient_id != null) {
              auxList.push(element);
            }
          });
          this.reservations = auxList;
          break;
      }
      if(this.reserved == false && this.changeReservations == false){
        this.reservations = this.allReservations;
      }
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
