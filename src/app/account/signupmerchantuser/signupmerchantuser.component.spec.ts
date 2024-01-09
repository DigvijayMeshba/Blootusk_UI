import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupmerchantuserComponent } from './signupmerchantuser.component';

describe('SignupmerchantuserComponent', () => {
  let component: SignupmerchantuserComponent;
  let fixture: ComponentFixture<SignupmerchantuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupmerchantuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupmerchantuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
