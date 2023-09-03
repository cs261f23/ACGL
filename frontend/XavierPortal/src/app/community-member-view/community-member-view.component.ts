import { Component } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-community-member-view',
  templateUrl: './community-member-view.component.html',
  styleUrls: ['./community-member-view.component.css']
})
export class CommunityMemberViewComponent {

  response: any = '';
  selectedOpportunityID: number = 1;
  constructor(private apiCallService: ApiCallService, private router: Router) {
  }

  getStudentsByOpportunity() {
    this.apiCallService.getStudentsByOpportunity(this.selectedOpportunityID).subscribe((response: any) => {
      this.response = response;
    })
    console.log(this.response)
  }


}
