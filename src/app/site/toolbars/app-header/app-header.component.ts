import { HelperService } from './../../../shared/services/helper.service';
import { Component, OnInit } from '@angular/core';

declare var jQuery:any;

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
location=false;
state="Punjab";
assembly="Phagwara";
  constructor(private helperService:HelperService) {

    this.helperService.getEmitter().subscribe((res)=>{
        console.log("respn",res);
        
        if(res.type=="location"){
            this.state=res.data.state;
            this.assembly=res.data.a_name;
        }
    })
   }

  ngOnInit() {
    jQuery('.overlay').click(function () {
        jQuery('body').removeClass('open');
    });
      jQuery('.my-toggle ').click(function () {
        //   jQuery(this).addClass('open');
          jQuery('body').addClass('open');
      });
   
      jQuery('button.search-btn').click(function () {
          jQuery('header').toggleClass('open');
      });
    


      if (jQuery(window).scrollTop() >= 30) {
          jQuery('header').addClass('fixed');
      } else {
          jQuery('header').removeClass('fixed');
      }
  }
showLocation()
{

this.location = !this.location;

}
onLogout(){
    localStorage.removeItem('userId')
    alert('User successfully Logged out!')
}

}
