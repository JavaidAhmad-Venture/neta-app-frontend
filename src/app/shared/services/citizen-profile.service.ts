import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CitizenProfileService extends BaseService {

  constructor(private _http: HttpClient) {
    super();
  }
  getCitizenProfile() {
    return this._http.get(this._url + "/api/v1/influencers/d6929f94-b3cf-439f-a94a-af77b245e194/?constituency_id=44443cf7-51ad-422d-a9c6-11a322d5797a", this.httpOptions)
      .map(res => res);
}

  getAllCitizens(id) {
    return this._http.get(this._url + "/api/v1/influencers?constituency_id=" + id, this.httpOptions);
  }
  
}
