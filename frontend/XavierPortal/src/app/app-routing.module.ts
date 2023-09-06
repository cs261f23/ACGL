import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityPartnerViewComponent } from './community-partner-view/community-partner-view.component';

const routes: Routes = [
  { path: 'community_partner_view', component: CommunityPartnerViewComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
