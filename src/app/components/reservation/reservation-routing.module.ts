import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../helpers/auth.guard';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';
import { ReservationChooseComponent } from './reservation-choose/reservation-choose.component';
import { ReservationGetComponent } from './reservation-get/reservation-get.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { ReservationEditComponent } from './reservation-edit/reservation-edit.component';


const routes: Routes = [
  { path: 'create', component: ReservationAddComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Añadir' }  },
  { path: 'choose', component: ReservationChooseComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Elegir Reserva' }  },
  { path: 'edit/:id', component: ReservationEditComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Editar' } },
  { path: ':id', component: ReservationDetailComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Detalles' }  },
  { path: '', component: ReservationGetComponent, canActivate: [AuthGuard], data: { breadcrumb: '' }  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
