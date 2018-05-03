import {
  Directive, 
  HostListener,
  Renderer2,
  Renderer,
  ViewChild,
  Inject,
  ElementRef} from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import { WINDOW } from '../services/window-service-for-scroll.service';
  
@Directive({
  selector: '[appCustomDirective]'
})

export class CustomDirectiveDirective {
  @ViewChild('scrl') scrolling
  public navIsFixed: boolean = false;

 
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private ele: ElementRef,
    private renderer: Renderer2) { }
    
    @HostListener("window:scroll", [])
    onWindowScroll() {
    //we'll do some stuff here when the window is scrolled
    let number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (number > 45){
         this.renderer.addClass(this.scrolling.nativeElement,'sticky'); 
       // this.navIsFixed = true;  
      }
      else {
         this.renderer.removeClass(this.scrolling.nativeElement,'sticky'); 
        //this.navIsFixed = false;
      }
   }
  
}

