import { Component, EventEmitter, Output } from '@angular/core';
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
export class StudentSignupFormComponent {

  validNamePattern = '^[A-Za-z]*$';

  model: signup = { name: '', phoneNumber: '', email: '' };

  @Output() updateMyOpportunities = new EventEmitter<boolean>();
  submitted: boolean = false;

  constructor(private apiCallService: ApiCallService, private authService: AuthService, private activatedRoute: ActivatedRoute) {

  }
  
  onSubmit() {
    this.apiCallService.studentSignup(this.model.email, this.model.name).subscribe((response) => {
      this.updateMyOpportunities.emit();
    })
  }
}
