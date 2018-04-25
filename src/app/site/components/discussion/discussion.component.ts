import { Component, OnInit } from '@angular/core';


declare var jQuery:any;
@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    jQuery('.fixed-action-btn > a').click(function () {
      //   jQuery(this).addClass('open');
        jQuery('.fixed-action-btn').toggleClass('active');
    });
  }

}
