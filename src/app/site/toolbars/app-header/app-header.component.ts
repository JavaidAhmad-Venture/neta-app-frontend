import { HelperService } from './../../../shared/services/helper.service';
import { Component, OnInit, AfterViewInit,ElementRef} from '@angular/core';

declare var jQuery: any;

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit, AfterViewInit {
    location = false;
    state = "Punjab";
    assembly = "Phagwara";
    constructor(private helperService: HelperService,private eleRf:ElementRef) {

        this.helperService.getEmitter().subscribe((res) => {
            console.log("respn", res);

            if (res.type == "location") {
                this.state = res.data.state;
                this.assembly = res.data.a_name;
            }
        })
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
        if (jQuery(window).scrollTop() >= 30) {
            jQuery('header').addClass('fixed');
        } else {
            jQuery('header').removeClass('fixed');
        }
    }
    ngOnInit() {

    }
    showLocation() {

        this.location = !this.location;

    }
    onLogout() {
        if (localStorage.getItem('userId')) {
            localStorage.removeItem('userId')
            alert('User successfully Logged out!')
        }
    }

}
