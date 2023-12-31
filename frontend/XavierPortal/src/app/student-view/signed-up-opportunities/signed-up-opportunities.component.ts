import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApiCallService } from 'src/app/api-call.service';
import { Opportunity } from 'src/app/models/opportunity';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-signed-up-opportunities',
  templateUrl: './signed-up-opportunities.component.html',
  styleUrls: ['./signed-up-opportunities.component.css']
})
export class SignedUpOpportunitiesComponent implements OnInit {

  @Input() opportunities!: Array<Opportunity>;
  @Output() select: EventEmitter<Opportunity> = new EventEmitter<Opportunity>();

  constructor(
    private apiCallService: ApiCallService
  ) {

  }

  ngOnInit(): void {
    this.apiCallService.getSignedUpOpportunities().subscribe((response) => {
      this.opportunities = response
    })
  }

  selectOpportunity(opp: Opportunity) {
    this.select.emit(opp);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.opportunities, event.previousIndex, event.currentIndex);
  }
}
