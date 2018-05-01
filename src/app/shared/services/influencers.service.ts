import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseService } from './base.service';

@Injectable()
export class InfluencersService extends BaseService {

  
  constructor(private http:HttpClient) { 
    super();
  }
  getAllInfluencers(){
    return this.http.get(this._url+'/api/v1/influencers?constituency_id=44443cf7-51ad-422d-a9c6-11a322d5797a',this.httpOptions)
    .map(res=>JSON.parse(JSON.stringify(res)));
  }

 
}

