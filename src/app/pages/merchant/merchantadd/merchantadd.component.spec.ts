import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantaddComponent } from './merchantadd.component';

describe('MerchantaddComponent', () => {
  let component: MerchantaddComponent;
  let fixture: ComponentFixture<MerchantaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
