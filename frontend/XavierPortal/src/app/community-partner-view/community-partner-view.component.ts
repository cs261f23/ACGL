import { Component, Input, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Opportunity } from '../models/opportunity';
import { Student } from '../models/student';
import { AuthService } from '../auth.service';
import { CommunityPartnerOpportunityCreationFormComponent } from './community-partner-opportunity-creation-form/community-partner-opportunity-creation-form.component';
@Component({
  selector: 'app-community-partner-view',
  templateUrl: './community-partner-view.component.html',
  styleUrls: ['./community-partner-view.component.css', '../app.component.css']
})
export class CommunityPartnerViewComponent implements OnInit {
  form?: CommunityPartnerOpportunityCreationFormComponent

  myOpportunities: Array<Opportunity> = [];
  section: string = "";
  constructor(private apiCallService: ApiCallService, private router: Router, private authService: AuthService, private route: ActivatedRoute) {

  }

  getStudentsByOpportunity(id: number) {
    this.apiCallService.getStudentsByOpportunity(id).subscribe((response: any) => {
      let studentList: Array<Student> = response;
    })
  }

  ngOnInit() {
    (this.authService.partnerID == -1)
      ? this.router.navigate(['/'], { relativeTo: this.route })
      : this.getOpportunitiesByPartnerID()
  }
  getOpportunitiesByPartnerID() {
    this.apiCallService.getOpportunitiesByPartnerID(this.authService.partnerID!).subscribe((response: any) => {
      this.myOpportunities = response;
    })

  }


}
