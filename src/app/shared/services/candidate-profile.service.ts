import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { CookieService } from './cookie.service';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Profile } from '../models/profilemodel';
import { Observable } from 'rxjs/Observable';


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
    private paramsService: CookieService
  ) {
    super();
  }

  getCanditateProfile(CANDIDATE_ID, CONSTITUENCY_ID){
  
    return this._http.get(this._url + "/candidates/" + CANDIDATE_ID + "/?constituency_id=" + CONSTITUENCY_ID,this.httpOptions)
      .map(res => JSON.parse(JSON.stringify(res)));
  }

  navigateCandidate(CANDIDATE_ID, CONSTITUENCY_ID,label=null) {
    this.paramsService.createCookie("c_id", CANDIDATE_ID, null, null);
    this.paramsService.createCookie("con_id", CONSTITUENCY_ID, null, null);
    this.paramsService.createCookie("label", label, null, null);
    
    this.router.navigate(['/profile'],{skipLocationChange: true});
  }
 
  getCandidatesCandidatures(CANDIDATE_ID, CONSTITUENCY_ID) {
    return this._http.get(this._url + "/candidates/" + CANDIDATE_ID + "/candidatures?constituency_id=" + CONSTITUENCY_ID,this.httpOptions)
      //.map(res => res);
  }

  getCandidatesManifesto(CANDIDATURE_ID,CONSTITUENCY_ID){
   return this._http.get(this._url+"/candidatures/"+CANDIDATURE_ID+"/manifesto?constituency_id"+CONSTITUENCY_ID);

  }

}
