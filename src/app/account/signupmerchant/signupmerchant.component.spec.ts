import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupmerchantComponent } from './signupmerchant.component';

describe('SignupmerchantComponent', () => {
  let component: SignupmerchantComponent;
  let fixture: ComponentFixture<SignupmerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupmerchantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupmerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
