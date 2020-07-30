import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ChatService } from '../../services/chat.service';
import { MedicService } from '../../services/medic.service';
import { PatientService } from '../../services/patient.service';
import { Medic } from '../../models/medic';
import { Patient } from '../../models/patient';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  message: string;
  messages = [];
  currentUser: any;
  userTo: string;
  medic: Medic;
  patient: Patient;
  isPatient: boolean;
  avatar = true;
  userSelected: boolean = false;
  angForm: FormGroup;

  constructor(
    private chatService: ChatService,
    private medicService: MedicService,
    private patientService: PatientService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder
    ) {  }
  
  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.getUser();
    this.getMessages();
    this.scrollToBottom();
  }

  // Actualizar lista de mensajes
  getMessages() {
    this.chatService.getMessages()
      .subscribe((message) => {
        this.messages = message;
      });
  }

  // Recibe el id del usuario elegido para abrir un chat
  getUser() {
    this.chatService.getUser()
    .subscribe((to_user_id) => {
      this.isPatient = this.chatService.isPatient;
      let user_id = to_user_id;
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

  // Enviar un mensaje
  submitForm() {
    // si es medico a quien escribimos
    if (!this.isPatient) {
      var id = this.medic._id;
      this.angForm = this.fb.group({
        medic_id: [id],
        patient_id: [this.currentUser._id],
        to: [id],
        from: [this.currentUser._id],
        msg: [this.message]
      })
    } else {
      // si es un paciente a quien escribimos
      var id = this.patient._id;
      this.angForm = this.fb.group({
        medic_id: [this.currentUser._id],
        patient_id: [id],
        to: [id],
        from: [this.currentUser._id],
        msg: [this.message]
      })
    }
    this.chatService.sendMessage(this.angForm.value, this.isPatient);
    // this.getMessages();
    this.message = '';
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
}
