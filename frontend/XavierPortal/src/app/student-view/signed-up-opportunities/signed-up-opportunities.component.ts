import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiCallService } from 'src/app/api-call.service';
import { AuthService } from 'src/app/auth.service';
import { Opportunity } from 'src/app/models/opportunity';

@Component({
  selector: 'app-signed-up-opportunities',
  templateUrl: './signed-up-opportunities.component.html',
  styleUrls: ['./signed-up-opportunities.component.css']
})
export class SignedUpOpportunitiesComponent implements OnInit {

  opportunities: Array<Opportunity> = [];
  @Output() select: EventEmitter<Opportunity> = new EventEmitter<Opportunity>();
  constructor(
    private apiCallService: ApiCallService,
    private authService: AuthService,
  ) {

  }

  ngOnInit(): void {
    this.apiCallService.getSignedUpOpportunities(this.authService.studentID!).subscribe((response: any) => {
      this.opportunities = response;
    })
  }

  selectOpportunity(opp: Opportunity) {
    this.select.emit(opp);
  }
}
