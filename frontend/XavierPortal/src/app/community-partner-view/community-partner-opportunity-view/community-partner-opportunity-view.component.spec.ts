import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPartnerOpportunityViewComponent } from './community-partner-opportunity-view.component';

describe('CommunityPartnerOpportunityViewComponent', () => {
  let component: CommunityPartnerOpportunityViewComponent;
  let fixture: ComponentFixture<CommunityPartnerOpportunityViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityPartnerOpportunityViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityPartnerOpportunityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
