import { Component } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Opportunity } from '../models/opportunity';
import { Student } from '../models/student';

@Component({
  selector: 'app-community-member-view',
  templateUrl: './community-member-view.component.html',
  styleUrls: ['./community-member-view.component.css']
})
export class CommunityMemberViewComponent {

  selectedOpportunity?: Opportunity;
  selectedOpportunityID: number = 1; //for example
  constructor(private apiCallService: ApiCallService, private router: Router) {
  }

  getStudentsByOpportunity() {
    this.apiCallService.getStudentsByOpportunity(this.selectedOpportunityID).subscribe((response: any) => {
      let studentList: Array<Student> = response;
      this.selectedOpportunity = {
        students: studentList
      };
    })


  }


}
