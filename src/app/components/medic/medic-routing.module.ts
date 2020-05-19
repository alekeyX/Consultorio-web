import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../components/helpers/auth.guard';
import { MedicAddComponent } from './medic-add/medic-add.component';
import { MedicEditComponent } from './medic-edit/medic-edit.component';
import { MedicGetComponent } from './medic-get/medic-get.component';
import { LoginMedicComponent } from './login-medic/login-medic.component';
import { MedicProfileComponent } from './medic-profile/medic-profile.component';


const routes: Routes = [
  { path: 'signin', component: LoginMedicComponent },
  { path: 'create', component: MedicAddComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: MedicEditComponent, canActivate: [AuthGuard] },
  { path: '', component: MedicGetComponent, canActivate: [AuthGuard] },
  { path: ':id', component: MedicProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicRoutingModule { }
