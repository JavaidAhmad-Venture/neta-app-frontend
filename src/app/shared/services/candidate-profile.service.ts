import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './base.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from './cookie.service';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Profile } from '../models/profilemodel';
import { Observable } from 'rxjs/Observable';
import {Location} from "@angular/common";

@Injectable()
export class CandidateProfileService extends BaseService {
  
private c_id="";
private con_id="";
 httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Accept: "application/json"
  })
};

constructor(
    private _http:HttpClient,
    private router: Router,
    private paramsService: CookieService,
    private route:ActivatedRoute,
    private _cookie:CookieService,
  ) {
    super();
  }
//   ngOnInit() {
//     this.location.onPopState(() => console.log("event happens"));
// }

  getCanditateProfile(CANDIDATE_ID, CONSTITUENCY_ID){
      return this._http.get(this._url + "/candidates/" + CANDIDATE_ID + "/?constituency_id=" + CONSTITUENCY_ID,this.httpOptions)
      .map(res => JSON.parse(JSON.stringify(res)));
  }

  navigateCandidate(CANDIDATE_ID, CONSTITUENCY_ID,name) {
    this.paramsService.createCookie("candidate_id", CANDIDATE_ID, null, null);
    this.paramsService.createCookie("assembly_id", CONSTITUENCY_ID, null, null);
    // name=name.replaceAll("\\s", "");
    //console.log('space removed',this.spaceRemove(name));
   // this.addTostack(CANDIDATE_ID,CONSTITUENCY_ID)
    this.router.navigate(['candidate',this.spaceRemove(name)]) 
  }
 
  getCandidatesCandidatures(CANDIDATE_ID, CONSTITUENCY_ID) {
    return this._http.get(this._url + "/candidates/" + CANDIDATE_ID + "/candidatures?constituency_id=" + CONSTITUENCY_ID,this.httpOptions)
  }

  getCandidatesManifesto(CANDIDATURE_ID,CONSTITUENCY_ID){
   return this._http.get(this._url+"/candidatures/"+CANDIDATURE_ID+"/manifesto?constituency_id"+CONSTITUENCY_ID);
  }

  private spaceRemove(str){
    let arr=str.split(' ');
    let strin="";
    for(let a of arr){
        
      strin=strin+(a.trim());
      strin+="-";   
    }
    
    return strin.slice(0,-1);

  }

//   private addTostack(cid,did){
// //    let nav=[{"a_id":aid,"d_id":did}];
//   let c_id=JSON.parse(this._cookie.readCookie("c_id"))||[];
//   let d_id=JSON.parse(this._cookie.readCookie("d_id"))||[];
//   c_id.push(cid);
//   d_id.push(did);
//   this._cookie.addCookie("c_id",c_id,null,null)
//   this._cookie.addCookie("d_id",d_id,null,null)
//   this.removeFromStack();
// }
// private removeFromStack(){
// let a=this._cookie.readCookie("c_id");
// let b=this._cookie.readCookie("d_id");
// console.log("from stack remove",a[0],b[1]);

// }
// private getFromStack(){
// console.log("It is An important",this._cookie.readCookie("a_id"));
//   }

}

