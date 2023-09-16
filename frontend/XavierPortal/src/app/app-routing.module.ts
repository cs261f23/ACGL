import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityPartnerOpportunityCreationViewComponent } from './community-partner-view/community-partner-opportunity-creation-view/community-partner-opportunity-creation-view.component';
import { CommunityPartnerViewComponent } from './community-partner-view/community-partner-view.component';
import { StudentViewComponent } from './student-view/student-view.component';

const routes: Routes = [
  { path: 'community_partner_view', component: CommunityPartnerViewComponent },
  { path: 'student_view', component: StudentViewComponent },
  { path: 'community_partner_opportunity_creation_view', component: CommunityPartnerOpportunityCreationViewComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
