import { CloudnaryService } from './../../../shared/services/cloudnary.service';
import { Component, OnInit } from '@angular/core';
import { CandidateProfileService } from '../../../shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from '../../../shared/services/cookie.service';
import { PartySupportInfo, Info,ContactInfo } from '../../../shared/models/profilemodel';

declare var jQuery: any;
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  CANDIDATE_ID = "ce9d1130-b765-4e1b-a65b-f3cc23283db0";
  CONSTITUENCY_ID = "52d40fe8-1490-421e-9dbe-08b2c13fb251";
  
  cloudNaryUrl: string = '';
  
  info:Info;
  contact_info:ContactInfo;
  party_info:PartySupportInfo;
  leader_history:any;
  loading = true; //renders loader;
  constructor(
    private leaderProfile: CandidateProfileService,
    private router: Router,
    private cloudnaryService: CloudnaryService,
    private cookie: CookieService) {

    this.cloudNaryUrl = cloudnaryService.cloudnaryUrl;
    this.CANDIDATE_ID = JSON.parse(this.cookie.readCookie("c_id"));
    this.CONSTITUENCY_ID = JSON.parse(this.cookie.readCookie("con_id"));


  }

  ngOnInit() {
    this.leaderProfile.getCanditateProfile(this.CANDIDATE_ID, this.CONSTITUENCY_ID)
      .subscribe(res => {
        console.log("Profile", res);
        // console.log("info",res.data.info);
        this.info = res.data.info;
        this.contact_info = res.data.contact_info;
        this.party_info = res.data.party_and_support_info;
        console.log("Contact_info", this.party_info);
        this.loading = false;
      });

    this.leaderProfile.getCandidatesCandidatures(this.CANDIDATE_ID, this.CONSTITUENCY_ID)
      .subscribe(res => {
        console.log("Auqib this is what 0", res,res.data.length);
        this.leader_history=res.data;
      });


    // jQuery('.my-toggle ').click(function () {
    //   jQuery(this).toggleClass('open');
    //   jQuery('body').toggleClass('open');
    // });
    // jQuery('button.search-btn').click(function () {
    //   jQuery('header').toggleClass('open');
    // });
    // jQuery(window).scroll(function () {
    //   if (jQuery(window).scrollTop() >= 30) {
    //     jQuery('header').addClass('fixed');
    //   } else {
    //     jQuery('header').removeClass('fixed');
    //   }
    // });
  }



  filterRupees(rupee) {
    let r = rupee.split(" ");
    return +r[1];
  }


}
