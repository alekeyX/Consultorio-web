import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicService } from '../../services/medic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Medic } from '../../models/medic';

@Component({
  selector: 'app-medic-edit',
  templateUrl: './medic-edit.component.html',
  styleUrls: ['./medic-edit.component.css']
})
export class MedicEditComponent implements OnInit {
  submitted = false;
  angForm: FormGroup;
  medic: Medic;
  medicData: Medic[];
  currentUser: Medic;
  error: string;
  image: string;

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
    // console.log(id);
    this.getMedic(id);
    this.createForm();
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
      specialty: [''],
      imagePath: [''],
    });
  }

  getMedic(id) {
    this.medicService.getById(id).subscribe(data => {
      console.log(data);
      
      this.angForm.setValue({
        username: data.username,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        email: data.email,
        genero: data.genero,
        address: data.address,
        phone: data.phone,
        specialty: data.specialty,
        imagePath: data.imagePath,
      });
    });
  }

  updateMedic() {
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
      specialty: [''],
      imagePath: [''],
    });
  }

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
        formData.append('password', this.angForm.get('password').value);
        formData.append('firstName', this.angForm.get('firstName').value);
        formData.append('lastName', this.angForm.get('lastName').value);
        formData.append('role', this.angForm.get('role').value);
        formData.append('email', this.angForm.get('email').value);
        formData.append('genero', this.angForm.get('genero').value);
        formData.append('address', this.angForm.get('address').value);
        formData.append('phone', this.angForm.get('phone').value);
        formData.append('specialty', this.angForm.get('specialty').value);
        formData.append('imagePath', this.angForm.get('imagePath').value);

        const id = this.route.snapshot.paramMap.get('id');
        this.medicService.update(id, formData)
          .subscribe(res => {
            this.router.navigate(['/medic']);
            console.log('Contenido actualizado exitosamente!')
          }, (error) => {
            console.log(error);
          });
      }
    }
  }

}
