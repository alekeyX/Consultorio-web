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
      email: ['', Validators.required],
      genero: [''],
      address: [''],
      phone: ['', Validators.pattern('^[0-9]+$')],
      especiality: [''],
      image: [''],
    });
  }

  submitForm() {
    this.submitted = true;
    if (!this.angForm.valid) {
      return false;
    } else {
      this.medicService.create(this.angForm.value).subscribe(res => {
        console.log('Medico añadido exitosamente!');
        this.router.navigate(['medics']);
      }, (error) => {
        console.log(error);
      });
    }
  }
}
