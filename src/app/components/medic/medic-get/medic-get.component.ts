import { Component, OnInit } from '@angular/core';
import { Medic } from '../../models/medic';
import { MedicService } from '../../services/medic.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medic-get',
  templateUrl: './medic-get.component.html',
  styleUrls: ['./medic-get.component.css']
})
export class MedicGetComponent implements OnInit {
  currentUser: Medic;
  medics: Medic[] = [];

  constructor(
      private medicService: MedicService,
      private router: Router,
      private authenticationService: AuthenticationService
    ) {
      this.getMedics();
    }

    ngOnInit() {
      this.currentUser = this.authenticationService.currentUserValue;
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  getMedics() {
    this.medicService.getAll().subscribe((data) => {
     this.medics = data;
    });
  }

  removeMedic(medic, index) {
    if (window.confirm('Esta seguro?')) {
        this.medicService.delete(medic.id).subscribe((data) => {
          this.medics.splice(index, 1);
        });
    }
  }

  selectedMedic(id: string) {
    this.router.navigate(['/medic/', id]);
  }

}
