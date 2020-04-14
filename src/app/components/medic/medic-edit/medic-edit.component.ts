import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicService } from '../../services/medic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Medic } from '../../models/medic';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-medic-edit',
  templateUrl: './medic-edit.component.html',
  styleUrls: ['./medic-edit.component.css']
})
export class MedicEditComponent implements OnInit {
  angForm: FormGroup;
  medic: Medic;
  medicData: Medic[];
  currentUser: Medic;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public medicService: MedicService,
    private authenticationService: AuthenticationService
    ) {
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.updateMedic();
    const id = this.route.snapshot.paramMap.get('id');
    this.getMedic(id);
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      role: ['Medic'],
      email: ['', Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],
      genero: [''],
      address: [''],
      phone: ['', Validators.pattern('^[0-9]+$')],
      especiality: [''],
      image: [''],
    });
  }

  getMedic(id) {
    this.medicService.getById(id).subscribe(data => {
      this.angForm.setValue({
        username: data.username,
        password: data.password,
        firtsName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        email: data.email,
        genero: data.genero,
        address: data.address,
        phone: data.phone,
        especiality: data.especiality,
        image: data.image,
      });
    });
  }

  updateMedic() {
    this.angForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      role: ['Medic'],
      email: ['', Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],
      genero: [''],
      address: [''],
      phone: ['', Validators.pattern('^[0-9]+$')],
      especiality: [''],
      image: [''],
    });
  }

  submitForm() {
    if (!this.angForm.valid) {
      return false;
    } else {
      if (window.confirm('Esta seguro?')) {
        const id = this.route.snapshot.paramMap.get('id');
        this.medicService.update(id, this.angForm.value)
          .subscribe(res => {
            this.router.navigate(['/medics']);
            console.log('Contenido actualizado exitosamente!')
          }, (error) => {
            console.log(error);
          });
      }
    }
  }

}
