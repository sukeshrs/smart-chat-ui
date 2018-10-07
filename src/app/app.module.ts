import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardFeatureModule } from './dashboard-feature/dashboard-feature.module';
import { BotConfigFeatureModule } from './bot-config-feature/bot-config-feature.module';
import { DraggableModule } from './draggable/draggable.module';
import { SmartChatModel } from './model/smart-chat-model.service';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    DashboardFeatureModule,
    BotConfigFeatureModule,
    HttpClientModule,
    DraggableModule
  ],
  providers: [SmartChatModel],
  bootstrap: [AppComponent]
})
export class AppModule { }
