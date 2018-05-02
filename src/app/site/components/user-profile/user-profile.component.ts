import { CookieService } from './../../../shared/services/cookie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name:any;
  phoneNumber:string;
  constructor(private cookieService:CookieService) { }

  ngOnInit() {
    this.name = JSON.parse(this.cookieService.readCookie('name'));
    this.phoneNumber=JSON.parse(this.cookieService.readCookie('phoneNumber'));
  }

}
