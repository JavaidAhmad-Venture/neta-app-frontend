import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CitizenProfileService extends BaseService {

  constructor(private http:HttpClient) {
    super();
   }
   getAllCitizens(id){

    return this.http.get(this._url+"/influencers?constituency_id="+id,this.httpOptions);
   }

}
