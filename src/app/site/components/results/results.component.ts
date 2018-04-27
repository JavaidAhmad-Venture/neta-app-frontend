import { CondidatesService } from './../../../shared/services/condidates.service';
import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../../shared/services/results.service';
import { CloudnaryService } from '../../../shared/services/cloudnary.service';
// import { ResultsService } from '../../../shared/services/results.service';
interface party{
  id:string,
  party_name:string,
  votes:string,
  percentage:string,
  party_abbreviation:string,
  party_color:string,
  image:{
    cloudinary:{
      public_id:string}},
  constituencies_won:number,


}
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  loading=true;
  curl:any;
  Statistics:any;
  imgMap:string;
  imgMapC:string;
  totalSeats:number;
  partiesInfo:party[]=[];
  TopPartiesCons:any[]=[];
  partiesInfo_cons:party[]=[];
  TopPartiesCons_cons:any[]=[];
  constructor(private resultService:ResultsService,
              private cUrl:CloudnaryService){
    
                this.showDataForCountry();  
    this.curl=this.cUrl.cloudnaryUrl;
  }

  ngOnInit() {

  }
showDataForCountry(){
  this.TopPartiesCons=[];
  this.partiesInfo=[];
  this.loading=true;
  this.resultService.getResultCountry()
  .subscribe(res=>{
    let data=res['data'];
    data.parties_data
    this.imgMap=data.parties_data.image.cloudinary.public_id; 
    console.log("Map is",this.imgMap);
    this.totalSeats=data.parties_data.seat_count;
    console.log("data",data); 
   this.TopPartiesCons=data.parties_data.top_parties_by_constituencies
    let i=0;
    for(let p of data.parties_data.top_parties_by_votes){
      if(i==2)
        {
        break;
      }
      this.partiesInfo.push(p);
      i++;
    } 
    this.loading=false;
  });
  this.showDataForState();
}

showDataForState(){
let a_id="";
let s_id="ecaece95-c372-48f1-a1b3-e82868d610e3";
//let a_id= this.cookie.readCookie
this.TopPartiesCons=[];
this.partiesInfo=[];
  this.resultService.getResultState(a_id="40887c1a-af96-4f05-a801-ac694307d0d7",s_id)
  .subscribe(res=>{
    let data=res['data'];
    console.log("console",data)
    this.imgMapC=data.parties_data.image.cloudinary.public_id; 
    console.log("Map state is",this.imgMap);
    this.totalSeats=data.parties_data.seat_count;
    console.log("data",data); 
   this.TopPartiesCons_cons=data.parties_data.top_parties_by_constituencies
    let i=0;
    for(let p of data.parties_data.top_parties_by_votes){
      if(i==2)
        {
        break;
      }
      this.partiesInfo_cons.push(p);
      i++;
    } 
    this.loading=false;
  });

}

}
