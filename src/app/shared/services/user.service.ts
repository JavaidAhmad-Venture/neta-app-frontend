import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService extends BaseService{

  constructor(private _http:HttpClient) {
    super();
  }

  getAccessToken(credentials){
    this._http.post(this._url+'/login',credentials);
  }
}
