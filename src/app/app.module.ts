import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// used to create fake backend
import { fakeBackendProvider } from './components/helpers/fake-backend';

// Componentes de pagina
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/shared/menu/menu.component';
//  Interceptores
import { JwtInterceptor } from './components/helpers/jwt.interceptor';
import { ErrorInterceptor } from './components/helpers/error.interceptor';
// Componentes de usuarios
import { AdminComponent } from './components/admin/admin.component';
import { MedicAddComponent } from './components/medic/medic-add/medic-add.component';
import { MedicGetComponent } from './components/medic/medic-get/medic-get.component';
import { MedicEditComponent } from './components/medic/medic-edit/medic-edit.component';
import { PatientAddComponent } from './components/patient/patient-add/patient-add.component';
import { PatientGetComponent } from './components/patient/patient-get/patient-get.component';
import { PatientEditComponent } from './components/patient/patient-edit/patient-edit.component';
// Servicios
import { MedicService } from './components/services/medic.service';
import { PatientService } from './components/services/patient.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AdminComponent,
    MenuComponent,
    MedicAddComponent,
    MedicGetComponent,
    MedicEditComponent,
    PatientAddComponent,
    PatientGetComponent,
    PatientEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    MedicService,
    PatientService,
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
