import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Patient } from '../../models/patient';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Role } from '../../models/role';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  submitted = false;
  angForm: FormGroup;
  patient: Patient;
  patientData: Patient[];
  currentUser: Patient;
  error: string;
  image: string;
  generos = ['Masculino', 'Femenino', 'Otro'];
  deleteImage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    const id = this.route.snapshot.paramMap.get('id');
    this.getPatient(id);
    this.createForm();
  }

  // Obtener los datos de un paciente por el id
  getPatient(id: string) {
    this.patientService.getById(id).subscribe(data => {
      if(data.imagePath !== 'none') {
        this.image = data.imagePath;
      } else {
        this.image = 'none'
      }

      this.angForm = this.fb.group({
          username: [data.username, Validators.required],
          ci: [data.ci, Validators.required],
          firstName: [data.firstName, Validators.required],
          lastName: [data.lastName, Validators.required],
          age: [data.age],
          role: ['Patient'],
          email: [data.email ],
          genero: [data.genero],
          ethnicity: [data.ethnicity],
          maritalStatus: [data.maritalStatus],
          ocupation: [data.ocupation],
          placeBirth: [data.placeBirth],
          address: [data.address],
          phone: [data.phone, Validators.pattern('^[0-9]+$')],
          imagePath: [data.imagePath],
          withoutImage: ['']
        });
    });
  }

  // Crear formulario
  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required],
      ci: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [''],
      role: ['Patient'],
      email: [''],
      genero: [''],
      ethnicity: [''],
      maritalStatus: [''],
      ocupation: [''],
      placeBirth: [''],
      address: [''],
      phone: ['', Validators.pattern('^[0-9]+$')],
      imagePath: [''],
      withoutImage: ['']
    });
  }

  // mostrar imagen
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

  // mandar formulario
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
          const formData: any = new FormData();
          formData.append('username', this.angForm.get('username').value);
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
          formData.append('withoutImage', this.angForm.get('withoutImage').value);
          
          // Mandar el id y el formData al servicio para actualizar los datos
          const id = this.route.snapshot.paramMap.get('id');
          this.patientService.update(id, formData)
            .subscribe(res => {
              this.router.navigate(['/patient']);
              this.toastr.success(res.message, res.data.firstName + ' ' + res.data.lastName);
            }, (error) => {
              this.toastr.error('Intente nuevamente', error);
            });
        }
      }
    })
  }

  withoutImage(event: any): void {
    this.deleteImage = !this.deleteImage;
    if (this.deleteImage) {
      this.angForm.controls['withoutImage'].setValue('none');
    }
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isPatient() {
    return this.currentUser && this.currentUser.role === Role.Patient;
  }
}
