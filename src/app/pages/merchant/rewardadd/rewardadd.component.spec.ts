import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardaddComponent } from './rewardadd.component';

describe('RewardaddComponent', () => {
  let component: RewardaddComponent;
  let fixture: ComponentFixture<RewardaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
