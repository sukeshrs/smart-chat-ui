import { Component, OnInit } from '@angular/core';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { BotConfigRepository } from "../../model/bot-config-repository.model";
import { Topic } from '../../model/topic.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'topic-name',
  templateUrl: './topic-name.component.html',
  styleUrls: ['./topic-name.component.scss']
})
export class TopicNameComponent implements OnInit {

  botConfig: BotConfigRepository;
  topic: Topic;
  constructor(
    private smartChatModel: SmartChatModel,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    //TODO : retreive the topic from the topic array of current bot
    if (this.smartChatModel.currentTopic){
      this.topic = this.smartChatModel.currentTopic;
    }
    else {
      this.topic = { name: '' };
    }
    console.log("Current Topic: " + JSON.stringify(this.topic));
    console.log("Current Bot: " + JSON.stringify(this.smartChatModel.currentBot));
  }

  gotoNewTopic() {
    this.smartChatModel.currentBot.stepConfig = 'createNewTopic';
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  gotoTopicQuestions() {
    //TODO : update the topic and push
    this.smartChatModel.sendTopic(this.topic);
    this.smartChatModel.currentTopic = this.topic;
    this.smartChatModel.currentBot.stepConfig = 'editQuestions';
    this.router.navigate(['../topic-questions'], { relativeTo: this.route });
  }

}
