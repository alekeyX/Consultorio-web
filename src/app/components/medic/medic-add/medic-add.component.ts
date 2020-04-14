import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicService } from '../../services/medic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medic-add',
  templateUrl: './medic-add.component.html',
  styleUrls: ['./medic-add.component.css']
})
export class MedicAddComponent implements OnInit {
  angForm: FormGroup;

  ngOnInit(): void {}

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public medicService: MedicService) {
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
