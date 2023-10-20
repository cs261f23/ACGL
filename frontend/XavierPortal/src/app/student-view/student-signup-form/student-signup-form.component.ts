import { Component } from '@angular/core';

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

  model: signup = { name: '', phoneNumber: '', email: '' };
  submitted: boolean = false;

  validNamePattern = '^[A-Za-z]*$';
  onSubmit() {
    this.submitted = true;
  }
}
