import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMedicComponent } from './login-medic.component';

describe('LoginMedicComponent', () => {
  let component: LoginMedicComponent;
  let fixture: ComponentFixture<LoginMedicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginMedicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
