import { Component, OnInit } from '@angular/core';
import { Topic } from '../../model/topic.model';
import { SmartChatModel } from "../../model/smart-chat-model.service";

@Component({
  selector: 'add-topic-request',
  templateUrl: './add-topic-request.component.html',
  styleUrls: ['./add-topic-request.component.scss']
})
export class AddTopicRequestComponent implements OnInit {

  topic : Topic;
  question : string;

  constructor(private smartChatModel: SmartChatModel) { }

  ngOnInit() {
    let topics = this.smartChatModel.currentBot.value.topics;
    let currentTopicName = this.smartChatModel.currentTopicName;
  }

  public addTopic(){
   // this.smartChatModel.currentBot.value.topic = this.topic;
  }

}
