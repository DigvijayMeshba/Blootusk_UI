import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesscategoryaddComponent } from './businesscategoryadd.component';

describe('BusinesscategoryaddComponent', () => {
  let component: BusinesscategoryaddComponent;
  let fixture: ComponentFixture<BusinesscategoryaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinesscategoryaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinesscategoryaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
