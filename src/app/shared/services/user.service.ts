import { Http } from '@angular/http';
import { BaseService } from './base.service';
// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService extends BaseService{

  constructor(private _http:Http) {
    super();
  }

  getAccessToken(credentials){
    console.log('my credentials',credentials);
    
    return this._http.post(this._url+'/login',credentials).map(res=>{return res.json();})
  }

  getMasterData(){
    return this._http.get(this._url+'/api/v1/master-data',this.get_options()).map(res=>{
      return res.json();
    })
  }

  updateUserFirstTime(name:any){  
    console.log('name in update patch service:',name);

    let data={
      name:name,
      constituency_id:'80a7f44b-ca96-4ea8-94ea-b89e18342a8c'
    }
    return this._http.patch(this._url+'/api/v1/influencers/influencer/update',data,this.patch_options()) 
  }
}

