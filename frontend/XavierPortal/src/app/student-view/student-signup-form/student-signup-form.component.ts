import { Component, OnInit } from '@angular/core';
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

  constructor(private apiCallService: ApiCallService, private activatedRoute: ActivatedRoute, private authService: AuthService) {

  }
  model: signup = { name: '', phoneNumber: '', email: '' };
  submitted = false;

  id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
  validNamePattern = '^[A-Za-z]*$';
  onSubmit() {
    this.submitted = true;
    this.apiCallService.signUpForOpportunity(this.model, this.id);
  }
  ngOnInit(): void { }
}
