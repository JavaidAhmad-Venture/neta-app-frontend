import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

import { LoaderComponent } from './components/loader/loader.component';
import { LocationDetectorComponent } from './components/location-detector/location-detector.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PhoneLoginComponent } from './components/phone-login/phone-login.component';
import { SmallLoaderComponent } from './components/small-loader/small-loader.component';
import { AuthGuard } from './guards/auth-guard.service';
import { AuthService } from './guards/auth.service';
import { CandidateProfileService } from './services';
import { CloudnaryService } from './services/cloudnary.service';
import { CondidatesService } from './services/condidates.service';
import { CookieService } from './services/cookie.service';
import { HelperService } from './services/helper.service';
import { InfluencersService } from './services/influencers.service';
import { LocationService } from './services/location.service';
import { PopularPeopleService } from './services/popular-people.service';
import { WindowService } from './services/window.service';




@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'neta-dev' } as CloudinaryConfiguration)
  ],
  declarations: [NotFoundComponent, 
    LoaderComponent,
    SmallLoaderComponent,
    LocationDetectorComponent,
    PhoneLoginComponent
  ],
  providers:[CondidatesService,
    CandidateProfileService,
    CloudnaryService,
    CookieService,
    LocationService,
    InfluencersService,
    PopularPeopleService,
    WindowService,
    HelperService,
    AuthService,
    AuthGuard
  ],
  exports:[CommonModule,
    LoaderComponent,
    SmallLoaderComponent,
    LocationDetectorComponent,
    PhoneLoginComponent,
  ]
})
export class SharedModule { }
