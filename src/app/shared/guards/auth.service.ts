import { HelperService } from './../services/helper.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { CookieService } from '../services/cookie.service';

@Injectable()
export class AuthService {
  
  constructor( 
    private route: ActivatedRoute,
    private cookieService:CookieService,
    private helperService:HelperService
    ) {   
  }

  logout() { 
    let res:any= { type: '',
data: {
  state: "",
  d_id: "",
  d_name: "",
  a_id: "",
  a_name: "",
}
}
    this.helperService.getEmitter().subscribe((resp) => {
      res=resp;
      console.log("respn", res);

      if(res.type=="logout"){
        this.cookieService.eraseCookie(['access-token'])
      }
  });
    this.cookieService.eraseCookie(['access-token'])
  }

}
