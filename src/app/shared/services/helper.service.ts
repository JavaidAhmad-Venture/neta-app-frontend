import { Injectable, EventEmitter } from '@angular/core';
import { CookieService } from './cookie.service';

@Injectable()
export class HelperService {
  emit = new EventEmitter();

  constructor(private cookie:CookieService) { }

  getEmitter() {
    return this.emit;
  }
  setEmitter(d) {
    this.cookie.createCookie("a_id",d.data.a_id,null,null);
    this.emit.emit(d);
  }
  
}
