import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CloudnaryService extends BaseService{

  cloudnaryUrl = 'http://res.cloudinary.com/neta-dev/image/upload/';
  
  constructor(private _http:Http) { 
    super();
  }
  getCloudnaryConfig(){
    return this._http.get(this._url+'/api/v1/cloudinary-config',this.get_options())
    .map(res=>res.json());
  }
}
