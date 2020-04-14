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
  }

  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      role: ['Medic'],
      email: ['', Validators.required],
      genero: [''],
      address: [''],
      phone: [''],
      especiality: [''],
      image: [''],
    });
  }

  submitForm() {
    this.medicService.create(this.angForm.value).subscribe(res => {
      console.log('Medico añadido exitosamente!');
      this.router.navigate(['medics']);
    }, (error) => {
      console.log(error);
    });
  }

}
