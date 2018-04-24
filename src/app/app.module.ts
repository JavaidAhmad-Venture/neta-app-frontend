import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routes } from './config/routes';
import { SharedModule } from './shared/shared.module';
import { SiteModule } from './site/site.module';






@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    SiteModule,
    routes,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
