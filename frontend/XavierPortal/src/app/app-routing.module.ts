import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityPartnerOpportunityViewComponent } from './community-partner-view/community-partner-opportunity-view/community-partner-opportunity-view.component';
import { CommunityPartnerViewComponent } from './community-partner-view/community-partner-view.component';
import { LoginComponent } from './login/login.component';
import { PartnerUserRegisterComponent } from './partner-user-register/partner-user-register.component';
import { StudentUserRegisterComponent } from './student-user-register/student-user-register.component';
import { StudentOpportunityViewComponent } from './student-view/student-opportunity-view/student-opportunity-view.component';
import { StudentViewComponent } from './student-view/student-view.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'community_partner_view', component: CommunityPartnerViewComponent },
  { path: 'student_view', component: StudentViewComponent },
  { path: 'student_register', component: StudentUserRegisterComponent },
  { path: 'partner_register', component: PartnerUserRegisterComponent },
  { path: 'student_view/opportunity_view/:id', component: StudentOpportunityViewComponent },
  { path: 'community_partner_view/opportunity_view/:id', component: CommunityPartnerOpportunityViewComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
