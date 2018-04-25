import { PopularPeopleService } from './services/popular-people.service';
import { Candidate } from './models/candidate';
import { CloudnaryService } from './services/cloudnary.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { CondidatesService } from './services/condidates.service';
import { HttpClientModule } from '@angular/common/http';
import { CandidateProfileService } from './services';
import { LoaderComponent } from './components/loader/loader.component';
import { CookieService } from './services/cookie.service';
import { InfluencersService } from './services/influencers.service';
import { LocationService } from './services/location.service';
import { SmallLoaderComponent } from './components/small-loader/small-loader.component';
import { WindowService } from './services/window.service';




@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
  
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'neta-dev' } as CloudinaryConfiguration)
  ],
  declarations: [NotFoundComponent, LoaderComponent, SmallLoaderComponent],
  providers:[CondidatesService,CandidateProfileService,CloudnaryService,CookieService,LocationService,InfluencersService,PopularPeopleService,WindowService],
  exports:[CommonModule,LoaderComponent,SmallLoaderComponent]
})
export class SharedModule { }
