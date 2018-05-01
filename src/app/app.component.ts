import { HelperService } from './shared/services/helper.service';
import { Directive,Component,ViewChild,ElementRef,Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements AfterViewInit {
  title = 'app';

@ViewChild('ele') inp2;
  constructor(private helperService:HelperService,private ele: ElementRef,private renderer: Renderer2){
  }
  ngAfterViewInit() {
    this.renderer.listen(this.inp2.nativeElement, 'click' ,()=>{
      this.renderer.removeClass(document.body, 'open');
    });
   
  }

}
