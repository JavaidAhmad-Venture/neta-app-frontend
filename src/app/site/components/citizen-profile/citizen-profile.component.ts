import { Component, OnInit } from '@angular/core';
import { CookieService } from '../../../shared/services/cookie.service';
import { CloudnaryService } from '../../../shared/services/cloudnary.service';
import { CitizenProfileService } from '../../../shared/services/citizen-profile.service';
import { Info, ContactInfo } from '../../../shared/models/profilemodel';

@Component({
  selector: 'app-citizen-profile',
  templateUrl: './citizen-profile.component.html',
  styleUrls: ['./citizen-profile.component.css']
})
export class CitizenProfileComponent implements OnInit {
  profile:{info: Info,
    contact_info: ContactInfo,
    profile_percentage_complete:null,
    rank:number,
    id:string,
    score:number
  }
  info: Info;
  contact_info: ContactInfo;
  // info: Info;
  // contact_info: ContactInfo;
  constructor( private citizenProfileservice:CitizenProfileService,
               private cloudnaryService: CloudnaryService,
               private cookie: CookieService) { 

                this.citizenProfileservice.getCitizenProfile()
                .subscribe(res=>{
                  console.log("citizen profile",res['data']);
                  this.profile=res['data'];
                  this.contact_info=this.profile.contact_info;
                  this.info=this.profile.info;
                  
          
                })
               }

  ngOnInit() {
   
  }

}
