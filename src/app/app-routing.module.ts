import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './components/helpers/auth.guard';
import { Role } from './components/models/role';
import { NosotrosComponent } from './components/shared/nosotros/nosotros.component';
import { ServiciosComponent } from './components/shared/servicios/servicios.component';
import { ContactoComponent } from './components/shared/contacto/contacto.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'login', component: LoginComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'contacto', component: ContactoComponent },

  {
    path: 'medic',
    loadChildren: () => import('./components/medic/medic.module').then(m => m.MedicModule)
  },
  {
    path: 'patient',
    loadChildren: () => import('./components/patient/patient.module').then(m => m.PatientModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./components/history/history.module').then(m => m.HistoryModule)
  },
  {
    path: 'reservation',
    loadChildren: () => import('./components/reservation/reservation.module').then(m => m.ReservationModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./components/chat/chat.module').then(m => m.ChatModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingModule = RouterModule.forRoot(routes);
