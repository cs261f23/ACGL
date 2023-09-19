import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOpportunityViewComponent } from './student-opportunity-view.component';

describe('StudentOpportunityViewComponent', () => {
  let component: StudentOpportunityViewComponent;
  let fixture: ComponentFixture<StudentOpportunityViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentOpportunityViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentOpportunityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
