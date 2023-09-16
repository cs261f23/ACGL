import { Component } from '@angular/core';
import { ApiCallService } from 'src/app/api-call.service';
import { Opportunity } from 'src/app/models/opportunity';

@Component({
  selector: 'app-community-partner-opportunity-creation-form',
  templateUrl: './community-partner-opportunity-creation-form.component.html',
  styleUrls: ['./community-partner-opportunity-creation-form.component.css']
})
export class CommunityPartnerOpportunityCreationFormComponent {
  info: Opportunity = {
    communityPartnerTitle: '',
    description: '',
    keywords: '',

  }
  submitted: boolean = false;

  constructor(private apiCallService: ApiCallService) {

  }
  onSubmit() {
    this.apiCallService.createOpportunity(this.info).subscribe((response) => {
      console.log(response)
    })
  }


}
