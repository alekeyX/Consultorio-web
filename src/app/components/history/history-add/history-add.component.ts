import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HistoryService } from '../../services/history.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  patientId: string;
  eFisico: boolean = false;
  ePiel: boolean = false;
  eCabeza: boolean = false;
  eCuello: boolean = false;
  eRespiratorio: boolean = false;
  eCardio: boolean = false;
  eAbdomen: boolean = false;
  eNeurologo: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public historyService: HistoryService,
    private authenticationService: AuthenticationService,
    ) {
      this.patientId = this.route.snapshot.paramMap.get('id');
    }
    
    ngOnInit(): void {
      this.currentUser = this.authenticationService.currentUserValue;
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.createForm();
  }

  // Creacion de formulario angForm
  createForm() {
    this.angForm = this.fb.group({
      medic: [this.currentUser.firstName + ' ' + this.currentUser.lastName],
      specialty: [this.currentUser.specialty],
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
      patient_id: [this.patientId],
      hour: [Date().substring(16,21)],
    });
  }

  // Envio de formulario
  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      this.historyService.create(this.angForm.value).subscribe(res => {
        this.router.navigate(['history/' + this.patientId]);
      }, (error) => {
        this.error = error;
      });
    }
  }
}
