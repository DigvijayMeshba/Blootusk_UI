import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountcouponlistComponent } from './discountcouponlist.component';

describe('DiscountcouponlistComponent', () => {
  let component: DiscountcouponlistComponent;
  let fixture: ComponentFixture<DiscountcouponlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountcouponlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountcouponlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
