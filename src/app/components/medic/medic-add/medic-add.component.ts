import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicService } from '../../services/medic.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Medic } from '../../models/medic';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medic-add',
  templateUrl: './medic-add.component.html',
  styleUrls: ['./medic-add.component.css']
})
export class MedicAddComponent implements OnInit {
  
  angForm: FormGroup;
  currentUser: Medic;
  submitted = false;
  image: string;
  generos = ['Masculino', 'Femenino', 'Otro'];
  roles = ['Médico', 'Administrador', 'Recepción'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public medicService: MedicService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
    ) {
      this.createForm();
    }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  // Creacion del formulario
  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', Validators.required ],
      genero: [''],
      address: [''],
      phone: ['', Validators.pattern('^[0-9]+$')],
      specialty: [''],
      imagePath: [''],
    });
  }

  // Cargar archivo de foto
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

  // Enviar formulario
  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      const formData: any = new FormData();
      formData.append('username', this.angForm.get('username').value);
      formData.append('password', this.angForm.get('password').value);
      formData.append('firstName', this.angForm.get('firstName').value);
      formData.append('lastName', this.angForm.get('lastName').value);
      formData.append('email', this.angForm.get('email').value);
      formData.append('genero', this.angForm.get('genero').value);
      formData.append('address', this.angForm.get('address').value);
      formData.append('phone', this.angForm.get('phone').value);
      formData.append('specialty', this.angForm.get('specialty').value);
      formData.append('imagePath', this.angForm.get('imagePath').value);
      
      switch (this.angForm.get('role').value) {
        case 'Administrador':
          formData.append('role', 'Admin');
          break;
        case 'Médico':
          formData.append('role', 'Medic');
          break;
        case 'Recepción':
          formData.append('role', 'Reception');
          break;
      }
      // Envio del formData al servicio
      this.medicService.create(formData).subscribe(res => {
        this.router.navigate(['medic']);
        this.toastr.success(res.message, '');
      }, (error) => {
        this.toastr.error('Intente nuevamente', error);
      });
    }
  }
}
