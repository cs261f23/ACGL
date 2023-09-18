import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPartnerOpportunityCreationFormComponent } from './community-partner-opportunity-creation-form.component';

describe('CommunityPartnerOpportunityCreationFormComponent', () => {
  let component: CommunityPartnerOpportunityCreationFormComponent;
  let fixture: ComponentFixture<CommunityPartnerOpportunityCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityPartnerOpportunityCreationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityPartnerOpportunityCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
