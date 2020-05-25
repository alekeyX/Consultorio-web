import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryAddComponent } from './history-add/history-add.component';
import { HistoryEditComponent } from './history-edit/history-edit.component';
import { HistoryGetComponent } from './history-get/history-get.component';
import { HistoryDetailsComponent } from './history-details/history-details.component';


const routes: Routes = [
  { path: 'create', component: HistoryAddComponent },
  { path: 'update/:id', component: HistoryEditComponent },
  { path: ':id', component: HistoryGetComponent },
  { path: '', component: HistoryGetComponent },
  { path: 'detail/:id', component: HistoryDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
