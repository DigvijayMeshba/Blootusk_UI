import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerstatementComponent } from './customerstatement.component';

describe('CustomerstatementComponent', () => {
  let component: CustomerstatementComponent;
  let fixture: ComponentFixture<CustomerstatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerstatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
