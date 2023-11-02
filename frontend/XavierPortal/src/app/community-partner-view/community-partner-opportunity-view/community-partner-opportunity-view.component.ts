import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from 'src/app/api-call.service';

@Component({
  selector: 'app-community-partner-opportunity-view',
  templateUrl: './community-partner-opportunity-view.component.html',
  styleUrls: ['./community-partner-opportunity-view.component.css']
})
export class CommunityPartnerOpportunityViewComponent implements OnInit {

  students: Array<{}> = [];
  id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
  constructor(private activatedRoute: ActivatedRoute, private apiCallService: ApiCallService) {

  }

  ngOnInit(): void {
    this.apiCallService.getStudentsByOpportunity(this.id).subscribe((response: any) => {
      this.students = response
    })

  }


}
