import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medic } from 'src/app/components/models/medic';
import { validarQueSeanIguales } from 'src/app/components/patient/patient-edit/patient-edit-password/patient-edit-password.component';
import { AuthenticationService } from 'src/app/components/services/authentication.service';
import { MedicService } from 'src/app/components/services/medic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medic-edit-password',
  templateUrl: './medic-edit-password.component.html',
  styleUrls: ['./medic-edit-password.component.css']
})
export class MedicEditPasswordComponent implements OnInit {


  submitted = false;
  passForm: FormGroup;
  currentUser: Medic;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private medicService: MedicService,
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
          
          this.medicService.changePassword(id, this.passForm.value)
            .subscribe(res => {
              this.router.navigate(['/medic']);
              this.toastr.success('Contraseña cambiada');
            }, (error) => {
              this.toastr.error('Intente nuevamente', error);
            });
        }
      }
    });
  }

}
