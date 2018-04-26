import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { CookieService } from '../services/cookie.service';

@Injectable()
export class AuthService {
  
  constructor( 
    private route: ActivatedRoute,
    private cookieService:CookieService
    ) {   
  }

  logout() { 
    this.cookieService.eraseCookie(['userId'])
  }

}
