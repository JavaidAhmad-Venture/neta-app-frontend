import { Candidate } from './../../../shared/models/candidate';

import { CandidateProfileService } from './../../../shared/services/candidate-profile.service';
import { CloudnaryService } from './../../../shared/services/cloudnary.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CondidatesService } from './../../../shared/services/condidates.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-voting-booth',
  templateUrl: './voting-booth.component.html',
  styleUrls: ['./voting-booth.component.css']
})
export class VotingBoothComponent implements OnInit {

  tab: any = {
		mla_candidates: true,
		mp_candidates: false,
		local_bodies: false,
  }
  currentLocation={dname:"Select Location",aname:"Select Location"}//auqib
  loading:boolean = false;
  candidates:Candidate[];
  cUrl: string = '';
  constituency_id: string = '44443cf7-51ad-422d-a9c6-11a322d5797a';
  isActiveName:boolean = false;
  isActiveVotes:boolean = true;
  isVoted:boolean = false;
  

  constructor(

    private candidateService: CondidatesService,
    private cloudnaryService: CloudnaryService,
    private profileService: CandidateProfileService,
  
  ) {
    this.cUrl = cloudnaryService.cloudnaryUrl;
  }

  ngOnInit() {
    this.showCandidates();
  }

  showCandidates(){
    this.loading = true;
    this.candidateService.getAllCandidates().subscribe(data => {
      this.loading = false;
      this.candidates = data.data;
      console.log(this.candidates);
    })
  }

  onProfileView(id) {
    console.log('hello:' + id);

    this.profileService.navigateCandidate(id, this.constituency_id);
  }
  //added by auqib
  selectedId(ids){
    console.log('District id in voting booth:',ids.c_id);
    console.log('Assembly id in voting booth:',ids.a_id);
    this.currentLocation.dname=ids.d_name;
    this.currentLocation.aname=ids.a_name;

 
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
    console.log(candidate);
    
    candidate.votes++;
    candidate.percentage += 4.5; 
    this.isVoted = true;
     candidate.is_voted_by_me = true;
    console.log(this.isVoted);
    
  }

  switchTab(type) {
		for (const key in this.tab) {
			if (this.tab.hasOwnProperty(key))  
				this.tab[key] = false;
		}
		this.tab[type] = true;
  }
 
}
