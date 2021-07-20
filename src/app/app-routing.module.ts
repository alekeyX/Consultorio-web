import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NosotrosComponent } from './components/shared/nosotros/nosotros.component';
import { ServiciosComponent } from './components/shared/servicios/servicios.component';
import { ContactoComponent } from './components/shared/contacto/contacto.component';
import { BreadcrumbService } from 'xng-breadcrumb';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' }},
  { path: 'nosotros', component: NosotrosComponent, data: { breadcrumb: 'Nosotros' } },
  { path: 'servicios', component: ServiciosComponent, data: { breadcrumb: 'Servicios' } },
  { path: 'contacto', component: ContactoComponent, data: { breadcrumb: 'Contacto' } },

  {
    path: 'medic',
    loadChildren: () => import('./components/medic/medic.module').then(m => m.MedicModule), data: { breadcrumb: 'Médicos' }
  },
  {
    path: 'patient',
    loadChildren: () => import('./components/patient/patient.module').then(m => m.PatientModule), data: { breadcrumb: 'Pacientes' }
  },
  {
    path: 'history',
    loadChildren: () => import('./components/history/history.module').then(m => m.HistoryModule), data: { breadcrumb: {disable: true, label: 'Pacientes'} }
  },
  {
    path: 'reservation',
    loadChildren: () => import('./components/reservation/reservation.module').then(m => m.ReservationModule), data: { breadcrumb: 'Reservaciones' }
  },
  {
    path: 'chat',
    loadChildren: () => import('./components/chat/chat.module').then(m => m.ChatModule), data: { breadcrumb: 'Chat' }
  },
  { path: '**', pathMatch: 'full', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingModule = RouterModule.forRoot(routes);
