import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageaddComponent } from './messageadd.component';

describe('MessageaddComponent', () => {
  let component: MessageaddComponent;
  let fixture: ComponentFixture<MessageaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
