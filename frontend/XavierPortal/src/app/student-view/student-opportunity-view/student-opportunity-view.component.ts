import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-student-opportunity-view',
  templateUrl: './student-opportunity-view.component.html',
  styleUrls: ['./student-opportunity-view.component.css']
})
export class StudentOpportunityViewComponent implements OnInit {
  id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log(this.id)
  }


}
