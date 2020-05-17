import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PatientRoutingModule } from './patient-routing.module';

//  Interceptores
import { JwtInterceptor } from '../helpers/jwt.interceptor';
import { ErrorInterceptor } from '../helpers/error.interceptor';

// Componentes
import { PatientGetComponent } from './patient-get/patient-get.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { PatientService } from '../services/patient.service';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { PatientLoginComponent } from './patient-login/patient-login.component';


@NgModule({
  declarations: [
    PatientAddComponent,
    PatientGetComponent,
    PatientEditComponent,
    PatientProfileComponent,
    PatientLoginComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    PatientService
  ],
})
export class PatientModule { }
