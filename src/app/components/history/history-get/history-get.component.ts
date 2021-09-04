import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HistoryService } from '../../services/history.service';
import { History } from '../../models/history';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from '../../models/role';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import {ExamService} from '../../services/exam.service';
import {DiagnosticService} from '../../services/diagnostic.service';

@Component({
  selector: 'app-history-get',
  templateUrl: './history-get.component.html',
  styleUrls: ['./history-get.component.css']
})
export class HistoryGetComponent implements OnInit {

  currentUser: any;
  histories: History[] = [];
  loading = false;
  patientId: string;
  order: string = '';
  asc: boolean = false;

  constructor(
    private historyService: HistoryService,
    private examServ: ExamService,
    private diagServ: DiagnosticService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.patientId = this.route.snapshot.paramMap.get('id');
    this.getHistories();
  }

  // Obtener historias clinicas por id de paciente
  getHistories() {
    setInterval(() => {this.loading = true; }, 100);
    // si el rol del usuario es paciente
    if (this.currentUser.role === Role.Patient) {
      this.historyService.getHistoryByPatient(this.currentUser._id).subscribe((data) => {
        this.histories = data;
      });
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      this.historyService.getHistoryByPatient(id).subscribe((data) => {
        this.histories = data;
      });
    }
  }

  // Eliminar registro de historia clinica
  removeHistory(history: History, index: number) {
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
        this.historyService.delete(history._id).subscribe((res) => {
          this.deleteExamAndDiagnostic(history);
          this.histories.splice(index, 1);
          this.toastr.success(res.message, '');
        });
      }
    });
  }

  deleteExamAndDiagnostic(history: History): void {
    this.examServ.delete(history.exam_id._id).subscribe();
    this.diagServ.delete(history.diagnostic_id._id).subscribe();
  }

  // Navegar a los detalles de una historia clinica
  selectedHistory(id: string) {
    this.router.navigate(['/history/detail/', id]);
  }

  // Ordenar en orden ascendente/descendente
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
