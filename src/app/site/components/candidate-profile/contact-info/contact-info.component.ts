import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {
@Input('ContactInfo') contact_info;
  constructor() { }

  ngOnInit() {
  }

}
