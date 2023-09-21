import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardeditComponent } from './rewardedit.component';

describe('RewardeditComponent', () => {
  let component: RewardeditComponent;
  let fixture: ComponentFixture<RewardeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
