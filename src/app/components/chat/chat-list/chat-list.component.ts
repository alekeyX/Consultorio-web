import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ChatService } from '../../services/chat.service';
import { MedicService } from '../../services/medic.service';
import { PatientService } from '../../services/patient.service';
import { Medic } from '../../models/medic';
import { Patient } from '../../models/patient';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  message: string;
  messages: string[] = [];
  currentUser: any;
  userTo: string;
  medic: Medic;
  patient: Patient;
  isPatient: boolean;
  avatar = true;
  userSelected: boolean = false;


  constructor(
    private chatService: ChatService,
    private medicService: MedicService,
    private patientService: PatientService,
    private authenticationService: AuthenticationService
    ) {
  }
  
  
  // arreglar recibir la info del userTo para mostrar en pantalla
  // mostrar los mensajes del userfrom y userto 
  // enviar los mensajes y guardarlos en la bd
  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getUser();
    this.getMessages();
  }
  
  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  getMessages() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });
  }

  // Recibe el id del usuario elegido para abrir un chat
  getUser() {
    this.chatService.getUser()
    .subscribe((user_id) => {
      this.isPatient = this.chatService.isPatient;
      this.avatar = true;
      if (!this.isPatient) {
        this.openChatMedic(user_id);
      } else {
        this.openChatPatient(user_id);
      }
    })
  }

  // Abrir chat con un medico
  openChatMedic(medic_id) {
    this.userSelected = false;
    this.medicService.getById(medic_id)
    .subscribe(
      res => {
        this.medic = res;
        this.userSelected = true;
        if (this.medic.imagePath === 'none') {
          this.avatar = false;
        }
      },
      err => console.log(err)
    );
  }

  // Abrir chat con un paciente
  openChatPatient(patient_id) {
    this.userSelected = false;
    this.patientService.getById(patient_id)
    .subscribe(
      res => {
        this.patient = res;
        this.userSelected = true;
        if (this.patient.imagePath === 'none') {
          this.avatar = false;
        }
      },
      err => console.log(err)
    );
  }


}
