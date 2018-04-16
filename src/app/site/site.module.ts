import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { routes } from './../config/routes';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResultsComponent } from './components/results/results.component';
import { StarCitizensComponent } from './components/star-citizens/star-citizens.component';
import { VotingBoothComponent } from './components/voting-booth/voting-booth.component';
import { SiteComponent } from './site.component';
import { AppHeaderComponent } from './toolbars/app-header/app-header.component';
import { SidebarComponent } from './toolbars/sidebar/sidebar.component';
import { LocationDetectorComponent } from './components/voting-booth/location-detector/location-detector.component';
import { ContactInfoComponent } from './components/profile/contact-info/contact-info.component';
import {FormsModule}from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routes,
    FormsModule
  ],
  declarations: [
    SiteComponent,
    AppHeaderComponent,
    ProfileComponent,
    SidebarComponent,
    DiscussionComponent,
    VotingBoothComponent,
    ResultsComponent,
    StarCitizensComponent,
    LocationDetectorComponent,
    ContactInfoComponent,
  ]
})
export class SiteModule { }
