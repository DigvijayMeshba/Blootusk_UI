import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageeditComponent } from './messageedit.component';

describe('MessageeditComponent', () => {
  let component: MessageeditComponent;
  let fixture: ComponentFixture<MessageeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
