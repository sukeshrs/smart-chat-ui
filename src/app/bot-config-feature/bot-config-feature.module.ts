import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BotConfigComponent } from './bot-config/bot-config.component';
import { TopicQuestionsComponent } from './topic-questions/topic-questions.component';
import { NewTopicComponent } from './new-topic/new-topic.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NameYourBotComponent } from './name-your-bot/name-your-bot.component';
import { DraggableModule } from '../draggable/draggable.module';
import { BotConfigService } from './bot-config.service';
import { TopicNameComponent } from './topic-name/topic-name.component';
import { FormsModule }   from '@angular/forms';
import { TopicAnswersComponent } from './topic-answers/topic-answers.component';
import { ResponseGenericTypeComponent } from './response-generic-type/response-generic-type.component';
import { ResponseButtonTypeComponent } from './response-button-type/response-button-type.component';
import { ResponseMediaTypeComponent } from './response-media-type/response-media-type.component';
import { ResponseTextTypeComponent } from './response-text-type/response-text-type.component';
import { BotConfigRoutingModule } from './bot-config-routing.module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { CarouselItemDirective } from '../carousel/carousel-item.directive';
import { CarouselItemElement } from '../carousel/carousel-item-element.directive';
import { ChatSimulatorComponent } from './chat-simulator/chat-simulator.component';

@NgModule({
  declarations: [
    BotConfigComponent,
    TopicQuestionsComponent,
    NewTopicComponent,
    SidebarComponent,
    NameYourBotComponent,
    TopicNameComponent,
    TopicAnswersComponent,
    ResponseGenericTypeComponent,
    ResponseButtonTypeComponent,
    ResponseMediaTypeComponent,
    ResponseTextTypeComponent,
    BreadcrumbsComponent,
    ButtonsComponent,
    CarouselComponent,
    CarouselItemDirective,
    CarouselItemElement,
    ChatSimulatorComponent
  ],
  imports: [
    CommonModule,
    DraggableModule,
    FormsModule,
    BotConfigRoutingModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    BotConfigService
  ],
  bootstrap: []
})
export class BotConfigFeatureModule { }
