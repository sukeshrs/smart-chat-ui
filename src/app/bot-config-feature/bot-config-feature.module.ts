import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotConfigComponent } from './bot-config/bot-config.component';
import { AddTopicRequestComponent } from './add-topic-request/add-topic-request.component';
import { CreateNewTopicComponent } from './create-new-topic/create-new-topic.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NameYourBotComponent } from './name-your-bot/name-your-bot.component';
import { DraggableModule } from '../draggable/draggable.module';
import { BotConfigService } from './bot-config.service';
import { AddTopicNameComponent } from './add-topic-name/add-topic-name.component';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    BotConfigComponent,
    AddTopicRequestComponent,
    CreateNewTopicComponent,
    SidebarComponent,
    NameYourBotComponent,
    AddTopicNameComponent,
  ],
  imports: [
    CommonModule,
    DraggableModule,
    FormsModule
  ],
  providers: [
    BotConfigService
  ],
  bootstrap: []
})
export class BotConfigFeatureModule { }
