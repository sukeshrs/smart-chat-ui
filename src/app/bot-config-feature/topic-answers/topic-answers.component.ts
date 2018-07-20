import { Component, OnInit } from '@angular/core';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { BotConfigRepository } from "../../model/bot-config-repository.model";
import { Topic } from '../../model/topic.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'topic-answers',
  templateUrl: './topic-answers.component.html',
  styleUrls: ['./topic-answers.component.scss']
})
export class TopicAnswersComponent implements OnInit {

  public reponseType : string;
  public topic : Topic;
  botConfig: BotConfigRepository;

  constructor(
    private smartChatModel: SmartChatModel,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    //let topics = this.smartChatModel.currentBot.value.topics;
    //let currentTopicName = this.smartChatModel.currentTopicName;
    //let currentTopicIndex = this.retreiveCurrentTopic(currentTopicName, topics);
    this.topic = this.smartChatModel.currentTopic;
    this.reponseType = 'text';
    console.log("Current Topic: " + JSON.stringify(this.topic));
    console.log("Current Bot: " + JSON.stringify(this.smartChatModel.currentBot));
  }

  addAnswer(){
    this.smartChatModel.currentBot.stepConfig='createNewTopic';
    this.smartChatModel.sendTopic(this.topic);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // retreiveCurrentTopic(currentTopicName: string, topics: Topic[]): number {
  //   let topicIndex;
  //   topics.forEach((topic, index) => {
  //     if (topic.name === currentTopicName) {
  //       topicIndex = index;
  //     }
  //   });
  //   return topicIndex;
  // }

}
