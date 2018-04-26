import { CookieService } from './../../../shared/services/cookie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId:any;
  constructor(private cookieService:CookieService) { }

  ngOnInit() {
    this.userId = this.cookieService.readCookie('userId');
  }

}
