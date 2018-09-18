import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { BotConfigRepository } from "../../model/bot-config-repository.model";
import { Topic } from '../../model/topic.model';
import * as _ from "lodash";

@Component({
  selector: 'topic-name',
  templateUrl: './topic-name.component.html',
  styleUrls: ['./topic-name.component.scss']
})
export class TopicNameComponent implements OnInit {

  botConfig: BotConfigRepository;
  topic: Topic;
  messageSubscription;

  constructor(
    private smartChatModel: SmartChatModel,
    private route: ActivatedRoute,
    private router: Router) {
      this.messageSubscription=this.smartChatModel.receiveMessage().subscribe( message =>{
        if(message=="save-bot"){
          this.smartChatModel.sendTopic(this.topic, message);
        }
      });
    }

  ngOnInit() {
    if(!_.get(this.smartChatModel,"currentTopic")){
      this.smartChatModel.currentTopic={name:''};
    }
    this.topic = this.smartChatModel.currentTopic;


    console.log("Current Topic: " + JSON.stringify(this.topic));
    console.log("Current Bot: " + JSON.stringify(this.smartChatModel.currentBot));
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
       this.messageSubscription.unsubscribe();
    }
  }

  gotoNewTopic() {
    this.smartChatModel.currentBot.stepConfig = 'createNewTopic';
    this.router.navigate(['./'], { relativeTo: this.route });
  }

  gotoTopicQuestions() {
    this.smartChatModel.sendTopic(this.topic, "save-bot");
    this.smartChatModel.currentBot.stepConfig = 'editQuestions';
    this.router.navigate(['../topic-questions'], { relativeTo: this.route });
  }

}
