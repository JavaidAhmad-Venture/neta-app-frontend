import { HelperService } from './../../../shared/services/helper.service';
import { Candidate } from './../../../shared/models/candidate';

import { CandidateProfileService } from './../../../shared/services/candidate-profile.service';
import { CloudnaryService } from './../../../shared/services/cloudnary.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CondidatesService } from './../../../shared/services/condidates.service';
import * as _ from 'lodash';
import *  as firebase from 'firebase';
import { CookieService } from '../../../shared/services/cookie.service';

declare var $:any;
@Component({
  selector: 'app-voting-booth',
  templateUrl: './voting-booth.component.html',
  styleUrls: ['./voting-booth.component.css']
})
export class VotingBoothComponent implements OnInit {

  tab: any = {
		mla_candidates: true,
		mp_candidates: false,
	//	local_bodies: false,
  }
  ID={a_id:"",d_id:""}
  currentLocation={dname:"Select Location",aname:"Select Location"}//auqib
  loading:boolean = false;
  candidates:Candidate[];
  cUrl: string = '';
  constituency_id: string = '44443cf7-51ad-422d-a9c6-11a322d5797a';
  isActiveName:boolean = false;
  isActiveVotes:boolean = true;
  isVoted:boolean = false;
  registerToVote:boolean=false;
  candidateName:string='';
  candidatePic:string='';
  partyImage:string='';

  constructor(

    private candidateService: CondidatesService,
    private cloudnaryService: CloudnaryService,
    private profileService: CandidateProfileService,
    private helperService:HelperService,
    private cookieService:CookieService
  
  ) {
    this.cUrl = cloudnaryService.cloudnaryUrl;

    this.helperService.getEmitter().subscribe((res)=>{
      console.log("respn",res);
      
      if(res.type=="location"){
          // this.state=res.data.state;
          this.currentLocation.aname=res.data.a_name;
          this.currentLocation.dname=res.data.d_name;
          this.ID.d_id=res.data.d_id;
          this.ID.a_id=res.data.a_id;
          this.showCandidates(this.ID.a_id);
      }
  })
 
  }

  ngOnInit() {
    this.showCandidates(this.constituency_id);
  console.log('firebase',firebase);
  }

  showCandidates(id){
    this.loading = true;
    let i_d =id||this.constituency_id;
    
    console.log("my iddddddddddddddd",i_d);
    this.candidateService.getAllCandidates(i_d).subscribe(data => {
      this.loading = false;
      this.candidates=[];
      this.candidates = data.data;
      console.log(this.candidates);
    })
  }

  onProfileView(candidate_id,candidate_name) {
    console.log('Loading:' + candidate_name);
    this.profileService.navigateCandidate(candidate_id, this.constituency_id,candidate_name);
  }
  //added by auqib
  selectedId(ids){
   
    console.log('District id in voting booth:',ids.d_id);
    console.log('Assembly id in voting booth:',ids.a_id);
    if(this.tab.mla_candidates)
    {
    this.showCandidates(ids.a_id);
  }
  else{
    this.showCandidates(ids.d_id);
  }
    this.ID.d_id=ids.d_id;
    this.ID.a_id=ids.a_id;
    this.currentLocation.dname=ids.d_name;
    this.currentLocation.aname=ids.a_name;

    console.log('ID CHECK',this.ID);
  }

  sortByName(){
    this.isActiveName = true;
    this.isActiveVotes = false;
    this.candidates = _.sortBy(this.candidates,o=>o.candidate_name);
  }
  sortByVotes(){
    this.isActiveVotes = true;
    this.isActiveName = false;
    this.candidates = _.orderBy(this.candidates,o=> o.votes, ['desc'])
  }

  onVote(candidate){
    this.candidateName=candidate.candidate_name;
    this.candidatePic = candidate.candidate_profile_pic.cloudinary.public_id;
    this.partyImage = candidate.party_image.cloudinary.public_id; 
    
    const userId=this.cookieService.readCookie('userId');

    console.log('get user id:',userId);
    
    if(!userId){
      this.registerToVote = true;
      this.helperService.setEmitter({
        type: 'voteLoginPopup',
        data: {
          name: this.candidateName,
          public_id:this.candidatePic,
          party_image:this.partyImage
          
        }
      })
      $('#if-not-login').modal('show',()=>{
        this.isVoted = true;
      });
      
    }
   
    else {
      this.registerToVote = false;    
      candidate.votes++;
      candidate.percentage += 4.5; 
      this.isVoted = true;
       candidate.is_voted_by_me = true;
      console.log(this.isVoted);

    }
   
    
  }


  //edited by aaqib
  switchTab(type) {
  this.candidates=null;
    for (const key in this.tab) {
			if (this.tab.hasOwnProperty(key))  
				this.tab[key] = false;
		}
    this.tab[type] = true;
    if(this.tab.mla_candidates){
      console.log("i am mla",);
     this.showCandidates(this.ID.a_id);
    }
    if(this.tab.mp_candidates){
      console.log("iam Mp")
      this.showCandidates(this.ID.d_id);
    }
  }

 
}
