import { Component, OnInit } from '@angular/core';

import { PopularPeopleService } from '../../../shared/services/popular-people.service';
import { PopularCandidate } from './../../../shared/models/popularCandidate';
import { PopularInfluencer } from './../../../shared/models/popularInfluencer';
import { CandidateProfileService } from './../../../shared/services/candidate-profile.service';
import { CloudnaryService } from './../../../shared/services/cloudnary.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  p_candidates:PopularCandidate[]=[];
  p_influencers:PopularInfluencer[]=[];
  topSixInfluencers:PopularInfluencer[]=[];
  response:any={};
  cUrl: string = '';
  constituency_id: string = '875189f9-3bba-4667-9109-dff1dd4a23ae';


  constructor(
    private profileService:CandidateProfileService,
    private cloudnaryService: CloudnaryService,
    private popularPeople:PopularPeopleService,
  ) {
    this.cUrl = cloudnaryService.cloudnaryUrl;
  }

  ngOnInit() {
    this.fetchPopularPeople();
  }

  onProfileView(id) {
    console.log('hello:' + id);
    this.profileService.navigateCandidate(id, this.constituency_id);
  }

  fetchPopularPeople(){
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
      })
      console.log('top 6:',this.topSixInfluencers);
    })
  }
  onProfileViewInfluencer(){
    alert('Sorry for now, team is working on it!!')
  }
}
