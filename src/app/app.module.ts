import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Modulos
import { PatientModule } from './components/patient/patient.module';
import { MedicModule } from './components/medic/medic.module';
import { HistoryModule } from './components/history/history.module';
import { ReservationModule } from './components/reservation/reservation.module';
import { SharedModule } from './components/shared/shared.module';

// Componentes de pagina
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { NosotrosComponent } from './components/shared/nosotros/nosotros.component';
import { ServiciosComponent } from './components/shared/servicios/servicios.component';
import { ContactoComponent } from './components/shared/contacto/contacto.component';
import { AdminComponent } from './components/admin/admin.component';
//  Interceptores
import { JwtInterceptor } from './components/helpers/jwt.interceptor';
import { ErrorInterceptor } from './components/helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AdminComponent,
    MenuComponent,
    NosotrosComponent,
    ServiciosComponent,
    ContactoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MedicModule,
    PatientModule,
    HistoryModule,
    ReservationModule,
    SharedModule
  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
