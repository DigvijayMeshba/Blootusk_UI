import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefferalLinkComponent } from './refferal-link.component';

describe('RefferalLinkComponent', () => {
  let component: RefferalLinkComponent;
  let fixture: ComponentFixture<RefferalLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefferalLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefferalLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
