import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HistoryService } from '../../services/history.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { History } from '../../models/history';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Medic } from '../../models/medic';
import { Patient } from '../../models/patient';
import { ExamService } from '../../services/exam.service';
import { DiagnosticService } from '../../services/diagnostic.service';

@Component({
  selector: 'app-history-edit',
  templateUrl: './history-edit.component.html',
  styleUrls: ['./history-edit.component.css']
})
export class HistoryEditComponent implements OnInit {

  submitted = false;
  // patientId: any;
  angForm: FormGroup;
  diagnosticForm: FormGroup;
  examForm: FormGroup;
  currentUser: Patient | Medic;
  history: History;
  historyData: History[];
  id: string;
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
    private route: ActivatedRoute,
    private router: Router,
    private historyService: HistoryService,
    private examServ: ExamService,
    private diagServ: DiagnosticService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.id = this.route.snapshot.paramMap.get('id');
    this.getHistory(this.id);
    this.createForm();
  }

  // Obetner datos de la historia clinica por id
  getHistory(id: string) {
    this.historyService.getById(id).subscribe(data => {
      // this.patientId = data.patient_id;
      this.history = data;
      this.angForm = this.fb.group({
        medic: [data.medic, Validators.required],
        motivoConsulta: [data.motivoConsulta, Validators.required],
        enfermedadActual: [data.enfermedadActual, Validators.required],
        antecedentesPersonales: [data.antecedentesPersonales],
        antecedentesFamiliares: [data.antecedentesFamiliares],
        age: [data.age],
        habitosToxicos: [data.habitosToxicos],
        /// Examen Fisic
        peso: [data.peso],
        altura: [data.altura],
        talla: [data.talla],
        FC: [data.FC],
        FR: [data.FR],
        temperatura: [data.temperatura],
        impresionGeneral: [data.impresionGeneral],
        constitucion: [data.constitucion],
        facies: [data.facies],
        actitud: [data.actitud],
        decubito: [data.decubito],
        marcha: [data.marcha]
      });
      this.examForm = this.fb.group({
        // Piel
        aspecto: [data.exam_id.aspecto],
        distribucionPilosa: [data.exam_id.distribucionPilosa],
        lesiones: [''],
        faneras: [data.exam_id.faneras],
        tejidoCelularSub: [data.exam_id.tejidoCelularSub],
        // Cabeza
        craneoCara: [data.exam_id.craneoCara],
        cueroCabelludo: [data.exam_id.cueroCabelludo],
        regionFrontal: [data.exam_id.regionFrontal],
        regionOrbitonasal: [data.exam_id.regionOrbitonasal],
        regionOrofaringea: [data.exam_id.regionOrofaringea],
        //  Cuello
        cInspeccion: [data.exam_id.cInspeccion],
        cPalpacion: [data.exam_id.cPalpacion],
        cPercusion: [data.exam_id.cPercusion],
        cAuscultacion: [data.exam_id.cAuscultacion],
        // Respiratorio
        rInspeccion: [data.exam_id.rInspeccion],
        rPalpacion: [data.exam_id.rPalpacion],
        rPercusion: [data.exam_id.rPercusion],
        rAuscultacion: [data.exam_id.rAuscultacion],
        // Cardiovascular
        cdInspeccion: [data.exam_id.cdInspeccion],
        cdPalpacion: [data.exam_id.cdPalpacion],
        cdAuscultacion: [data.exam_id.cdAuscultacion],
        cdPulsos: [data.exam_id.cdPulsos],
        // Abdomen
        aInspeccion: [data.exam_id.aInspeccion],
        aPalpacion: [data.exam_id.aPalpacion],
        aPercusion: [data.exam_id.aPercusion],
        aAuscultacion: [data.exam_id.aAuscultacion],
        // Neurologo
        glasglow: [data.exam_id.glasglow],
        motilidadActiva: [data.exam_id.motilidadActiva],
        motilidadPasiva: [data.exam_id.motilidadPasiva],
        motilidadRefleja: [data.exam_id.motilidadRefleja],
        paresCraneales: [data.exam_id.paresCraneales],
        sensibilidadProfunda: [data.exam_id.sensibilidadProfunda],
        sensibilidadSuperficial: [data.exam_id.sensibilidadSuperficial]
      });
      this.diagnosticForm = this.fb.group({
        // Diagnostico
        diagnostico: [data.diagnostic_id.diagnostico],
        tratamiento: [data.diagnostic_id.tratamiento]
      });
    });
  }

  // Crear formulario angForm
  createForm() {
    this.angForm = this.fb.group({
      medic: [this.currentUser.firstName + ' ' + this.currentUser.lastName],
      motivoConsulta: ['', Validators.required],
      enfermedadActual: [''],
      antecedentesPersonales: [''],
      antecedentesFamiliares: [''],
      age: [''],
      habitosToxicos: [''],
      // Examen Fisico
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
      decubito: [''],
      marcha: ['']
    });
    this.examForm = this.fb.group({
      // Piel
      aspecto: [''],
      distribucionPilosa: [''],
      lesiones: [''],
      faneras: [''],
      tejidoCelularSub: [''],
      // Cabeza
      craneoCara: [''],
      cueroCabelludo: [''],
      regionFrontal: [''],
      regionOrbitonasal: [''],
      regionOrofaringea: [''],
      //  Cuello
      cInspeccion: [''],
      cPalpacion: [''],
      cPercusion: [''],
      cAuscultacion: [''],
      // Respiratorio
      rInspeccion: [''],
      rPalpacion: [''],
      rPercusion: [''],
      rAuscultacion: [''],
      // Cardiovascular
      cdInspeccion: [''],
      cdPalpacion: [''],
      cdAuscultacion: [''],
      cdPulsos: [''],
      // Abdomen
      aInspeccion: [''],
      aPalpacion: [''],
      aPercusion: [''],
      aAuscultacion: [''],
      // Neurologo
      glasglow: [''],
      motilidadActiva: [''],
      motilidadPasiva: [''],
      motilidadRefleja: [''],
      paresCraneales: [''],
      sensibilidadProfunda: [''],
      sensibilidadSuperficial: ['']
    });
    this.diagnosticForm = this.fb.group({
      // Diagnostico
      diagnostico: [''],
      tratamiento: ['']
    });
  }

  // Enviar formulario
  submitForm() {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "Los datos modificados se guardarán",
      icon: 'warning',
      iconColor: '#15B9C6',
      showCancelButton: true,
      confirmButtonColor: '#15B9C6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      backdrop: '#0F7F875a'
    }).then((result) => {
      this.submitted = true;
      if (!this.angForm.valid) {
        return false;
      } else {
        if (result.isConfirmed) {
          this.examServ.update(this.history.exam_id._id, this.examForm.value).subscribe( () => {
            this.diagServ.update(this.history.diagnostic_id._id, this.diagnosticForm.value).subscribe( () => {
              this.historyService.update(this.id, this.angForm.value).subscribe((res) => {
                this.router.navigate(['/history', this.history.patient_id._id]);
                this.toastr.success(res.message, '');
              }, (error) => {
                this.toastr.error('Intente nuevamente', error);
              });
            });
          });
        }
      }
    });
  }
}
