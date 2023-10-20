import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUserRegisterComponent } from './student-user-register.component';

describe('StudentUserRegisterComponent', () => {
  let component: StudentUserRegisterComponent;
  let fixture: ComponentFixture<StudentUserRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentUserRegisterComponent]
    });
    fixture = TestBed.createComponent(StudentUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
