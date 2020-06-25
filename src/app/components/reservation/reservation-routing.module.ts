import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';
import { ReservationChooseComponent } from './reservation-choose/reservation-choose.component';
import { ReservationGetComponent } from './reservation-get/reservation-get.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { ReservationEditComponent } from './reservation-edit/reservation-edit.component';


const routes: Routes = [
  { path: 'create', component: ReservationAddComponent },
  { path: 'choose', component: ReservationChooseComponent },
  { path: 'edit/:id', component: ReservationEditComponent},
  { path: ':id', component: ReservationDetailComponent },
  { path: '', component: ReservationGetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
