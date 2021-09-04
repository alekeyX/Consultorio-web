import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryAddComponent } from './history-add/history-add.component';
import { HistoryGetComponent } from './history-get/history-get.component';
import { HistoryEditComponent } from './history-edit/history-edit.component';
import { HistoryDetailsComponent } from './history-details/history-details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HistoryAddComponent,
    HistoryGetComponent,
    HistoryEditComponent,
    HistoryDetailsComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class HistoryModule { }
