import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

import { AuthService } from './../../../shared/guards/auth.service';
import { CookieService } from './../../../shared/services/cookie.service';
import { HelperService } from './../../../shared/services/helper.service';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit, AfterViewInit {
    location = false;
    state = "State";
    assembly = "Assembly";
    userId: any;
    constructor(private helperService: HelperService,
         private eleRf: ElementRef,
          private cookieService: CookieService,
           private auth: AuthService,
        private route:Router) {

    }
    ngAfterViewInit() {
        jQuery('.overlay').click(function () {
            jQuery('body').removeClass('open');
        });
        jQuery('.my-toggle').click(function () {
            jQuery('body').addClass('open');
        });
        jQuery('button.search-btn').click(function () {
            jQuery('header').toggleClass('open');
        });
        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() > 45){
              jQuery('.upper-tab-section').addClass('sticky');
            }
            else{
              jQuery('.upper-tab-section').removeClass('sticky');
            }
          });
          jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() > 200){
              jQuery('.profile-tab').addClass('sticky');
            }
            else{
              jQuery('.profile-tab').removeClass('sticky');
            }
          });
    }
    ngOnInit() {
        this.state = JSON.parse(this.cookieService.readCookie('state_name'));
        this.assembly = JSON.parse(this.cookieService.readCookie('assembly_name'));
        let res:any= { type: '',
        data: {
            state: "",
            d_id: "",
            d_name: "",
            a_id: "",
            a_name: "",
         }
        }
        this.helperService.getEmitter().subscribe((resp) => {
            
            res=resp;
            console.log("respn", res);
          
            if (res.type == "location") {
                this.state = res.data.state;
                this.assembly = res.data.a_name;
            }
            if(res.type=="signIn"){
                this.userId = this.cookieService.readCookie('access_token');
                console.log('check',this.userId);
            }
            if(res.type=="logout"){
             
                this.cookieService.eraseCookie(['access_token'])
            this.route.navigate(['result'])
            }
        });
        this.userId = this.cookieService.readCookie('access_token');
    
    }
    showLocation() {

        this.location = !this.location;

    }
    onLogout() {
        this.cookieService.eraseCookie(['access-token'])
        this.cookieService.eraseCookie(['_uid'])
        this.cookieService.eraseCookie(['_client'])
        this.cookieService.eraseCookie(['phoneNumber'])
        console.log('After erasing token is:', this.cookieService.readCookie('access-token'));
        
        this.helperService.setEmitter({
            type: 'logout',
            data: {
              u_id:'logout'
            }
          })
        this.userId = '';
        this.auth.logout();
    }
    onLogin(){

    }

}
