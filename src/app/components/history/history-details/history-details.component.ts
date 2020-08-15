import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

import { HistoryService } from '../../services/history.service';
import { History } from '../../models/history';
import { Role } from '../../models/role';

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
      },
      err => console.log(err)
    );
  }

  // Eliminar registro de la historia clinica
  deleteHistory(id: string) {
    if (window.confirm('Esta seguro de eliminar la historia clinica?')) {
      this.historyService.delete(id)
        .subscribe(res => {
          console.log(res);
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
}
