import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Topic } from '../../model/topic.model';
import * as $ from 'jquery';
import { SmartChatModelService } from '../../providers/smart-chat-model.service'

@Component({
  selector: 'create-new-topic',
  templateUrl: './create-new-topic.component.html',
  styleUrls: ['./create-new-topic.component.scss']
})
export class CreateNewTopicComponent implements OnInit {

  constructor(private smartChatModelService: SmartChatModelService) { }

  ngOnInit() {
  }

  @Output() addTopicEvent = new EventEmitter<Topic>();

  public createDraggableWidget(topicName) {
    var topic: Topic = {
      name: topicName,
      status: null,
      questions: null,
      answers: null,
      additionalDisplay: null
    };

    this.addTopicEvent.emit(topic);
  }

  public updateBotConfig(){
    this.smartChatModelService.currentBot.stepConfig='addTopic';
  }
}
