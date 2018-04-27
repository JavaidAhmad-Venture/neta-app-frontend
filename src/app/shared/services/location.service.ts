import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
@Injectable()
export class LocationService extends BaseService {

  constructor(private http:HttpClient) { 
    super();
  }

  getCurrentAddress(lat,lng){
    return this.http.get(this._url+'/api/v1/constituencies/latlng?lat='+lat+'&lng='+lng)
    .map(res=>JSON.parse(JSON.stringify(res)))
  }

  getStates(){
    return this.http.get(this._url+'/api/v1/country_states/states')
    .map(res=>JSON.parse(JSON.stringify(res)))
  }

  getParliament(s_id){
    return this.http.get(this._url+'/api/v1/constituencies/parliament?state_id='+s_id)
    .map(res=>JSON.parse(JSON.stringify(res)))

  }



}
