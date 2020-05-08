import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MedicService } from '../../services/medic.service';
import { Medic } from '../../models/medic';


@Component({
  selector: 'app-medic-profile',
  templateUrl: './medic-profile.component.html',
  styleUrls: ['./medic-profile.component.css']
})
export class MedicProfileComponent implements OnInit {
  currentUser: Medic;
  medic: Medic;
  id: string;

  constructor(
      private medicService: MedicService,
      private authenticationService: AuthenticationService,
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) {  }

  ngOnInit(): void {
      this.currentUser = this.authenticationService.currentUserValue;
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.activatedRoute.params.subscribe(params => {
        this.id = params.id;
        this.medicService.getById(this.id)
          .subscribe(
            res => {
              this.medic = res;
            },
            err => console.log(err)
          );
      });
  }

  deleteMedic(id: string) {
    if (window.confirm('Esta seguro?')) {
      this.medicService.delete(id)
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/medic']);
        });
      }
  }
}
