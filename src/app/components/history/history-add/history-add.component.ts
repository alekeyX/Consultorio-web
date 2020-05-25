import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HistoryService } from '../../services/history.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { History } from '../../models/history';

@Component({
  selector: 'app-history-add',
  templateUrl: './history-add.component.html',
  styleUrls: ['./history-add.component.css']
})
export class HistoryAddComponent implements OnInit {

  angForm: FormGroup;
  currentUser: any;
  submitted = false;
  error: string;
  image: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public historyService: HistoryService,
    private authenticationService: AuthenticationService,
    ) {
      this.createForm();
    }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  createForm() {
    this.angForm = this.fb.group({
      motivoConsulta: [''],
      enfermedadActual: [''],
      antecedentesPersonales: [''],
      antecedentesFamiliares: [''],
      age: [''],
      habitosToxicos: ['' ],
      peso: [''],
      altura: [''],
      talla: [''],
      FC: [''],
      FR: [''],
      temperatura: [''],
      impresionGeneral: [''],
      constitucion: [''],
      facies: [''],
      actitud: [''],
      decubito: ['' ],
      marcha: [''],
      aspecto: [''],
      distribucionPilosa: [''],
      lesiones: [''],
      faneras: [''],
      tejidoCelularSub: [''],
      craneoCara: [''],
      cueroCabelludo: [''],
      regionFrontal: [''],
      regionOrbitonasal: [''],
      regionOrofaringea: ['' ],
      cInspeccion: [''],
      cPalpacion: [''],
      cPercusion: [''],
      cAuscultacion: [''],
      rInspeccion: [''],
      rPalpacion: [''],
      rPercusion: [''],
      rAuscultacion: [''],
      cdInspeccion: [''],
      cdPalpacion: [''],
      cdAuscultacion: [''],
      cdPulsos: [''],
      aInspeccion: [''],
      aPalpacion: [''],
      aPercusion: [''],
      aAuscultacion: [''],
      glasglow: [''],
      motilidadActiva: [''],
      motilidadPasiva: [''],
      motilidadRefleja: [''],
      paresCraneales: [''],
      sensibilidadProfunda: [''],
      sensibilidadSuperficial: [''],
      diagnostico: [''],
      tratamiento: [''],
      patient_id: ['']
    });
  }

  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      this.historyService.create(this.angForm.value).subscribe(res => {
        this.router.navigate(['patient']);
      }, (error) => {
        this.error = error;
      });
    }
  }

}
