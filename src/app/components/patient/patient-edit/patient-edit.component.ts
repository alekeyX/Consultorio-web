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

  getPatient(id) {
    this.patientService.getById(id).subscribe(data => {
      console.log(data);
      this.angForm = this.fb.group({
          username: [data.username, Validators.required],
          ci: [data.ci, Validators.required],
          firstName: [data.firstName, Validators.required],
          lastName: [data.lastName, Validators.required],
          age: [data.age],
          role: ['Patient'],
          // // email: ['', Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],
          email: [data.email, Validators.required ],
          genero: [data.genero],
          ethnicity: [data.ethnicity],
          maritalStatus: [data.maritalStatus],
          ocupation: [data.ocupation],
          placeBirth: [data.placeBirth],
          address: [data.address],
          phone: [data.phone, Validators.pattern('^[0-9]+$')],
          // medic: [this.currentUser._id],
          medic_id: ['5eb58bd89b6f502ca023dc6b'],
          imagePath: [data.imagePath],
        });
    });
  }

  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required],
      ci: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [''],
      role: ['Patient'],
      // // email: ['', Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],
      email: ['', Validators.required ],
      genero: [''],
      ethnicity: [''],
      maritalStatus: [''],
      ocupation: [''],
      placeBirth: [''],
      address: [''],
      phone: ['', Validators.pattern('^[0-9]+$')],
      // medic: [this.currentUser._id],
      medic_id: ['5eb58bd89b6f502ca023dc6b'],
      imagePath: [''],
    });
  }

  // getPatient(id) {
  //   this.patientService.getById(id).subscribe(data => {
  //     console.log(data);
  //     this.angForm.setValue({
  //       username: data.username,
  //       ci: data.ci,
  //       firstName: data.firstName,
  //       lastName: data.lastName,
  //       age: data.age,
  //       role: data.role,
  //       email: data.email,
  //       genero: data.genero,
  //       ethnicity: data.ethnicity,
  //       maritalStatus: data.maritalStatus,
  //       ocupation: data.ocupation,
  //       placeBirth: data.placeBirth,
  //       address: data.address,
  //       phone: data.phone,
  //       medic: data.medic,
  //       imagePath: data.imagePath,
  //     });
  //   });
  // }

  // updatePatient() {
  //   this.angForm = this.fb.group({
  //     username: ['', Validators.required],
  //     ci: ['', Validators.required],
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     age: [''],
  //     role: ['Patient'],
  //     // // email: ['', Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],
  //     email: ['', Validators.required ],
  //     genero: [''],
  //     ethnicity: [''],
  //     maritalStatus: [''],
  //     ocupation: [''],
  //     placeBirth: [''],
  //     address: [''],
  //     phone: ['', Validators.pattern('^[0-9]+$')],
  //     // medic: [this.currentUser._id],
  //     medic_id: ['5jldafj4l4lkr3j4l5h'],
  //     imagePath: [''],
  //   });
  // }

  // mostrar imagen elegida
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
        formData.append('medic', this.angForm.get('medic').value);
        formData.append('imagePath', this.angForm.get('imagePath').value);

        const id = this.route.snapshot.paramMap.get('id');
        this.patientService.update(id, formData)
          .subscribe(res => {
            this.router.navigate(['/patient']);
            console.log('Contenido actualizado exitosamente!');
          }, (error) => {
            console.log(error);
          });
      }
    }
  }

}
