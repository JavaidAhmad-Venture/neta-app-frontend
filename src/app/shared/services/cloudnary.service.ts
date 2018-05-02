import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from './../../../environments/environment';

@Injectable()
export class CloudnaryService{

  cloudnaryUrl = environment.CLOUD_URL;
  
  constructor() { 
  }

}
