import { Component, OnInit } from '@angular/core';
import { MedicService } from "../../services/medic.service";
import { AuthenticationService } from '../../services/authentication.service';
import { ChatService } from '../../services/chat.service';
import { Role } from '../../models/role';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';
import { Medic } from '../../models/medic';

@Component({
  selector: 'app-chat-user-list',
  templateUrl: './chat-user-list.component.html',
  styleUrls: ['./chat-user-list.component.css']
})
export class ChatUserListComponent implements OnInit {
  
  currentUser: any;
  medics: Medic[] = [];
  patients: Patient[] = [];
  // isPatient: boolean = false;
  // typeUser: boolean = true;

  constructor(
    private medicService: MedicService,
    private patientService: PatientService,
    private chatService: ChatService,
    private authenticationService: AuthenticationService
    ) { }
    
  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getMedics();
    this.getPatients();
  }

  getMedics() {
    this.medicService.getAll().subscribe((data) => {
      this.medics = data;
    });
  }

  getPatients() {
    this.patientService.getPatientByMedic(this.currentUser._id)
    .subscribe((data) => {
      this.patients = data;
    })
  }
  // mandar id del usuario con quien se quiere abrir un chat
  openChat(to_user_id: string, patientSelected) {
    var patient_medic_id, medic_id;
    if(patientSelected) {
      // si se elige a un paciente para abrir un chat
      patient_medic_id = to_user_id;
      medic_id = this.currentUser._id;
    } else {
      // si se elige a un medico para abrir un chat
      medic_id = to_user_id;
      patient_medic_id = this.currentUser._id;
    }
    // this.isPatient = isPatient;
    this.chatService.setUsers(to_user_id, patient_medic_id, medic_id, patientSelected);
  }

  // modelChangeUser(changeUser) {
  //   this.typeUser = changeUser;
  // }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMedic() {
    return this.currentUser && this.currentUser.role === Role.Medic;
  }
}
