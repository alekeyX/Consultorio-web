import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HistoryService } from '../../services/history.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { History } from '../../models/history';
import { ToastrService } from 'ngx-toastr';
import {Medic} from '../../models/medic';
import {Patient} from '../../models/patient';
import {ExamService} from '../../services/exam.service';
import {DiagnosticService} from '../../services/diagnostic.service';

@Component({
  selector: 'app-history-add',
  templateUrl: './history-add.component.html',
  styleUrls: ['./history-add.component.css']
})
export class HistoryAddComponent implements OnInit {

  angForm: FormGroup;
  diagnosticForm: FormGroup;
  examForm: FormGroup;
  currentUser: Patient | Medic;
  submitted = false;
  image: string;
  patientId: string;
  eFisico = false;
  ePiel = false;
  eCabeza = false;
  eCuello = false;
  eRespiratorio = false;
  eCardio = false;
  eAbdomen = false;
  eNeurologo = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private historyService: HistoryService,
    private examService: ExamService,
    private diagService: DiagnosticService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
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
      medic: [this.currentUser.firstName + ' ' + this.currentUser.lastName, Validators.required],
      motivoConsulta: ['', Validators.required],
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
      patient_id: [this.patientId],
      exam_id: [''],
      diagnostic_id: ['']
    });

    this.examForm = this.fb.group({
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
      sensibilidadSuperficial: ['']
    });

    this.diagnosticForm = this.fb.group({
      diagnostico: [''],
      tratamiento: [''],
    });
  }

  diag(diag: FormGroup) {
    this.diagnosticForm = diag;
  }

  // Envio de formulario
  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      this.examService.create(this.examForm.value).subscribe(resExam => {
        this.diagService.create(this.diagnosticForm.value).subscribe( resDiag => {
          this.submitHistory(resExam._id, resDiag._id);
        });
      });
    }
  }

  submitHistory(exam, diag) {
    this.angForm.patchValue({exam_id: exam});
    this.angForm.patchValue({diagnostic_id: diag});
    this.historyService.create(this.angForm.value).subscribe(resHistory => {
      this.router.navigate(['history/' + this.patientId]);
      this.toastr.success(resHistory.message, '');
    }, (error) => {
      this.toastr.error('Error inesperado', error);
    });
  }
}
