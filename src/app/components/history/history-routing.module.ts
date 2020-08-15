import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryAddComponent } from './history-add/history-add.component';
import { HistoryEditComponent } from './history-edit/history-edit.component';
import { HistoryGetComponent } from './history-get/history-get.component';
import { HistoryDetailsComponent } from './history-details/history-details.component';
import { AuthGuard } from '../helpers/auth.guard';
import { Role } from '../models/role';


const routes: Routes = [
  { path: 'create/:id', component: HistoryAddComponent,  canActivate: [AuthGuard] },
  { path: 'update/:id', component: HistoryEditComponent, canActivate: [AuthGuard] },
  { path: ':id', component: HistoryGetComponent, canActivate: [AuthGuard] },
  { path: '', component: HistoryGetComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: HistoryDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
