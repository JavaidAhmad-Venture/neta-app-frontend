import {
     AfterViewInit,
     Component,
     ElementRef,
     OnInit,
     Renderer2,
     Renderer,
     ViewChild,
      } from '@angular/core';

import { AuthService } from './../../../shared/guards/auth.service';
import { CookieService } from './../../../shared/services/cookie.service';
import { HelperService } from './../../../shared/services/helper.service';


declare var jQuery: any;

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit, AfterViewInit {
    @ViewChild('ele') inp;
    location = false;
    state = "State";
    assembly = "Assembly";
    userId: any;
    constructor(
        private helperService: HelperService,
        private ele: ElementRef,
        private renderer: Renderer2,
        private cookieService: CookieService,
        private auth: AuthService) {
           
         
    }
    ngAfterViewInit() {

        // jQuery('.overlay').click(function () {
        //     jQuery('body').removeClass('open');
        // });
   
        this.renderer.listen(this.inp.nativeElement, 'click' ,()=>{
            this.renderer.addClass(document.body, 'open');
        });
        //  jQuery('.my-toggle').click(function () {
        //      jQuery('body').addClass('open');
        //  });
        // jQuery('button.search-btn').click(function () {
        //     jQuery('header').toggleClass('open');
        // });

        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() > 45){
              jQuery('.upper-tab-section').addClass('sticky');
            }
            else{
              jQuery('.upper-tab-section').removeClass('sticky');
            }
          });

// this.renderer.listen('this.windowRef','scroll',(event)=>{
//     if(this.document.documentElement.scrollTop>45){
//         this.renderer.addClass('.upper-tab-section','sticky');
//     }
//     else{
//         this.renderer.removeClass('.upper-tab-section','sticky');
//     }
// });




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
