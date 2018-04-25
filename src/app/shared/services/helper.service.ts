import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class HelperService {
  emit = new EventEmitter();

  constructor() { }

  getEmitter() {
    return this.emit;
  }
  setEmitter(d) {
    this.emit.emit(d);
  }
}
