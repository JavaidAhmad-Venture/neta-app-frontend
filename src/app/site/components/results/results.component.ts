import { CondidatesService } from './../../../shared/services/condidates.service';
import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../../shared/services/results.service';
import { CloudnaryService } from '../../../shared/services/cloudnary.service';
import { HelperService } from '../../../shared/services/helper.service';
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
  totalSeats: number;
  partiesInfo: party[] = [];
  TopPartiesCons: any[] = [];
  partiesInfo_cons: party[] = [];
  TopPartiesCons_cons: any[] = [];

//countryOther:Other;
//stateOther:Other;

 a=0;b=100;//other states seats and vote percentage for country
 c=0;d=100;//other states seats and vote percentage for state
  constructor(private resultService: ResultsService,
    private cUrl: CloudnaryService,
    private helperService: HelperService) {

   
    this.curl = this.cUrl.cloudnaryUrl;
  }

  ngOnInit() {
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
    this.helperService.getEmitter()
      .subscribe(resp => {
        res=resp;
        this.state=res.data.state;
        console.log("auqib",res);
        this.showDataForState(res.data.a_id,res.data.id,);
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
        this.imgMap = data.parties_data.image.cloudinary.public_id;
        console.log("Map is", this.imgMap);
        this.totalSeats = data.parties_data.seat_count;
        console.log("data", data);
        this.TopPartiesCons = data.parties_data.top_parties_by_constituencies;

        for(let i=0;i<2;i++){
          this.a+=this.TopPartiesCons[i].constituencies_won;
          this.b-= data.parties_data.top_parties_by_votes[i].percentage;
        }
//        console.log("checkResult",this.countryOther);
        let j = 0;
        for (let p of data.parties_data.top_parties_by_votes) {
          if (j == 2) {
            break;
          }
          this.partiesInfo.push(p);
          j++;
        }
        this.loading = false;
      });
    this.showDataForState("40887c1a-af96-4f05-a801-ac694307d0d7","ecaece95-c372-48f1-a1b3-e82868d610e3");
  }

  showDataForState(a_id,s_id) {
    this.partiesInfo_cons = [];
    this.resultService.getResultState(a_id,s_id)
      .subscribe(res => {
        let data = res['data'];
        console.log("console", data)
        this.imgMapC = data.parties_data.image.cloudinary.public_id;
        console.log("Map state is", this.imgMap);
        this.totalSeats = data.parties_data.seat_count;
        console.log("data", data);
        this.TopPartiesCons_cons = data.parties_data.top_parties_by_constituencies;

        
        for(let j=0;j<2;j++){
          this.c+=this.TopPartiesCons[j].constituencies_won;
          this.d-= data.parties_data.top_parties_by_votes[j].percentage;
        }

        let i = 0;
        for (let p of data.parties_data.top_parties_by_votes) {
          if (i == 4) {
            break;
          }
          this.partiesInfo_cons.push(p);
          i++;
        }
        this.loading = false;
      });

  }


}
