import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { ReservationService } from '../../services/reservation.service';
import { MedicService } from '../../services/medic.service';
import { Reservation } from '../../models/reservation';
import { Medic } from '../../models/medic';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  reservaByMedic2: Observable<Reservation[]>;
  reservas: string[] = [];
  reserv: any = {};
  filterReservation = '';
  loading = false;
  specialtySelected;
  medicName;
  dateSelected;

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

  // Mostrar lista de especialidades de medicos
  getSpecialty() {
    this.medicService.getAll().subscribe((data) => {
      const resultado = Array.from(new Set(data.map(element => element.specialty)))
      .map(specialty => {
        return specialty = data.find(element => element.specialty === specialty).specialty;
      });
      this.specialtys = resultado;
    });
  }
  
  // Seleccion de una especialidad
  selectSpecialty(specialty: string) {
    this.specialty = specialty;
    this.getMedics();
  }

  // Listar medicos segun especialidad elegida
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

  // Seleccion de un medico
  selectMedic(medic: Medic) {
    this.medic = medic;
    this.getReservasByMedic(medic);
  }

  // Mostrar reservas habilitadas de un medico
  getReservasByMedic(medic: Medic) {
    this.reservationService.getReservByMedic(medic._id)
    .subscribe(data => {
      this.loading = true;
      this.reservaByMedic = data;
      this.selectDate();
    })
  }

  getReservasByMedic2(medic: Medic) {
    this.reservaByMedic2.pipe(
      switchMap(() => {
        return this.reservationService.getReservByMedic(medic._id);
      })
    );
  }

  // Filtrar resultados por fecha
  selectDate() {
    const resultado = Array.from(new Set(this.reservaByMedic.map(element => element.date)))
    .map(date => {
      return date = this.reservaByMedic.find(element => element.date === date).date.substring(0, 10);
    });
    return this.reservas = resultado;
  }

  // Seleccion de una reserva disponible
  selectReserva(id: string) {
    this.medicName = this.medic.firstName + ' ' + this.medic.lastName;
    this.specialtySelected = this.specialty;
    this.reservationService.getById(id)
    .subscribe(data => {
      this.reserv = data;
      this.dateSelected = data.date.substring(0, 10);
    })
  }

  submit() {
    this.reserv.patient_id = this.currentUser.firstName + ' ' + this.currentUser.lastName;
    this.reservationService.update(this.reserv._id , this.reserv).subscribe(res => {
      this.getReservasByMedic(this.medic);
    });
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
