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
  isPatient: boolean = false;
  typeUser: boolean = true;

  constructor(
    private medicService: MedicService,
    private patientService: PatientService,
    private chatService: ChatService,
    private authenticationService: AuthenticationService
    ) {
    }
    
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
  openChat(userTo: string, isPatient) {
    this.isPatient = isPatient;
    this.chatService.setUsers(userTo, this.isPatient);
    // this.chatService.create(this.angForm.value);
  }

  modelChangeUser(changeUser) {
    this.typeUser = changeUser;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMedic() {
    return this.currentUser && this.currentUser.role === Role.Medic;
  }
}
