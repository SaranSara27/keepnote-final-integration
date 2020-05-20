import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReminderComponent } from './update-reminder.component';

describe('UpdateReminderComponent', () => {
  let component: UpdateReminderComponent;
  let fixture: ComponentFixture<UpdateReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
