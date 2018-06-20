import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotConfigComponent } from './bot-config/bot-config.component';
import { AddTopicRequestComponent } from './add-topic-request/add-topic-request.component';
import { CreateNewTopicComponent } from './create-new-topic/create-new-topic.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NameYourBotComponent } from './name-your-bot/name-your-bot.component';

@NgModule({
  declarations: [
    BotConfigComponent,
    AddTopicRequestComponent,
    CreateNewTopicComponent,
    SidebarComponent,
    NameYourBotComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  bootstrap: []
})
export class BotConfigFeatureModule { }
