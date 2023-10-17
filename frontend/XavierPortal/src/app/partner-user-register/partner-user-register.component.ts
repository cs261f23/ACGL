import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-partner-user-register',
  templateUrl: './partner-user-register.component.html',
  styleUrls: ['./partner-user-register.component.css', '../material-icons.css']
})
export class PartnerUserRegisterComponent implements OnInit {
  showPassword: boolean = false;
  email: string = '';
  password: string = '';
  title: string = '';

  constructor(private apiCallService: ApiCallService, private authService: AuthService) { }

  ngOnInit(): void {

  }
  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  register(): any {
    this.apiCallService.partnerRegister(this.email, this.title, this.password).subscribe((response) => {
    })
  }

}
