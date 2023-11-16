import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommunityPartnerViewComponent } from './community-partner-view/community-partner-view.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { StudentOpportunityViewComponent } from './student-view/student-opportunity-view/student-opportunity-view.component';
import { CommunityPartnerOpportunityViewComponent } from './community-partner-view/community-partner-opportunity-view/community-partner-opportunity-view.component';
import { StudentSearchFormComponent } from './student-view/student-search-form/student-search-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommunityPartnerOpportunityCreationFormComponent } from './community-partner-view/community-partner-opportunity-creation-form/community-partner-opportunity-creation-form.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { StudentUserRegisterComponent } from './student-user-register/student-user-register.component';
import { PartnerUserRegisterComponent } from './partner-user-register/partner-user-register.component';
import { StudentSignupFormComponent } from './student-view/student-signup-form/student-signup-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignedUpOpportunitiesComponent } from './student-view/signed-up-opportunities/signed-up-opportunities.component';
import { StudentSidebarComponent } from './student-view/student-sidebar/student-sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BannerComponent } from './banner/banner.component';
@NgModule({
  declarations: [
    AppComponent,
    CommunityPartnerViewComponent,
    StudentViewComponent,
    AdminViewComponent,
    StudentOpportunityViewComponent,
    CommunityPartnerOpportunityViewComponent,
    StudentSearchFormComponent,
    CommunityPartnerOpportunityCreationFormComponent,
    LoginComponent,
    StudentUserRegisterComponent,
    PartnerUserRegisterComponent,
    StudentSignupFormComponent,
    SignedUpOpportunitiesComponent,
    StudentSidebarComponent,
    BannerComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSidenavModule,
    BrowserAnimationsModule
  ],
  providers: [HttpClientModule,],
  bootstrap: [AppComponent]
})
export class AppModule { }
