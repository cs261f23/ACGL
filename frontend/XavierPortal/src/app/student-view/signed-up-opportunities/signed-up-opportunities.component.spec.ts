import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedUpOpportunitiesComponent } from './signed-up-opportunities.component';

describe('SignedUpOpportunitiesComponent', () => {
  let component: SignedUpOpportunitiesComponent;
  let fixture: ComponentFixture<SignedUpOpportunitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignedUpOpportunitiesComponent]
    });
    fixture = TestBed.createComponent(SignedUpOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
