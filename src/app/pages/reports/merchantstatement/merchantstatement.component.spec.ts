import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantstatementComponent } from './merchantstatement.component';

describe('MerchantstatementComponent', () => {
  let component: MerchantstatementComponent;
  let fixture: ComponentFixture<MerchantstatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantstatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
