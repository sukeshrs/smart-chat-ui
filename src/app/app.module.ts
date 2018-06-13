import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BotManagementComponent } from './bot-management/bot-management.component';
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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
