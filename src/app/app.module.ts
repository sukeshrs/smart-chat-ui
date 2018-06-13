import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BotManagementComponent } from './dashboard-feature/bot-management/bot-management.component';
import { HeaderComponent } from './header/header.component';
import { BotConfigComponent } from './bot-config/bot-config.component';


@NgModule({
  declarations: [
    AppComponent,
    BotManagementComponent,
    HeaderComponent,
    BotConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
