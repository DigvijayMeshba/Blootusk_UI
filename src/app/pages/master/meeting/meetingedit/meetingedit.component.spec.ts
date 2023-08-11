import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingeditComponent } from './meetingedit.component';

describe('MeetingeditComponent', () => {
  let component: MeetingeditComponent;
  let fixture: ComponentFixture<MeetingeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
