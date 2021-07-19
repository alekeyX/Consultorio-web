import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {

  angForm: FormGroup;
  currentUser: any;
  submitted = false;
  image: string;
  generos = ['Masculino', 'Femenino', 'Otro'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private patientService: PatientService,
    private authService: AuthenticationService,
    private toastr: ToastrService
    ) {
    }
    
    ngOnInit(): void {
      this.currentUser = this.authService.currentUserValue;
      this.authService.currentUser.subscribe(x => this.currentUser = x);
      this.createForm();
  }

  // Creacion de formulario angForm
  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required],
      ci: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [''],
      role: ['Patient'],
      email: ['', Validators.required],
      genero: [''],
      ethnicity: [''],
      maritalStatus: [''],
      ocupation: [''],
      placeBirth: [''],
      address: [''],
      phone: ['', Validators.pattern('^[0-9]+$')],
      imagePath: [''],
      medic_id: [this.currentUser._id]
    });
  }

  // Mostrar imagen
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.angForm.patchValue({
        imagePath: file
      });
      this.angForm.get('imagePath').updateValueAndValidity();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.image = reader.result as string;
        this.angForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  // Envio de formulario
  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      // Creacion de formData con los valores de angForm
      const formData: any = new FormData();
      formData.append('username', this.angForm.get('username').value);
      formData.append('password', this.angForm.get('ci').value);
      formData.append('firstName', this.angForm.get('firstName').value);
      formData.append('lastName', this.angForm.get('lastName').value);
      formData.append('ci', this.angForm.get('ci').value);
      formData.append('age', this.angForm.get('age').value);
      formData.append('role', this.angForm.get('role').value);
      formData.append('email', this.angForm.get('email').value);
      formData.append('genero', this.angForm.get('genero').value);
      formData.append('ethnicity', this.angForm.get('ethnicity').value);
      formData.append('maritalStatus', this.angForm.get('maritalStatus').value);
      formData.append('ocupation', this.angForm.get('ocupation').value);
      formData.append('placeBirth', this.angForm.get('placeBirth').value);
      formData.append('address', this.angForm.get('address').value);
      formData.append('phone', this.angForm.get('phone').value);
      formData.append('imagePath', this.angForm.get('imagePath').value);
      formData.append('medic_id',  this.angForm.get('medic_id').value);
      
      // Envio del formData al servicio 
      this.patientService.create(formData).subscribe(res => {
        this.router.navigate(['patient']);
        this.toastr.success(res.message, '');
      }, (error) => {
        this.toastr.error('Intente nuevamente', error);
      });
    }
  }

}
