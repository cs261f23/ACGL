import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiCallService } from 'src/app/api-call.service';
import { AuthService } from 'src/app/auth.service';
import { Opportunity } from 'src/app/models/opportunity';

@Component({
  selector: 'app-student-search-form',
  templateUrl: './student-search-form.component.html',
  styleUrls: ['./student-search-form.component.css']
})
export class StudentSearchFormComponent {
  searchString: string = "";
  opportunities: Array<Opportunity> = [];
  signedUpOpportunities: Array<Opportunity> = [];
  filteredOpportunities: Array<Opportunity> = [];
  @Input() section: string = "search_form";
  @Output() innerSection: EventEmitter<boolean> = new EventEmitter();

  selectedOpportunity: number = -1;
  signup: boolean = false;

  constructor(private apiCallService: ApiCallService, private authService: AuthService) {
  }

  selectOpportunity(id: number, signup: boolean = false) {
    this.section = "opportunity_view";
    this.selectedOpportunity = id;
    this.signup = signup;
    this.innerSection.emit()
  }

  ngOnInit(): void {
    this.apiCallService.getAvailableOpportunitiesForStudent().subscribe((response: any) => {
      this.opportunities = response;
      this.filteredOpportunities = this.opportunities;
    });
    this.apiCallService.getSignedUpOpportunities().subscribe((response: any) => {
      this.signedUpOpportunities = response;
    })
  }

  filter(): void {
    this.filteredOpportunities = this.opportunities.filter((opp: Opportunity) => {
      return (opp.keywords.includes(this.searchString) || opp.description.includes(this.searchString))
    })

  }

}
