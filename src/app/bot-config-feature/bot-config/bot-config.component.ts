import { Component, OnInit } from '@angular/core';
import { Topic } from '../../model/topic.model';
import { ActivatedRoute } from '@angular/router';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { BotConfigRepository } from "../../model/bot-config-repository.model";

@Component({
  selector: 'app-bot-config',
  templateUrl: './bot-config.component.html',
  styleUrls: ['./bot-config.component.scss']
})
export class BotConfigComponent implements OnInit {

  botConfig: BotConfigRepository;
  topicList : Topic[];
  topicBoxesMin: boolean[] = [];

  constructor(private smartChatModel: SmartChatModel) {

    if (smartChatModel.currentBot != null && smartChatModel.currentBot.value.topics == null){
      smartChatModel.currentBot.value.topics = []
    }

    this.botConfig = smartChatModel.currentBot;
    this.topicList = smartChatModel.currentBot.value.topics;
    console.log(this.botConfig);
  }

  ngOnInit() {
  }

  receiveTopic(newTopic) {
    this.topicList.push(newTopic);
    this.topicBoxesMin.push(false);
    console.log(this.botConfig);
  }

  toggleTopicPopup(i){
    this.topicBoxesMin[i] = !this.topicBoxesMin[i];
  }

  removeTopic(i){
    this.topicList.splice(i, 1);
  }

  //Potential Events for Dragging Topic Boxes
  onDraggingTopic(event: MouseEvent){
    //console.log(`Moving Topic ${event.clientX} ${event.clientY}`);
  }
  onTopicDragStart(event: MouseEvent){
    //console.log(`Clicked Topic ${event.clientX} ${event.clientY}`);
  }
  onTopicDragEnd(event: MouseEvent){
    //console.log(`Dropped Topic ${event.clientX} ${event.clientY}`);
  }

  gotoCreateTopic(){
    this.smartChatModel.currentBot.stepConfig='name';
  }

  gotoTopicName(){
    this.smartChatModel.currentBot.stepConfig='topicName';
  }

  gotoQuestions(){
    this.smartChatModel.currentBot.stepConfig='addTopic';
  }
}
