import { Component, OnInit } from '@angular/core';

declare var jQuery:any;

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  
      jQuery('.my-toggle ').click(function () {
        //   jQuery(this).addClass('open');
          jQuery('body').addClass('open');
      });
      jQuery('.overlay').click(function () {
        //   jQuery(this).addClass('open');
          jQuery('body').removeClass('open');
      });
      jQuery('button.search-btn').click(function () {
          jQuery('header').toggleClass('open');
      });
      jQuery('.fixed-action-btn > a').click(function () {
        //   jQuery(this).addClass('open');
          jQuery('.fixed-action-btn').toggleClass('active');
      });


      if (jQuery(window).scrollTop() >= 30) {
          jQuery('header').addClass('fixed');
      } else {
          jQuery('header').removeClass('fixed');
      }
  
  
  }

}
