import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() section: string = "my_opportunities";
  @Output() innerSection: EventEmitter<boolean> = new EventEmitter();
  sidebarSection: string = "my_opportunities"
  myOpportunities: Array<Opportunity> = [];
  selectedOpportunity: number = -1;
  constructor(private apiCallService: ApiCallService, private router: Router, private authService: AuthService, private route: ActivatedRoute) {

  }

  openCreationForm() {
    this.sidebarSection = "new_opportunity"
    this.section = "new_opportunity"
  }

  openMyOpportunities() {
    this.sidebarSection = "my_opportunities"
    this.section = "my_opportunities"
  }

  getStudentsByOpportunity(id: number) {
    this.apiCallService.getStudentsByOpportunity(id).subscribe((response: any) => {
      let studentList: Array<Student> = response;
    })
  }

  selectOpportunity(opp: Opportunity) {
    this.selectedOpportunity = opp.id;
    this.section = 'opportunity_edit';
  }

  ngOnInit() {
    this.authService.getHash();
    !this.authService
      ? this.router.navigate(['/'], { relativeTo: this.route })
      : this.getOpportunitiesByPartnerID()
  }

  getOpportunitiesByPartnerID(update: number = 0) {
    this.apiCallService.getOpportunitiesByPartnerID().subscribe((response: any) => {
      this.myOpportunities = response;
      if (update) {
        this.section = 'my_opportunities'
      }
    })

  }


}
