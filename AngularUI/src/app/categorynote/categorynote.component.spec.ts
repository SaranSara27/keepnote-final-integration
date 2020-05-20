import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorynoteComponent } from './categorynote.component';

describe('CategorynoteComponent', () => {
  let component: CategorynoteComponent;
  let fixture: ComponentFixture<CategorynoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorynoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorynoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
