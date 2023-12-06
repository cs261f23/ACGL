import { Component, } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {


  constructor(private apiCallService: ApiCallService, private router: Router, private route: ActivatedRoute) { }

  logout() {
    this.apiCallService.logout().subscribe((response: any) => {

    })
    this.router.navigate(['/'], { relativeTo: this.route })
  }
}
