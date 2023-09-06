import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwalmessageComponent } from './swalmessage.component';

describe('SwalmessageComponent', () => {
  let component: SwalmessageComponent;
  let fixture: ComponentFixture<SwalmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwalmessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwalmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
