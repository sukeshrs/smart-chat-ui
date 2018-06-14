import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { DashboardFeatureModule } from './dashboard-feature/dashboard-feature.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BotConfigComponent } from './bot-config/bot-config.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BotConfigComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    DashboardFeatureModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
