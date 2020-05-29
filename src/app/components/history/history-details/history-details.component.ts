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
  id: string;
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
      this.id = params.id;
      this.historyService.getById(this.id)
        .subscribe(
          res => {
            this.getDate(res);
            this.history = res;
          },
          err => console.log(err)
        );
    });
  }

  deleteHistory(id: string) {
    if (window.confirm('Esta seguro?')) {
      this.historyService.delete(id)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/history']);
        });
      }
  }

  getDate(history: any) {
    this.date = history.createdAt.substring(0, 10);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isMedic() {
    return this.currentUser && this.currentUser.role === Role.Medic;
  }
}
