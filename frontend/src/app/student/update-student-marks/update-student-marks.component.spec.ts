import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentMarksComponent } from './update-student-marks.component';

describe('UpdateStudentMarksComponent', () => {
  let component: UpdateStudentMarksComponent;
  let fixture: ComponentFixture<UpdateStudentMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStudentMarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStudentMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
