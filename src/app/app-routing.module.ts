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
import { MedicProfileComponent } from './components/medic/medic-profile/medic-profile.component';
import { LoginMedicComponent } from './components/medic/login-medic/login-medic.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'login', component: LoginComponent },
  { path: 'medic/login', component: LoginMedicComponent },
  { path: 'medic', component: MedicGetComponent, canActivate: [AuthGuard]},
  { path: 'medic/create', component: MedicAddComponent, canActivate: [AuthGuard]},
  { path: 'medic/:id', component: MedicProfileComponent, canActivate: [AuthGuard]},
  // { path: 'medic/:id', component: MedicAddComponent },
  { path: 'medic/update/:id', component: MedicEditComponent, canActivate: [AuthGuard]},


  {
    path: 'medic',
    loadChildren: () => import('./components/medic/medic.module').then(m => m.MedicModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('./components/patient/patient.module').then(m => m.PatientModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingModule = RouterModule.forRoot(routes);
