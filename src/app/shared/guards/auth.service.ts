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
    this.helperService.getEmitter().subscribe((res) => {
      console.log("respn", res);

      if(res.type=="logout"){
        this.cookieService.eraseCookie(['access-token'])
        this.cookieService.eraseCookie(['_uid'])
        this.cookieService.eraseCookie(['_client'])
        this.cookieService.eraseCookie(['phoneNumber'])
      }
  });
  this.cookieService.eraseCookie(['access-token'])
  this.cookieService.eraseCookie(['_uid'])
  this.cookieService.eraseCookie(['_client'])
  this.cookieService.eraseCookie(['phoneNumber'])
  }

}
