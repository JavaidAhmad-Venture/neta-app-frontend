import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class CondidatesService extends BaseService {

  
  
   constructor(private http:HttpClient,private _http:Http) { 
    super();
  }
  getAllCandidates(id){
    return this.http.get(this._url+'/api/v1/candidatures?constituency_id='+id,this.httpOptions)
    .map(res => JSON.parse(JSON.stringify(res)));  
  }
  
  onVote(candidature_id,id){
    let data={constituency_id:id};
    return this._http.post(this._url+'/api/v1/candidatures/'+candidature_id+'/vote', data, this.post_options());
  }

}
