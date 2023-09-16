import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { Opportunity } from '../models/opportunity';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  opportunities: Array<Opportunity> = [];

  constructor(private apiCallService: ApiCallService) {
  }

  ngOnInit(): void {
    this.apiCallService.getAvailableOpportunitiesForStudent().subscribe((response: any) => {
      this.opportunities = response;
    });
  }
}
