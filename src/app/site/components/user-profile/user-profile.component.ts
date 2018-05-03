import { CookieService } from './../../../shared/services/cookie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name:any;
  profilePic:any;
  phoneNumber:string;
  assemblyName:string;
  constructor(private cookieService:CookieService) { }

  ngOnInit() {
    this.name = JSON.parse(this.cookieService.readCookie('name'));
    this.profilePic = JSON.parse(this.cookieService.readCookie('influencer_profile_pic'));
    this.phoneNumber=JSON.parse(this.cookieService.readCookie('phoneNumber'));
    this.assemblyName=JSON.parse(this.cookieService.readCookie('assembly_name'));
    console.log('profile pic of user:',this.profilePic);
  }

}
