import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../components/helpers/auth.guard';
import { PatientAddMedicComponent } from './patient-add-medic/patient-add-medic.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { PatientGetComponent } from './patient-get/patient-get.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';


const routes: Routes = [
  { path: 'create', component: PatientAddComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Añadir' } },
  { path: 'signin', component: PatientLoginComponent, data: { breadcrumb: 'Iniciar Sesión' } },
  { path: 'update/:id', component: PatientEditComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Editar' } },
  { path: '', component: PatientGetComponent, canActivate: [AuthGuard], data: { breadcrumb: '' } },
  { path: 'find', component: PatientAddMedicComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Pacientes No Propios' } },
  { path: ':id', component: PatientProfileComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Perfil' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
