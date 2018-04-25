import { Component, OnInit } from '@angular/core';

declare var jQuery:any;

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
location=false;
  constructor() { }

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

}
