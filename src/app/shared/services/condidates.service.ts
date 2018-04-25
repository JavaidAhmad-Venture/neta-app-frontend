import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class CondidatesService extends BaseService {

  
  
   constructor(private http:HttpClient) { 
    super();
  }
  getAllCandidates(id){
    return this.http.get(this._url+'/candidatures?constituency_id='+id,this.httpOptions)
    .map(res => JSON.parse(JSON.stringify(res)));  
  }

}
