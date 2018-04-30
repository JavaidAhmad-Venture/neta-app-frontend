import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService extends BaseService{

  constructor(private _http:HttpClient) {
    super();
  }

  getAccessToken(credentials){
    console.log('my credentials',credentials);
    
    return this._http.post(this._url+'/login',credentials);
  }

  getMasterData(){
    return this._http.get(this._url+'/api/v1/master-data',this.httpOptions);
  }
}
