import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HistoryService } from '../../services/history.service';
import { History } from '../../models/history';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from '../../models/role';

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
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.patientId = this.route.snapshot.paramMap.get('id');
    this.getHistories();
  }

  // Obtener historias clinicas por id de paciente
  getHistories() {
    setInterval(() => {this.loading = true; }, 800);
    // si el rol del usuario es paciente 
    if (this.currentUser.role === Role.Patient) {
      this.historyService.getHistoryByPatient(this.currentUser._id).subscribe((data) => {
        this.histories = data;
      });
    } else {
      let id = this.route.snapshot.paramMap.get('id');
      this.historyService.getHistoryByPatient(id).subscribe((data) => {
        this.histories = data;
        console.log(this.histories);
        
      });
    }
  }

  // Eliminar registro de historia clinica
  removeHistory(history: { _id: any; }, index: number) {
    if (window.confirm('Esta seguro de eliminar la historia clínica?')) {
        this.historyService.delete(history._id).subscribe(() => {
          this.histories.splice(index, 1);
        });
    }
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
