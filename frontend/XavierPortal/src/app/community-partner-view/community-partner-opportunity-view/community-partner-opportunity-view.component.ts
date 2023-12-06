import { Output, Component, Input, OnInit, EventEmitter } from '@angular/core';
import { ApiCallService } from 'src/app/api-call.service';
import { Opportunity } from 'src/app/models/opportunity';

@Component({
  selector: 'app-community-partner-opportunity-view',
  templateUrl: './community-partner-opportunity-view.component.html',
  styleUrls: ['./community-partner-opportunity-view.component.css']
})
export class CommunityPartnerOpportunityViewComponent implements OnInit {

  students: Array<{}> = [];
  info?: Opportunity;
  @Input() id!: number;
  @Output() update: EventEmitter<boolean> = new EventEmitter()
  constructor(private apiCallService: ApiCallService) {

  }

  ngOnInit(): void {
    this.apiCallService.getStudentsByOpportunity(this.id).subscribe((response: any) => {
      this.students = response
    });
    this.apiCallService.getOpportunityInfo(this.id).subscribe((response: any) => {
      this.info = response;
    });

  }


  submitEdits(): void {
    this.apiCallService.editOpportunity(this.info!).subscribe((response: any) => {
      this.update.emit()
    })
  }

  deleteOpportunity(): void {
    this.apiCallService.deleteOpportunity(this.id).subscribe((response: any) => {
      this.update.emit()
    })
  }

}
