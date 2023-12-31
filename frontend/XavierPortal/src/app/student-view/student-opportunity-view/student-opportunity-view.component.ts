import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from 'src/app/api-call.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-student-opportunity-view',
  templateUrl: './student-opportunity-view.component.html',
  styleUrls: ['./student-opportunity-view.component.css']
})
export class StudentOpportunityViewComponent implements OnInit {
  // id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
  @Input() id!: number;
  @Input() signup: boolean = false;
  @Output() submittedEmitter: EventEmitter<boolean> = new EventEmitter();
  info!: {}


  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  ngOnInit(): void {
    this.apiCallService.getOpportunityInfo(this.id).subscribe((response) => {
      this.info = response
    })
  }

  removeSignUp(): void {
    this.apiCallService.studentUnSignup(this.id).subscribe((response) => { })
  }


}
