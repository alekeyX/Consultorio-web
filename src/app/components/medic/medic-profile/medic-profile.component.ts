import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MedicService } from '../../services/medic.service';
import { Medic } from '../../models/medic';
import { Role } from '../../models/role';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-medic-profile',
  templateUrl: './medic-profile.component.html',
  styleUrls: ['./medic-profile.component.css']
})
export class MedicProfileComponent implements OnInit {

  currentUser: Medic;
  medic: Medic;
  loading = false;
  avatar = true;

  constructor(
      private medicService: MedicService,
      private authenticationService: AuthenticationService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private toastr: ToastrService
  ) {  }

  ngOnInit(): void {
      this.currentUser = this.authenticationService.currentUserValue;
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.loading = true;
      // Obtener el id por la direccion url
      this.activatedRoute.params.subscribe(params => {
        this.getMedic(params.id);
      });
  }

  // Obtener un medico por id
  getMedic(id: string) {
    this.medicService.getById(id)
    .subscribe(
      res => {
        this.medic = res;
        if ( this.medic.imagePath === 'none') {
          this.avatar = false;
        }
      },
      err => console.log(err)
    );
  }

  // Eliminar el registro del medico
  deleteMedic(id: string) {
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
      this.medicService.delete(id)
        .subscribe(res => {
          this.toastr.success(res.message, res.data.firstName + ' ' + res.data.lastName)
          this.router.navigate(['/medic']);
        });
      }
    });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isReception() {
    return this.currentUser && this.currentUser.role === Role.Reception;
  }
}
