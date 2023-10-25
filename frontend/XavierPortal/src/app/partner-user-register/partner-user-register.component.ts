import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { AuthService } from '../auth.service';

interface partnerregister {
  email: string
  password: string
  title: string
}

@Component({
  selector: 'app-partner-user-register',
  templateUrl: './partner-user-register.component.html',
  styleUrls: ['./partner-user-register.component.css', '../material-icons.css']
})
export class PartnerUserRegisterComponent implements OnInit {
  showPassword: boolean = false;
  submitted: boolean = false;
  partnerRegister: partnerregister = { email: '', password: '', title: '' }

  constructor(private apiCallService: ApiCallService, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  register(): any {
    this.apiCallService.partnerRegister(this.partnerRegister.email, this.partnerRegister.title, this.partnerRegister.password).subscribe((response) => {
      if (response == 'success') {
        this.router.navigate(['/'], { relativeTo: this.route })
      }
    })
  }

}
