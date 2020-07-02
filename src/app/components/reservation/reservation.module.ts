import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';
import { ReservationGetComponent } from './reservation-get/reservation-get.component';
import { ReservationChooseComponent } from './reservation-choose/reservation-choose.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { ReservationEditComponent } from './reservation-edit/reservation-edit.component';
import { FilterReservationPipe } from 'src/app/pipes/filter-reservation.pipe';
import { FilterReservationByMedicPipe } from 'src/app/pipes/filter-reservation-by-medic.pipe';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ReservationAddComponent,
    ReservationGetComponent,
    ReservationChooseComponent,
    ReservationDetailComponent,
    ReservationEditComponent,
    FilterReservationPipe,
    FilterReservationByMedicPipe,
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ]
})
export class ReservationModule { }
