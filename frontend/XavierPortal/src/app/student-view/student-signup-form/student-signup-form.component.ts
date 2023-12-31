import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCallService } from 'src/app/api-call.service';
import { AuthService } from 'src/app/auth.service';

interface signup {
  phoneNumber: string,
}
@Component({
  selector: 'app-student-signup-form',
  templateUrl: './student-signup-form.component.html',
  styleUrls: ['./student-signup-form.component.css']
})
export class StudentSignupFormComponent implements OnInit {

  constructor(private apiCallService: ApiCallService, private authService: AuthService) { }

  validNamePattern = '^[A-Za-z]*$';

  model: signup = { phoneNumber: '' };
  submitted = false;
  @Input() id!: number;
  @Output() submittedEmitter: EventEmitter<boolean> = new EventEmitter();
  // id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);

  onSubmit() {
    this.apiCallService.studentSignup(this.id).subscribe((response) => {

      this.submitted = true;
      this.submittedEmitter.emit()
    })
    // this.apiCallService.signUpForOpportunity(this.authService.studentID, this.id);
  }
  ngOnInit(): void { }
}
