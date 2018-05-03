import { CloudnaryService } from './../../../shared/services/cloudnary.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CandidateProfileService } from '../../../shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from '../../../shared/services/cookie.service';
import { PartySupportInfo, Info, ContactInfo, Profile, LeaderHistroy } from '../../../shared/models/profilemodel';
import { Subscription } from 'rxjs/Subscription';
import { HelperService } from '../../../shared/services/helper.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {
  access_Token: string = null;
  tab: any = {
    about: true,
    activity: false,
    my_issues: false,
    score_log: false,
  };
  isVoted = false;

  c_profile: Profile
  CANDIDATE_ID = "ce9d1130-b765-4e1b-a65b-f3cc23283db0";
  CANDIDATURE_ID = "";
  CONSTITUENCY_ID = "52d40fe8-1490-421e-9dbe-08b2c13fb251";

  cloudNaryUrl: string = '';
  info: Info;
  contact_info: ContactInfo;
  party_info: PartySupportInfo;
  leader_history: LeaderHistroy[];
  loading = true; //renders loader;
  label = false;
  subs: Subscription;
  subs1: Subscription;
  constructor(
    private leaderProfile: CandidateProfileService,
    private router: Router,
    private route: ActivatedRoute,
    private cloudnaryService: CloudnaryService,
    private cookie: CookieService,
    private helperServices: HelperService
  ) {
    this.cloudNaryUrl = this.cloudnaryService.cloudnaryUrl;
  }


  ngOnInit() {
    this.access_Token = this.cookie.readCookie('access_token');
    let res: any = {
      type: '',
      data: {
        state: "",
        d_id: "",
        d_name: "",
        a_id: "",
        a_name: "",
      }
    }
    this.start();
    this.subs1 = this.helperServices.getEmitter()
      .subscribe((resp) => {
        res = resp;
        if (res.type == "navigateCandidate") {
          this.CANDIDATE_ID = JSON.parse(this.cookie.readCookie("candidate_id"));
          this.CONSTITUENCY_ID = JSON.parse(this.cookie.readCookie("assembly_id"));
          this.loading = true;
          this.start();
        }


      })
  }
  start() {
    this.loading = true;
    this.CANDIDATE_ID = JSON.parse(this.cookie.readCookie("candidate_id"));
    this.CONSTITUENCY_ID = JSON.parse(this.cookie.readCookie("assembly_id"));
    // console.log("candidate_id", this.CANDIDATE_ID)
    this.subs = this.leaderProfile.getCanditateProfile(this.CANDIDATE_ID, this.CONSTITUENCY_ID)
      .subscribe(resp => {
        // console.log('===>>>>>>>', resp);
        if (resp.status != 1) {
         console.log("unable to fetch user",resp);
        }
        this.c_profile = resp.data;
        this.contact_info = this.c_profile.contact_info;
        this.party_info = this.c_profile.party_and_support_info;
        this.info = this.c_profile.info;
        this.label = this.info.hasOwnProperty('label') ? true : false;
        this.CANDIDATURE_ID = this.party_info.candidature.candidature_id;
        // console.log("profile", this.c_profile);
        if (this.c_profile) {
          this.loading = false;
        }
      })
    this.leaderProfile.getCandidatesCandidatures(this.CANDIDATE_ID, this.CONSTITUENCY_ID)
      .subscribe(res => {
        this.leader_history = res.data;
      });



  }

  onVoted() {
    // this.c_profile.party_and_support_info.candidate_vote_count+=1;
    // this.c_profile.party_and_support_info.vote_percentage+=1;

    // this.isVoted=true;

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
    // console.log("this is my tab", this.tab)
  }

  ngOnDestroy() {
    this.cookie.eraseCookie(['candidate_id', 'assembly_id']);
    this.subs.unsubscribe();
    this.subs1.unsubscribe();
  }
}
