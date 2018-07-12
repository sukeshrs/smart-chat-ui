import { Component, OnInit } from '@angular/core';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { BotConfigRepository } from "../../model/bot-config-repository.model";
import { Topic } from '../../model/topic.model';

@Component({
  selector: 'add-topic-name',
  templateUrl: './add-topic-name.component.html',
  styleUrls: ['./add-topic-name.component.scss']
})
export class AddTopicNameComponent implements OnInit {

  botConfig: BotConfigRepository;
  topic: Topic;
  constructor(private smartChatModel: SmartChatModel) { }

  ngOnInit() {
    //TODO : retreive the topic from the topic array of current bot
    this.topic = { name: '' };
  }

  gotoCreateTopic() {
    this.smartChatModel.currentBot.stepConfig = 'name';
  }

  goToQuestions() {
    this.smartChatModel.currentTopicName = this.topic.name;
    //TODO : update the topic and push
    this.smartChatModel.currentBot.value.topics.push(this.topic);
    this.smartChatModel.currentBot.stepConfig = 'addTopic';
  }

}
