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
  generos: string[] = ['Masculino', 'Femenino', 'Otro'];
  roles: string[] = ['Médico', 'Administrador', 'Recepción'];

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
    const id = this.route.snapshot.paramMap.get('id');
    this.getMedic(id);
    this.createForm();
  }
  
  // Obtener los datos del médico y ponerlos en el angForm
  getMedic(id: string) {
    this.medicService.getById(id).subscribe(data => {
      let rol: string;
      if (data.role === 'Admin') {
        rol = 'Administrador';
      } else {
        rol = 'Médico';
      }
      this.angForm = this.fb.group({
        username: [data.username, Validators.required],
        firstName: [ data.firstName, Validators.required ],
        lastName: [ data.lastName, Validators.required ],
        role: [ rol ],
        email: [ data.email, Validators.required ],
        genero: [ data.genero ],
        address: [ data.address ],
        phone: [ data.phone, Validators.pattern('^[0-9]+$') ],
        specialty: [ data.specialty ],
        imagePath: [ data.imagePath ],
      });
    });
  }

  // Creacion del formulario angForm
  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: [''],
      email: ['', Validators.required],
      genero: [''],
      address: [''],
      phone: ['', Validators.pattern('^[0-9]+$')],
      specialty: [''],
      imagePath: [''],
    });
  }

  // Cargar archivo de imagen
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
      if (window.confirm('Esta seguro?')) {
        // Creacion de formData con los valores de angForm
        const formData: any = new FormData();
        formData.append('username', this.angForm.get('username').value);
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
        // envio de id y formData al servicio para actualizar el registro
        const id = this.route.snapshot.paramMap.get('id');
        this.medicService.update(id, formData)
          .subscribe(res => {
            this.router.navigate(['/medic']);
          }, (error) => {
            console.log(error);
          });
      }
    }
  }
}
