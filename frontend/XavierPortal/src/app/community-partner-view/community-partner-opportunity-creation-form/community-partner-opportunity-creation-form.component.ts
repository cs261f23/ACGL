import { Component, EventEmitter, Output } from '@angular/core';
import { ApiCallService } from 'src/app/api-call.service';
import { AuthService } from 'src/app/auth.service';
import { Opportunity } from 'src/app/models/opportunity';

@Component({
  selector: 'app-community-partner-opportunity-creation-form',
  templateUrl: './community-partner-opportunity-creation-form.component.html',
  styleUrls: ['./community-partner-opportunity-creation-form.component.css']
})
export class CommunityPartnerOpportunityCreationFormComponent {
  info: any = {
    description: '',
    keywords: '',
    id: this.authService.partnerID

  }
  @Output() updateMyOpportunities = new EventEmitter<boolean>();
  submitted: boolean = false;

  constructor(private apiCallService: ApiCallService, private authService: AuthService) {

  }
  onSubmit() {
    this.apiCallService.createOpportunity(this.info).subscribe((response) => {
      this.updateMyOpportunities.emit();
    })
  }


}
