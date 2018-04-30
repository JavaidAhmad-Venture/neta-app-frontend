import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ResultsService extends BaseService{

  constructor(
    private http:HttpClient,
  ) { 
    super();
  }
  getResultCountry(){
    return this.http.get(this._url+"/api/v1/dashboard-data",this.httpOptions);
  }
  getResultState(a_id,s_id){
    return this.http.get(this._url+"/api/v1/dashboard-data?constituency_id="+a_id+"&state_id="+s_id,this.httpOptions);
  }


}
