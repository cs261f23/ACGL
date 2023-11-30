import { Component, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { AuthService } from '../auth.service';
interface user {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  user: user = { email: '', password: '' };
  showPassword = false;
  submitted: boolean = false;
  loggedIn: boolean = false;
  role: number = -1;
  constructor(private apiCallService: ApiCallService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {

  }

  login(): void {

    this.apiCallService.attemptLogin(this.user.email, this.user.password).subscribe((response: any) => {
      switch (response["outcome"]) {
        case "failed":
          return
        case "partner":
          this.role = 1;
          this.loggedIn = true;
          this.authService.partnerID = response["id"]
          this.authService.hash = response['hash']
          this.authService.cacheHash()
          this.authService.studentID = -1
          this.router.navigate(['/community_partner_view'], { relativeTo: this.route })
          return
        case "student":
          this.role = 0;
          this.loggedIn = true;
          this.authService.studentID = response["id"]
          this.authService.hash = response['hash']
          this.authService.cacheHash()
          this.authService.partnerID = -1
          this.router.navigate(['/student_view'], { relativeTo: this.route })
          return
      }
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

}
