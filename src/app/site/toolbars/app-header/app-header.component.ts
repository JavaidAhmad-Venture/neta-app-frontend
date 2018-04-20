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
          jQuery(this).toggleClass('open');
          jQuery('body').toggleClass('open');
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

}
