import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommunityPartnerViewComponent } from './community-partner-view/community-partner-view.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CommunityPartnerViewComponent,
    StudentViewComponent,
    AdminViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClientModule,],
  bootstrap: [AppComponent]
})
export class AppModule { }
