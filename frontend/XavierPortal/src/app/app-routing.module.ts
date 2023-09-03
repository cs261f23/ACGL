import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityMemberViewComponent } from './community-member-view/community-member-view.component';

const routes: Routes = [
  { path: 'community_member_view', component: CommunityMemberViewComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
