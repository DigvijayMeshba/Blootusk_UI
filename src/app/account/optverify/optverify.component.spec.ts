import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptverifyComponent } from './optverify.component';

describe('OptverifyComponent', () => {
  let component: OptverifyComponent;
  let fixture: ComponentFixture<OptverifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptverifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
