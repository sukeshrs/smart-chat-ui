import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardFeatureModule } from './dashboard-feature/dashboard-feature.module';
import { BotConfigFeatureModule } from './bot-config-feature/bot-config-feature.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardFeatureModule,
    BotConfigFeatureModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
