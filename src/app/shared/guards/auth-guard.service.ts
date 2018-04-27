

import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { CookieService } from './../services/cookie.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  userId:string;
  constructor(private auth: AuthService, private router: Router, private cookieService:CookieService) {
    this.userId = this.cookieService.readCookie('userId');
  }
  
  canActivate(route, state: RouterStateSnapshot) {
    if (this.userId)  return true; 

      this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }


