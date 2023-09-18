import { Component, Input, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Opportunity } from '../models/opportunity';
import { Student } from '../models/student';

@Component({
  selector: 'app-community-partner-view',
  templateUrl: './community-partner-view.component.html',
  styleUrls: ['./community-partner-view.component.css']
})
export class CommunityPartnerViewComponent implements OnInit {

  partnerID: number = 0;
  myOpportunities: Array<Opportunity> = [];
  constructor(private apiCallService: ApiCallService, private router: Router) {
  }

  getStudentsByOpportunity(id: number) {
    this.apiCallService.getStudentsByOpportunity(id).subscribe((response: any) => {
      let studentList: Array<Student> = response;
    })
  }

  ngOnInit() {
    this.apiCallService.getOpportunitiesByPartnerID(this.partnerID).subscribe((response: any) => {
      this.myOpportunities = response;
    })



  }


}
