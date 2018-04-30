import { Injectable, EventEmitter } from '@angular/core';
import { CookieService } from './cookie.service';
import { Observable,Subject } from 'rxjs/Rx';

@Injectable()
export class HelperService {
  emit = new EventEmitter();
  sequence = new Observable();
  subject = new Subject();

  constructor(private cookie:CookieService) { }

  getEmitter() {
    return this.subject;
  }
  setEmitter(d) {
    this.cookie.createCookie("a_id",d.data.a_id,null,null);
    this.subject.next(d);
  }

  setObservable(d){
    this.subject.next("i am auqib"+d)
  }
  getObservable(){
    return this.subject;
  }

}
