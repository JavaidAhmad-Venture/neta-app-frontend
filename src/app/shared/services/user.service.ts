import { CookieService } from './cookie.service';
import { Http } from '@angular/http';
import { BaseService } from './base.service';
// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService extends BaseService{

  constructor(private _http:Http, private cookieService:CookieService) {
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

  updateUserFirstTime(name:any,timestamp?:any,public_id?:any,imageFormat?:any,signature?:any){  
    console.log('name in update patch service:',name);

    let data={
      name:name,
      constituency_id:JSON.parse(this.cookieService.readCookie("assembly_id"))
    }
    // profile_pic:'image/upload/v'+timestamp+'/'+public_id+'.'+imageFormat+'#'+signature,
    // console.log('Profile pic url:',profile_pic);
    return this._http.patch(this._url+'/api/v1/influencers/influencer/update',data,this.patch_options()) 
  }
  fetchExistingUsers(ass_id){
    return this._http.get(this._url+'/api/v1/influencers/influencer/?constituency_id='+ass_id,this.get_options())
    .map(res=>res.json())
  }
}

