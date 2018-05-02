import { Component, OnInit } from '@angular/core';

import { PopularPeopleService } from '../../../shared/services/popular-people.service';
import { PopularCandidate } from './../../../shared/models/popularCandidate';
import { PopularInfluencer } from './../../../shared/models/popularInfluencer';
import { CandidateProfileService } from './../../../shared/services/candidate-profile.service';
import { CloudnaryService } from './../../../shared/services/cloudnary.service';
import { HelperService } from '../../../shared/services/helper.service';
declare var jQuery:any;
@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  p_candidates:PopularCandidate[]=null;
  p_influencers:PopularInfluencer[]=null;
  topSixInfluencers:PopularInfluencer[]=null;
  response:any={};
  cUrl: string = '';
  constituency_id: string = '875189f9-3bba-4667-9109-dff1dd4a23ae';
  loading: boolean = true;


  constructor(
    private profileService:CandidateProfileService,
    private cloudnaryService: CloudnaryService,
    private popularPeople:PopularPeopleService,
    private helperService:HelperService
  ) {
    this.cUrl = cloudnaryService.cloudnaryUrl;
  }

  ngOnInit() {
    let resp:any;
    this.helperService.getEmitter().subscribe(res=>{
      resp=res
      if(resp.type=='location'){
        this.fetchPopularPeople();
      }
    })
    this.fetchPopularPeople();
   jQuery('.carousel').carousel();
  }

  onProfileView(candidate_id,candidate_name) {


   
    //console.log('Loading :' + candidate_name);
   
    this.profileService.navigateCandidate(candidate_id,this.constituency_id,candidate_name);
  
  }

  fetchPopularPeople(){ 
    this.topSixInfluencers =[];
    this.popularPeople.getPopularPeople()
    .subscribe(res=>{
      this.response = res.data;
      console.log('Popular people:',this.response);
      this.p_candidates  = this.response.popular_candidates;
      this.p_influencers  = this.response.popular_influencers;
      let count = 0;
      this.p_influencers.forEach(influencer=>{
        if(count<6){
          this.topSixInfluencers.push(influencer);
          count++;
        }
        if(this.response) this.loading = false;
      })
      console.log('top 6:',this.topSixInfluencers);
    })
  }
  onProfileViewInfluencer(){
    alert('Sorry for now, team is working on it!!')
  }
}
