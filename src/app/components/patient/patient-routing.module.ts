import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../components/helpers/auth.guard';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { PatientGetComponent } from './patient-get/patient-get.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';


const routes: Routes = [
  { path: 'signin', component: PatientLoginComponent },
  { path: 'create', component: PatientAddComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: PatientEditComponent, canActivate: [AuthGuard] },
  { path: '', component: PatientGetComponent, canActivate: [AuthGuard] },
  { path: ':id', component: PatientProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
