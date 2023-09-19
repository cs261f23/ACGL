import { Component } from '@angular/core';
import { ApiCallService } from 'src/app/api-call.service';
import { CommunityPartnerOpportunityCreationFormComponent } from '../community-partner-opportunity-creation-form/community-partner-opportunity-creation-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community-partner-opportunity-creation-view',
  templateUrl: './community-partner-opportunity-creation-view.component.html',
  styleUrls: ['./community-partner-opportunity-creation-view.component.css']
})
export class CommunityPartnerOpportunityCreationViewComponent {

  form?: CommunityPartnerOpportunityCreationFormComponent

  constructor(private apiCallService: ApiCallService, private router: Router) {
  }
}
