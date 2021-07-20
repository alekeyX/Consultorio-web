import { Component, OnInit } from '@angular/core';
import { Medic } from '../../models/medic';
import { MedicService } from '../../services/medic.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Role } from '../../models/role';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medic-get',
  templateUrl: './medic-get.component.html',
  styleUrls: ['./medic-get.component.css']
})
export class MedicGetComponent implements OnInit {

  currentUser: Medic;
  medics: Medic[] = [];
  loading = false;
  filterMedic = '';
  order: string = '';
  asc: boolean = false;

  constructor(
      private medicService: MedicService,
      private router: Router,
      private authenticationService: AuthenticationService,
      private toastr: ToastrService
    ) {
      this.getMedics();
  }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  // Obtener todos los medicos y guardarlos en el arreglo medics
  getMedics() {
    setInterval(() => {this.loading = true; }, 100);
    this.medicService.getAll().subscribe((data) => {
      this.medics = data;
    });
  }

  // Eliminar el registro de un medico
  removeMedic(medic, index) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "Los datos se eliminarán permanentemente",
      icon: 'warning',
      iconColor: '#15B9C6',
      showCancelButton: true,
      confirmButtonColor: '#15B9C6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      backdrop: '#0F7F875a'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicService.delete(medic._id).subscribe((res) => {
          this.toastr.success(res.message, res.data.firstName + ' ' + res.data.lastName)
          this.medics.splice(index, 1);
        });
      }
    })
  }

  // Navegar al perfil de un médico
  selectedMedic(id: string) {
    this.router.navigate(['/medic/', id]);
  }

  // Ordenar de forma ascendente o descendente
  orderBy(order: string) {
    this.asc = !this.asc;
    this.order = order;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
}
