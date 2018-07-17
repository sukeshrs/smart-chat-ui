import { Component, OnInit } from '@angular/core';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { BotConfigRepository } from "../../model/bot-config-repository.model";
import { Topic } from '../../model/topic.model';


@Component({
  selector: 'edit-response',
  templateUrl: './edit-response.component.html',
  styleUrls: ['./edit-response.component.scss']
})
export class EditResponseComponent implements OnInit {

  public reponseType : string;
  public topic : Topic;
  botConfig: BotConfigRepository;

  constructor(private smartChatModel: SmartChatModel) { }

  ngOnInit() {
    let topics = this.smartChatModel.currentBot.value.topics;
    let currentTopicName = this.smartChatModel.currentTopicName;
    let currentTopicIndex = this.retreiveCurrentTopic(currentTopicName, topics);
    this.topic = topics[currentTopicIndex];
    this.reponseType = 'text';
    console.log(JSON.stringify(this.topic));
  }

  retreiveCurrentTopic(currentTopicName: string, topics: Topic[]): number {
    let topicIndex;
    topics.forEach((topic, index) => {
      if (topic.name === currentTopicName) {
        topicIndex = index;
      }
    });
    return topicIndex;
  }

}
