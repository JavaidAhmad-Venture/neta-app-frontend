import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { routes } from './config/routes';
import { SharedModule } from './shared/shared.module';
import { SiteModule } from './site/site.module';
import { WINDOW_PROVIDERS } from './shared/services/window-service-for-scroll.service';






@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    SiteModule,
    routes,
  
  ],
  providers: [WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
