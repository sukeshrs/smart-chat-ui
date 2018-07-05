import { Component, OnInit } from '@angular/core';
import { Topic } from '../../model/topic.model'
import { SmartChatModelService } from '../../providers/smart-chat-model.service';
import { BotConfigRepository } from '../../model/bot-config-repository.model';
@Component({
  selector: 'app-bot-config',
  templateUrl: './bot-config.component.html',
  styleUrls: ['./bot-config.component.scss']
})
export class BotConfigComponent implements OnInit {

  public topicList : Topic[] = [];
  topicBoxesMin: boolean[] = [];
  botConfig : BotConfigRepository;
  constructor( private smartChatModelService: SmartChatModelService) { }

  ngOnInit() {
    this.botConfig = this.smartChatModelService.currentBot;
    console.log("this.botConfig " + JSON.stringify(this.botConfig));
  }

  receiveTopic(newTopic) {
    this.topicList.push(newTopic);
    this.topicBoxesMin.push(false);
    console.log(this.topicList);
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

}
