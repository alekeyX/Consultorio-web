import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medic } from 'src/app/components/models/medic';
import { Patient } from 'src/app/components/models/patient';
import { AuthenticationService } from 'src/app/components/services/authentication.service';
import { PatientService } from 'src/app/components/services/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-edit-password',
  templateUrl: './patient-edit-password.component.html',
  styleUrls: ['./patient-edit-password.component.css']
})
export class PatientEditPasswordComponent implements OnInit {

  submitted = false;
  passForm: FormGroup;
  currentUser: Medic | Patient;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    this.createForm();
  }

  createForm() {
    this.passForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{8,30})'), Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.pattern('((?=.*[a-z])(?=.*[A-Z]).{8,30})'), Validators.minLength(8)]]
    },{ validators: validarQueSeanIguales });
  }

  checarSiSonIguales(): boolean {
    return this.passForm.hasError('noSonIguales') &&
      this.passForm.get('password').dirty &&
      this.passForm.get('confirmPassword').dirty;
  }

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
      if (!this.passForm.valid) {
        console.log('false');
      return false;
      
      } else {
        if(result.isConfirmed) {
          const formData: any = new FormData();
          formData.append('password', this.passForm.get('password').value);
          const id = this.route.snapshot.paramMap.get('id');
          
          this.patientService.changePassword(id, this.passForm.value)
            .subscribe(res => {
              this.router.navigate(['/patient']);
              this.toastr.success('Contraseña cambiada');
            }, (error) => {
              this.toastr.error('Intente nuevamente', error);
            });
        }
      }
    });
  }
}

export const validarQueSeanIguales: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password.value === confirmPassword.value ? null : { 'noSonIguales': true };
};