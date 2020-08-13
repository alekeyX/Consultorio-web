import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Patient } from '../../models/patient';

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private authenticationService: AuthenticationService
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
          medic_id: [data.medic_id],
          imagePath: [data.imagePath],
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
      medic_id: [''],
      imagePath: [''],
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
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      if (window.confirm('Esta seguro?')) {
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
        formData.append('medic_id', this.angForm.get('medic_id').value);
        formData.append('imagePath', this.angForm.get('imagePath').value);
        
        // Mandar el id y el formData al servicio para actualizar los datos
        const id = this.route.snapshot.paramMap.get('id');
        this.patientService.update(id, formData)
          .subscribe(res => {
            this.router.navigate(['/patient']);
          }, (error) => {
            console.log(error);
          });
      }
    }
  }

}
