import { Component } from '@angular/core';
import { ApiCallService } from 'src/app/api-call.service';
import { Opportunity } from 'src/app/models/opportunity';

@Component({
  selector: 'app-student-search-form',
  templateUrl: './student-search-form.component.html',
  styleUrls: ['./student-search-form.component.css']
})
export class StudentSearchFormComponent {


  searchString: string = "";

  opportunities: Array<Opportunity> = [];
  filteredOpportunities: Array<Opportunity> = [];

  constructor(private apiCallService: ApiCallService) {
  }

  ngOnInit(): void {
    this.apiCallService.getAvailableOpportunitiesForStudent().subscribe((response: any) => {
      this.opportunities = response;

    });
  }

  filter(): void {
    this.filteredOpportunities = this.opportunities.filter((x) => {
      return (x.keywords.includes(this.searchString) || x.description.includes(this.searchString))
    })
  }

}
