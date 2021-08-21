import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

import { HistoryService } from '../../services/history.service';
import { History } from '../../models/history';
import { Role } from '../../models/role';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.css']
})
export class HistoryDetailsComponent implements OnInit {

  currentUser: any;
  history: History;
  loading = false;
  date: string;
  patient: any;

  constructor(
      private historyService: HistoryService,
      private authenticationService: AuthenticationService,
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) {  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.getHistory(params.id);
    });
  }

  // Obtener la informacion de una historia por id
  getHistory(id: string) {
    this.historyService.getById(id)
    .subscribe(
      res => {
        this.getDate(res);
        this.history = res; 
        this.patient = res.patient_id;       
      },
      err => console.log(err)
    );
  }

  // Eliminar registro de la historia clinica
  deleteHistory(id: string) {
    if (window.confirm('Esta seguro de eliminar la historia clinica?')) {
      this.historyService.delete(id)
        .subscribe(res => {
          this.router.navigate(['/history']);
        });
      }
  }

  // Cortar la fecha para mostrarla
  getDate(history: any) {
    this.date = history.createdAt.substring(0, 10) + ' ' + history.hour;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMedic() {
    return this.currentUser && this.currentUser.role === Role.Medic;
  }

  getPDF(){
    let doc = new jsPDF();

    doc.setLineWidth(0.5);
    doc.line(20, 15, 190, 15);
    doc.setFontSize(22);
    doc.text("Historia Clínica", 20, 25);
    doc.setFontSize(14);
    doc.text("Fecha: " + this.date, 120, 25);
    doc.line(20, 35, 190, 35);
    doc.setFontSize(12);
    doc.text('Médico: ' + this.history.medic, 20, 50);
    doc.text('Paciente: ' + this.patient.firstName + ' ' + this.patient.lastName, 20, 60);
    doc.text('Motivo Consulta: ' + this.history.motivoConsulta, 20, 70);
    doc.text('Enfermedad Actual: ' + this.history.enfermedadActual, 20, 80);
    doc.text('Antecedentes Familiares: ' + this.history.antecedentesFamiliares, 20, 90);
    doc.text('Antecedentes Personales: ' + this.history.antecedentesPersonales, 20, 100);
    doc.text('Habitos Tóxicos: ' + this.history.habitosToxicos, 20, 110);
    doc.text('Diagnóstico: ' + this.history.diagnostico, 20, 120);
    doc.text('Tratamiento: ' + this.history.tratamiento, 20, 130);
    doc.setLineWidth(1);
    doc.line(20, 190, 190, 190);
    doc.save(this.patient.firstName + '-' + this.patient.lastName + '.pdf');
  }
}
