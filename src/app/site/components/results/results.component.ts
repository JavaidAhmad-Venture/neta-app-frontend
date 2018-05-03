import { CondidatesService } from './../../../shared/services/condidates.service';
import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../../shared/services/results.service';
import { CloudnaryService } from '../../../shared/services/cloudnary.service';
import { HelperService } from '../../../shared/services/helper.service';
import { Router } from '@angular/router';
import { CookieService } from '../../../shared/services/cookie.service';
// import { ResultsService } from '../../../shared/services/results.service';
interface party {
  id: string,
  party_name: string,
  votes: string,
  percentage: number,
  party_abbreviation: string,
  party_color: string,
  image: {
    cloudinary: {
      public_id: string
    }
  },
  constituencies_won: number,

}


// interface Other{
//   country:{
//     seats:number,
//     vote_percentage:number,
//   },
//   state:{
//     seats:number,
//     vote_percentage:number,
//   }
// }
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  loading = true;
  curl: any;
  Statistics: any;
  imgMap: string;
  imgMapC: string;
  state="State";
limit=2;
  access_Token:string=null
  totalSeatsC: number;
  totalSeatsS: number;
  partiesInfo: party[] = [];
  TopPartiesCons: any[] = [];
  partiesInfo_cons: party[] = [];
  TopPartiesCons_cons: any[] = [];
  loggedName:string='';
//countryOther:Other;
//stateOther:Other;

 a=0;b=100;//other states seats and vote percentage for country
 c=0;d=100;//other states seats and vote percentage for state
  constructor(private resultService: ResultsService,
    private cUrl: CloudnaryService,
    private cookieService:CookieService,
    private helperService: HelperService,private router:Router) {

    this.curl = this.cUrl.cloudnaryUrl;
  }

  ngOnInit() {
    this.state=JSON.parse(this.cookieService.readCookie("state_name"))||"Punjab";
    this.loggedName = JSON.parse(this.cookieService.readCookie('name'));
    this.showDataForCountry();
    let res: any = {
      type: '',
      data: {
        id:"",
        state: "",
        d_id: "",
        d_name: "",
        a_id: "",
        a_name: "",
      }
    }
   this.access_Token= this.cookieService.readCookie('access_token');
    this.helperService.getEmitter()
      .subscribe(resp => {       
        res=resp;
       if(res.type=="location"){
        this.state=res.data.state;
        // console.log("auqib",res);
        this.showDataForState(res.data.a_id,res.data.id,);
      }
      })

  }
  showDataForCountry() {
    this.TopPartiesCons = [];
    this.partiesInfo = [];
    this.loading = true;
    this.resultService.getResultCountry()
      .subscribe(res => {
        let data = res['data'];
        data.parties_data
        this.a=0;this.b=100;
        this.imgMap = data.parties_data.image.cloudinary.public_id;
     //   console.log("Map is", this.imgMap);
        this.totalSeatsC = data.parties_data.seat_count;
       // console.log("country data", data);
        this.TopPartiesCons = data.parties_data.top_parties_by_constituencies;

        for(let i=0;i<this.limit;i++){
          this.a+=this.TopPartiesCons[i].constituencies_won;
          this.b-= data.parties_data.top_parties_by_votes[i].percentage;
        }
//        console.log("checkResult",this.countryOther);
        let j = 0;
        for (let p of data.parties_data.top_parties_by_votes) {
          if (j == this.limit) {
            break;
          }
          this.partiesInfo.push(p);
          j++;
        }
        this.loading = false;
      });
      let sid=JSON.parse(this.cookieService.readCookie("state_id"));
      let aid=JSON.parse(this.cookieService.readCookie("assembly_id"));
      //console.log("sid",sid,aid);
    this.showDataForState(aid||"40887c1a-af96-4f05-a801-ac694307d0d7",sid||"ecaece95-c372-48f1-a1b3-e82868d610e3");
  }

  showDataForState(a_id,s_id) {
    this.partiesInfo_cons = [];
    this.resultService.getResultState(a_id,s_id)
      .subscribe(res => {
        let data = res['data'];
        this.c=0;this.d=100;
        //console.log("state data", data)
        this.imgMapC = data.parties_data.image.cloudinary.public_id;
        //console.log("Map state is", this.imgMap);
       
        //console.log("data", data);
        
        this.TopPartiesCons_cons = data.parties_data.top_parties_by_constituencies;

        
        for(let j=0;j<this.limit;j++){
          this.c+=this.TopPartiesCons_cons[j].constituencies_won;
          this.d-= data.parties_data.top_parties_by_votes[j].percentage;
        }
        this.totalSeatsS = data.parties_data.seat_count
        let i = 0;
        for (let p of data.parties_data.top_parties_by_votes) {
          if (i == this.limit) {
            break;
          }
          this.partiesInfo_cons.push(p);
          i++;
        }
        this.loading = false;
      });

  }

  onSelectedState(){
    this.router.navigate(["result",this.state]);
  }
}
