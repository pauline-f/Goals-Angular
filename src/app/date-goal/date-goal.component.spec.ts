import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateGoalComponent } from './date-goal.component';

describe('DateGoalComponent', () => {
  let component: DateGoalComponent;
  let fixture: ComponentFixture<DateGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
