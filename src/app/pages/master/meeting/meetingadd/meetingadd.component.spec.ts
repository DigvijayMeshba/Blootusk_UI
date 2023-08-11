import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingaddComponent } from './meetingadd.component';

describe('MeetingaddComponent', () => {
  let component: MeetingaddComponent;
  let fixture: ComponentFixture<MeetingaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
