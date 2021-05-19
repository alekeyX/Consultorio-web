import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HistoryService } from '../../services/history.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { History } from '../../models/history';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-history-edit',
  templateUrl: './history-edit.component.html',
  styleUrls: ['./history-edit.component.css']
})
export class HistoryEditComponent implements OnInit {

  submitted = false;
  patientId: any;
  angForm: FormGroup;
  history: History;
  historyData: History[];
  currentUser: any;
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
    public historyService: HistoryService,
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
    this.historyService.getById(id).subscribe (data => {
    this.patientId = data.patient_id;
    this.angForm = this.fb.group({
        medic: [data.medic],
        specialty: [data.specialty],
        motivoConsulta: [data.motivoConsulta, Validators.required],
        enfermedadActual: [data.enfermedadActual],
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
        marcha: [data.marcha],             
        // Piel
        aspecto: [data.aspecto],
        distribucionPilosa: [data.distribucionPilosa],
        lesiones: [''],
        faneras: [data.faneras],
        tejidoCelularSub: [data.tejidoCelularSub],             
        // Cabeza
        craneoCara: [data.craneoCara],
        cueroCabelludo: [data.cueroCabelludo],
        regionFrontal: [data.regionFrontal],
        regionOrbitonasal: [data.regionOrbitonasal],
        regionOrofaringea: [data.regionOrofaringea],            
        //  Cuello
        cInspeccion: [data.cInspeccion],
        cPalpacion: [data.cPalpacion],
        cPercusion: [data.cPercusion],
        cAuscultacion: [data.cAuscultacion],            
        // Respiratorio
        rInspeccion: [data.rInspeccion],
        rPalpacion: [data.rPalpacion],
        rPercusion: [data.rPercusion],
        rAuscultacion: [data.rAuscultacion],        
        // Cardiovascular
        cdInspeccion: [data.cdInspeccion],
        cdPalpacion: [data.cdPalpacion],
        cdAuscultacion: [data.cdAuscultacion],
        cdPulsos: [data.cdPulsos],         
        // Abdomen
        aInspeccion: [data.aInspeccion],
        aPalpacion: [data.aPalpacion],
        aPercusion: [data.aPercusion],
        aAuscultacion: [data.aAuscultacion],        
        // Neurologo
        glasglow: [data.glasglow],
        motilidadActiva: [data.motilidadActiva],
        motilidadPasiva: [data.motilidadPasiva],
        motilidadRefleja: [data.motilidadRefleja],
        paresCraneales: [data.paresCraneales],
        sensibilidadProfunda: [data.sensibilidadProfunda],
        sensibilidadSuperficial: [data.sensibilidadSuperficial],       
        // Diagnostico
        diagnostico: [data.diagnostico],
        tratamiento: [data.tratamiento],
        hour: [data.hour]
      });
    });
  }

  // Crear formulario angForm
  createForm() {
    this.angForm = this.fb.group({
      medic: [this.currentUser.firstName + ' ' + this.currentUser.lastName],
      specialty: [this.currentUser.specialty],
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
      marcha: [''],
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
      sensibilidadSuperficial: [''],
      // Diagnostico
      diagnostico: [''],
      tratamiento: [''],
      hour: [''],
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
          this.historyService.update(this.id, this.angForm.value)
            .subscribe((res) => {
              this.router.navigate(['/history', this.patientId._id]);
              this.toastr.success(res.message, '');
            }, (error) => {
              this.toastr.error('Intente nuevamente', error);
            });
        }
      }
    });
  }
}
