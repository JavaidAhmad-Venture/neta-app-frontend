import { environment } from './../../../environments/environment';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { CookieService } from './cookie.service';
import { HttpHeaders } from '@angular/common/http';

export class BaseService {



  token: any;
  protected _url = environment.BASE_URL;
  // protected bae64EncodeToken = btoa(environment.CLIENT_ID + ":" + environment.CLIENT_SECRET);
  protected headers: any;
  protected options: any;
  // private loggedOutService : LoggedOutService = new LoggedOutService();
  private _cookieService = new CookieService();
  protected cookie: any;
  access_token: any;
  client: any;
  uid: any;
  constructor() {
    
    this.setHeaders();
  }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: "application/json"
    })
  };

  // headersVote = {
  //   headers: new HttpHeaders({"Content-Type": "application/json",'Authorization': 'Bearer',"access-token": this.access_token,'client': this.client,'uid': this.uid})
  // }

  private setHeaders() {
    this.access_token = JSON.parse(this._cookieService.readCookie('access_token'));
    this.client = JSON.parse(this._cookieService.readCookie('_client'));
    this.uid = JSON.parse(this._cookieService.readCookie('_uid'));
    if (this.access_token != null) {
      console.log('Token is:'+this.access_token);
      console.log('client is:'+this.client);
      console.log('uid is:'+this.uid);
      this.headers = new Headers({ 'Content-Type': 'application/json',   'access-token':  this.access_token, 'client': this.client,'uid': this.uid,Accept: "application/json"});
    } else {
      this.headers = new Headers({ 'Content-Type': 'application/json', Accept: "application/json" });
    }
  }

  protected post_options(type = null) {
    this.setHeaders();
    // if (type == 'auth') {
    //   this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.bae64EncodeToken });
    // }
    return new RequestOptions({ headers: this.headers });
  }

  protected get_options(type = null) {
    this.setHeaders();
    // if (this.access_token && !type) {
    //   this.headers = new Headers({ 'Content-Type': 'application/json', Accept: "application/json", 'Authorization': 'Bearer ' + this.access_token });
    // }
    // else if (type == 'auth') {
    //   this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.bae64EncodeToken });
    // }
    return new RequestOptions({ headers: this.headers });
  }

  protected put_options(type = null) {
    this.setHeaders();
    if (this.token && !type) {
      this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    }
    // if (type == 'auth')
    //   this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + this.bae64EncodeToken });
    return new RequestOptions({ headers: this.headers, method: 'put' });
  }

  protected patch_options() {
    this.setHeaders();
    return new RequestOptions({ headers: this.headers });
  }

  protected extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  protected boolData(res: Response) {
    let body = res.json();
    return body.data;
  }

  protected handleError(error: Response) {
    let body = error.json();
    if (body.error && body.error.code === 'TokenExpiredError') {
      let expires = "";
      // let domain  = environment.APP_EXTENSION;
      let days = -1;
      let value = '';
      if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      // document.cookie = "storage="+value+expires+"; domain="+domain+"; path=/";
      // window.location.href = environment.APP_DOMAIN;
    }
    return Observable.throw(body);
  }

  //  Authorization Handlers
  protected extractAuthData(res: Response) {
    let body = res.json();
    return body || {};
  }

  protected handleAuthError(error: Response) {
    let body = error.json();
    if (body.error) body = body.error;
    return Observable.throw(body);
  }

  protected extractAuthDataPromise(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  protected handleErrorPromise(error: Response) {
    let body = error.json();
    console.log(body, 'Erorrrrrrrrrrrrr')
    if (body.error && body.error.code === 'TokenExpiredError') {
      let expires = "";
      // let domain  = environment.APP_EXTENSION;
      let days = -1;
      let value = '';
      if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      // document.cookie = "storage="+value+expires+"; domain="+domain+"; path=/";
      // window.location.href = environment.APP_DOMAIN;
    }
    return body;
  }
}

