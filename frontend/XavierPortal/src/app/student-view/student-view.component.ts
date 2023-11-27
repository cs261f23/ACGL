import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { AuthService } from '../auth.service';
import { Opportunity } from '../models/opportunity';
@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  opportunities: Array<Opportunity> = [];
  selectedOpportunities: Array<Opportunity> = [];
  sidebarSection: string = "search_form"

  constructor(
    private apiCallService: ApiCallService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.authService.getHash();
    !this.authService.hash
      ? this.router.navigate(['/'], { relativeTo: this.route })
      : undefined;
  }


  openSearchForm(): void {
    this.sidebarSection = "search_form";
  }

  openMyOpportunities(): void {
    this.sidebarSection = "my_opportunities"
  }


}
