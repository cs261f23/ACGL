import { Component } from '@angular/core';
import { signup } from '../student-signup-form/student-signup-form';

@Component({
  selector: 'app-student-signup-form',
  templateUrl: './student-signup-form.component.html',
  styleUrls: ['./student-signup-form.component.css']
})
export class StudentSignupFormComponent {
  model = new signup('', '', '');
  submitted = false;
  
  validNamePattern = '^[A-Za-z]*$';
  onSubmit() {
    this.submitted = true;
  }
}
