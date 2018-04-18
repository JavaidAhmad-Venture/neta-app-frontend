import { CloudnaryService } from './../../../shared/services/cloudnary.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CandidateProfileService } from '../../../shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from '../../../shared/services/cookie.service';
import { PartySupportInfo, Info, ContactInfo, Profile, LeaderHistroy } from '../../../shared/models/profilemodel';
import { Subscription } from 'rxjs/Subscription';

declare var jQuery: any;
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  tab: any = {
		About: true,
		Manifesto: false,
    History: false,
    Feed: false,
  };

  c_profile: Profile
  CANDIDATE_ID = "ce9d1130-b765-4e1b-a65b-f3cc23283db0";
  CANDIDATURE_ID ="";
  CONSTITUENCY_ID = "52d40fe8-1490-421e-9dbe-08b2c13fb251";

  cloudNaryUrl: string = '';
  info: Info;
  contact_info: ContactInfo;
  party_info: PartySupportInfo;
  leader_history: LeaderHistroy[];
  loading = true; //renders loader;
  subs: Subscription;
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
    this.subs = this.leaderProfile.getCanditateProfile(this.CANDIDATE_ID, this.CONSTITUENCY_ID)
      .subscribe(resp => {
        // console.log("Profile", resp);

        this.c_profile = resp.data;

        // console.log("THIS IS HTTP CLIENT TEST",this.c_profile.contact_info);
        this.contact_info = this.c_profile.contact_info;
        this.party_info = this.c_profile.party_and_support_info;
        this.info = this.c_profile.info;
        // console.log("Contact_info", this.party_info);
        this.CANDIDATURE_ID=this.party_info.candidature.candidature_id;
        this.loading = false;
        // console.log("THIS IS data ",this.c_profile);
      });


    this.leaderProfile.getCandidatesCandidatures(this.CANDIDATE_ID, this.CONSTITUENCY_ID)
      .subscribe(res => {
        // console.log("Auqib this is what 0", {...res});
        this.leader_history = [...res['data']];
      });


    jQuery('.my-toggle ').click(function () {
      jQuery(this).toggleClass('open');
      jQuery('body').toggleClass('open');
    });
    jQuery('button.search-btn').click(function () {
      jQuery('header').toggleClass('open');
    });
    jQuery(window).scroll(function () {
      if (jQuery(window).scrollTop() >= 30) {
        jQuery('header').addClass('fixed');
      } else {
        jQuery('header').removeClass('fixed');
      }
    });
  }



  filterRupees(rupee) {
    let r = rupee.split(" ");
    return +r[1];
  }

  switchTab(type) {
		for (const key in this.tab) {
			if (this.tab.hasOwnProperty(key))  
				this.tab[key] = false;
  
      }
      this.tab[type] = true;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
