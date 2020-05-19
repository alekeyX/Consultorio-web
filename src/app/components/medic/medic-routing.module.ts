import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicAddComponent } from './medic-add/medic-add.component';
import { MedicEditComponent } from './medic-edit/medic-edit.component';
import { MedicGetComponent } from './medic-get/medic-get.component';
import { LoginMedicComponent } from './login-medic/login-medic.component';
import { MedicProfileComponent } from './medic-profile/medic-profile.component';


const routes: Routes = [
  { path: 'create', component: MedicAddComponent },
  { path: 'update/:id', component: MedicEditComponent },
  { path: '', component: MedicGetComponent },
  { path: 'signin', component: LoginMedicComponent },
  { path: ':id', component: MedicProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicRoutingModule { }
