import { Component } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Opportunity } from '../models/opportunity';
import { Student } from '../models/student';

@Component({
  selector: 'app-community-member-view',
  templateUrl: './community-member-view.component.html',
  styleUrls: ['./community-member-view.component.css']
})
export class CommunityMemberViewComponent {

  response: Array<any> = [];
  selectedOpportunity?: Opportunity;
  selectedOpportunityID: number = 1; //for example
  constructor(private apiCallService: ApiCallService, private router: Router) {
  }

  getStudentsByOpportunity() {
    this.apiCallService.getStudentsByOpportunity(this.selectedOpportunityID).subscribe((response: any) => {
      this.response = response;
      let studentList: Array<Student> = [];
      this.response.forEach(element => {
        let student: Student = {
          studentID: element['student_id'],
          email: element['student_email']
        };
        studentList.push(student);
      });
      this.selectedOpportunity = {
        students: studentList
      };
    })


  }


}
