import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

import { HistoryService } from '../../services/history.service';
import { History } from '../../models/history';
import { Role } from '../../models/role';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {ExamService} from '../../services/exam.service';
import {DiagnosticService} from '../../services/diagnostic.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.css']
})
export class HistoryDetailsComponent implements OnInit {

  currentUser: any;
  history: History;
  loading = false;

  constructor(
      private historyService: HistoryService,
      private examServ: ExamService,
      private diagServ: DiagnosticService,
      private authenticationService: AuthenticationService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private toastr: ToastrService
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
    this.historyService.getById(id).subscribe(res => {
        this.history = res;
      },
      err => console.log(err)
    );
  }

  // Eliminar registro de la historia clinica
  deleteHistory(id: string) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'Los datos se eliminarán permanentemente',
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
        this.historyService.delete(id).subscribe((res) => {
          this.deleteExamAndDiagnostic(this.history);
          this.router.navigate(['/history/' + this.history.patient_id._id]);
          this.toastr.success(res.message);
        });
      }
    });
  }

  deleteExamAndDiagnostic(history: History): void {
    this.examServ.delete(history.exam_id._id).subscribe();
    this.diagServ.delete(history.diagnostic_id._id).subscribe();
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMedic() {
    return this.currentUser && this.currentUser.role === Role.Medic;
  }

  getPDF() {
    const doc = new jsPDF();

    doc.setLineWidth(0.5);
    doc.line(20, 15, 190, 15);
    doc.setFontSize(22);
    doc.text('Historia Clínica', 20, 25);
    doc.setFontSize(14);
    doc.text('Fecha: ' + this.history.createdAt, 120, 25);
    doc.line(20, 35, 190, 35);
    doc.setFontSize(12);
    doc.text('Médico: ' + this.history.medic, 20, 50);
    doc.text('Paciente: ' + this.history.patient_id.firstName + ' ' + this.history.patient_id.lastName, 20, 60);
    doc.text('Motivo Consulta: ' + this.history.motivoConsulta, 20, 70);
    doc.text('Enfermedad Actual: ' + this.history.enfermedadActual, 20, 80);
    doc.text('Antecedentes Familiares: ' + this.history.antecedentesFamiliares, 20, 90);
    doc.text('Antecedentes Personales: ' + this.history.antecedentesPersonales, 20, 100);
    doc.text('Habitos Tóxicos: ' + this.history.habitosToxicos, 20, 110);
    doc.text('Diagnóstico: ' + this.history.diagnostic_id.diagnostico, 20, 120);
    doc.text('Tratamiento: ' + this.history.diagnostic_id.tratamiento, 20, 130);
    doc.setLineWidth(1);
    doc.line(20, 190, 190, 190);
    doc.save(this.history.patient_id.firstName + '-' + this.history.patient_id.lastName + '.pdf');
  }
}
