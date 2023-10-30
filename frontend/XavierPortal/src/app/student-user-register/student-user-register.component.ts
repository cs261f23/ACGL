import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiCallService } from '../api-call.service';
import { AuthService } from '../auth.service';

interface studentuser {
  email: string
  name: string
  studentID: number
  password: string
}
@Component({
  selector: 'app-student-user-register',
  templateUrl: './student-user-register.component.html',
  styleUrls: ['./student-user-register.component.css', '../material-icons.css']
})
export class StudentUserRegisterComponent {

  student: studentuser = { email: '', name: '', studentID: -1, password: '' }
  showPassword = false;
  validNamePattern = '^[A-Za-z]*$';
  submitted = false;

  constructor(private apiCallService: ApiCallService, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }


  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  register(): void {
    this.apiCallService.studentRegister(this.student.email, this.student.name, this.student.password).subscribe((response) => {
      if (response == 'success') {
        this.router.navigate(['/'], { relativeTo: this.route })
      }
    })
  }

}
