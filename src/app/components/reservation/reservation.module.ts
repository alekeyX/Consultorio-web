import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';
import { ReservationGetComponent } from './reservation-get/reservation-get.component';
import { ReservationChooseComponent } from './reservation-choose/reservation-choose.component';


@NgModule({
  declarations: [
    ReservationAddComponent,
    ReservationGetComponent,
    ReservationChooseComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ReservationModule { }
