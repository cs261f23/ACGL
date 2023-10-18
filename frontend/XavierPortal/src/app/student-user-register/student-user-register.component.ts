import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiCallService } from '../api-call.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-student-user-register',
  templateUrl: './student-user-register.component.html',
  styleUrls: ['./student-user-register.component.css', '../material-icons.css']
})
export class StudentUserRegisterComponent implements OnInit {

  showPassword: boolean = false;
  email: string = '';
  name: string = '';
  password: string = '';

  constructor(private apiCallService: ApiCallService, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  register(): any {
    this.apiCallService.studentRegister(this.email, this.name, this.password).subscribe((response) => {
      if (response == 'success') {
        this.router.navigate(['/'], { relativeTo: this.route })
      }
    })
  }

}
