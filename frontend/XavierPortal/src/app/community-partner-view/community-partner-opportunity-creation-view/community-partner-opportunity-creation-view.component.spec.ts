import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPartnerOpportunityCreationViewComponent } from './community-partner-opportunity-creation-view.component';

describe('CommunityPartnerOpportunityCreationViewComponent', () => {
  let component: CommunityPartnerOpportunityCreationViewComponent;
  let fixture: ComponentFixture<CommunityPartnerOpportunityCreationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityPartnerOpportunityCreationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityPartnerOpportunityCreationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
