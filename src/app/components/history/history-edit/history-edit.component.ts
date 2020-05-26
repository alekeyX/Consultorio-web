import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HistoryService } from '../../services/history.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { History } from '../../models/history';

@Component({
  selector: 'app-history-edit',
  templateUrl: './history-edit.component.html',
  styleUrls: ['./history-edit.component.css']
})
export class HistoryEditComponent implements OnInit {

  submitted = false;
  angForm: FormGroup;
  history: History;
  historyData: History[];
  currentUser: History;
  error: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public historyService: HistoryService,
    private authenticationService: AuthenticationService
    ) {
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    const id = this.route.snapshot.paramMap.get('id');
    this.getHistory(id);
    this.createForm();
  }

  getHistory(id: string) {
    this.historyService.getById(id).subscribe (data => {
    this.angForm = this.fb.group({
        motivoConsulta: [data.motivoConsulta],
        enfermedadActual: [data.enfermedadActual],
        antecedentesPersonales: [data.antecedentesPersonales],
        antecedentesFamiliares: [data.antecedentesFamiliares],
        age: [data.age],
        habitosToxicos: [data.habitosToxicos],
        /// Examen FisicExamen Fisico
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
        marcha: [data.marcha],        // Pie     // Piel
        aspecto: [data.aspecto],
        distribucionPilosa: [data.distribucionPilosa],
        lesiones: [''],
        faneras: [data.faneras],
        tejidoCelularSub: [data.tejidoCelularSub],        // Cabez     // Cabeza
        craneoCara: [data.craneoCara],
        cueroCabelludo: [data.cueroCabelludo],
        regionFrontal: [data.regionFrontal],
        regionOrbitonasal: [data.regionOrbitonasal],
        regionOrofaringea: [data.regionOrofaringea],        //  Cuell     //  Cuello
        cInspeccion: [data.cInspeccion],
        cPalpacion: [data.cPalpacion],
        cPercusion: [data.cPercusion],
        cAuscultacion: [data.cAuscultacion],        // Respiratori     // Respiratorio
        rInspeccion: [data.rInspeccion],
        rPalpacion: [data.rPalpacion],
        rPercusion: [data.rPercusion],
        rAuscultacion: [data.rAuscultacion],        // Cardiovascula     // Cardiovascular
        cdInspeccion: [data.cdInspeccion],
        cdPalpacion: [data.cdPalpacion],
        cdAuscultacion: [data.cdAuscultacion],
        cdPulsos: [data.cdPulsos],        // Abdome     // Abdomen
        aInspeccion: [data.aInspeccion],
        aPalpacion: [data.aPalpacion],
        aPercusion: [data.aPercusion],
        aAuscultacion: [data.aAuscultacion],        // Neurolog     // Neurologo
        glasglow: [data.glasglow],
        motilidadActiva: [data.motilidadActiva],
        motilidadPasiva: [data.motilidadPasiva],
        motilidadRefleja: [data.motilidadRefleja],
        paresCraneales: [data.paresCraneales],
        sensibilidadProfunda: [data.sensibilidadProfunda],
        sensibilidadSuperficial: [data.sensibilidadSuperficial],        // Diagnostic     // Diagnostico
        diagnostico: [data.diagnostico],
        tratamiento: [data.tratamiento],
      });
    });
  }

  createForm() {
    this.angForm = this.fb.group({
      motivoConsulta: [''],
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
    });
  }

  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      if (window.confirm('Esta seguro?')) {
        const id = this.route.snapshot.paramMap.get('id');
        this.historyService.update(id, this.angForm.value)
          .subscribe(() => {
            this.router.navigate(['/history', id]);
            console.log('Contenido actualizado exitosamente!');
          }, (error) => {
            console.log(error);
          });
      }
    }
  }
}
