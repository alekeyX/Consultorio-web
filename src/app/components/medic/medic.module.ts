import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MedicRoutingModule } from './medic-routing.module';

//  Interceptores
import { JwtInterceptor } from '../helpers/jwt.interceptor';
import { ErrorInterceptor } from '../helpers/error.interceptor';

// Componentes
import { MedicService } from '../services/medic.service';
import { MedicEditComponent } from './medic-edit/medic-edit.component';
import { MedicAddComponent } from './medic-add/medic-add.component';
import { MedicGetComponent } from './medic-get/medic-get.component';
import { MedicProfileComponent } from './medic-profile/medic-profile.component';
import { LoginMedicComponent } from './login-medic/login-medic.component';


@NgModule({
  declarations: [
    MedicAddComponent,
    MedicEditComponent,
    MedicGetComponent,
    MedicProfileComponent,
    LoginMedicComponent
  ],
  imports: [
    CommonModule,
    MedicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    MedicService
  ],
})
export class MedicModule { }
