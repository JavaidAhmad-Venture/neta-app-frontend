import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { routes } from './../config/routes';
import { AboutComponent } from './components/candidate-profile/about/about.component';
import { CandidateProfileComponent } from './components/candidate-profile/candidate-profile.component';
import { ContactInfoComponent } from './components/candidate-profile/contact-info/contact-info.component';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { ResultsComponent } from './components/results/results.component';
import { StarCitizensComponent } from './components/star-citizens/star-citizens.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LocationDetectorComponent } from './components/voting-booth/location-detector/location-detector.component';
import { VotingBoothComponent } from './components/voting-booth/voting-booth.component';
import { SiteComponent } from './site.component';
import { AppHeaderComponent } from './toolbars/app-header/app-header.component';
import { SidebarComponent } from './toolbars/sidebar/sidebar.component';
import { PhoneLoginComponent } from './components/phone-login/phone-login.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routes,
    FormsModule,
  ],
  declarations: [
    SiteComponent,
    AppHeaderComponent,
    SidebarComponent,
    DiscussionComponent,
    VotingBoothComponent,
    ResultsComponent,
    StarCitizensComponent,
    LocationDetectorComponent,
    ContactInfoComponent,
    AboutComponent,
    UserProfileComponent,
    CandidateProfileComponent,
    PhoneLoginComponent,
  ]
})
export class SiteModule { }
