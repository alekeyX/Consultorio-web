import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Medic } from '../../models/medic';
import { Patient } from '../../models/patient';
import { MedicService } from '../../services/medic.service';
import { PatientService } from '../../services/patient.service';
import { ChatService } from '../../services/chat.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Role } from '../../models/role';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat-users-messages',
  templateUrl: './chat-users-messages.component.html',
  styleUrls: ['./chat-users-messages.component.css']
})
export class ChatUsersMessagesComponent implements OnInit, OnDestroy {

  currentUser: any;
  medics: Medic[] = [];
  patients: Patient[] = [];
  medic: Medic;
  patient: Patient;
  message: string = '';
  messages = [];
  isPatient: boolean;
  avatar = true;
  userSelected: boolean = false;
  angForm: FormGroup;
  to_user_id: string;
  room: string;
  
  constructor(
    private medicService: MedicService,
    private patientService: PatientService,
    private chatService: ChatService,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.chatService.connect();
    if (this.currentUser.role == 'Admin' || this.currentUser.role == 'Medic') {
      this.getPatients();
    } else {
      this.getMedics();
    }
    this.scrollToBottom();
    this.getMessages();
  }

  // Obtener lista de medicos
  getMedics() {
    let patientuser: Patient;
    this.patientService.getById(this.currentUser._id).subscribe(data => {
      patientuser = data;
      this.medicService.getMedicsbyIds(patientuser.medic_id).subscribe((data) => {
        this.medics = data;
        console.log(data);
        
      });
    });
  }

  // Obtner pacientes por id de medico
  getPatients() {
    this.patientService.getPatientByMedic(this.currentUser._id)
    .subscribe((data) => {
      this.patients = data;
    })
  }

  // Elegir un usuario para abrir un chat
  openChat(to_user_id: string, patientSelected: boolean) {
    this.isPatient = patientSelected;
    this.chatService.leaveRoom(this.room);
    if(!patientSelected) {
      // si se elige a un paciente para abrir un chat
      this.openChatMedic(to_user_id);
      this.room = this.currentUser._id+to_user_id;
      this.chatService.joinRoom(this.room);
    } else {
      // si se elige a un medico para abrir un chat
      this.openChatPatient(to_user_id);
      this.room = to_user_id+this.currentUser._id;
      this.chatService.joinRoom(this.room);
    }
    this.avatar = true;
  }

    // Abrir chat con un medico
    openChatMedic(medic_id) {
      this.medicService.getById(medic_id)
      .subscribe(
        res => {
          this.to_user_id = medic_id;
          this.medic = res;          
          this.userSelected = true;
          if (this.medic.imagePath === 'none') {
            this.avatar = false;
          }
          this.chatService.getAll2(this.to_user_id, this.currentUser._id)
          .subscribe((data) => {
            this.messages = data;
          });
        },
        err => console.log(err)
      );
    }
  
    // Abrir chat con un paciente
    openChatPatient(patient_id) {
      this.patientService.getById(patient_id)
      .subscribe(
        res => {
          this.to_user_id = patient_id;
          this.patient = res;
          this.userSelected = true;
          if (this.patient.imagePath === 'none') {
            this.avatar = false;
          }
          this.chatService.getAll(this.to_user_id, this.currentUser._id)
          .subscribe((data) => {
            this.messages = data;
          });
        },
        err => console.log(err)
      );
    }

  // Enviar un mensaje
  submitForm() {
    if (this.message !== '') {
      // si es medico a quien escribimos
      if (!this.isPatient) {
        var id = this.medic._id;
        this.angForm = this.fb.group({
          medic_id: [id],
          patient_id: [this.currentUser._id],
          from: [this.currentUser._id],
          msg: [this.message]
        })
      } else {
        // si es un paciente a quien escribimos
        var id = this.patient._id;
        this.angForm = this.fb.group({
          medic_id: [this.currentUser._id],
          patient_id: [id],
          from: [this.currentUser._id],
          msg: [this.message]
        })
      }
      this.chatService.sendMessage(this.angForm.value, this.room);
      this.message = '';
    }
  }

  // Devolver mensajes
  getMessages() {
    this.chatService.getMessages()
      .subscribe((messages) => {
        this.messages = messages
      });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMedic() {
    return this.currentUser && this.currentUser.role === Role.Medic;
  }

  // Mantener el scroll siempre abajo 
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }
}
