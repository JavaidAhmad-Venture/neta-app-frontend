import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './base.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from './cookie.service';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Profile } from '../models/profilemodel';
import { Observable } from 'rxjs/Observable';
import { PlatformLocation } from "@angular/common";
import { HelperService } from './helper.service';

@Injectable()
export class CandidateProfileService extends BaseService {

  private c_id = "";
  private con_id = "";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: "application/json"
    })
  };

  constructor(
    private _http: Http,
    private router: Router,
    private paramsService: CookieService,
    private route: ActivatedRoute,
    private _cookie: CookieService,
    private helperService: HelperService
  ) {
    super();
  }
    // ngOnInit() {
    //   // this.location.onPopState(() => console.log("event happens"));
  
    // }

  getCanditateProfile(CANDIDATE_ID, CONSTITUENCY_ID) {
    return this._http.get(this._url + "/api/v1/candidates/" + CANDIDATE_ID + "/?constituency_id=" + CONSTITUENCY_ID, this.get_options())
      .map(res => res.json());
  }

  navigateCandidate(CANDIDATE_ID, CONSTITUENCY_ID, name,isVoted) {

    this.paramsService.createCookie("candidate_id", CANDIDATE_ID, null, null);
    this.paramsService.createCookie("assembly_id", CONSTITUENCY_ID, null, null);
    this.paramsService.createCookie("isVotedByMe", isVoted, null, null);

    // // alert("i am here")
    this.helperService.setEmitter({
      type: 'navigateCandidate',
      data: {
        dd: "candidateEvent"
      }
    });

    this.router.navigate(['candidate'])

  }

  getCandidatesCandidatures(CANDIDATE_ID, CONSTITUENCY_ID) {
    return this._http.get(this._url + "/api/v1/candidates/" + CANDIDATE_ID + "/candidatures?constituency_id=" + CONSTITUENCY_ID, this.get_options())
  }

  getCandidatesManifesto(CANDIDATURE_ID, CONSTITUENCY_ID) {
    return this._http.get(this._url + "/api/v1/candidatures/" + CANDIDATURE_ID + "/manifesto?constituency_id" + CONSTITUENCY_ID,this.get_options())
    .map(res=>res.json());
  }

  private spaceRemove(str) {
    let arr = str.split(' ');
    let strin = "";
    for (let a of arr) {

      strin = strin + (a.trim());
      strin += "-";
    }

    return strin.slice(0, -1);

  }


}

