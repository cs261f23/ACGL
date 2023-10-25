import { Component, } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { AuthService } from '../auth.service';
import { CommunityPartnerViewComponent } from '../community-partner-view/community-partner-view.component';
interface user {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../material-icons.css']
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
      if (response["outcome"] == "failed") {
        return
      }
      if (response["outcome"] == "partner") {
        this.role = 1;
        this.loggedIn = true;
        this.authService.partnerID = response["id"]
        this.authService.hash = response['hash']
        this.router.navigate(['/community_partner_view'], { relativeTo: this.route })
        return
      }
      if (response["outcome"] == "student") {
        this.role = 0;
        this.loggedIn = true;
        this.authService.studentID = response["id"]
        this.authService.hash = response['hash']
        this.router.navigate(['/student_view'], { relativeTo: this.route })
        return
      }
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

}
