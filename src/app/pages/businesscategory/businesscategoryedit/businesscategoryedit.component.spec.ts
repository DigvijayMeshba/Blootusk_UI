import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesscategoryeditComponent } from './businesscategoryedit.component';

describe('BusinesscategoryeditComponent', () => {
  let component: BusinesscategoryeditComponent;
  let fixture: ComponentFixture<BusinesscategoryeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinesscategoryeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinesscategoryeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
