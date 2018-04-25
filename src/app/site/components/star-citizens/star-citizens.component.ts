import { Component, OnInit, OnDestroy } from '@angular/core';
import { CitizenProfileService } from '../../../shared/services/citizen-profile.service';
import * as _ from 'lodash';
import { HelperService } from '../../../shared/services/helper.service';
import { CookieService } from '../../../shared/services/cookie.service';
interface Influencer {
  influencer_id:string,
  influencer_name:string,
  score: number,
  rank: number,
  constituency:string,
  influencer_profile_pic: {
      cloudinary: {
          public_id:string,
      }
  },
  constituency_id:string,
  has_cover: boolean,
  cover_imag: {
    cloudinary: {
        public_id:string,
    },
},
}

@Component({
  selector: 'app-star-citizens',
  templateUrl: './star-citizens.component.html',
  styleUrls: ['./star-citizens.component.css']
})

export class StarCitizensComponent implements OnInit,OnDestroy {
 
citizens:Influencer[]=[];
cloudNaryUrl="http://res.cloudinary.com/neta-dev/image/upload/";
id="44443cf7-51ad-422d-a9c6-11a322d5797a"
isActiveScore = true;
isActiveName = false;
  constructor(private citizenProfileService:CitizenProfileService,
     private helperService:HelperService,
      private cookie:CookieService
    ) { 
    helperService.getEmitter()
        .subscribe(()=>{
          
        })
  }

  ngOnInit() {

    this.citizenProfileService.getAllCitizens(this.id)
    .subscribe(res=>{
      this.citizens = [...res['data']];
      console.log("citizens",this.citizens)
    })
  } 

  
  sortByName(){
    this.isActiveName = true;
    this.isActiveScore = false;
    this.citizens = _.sortBy(this.citizens,o=>o.influencer_name);
  }
  sortByScores(){
    this.isActiveScore = true;
    this.isActiveName = false;
    this.citizens = _.orderBy(this.citizens,o=> o.score, ['desc'])
  }
  ngOnDestroy(){
   this.cookie.eraseCookie(["a_id"])
  }
}
