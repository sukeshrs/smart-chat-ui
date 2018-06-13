import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BotConfigComponent } from './bot-config/bot-config.component';
import { DashboardFeatureModule } from './dashboard-feature/dashboard-feature.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BotConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardFeatureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
