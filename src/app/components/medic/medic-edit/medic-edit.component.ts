import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicService } from '../../services/medic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Medic } from '../../models/medic';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Role } from '../../models/role';

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
  deleteImage: boolean = false;
  specialties: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public medicService: MedicService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
    ) {
      this.specialties = ['Medicina General', 'Pediatría', 'Ginecología', 'Cirugía', 'Psiquiatría', 'Cardiología', 'Dermatología', 'Endocrinología', 'Gastroenterología', 'Infectología', 'Oftalmología', 'Neumología', 'Oncología', 'Patología', 'Urología', 'Medicina Intensiva'];
      this.specialties.sort();
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
      switch (data.role) {
        case 'Admin':
          rol = 'Administrador';
          break;
        case 'Medic':
          rol = 'Médico';
          break;
        case 'Reception':
          rol = 'Recepcionista';
          break;
      }
      if(data.imagePath !== 'none') {
        this.image = data.imagePath;
      } else {
        this.image = 'none'
      }
      
      this.angForm = this.fb.group({
        username: [data.username, Validators.required],
        firstName: [ data.firstName, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
        lastName: [ data.lastName, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
        role: [ rol ],
        email: [ data.email, Validators.required ],
        genero: [ data.genero ],
        address: [ data.address ],
        phone: [ data.phone, Validators.pattern('^[0-9]+$') ],
        specialty: [ data.specialty ],
        imagePath: [ data.imagePath ],
        withoutImage: ['']
      });
    });
  }

  // Creacion del formulario angForm
  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      role: [''],
      email: ['', Validators.required],
      genero: [''],
      address: [''],
      phone: ['', Validators.pattern('^[0-9]+$')],
      specialty: [''],
      imagePath: [''],
      withoutImage: ['']
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
        formData.append('withoutImage', this.angForm.get('withoutImage').value);
        
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
            this.toastr.success(res.message, res.data.firstName + ' ' + res.data.lastName)
          }, (error) => {
            this.toastr.error('Intente nuevamente', error);
          });
        }
      }
    });
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

  get isMedic() {
    return this.currentUser && this.currentUser.role === Role.Medic;
  }
}
