import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesscategorylistComponent } from './businesscategorylist.component';

describe('BusinesscategorylistComponent', () => {
  let component: BusinesscategorylistComponent;
  let fixture: ComponentFixture<BusinesscategorylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinesscategorylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinesscategorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
