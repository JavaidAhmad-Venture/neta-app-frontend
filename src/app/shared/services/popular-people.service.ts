import { Observable } from 'rxjs/Observable';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { PopularPeople } from '../models/popularPeople';

@Injectable()
export class PopularPeopleService extends BaseService {

 
  cons_id:string = '875189f9-3bba-4667-9109-dff1dd4a23ae';

  constructor(private http:HttpClient) { 
    super();
  }
  getPopularPeople(): Observable<PopularPeople>{
    return this.http.get<PopularPeople>(this._url+'/dashboard-data?constituency_id='+this.cons_id,this.httpOptions)
    // .map(res => JSON.parse(JSON.stringify(res)));  
  }



}
