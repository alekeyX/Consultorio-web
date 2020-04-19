import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicService } from '../../services/medic.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Medic } from '../../models/medic';

@Component({
  selector: 'app-medic-add',
  templateUrl: './medic-add.component.html',
  styleUrls: ['./medic-add.component.css']
})
export class MedicAddComponent implements OnInit {
  angForm: FormGroup;
  currentUser: Medic;
  submitted = false;
  error: string;
  imageSrc: string;
  uploadResponse = { status: '', message: '', filePath: '' };

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public medicService: MedicService,
    private authenticationService: AuthenticationService
    ) {
    this.createForm();
    console.log(this.angForm);

  }

  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['Medic'],
      // email: ['', Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],
      email: ['', Validators.required ],
      genero: [''],
      address: [''],
      phone: ['', Validators.pattern('^[0-9]+$')],
      especiality: [''],
      image: [''],
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.angForm.get('image').setValue(file);
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
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
      const formData = new FormData();
      formData.append('file', this.angForm.get('image').value);
      this.medicService.create(this.angForm.value).subscribe(res => {
        console.log('Medico añadido exitosamente!');
        console.log(this.angForm);
        this.router.navigate(['medics']);
      }, (error) => {
        this.error = error;
        console.log(error);
        console.log(this.angForm);

      });
    }
  }
}
