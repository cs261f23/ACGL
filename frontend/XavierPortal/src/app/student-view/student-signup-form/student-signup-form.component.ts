import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from 'src/app/api-call.service';
import { AuthService } from 'src/app/auth.service';

interface signup {
  name: string,
  phoneNumber: string,
  email: string
}
@Component({
  selector: 'app-student-signup-form',
  templateUrl: './student-signup-form.component.html',
  styleUrls: ['./student-signup-form.component.css']
})
export class StudentSignupFormComponent implements OnInit {

  constructor(private apiCallService: ApiCallService, private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  validNamePattern = '^[A-Za-z]*$';

  model: signup = { name: '', phoneNumber: '', email: '' };
  submitted = false;

  @Output() updateMyOpportunities = new EventEmitter<boolean>();

  id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

  onSubmit() {
    this.apiCallService.studentSignup(this.authService.studentID, this.id).subscribe((response) => {

    })
    this.submitted = true;
    // this.apiCallService.signUpForOpportunity(this.authService.studentID, this.id);
  }
  ngOnInit(): void { }
}
