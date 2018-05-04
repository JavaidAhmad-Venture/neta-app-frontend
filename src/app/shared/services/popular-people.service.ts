import { CookieService } from './cookie.service';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { PopularPeople } from '../models/popularPeople';
import { Http } from '@angular/http';

@Injectable()
export class PopularPeopleService extends BaseService {

 
  // cons_id:string = '875189f9-3bba-4667-9109-dff1dd4a23ae';
  cons_id:string = '';

  constructor(private http:Http,private cookieService:CookieService) { 
    super();
  
    
  }
  getPopularPeople(){
    this.cons_id = JSON.parse(this.cookieService.readCookie('assembly_id'));
    if(!this.cons_id)this.cons_id='875189f9-3bba-4667-9109-dff1dd4a23ae';
    // console.log('constuency id in popular people',this.cons_id);
    return this.http.get(this._url+'/api/v1/dashboard-data?constituency_id='+this.cons_id,this.get_options())
        .map(res => res.json());  
  }



}
