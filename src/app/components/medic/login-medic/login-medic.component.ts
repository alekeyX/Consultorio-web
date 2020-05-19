import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login-medic',
  templateUrl: './login-medic.component.html',
  styleUrls: ['./login-medic.component.css']
})
export class LoginMedicComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirigir a home si ya inició sesión
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // Obtener URL de retorno de los parámetros de ruta o por defecto a '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // Obtención de conveniencia para un fácil acceso a los campos de formulario
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

  // para aquí si el formulario no es válido
    if (this.loginForm.invalid) {
    return;
  }

    this.loading = true;
    this.authenticationService.loginMedic(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error.error.message;
                this.loading = false;
            });
  }

}
