import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Role } from '../../models/role';
import { ReservationService } from '../../services/reservation.service';
import { MedicService } from '../../services/medic.service';
import { PatientService } from '../../services/patient.service';
import { Reservation } from '../../models/reservation';
import { Medic } from '../../models/medic';
import { Patient } from '../../models/patient';
import { ToastrService } from 'ngx-toastr';


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
  patients: Patient[] = [];
  reservaByMedic: Reservation[] = [];
  reservas: string[] = [];
  reserv: Reservation;
  filterReservation = '';
  loading = false;
  specialtySelected: string;
  medicName: string;
  dateSelected: string;
  order: string = '';
  asc: boolean = true;
  reservationsActive: Reservation[] = [];
  namePatient: Patient;

  constructor(
    private reservationService: ReservationService,
    private medicService: MedicService,
    private patientService: PatientService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {
    this.getSpecialty();
    this.namePatient = {
      _id: '',
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      medic_id: null,
      ci: 0,
      role: Role.Patient,
    };

    this.reserv = {
      date: '',
      _id: '',
      enable: false,
      hours: null,
      days: '',
      patient_id: null,
      medic_id: null,
      dateReser: new Date()   
    }
  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.patientList(); 
  }

  // Mostrar lista de especialidades de medicos
  getSpecialty() {
    this.medicService.getAll().subscribe((data) => {
      const resultado = Array.from(new Set(data.map(element => element.specialty)))
      .map(specialty => {
        return specialty = data.find(element => element.specialty === specialty).specialty;
      });
      this.specialtys = resultado.filter(e => e !== "");
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
      this.ReservationsActually(data);
      this.selectDate();
    })
    this.orderBy('date');
  }

  // Arreglo de solo reservaciones a partir de la fecha actual
  ReservationsActually(reservas: Reservation[]) {
    const reservations: Reservation[] = [];
    reservas.forEach(element => {      
      let date = new Date(element.date);
      let today = new Date();

      if (date >= today) {
        reservations.push(element);
      }
    });
    this.reservaByMedic = reservations;
    this.orderBy('date');
  }

  // Filtrar resultados por fecha
  selectDate() {
    const resultado = Array.from(new Set(this.reservaByMedic.map(element => element.date)))
    .map(date => {
      return date = this.reservaByMedic.find(element => element.date === date).date.substring(0, 10);
    });
    return this.reservas = resultado;
  }

  // Lista de pacientes
  patientList() {
    this.patientService.getAll().subscribe((data) => {
      this.patients = data;
    });
  }

  // Seleccion de una reserva disponible obteniendo los datos de la reserva y nombre del medico 
  selectReserva(id: string) {
    this.medicName = this.medic.firstName + ' ' + this.medic.lastName;
    this.specialtySelected = this.specialty;
    this.reservationService.getById(id)
    .subscribe(data => {
      this.reserv = data;
      this.dateSelected = data.date;
    })
  }

  // Actualizar registro de reserva con el nombre del paciente
  submit() {
    if (this.isPatient) {
      this.reserv.patient_id = this.currentUser;
    } else {
      this.reserv.patient_id = this.namePatient;
    }
    
    this.reservationService.update(this.reserv._id , this.reserv).subscribe(res => {
      this.getReservasByMedic(this.medic);
      this.toastr.success(res.message, '');
    }, (error) => {
      this.toastr.error('Intente nuevamente', error);
    });
  }

  // Cancelar una reserva quitando el nombre del paciente 
  cancelReserv() {
    this.reserv.patient_id = null;
    this.reservationService.update(this.reserv._id , this.reserv).subscribe(res => {
      this.getReservasByMedic(this.medic);
    });
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
  get isPatient() {
    return this.currentUser && this.currentUser.role === Role.Patient;
  }
}
