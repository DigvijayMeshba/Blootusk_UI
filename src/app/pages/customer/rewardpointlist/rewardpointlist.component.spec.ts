import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardpointlistComponent } from './rewardpointlist.component';

describe('RewardpointlistComponent', () => {
  let component: RewardpointlistComponent;
  let fixture: ComponentFixture<RewardpointlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardpointlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardpointlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
