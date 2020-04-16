import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './components/helpers/auth.guard';
import { Role } from './components/models/role';

// componentes CRUD
import { MedicGetComponent } from './components/medic/medic-get/medic-get.component';
import { MedicAddComponent } from './components/medic/medic-add/medic-add.component';
import { MedicEditComponent } from './components/medic/medic-edit/medic-edit.component';
import { PatientGetComponent } from './components/patient/patient-get/patient-get.component';
import { PatientAddComponent } from './components/patient/patient-add/patient-add.component';
import { PatientEditComponent } from './components/patient/patient-edit/patient-edit.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'login', component: LoginComponent },
  { path: 'medics', component: MedicGetComponent },
  { path: 'medic/create', component: MedicAddComponent },
  // { path: 'medic/:id', component: MedicAddComponent },
  { path: 'medic/update/:id', component: MedicEditComponent },
  { path: 'patients', component: PatientGetComponent },
  { path: 'patient/create', component: PatientAddComponent },
  { path: 'patient/edit/:id', component: PatientEditComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingModule = RouterModule.forRoot(routes);
