import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { PatientGetComponent } from './patient-get/patient-get.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';


const routes: Routes = [
  { path: 'create', component: PatientAddComponent },
  { path: 'update/:id', component: PatientEditComponent },
  { path: '', component: PatientGetComponent },
  { path: 'signin', component: PatientLoginComponent },
  { path: ':id', component: PatientProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
