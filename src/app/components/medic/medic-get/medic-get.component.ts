import { Component, OnInit } from '@angular/core';
import { Medic } from '../../models/medic';
import { MedicService } from '../../services/medic.service';

@Component({
  selector: 'app-medic-get',
  templateUrl: './medic-get.component.html',
  styleUrls: ['./medic-get.component.css']
})
export class MedicGetComponent implements OnInit {

  medics: Medic[] = [];

  constructor(private medicService: MedicService) { 
    this.readEmployee();
  }

  ngOnInit() {}

  readEmployee(){
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

}
