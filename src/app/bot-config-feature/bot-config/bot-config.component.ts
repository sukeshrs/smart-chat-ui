import { Component, OnInit } from '@angular/core';
import { Topic } from '../../model/topic.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { BotConfigService } from '../bot-config.service';
import { BotConfigRepository } from "../../model/bot-config-repository.model";


@Component({
  selector: 'app-bot-config',
  templateUrl: './bot-config.component.html',
  styleUrls: ['./bot-config.component.scss']
})
export class BotConfigComponent implements OnInit {

  botConfig: BotConfigRepository;
  topicList: Topic[];
  topicBoxesMin: boolean[] = [];

  constructor(
    private smartChatModel: SmartChatModel,
    private botConfigService: BotConfigService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    //Listener for topic from router outlet
    this.smartChatModel.receiveTopic().subscribe(data => {
      console.log("Router Outlet Topic : " + JSON.stringify(data));
      this.updateTopicList(data.topic);
    })

    //set topics to empty array if none found
    if (!this.smartChatModel.currentBot.value.topics){
      this.smartChatModel.currentBot.value.topics = [];
    }

    //retrieve current bot and topics
    this.botConfig = this.smartChatModel.currentBot;
    this.topicList = this.smartChatModel.currentBot.value.topics;
    console.log("Configuring Bot: " + JSON.stringify(this.botConfig));
  }

  updateTopicList(topic) {
    var existingTopic = this.topicList.find( i =>{
      return i.name === topic.name
    })
    //topic exists
    if (existingTopic) {
      existingTopic = topic;
    }
    //add new topic
    else {
      this.topicList.push(topic);
      this.topicBoxesMin.push(false);
    }
    this.saveCurrentChanges();
  }

  removeTopic(i){
    this.topicList.splice(i, 1);
    this.saveCurrentChanges();
  }

  saveCurrentChanges(){
    this.botConfigService.updateBotConfig(this.botConfig).subscribe(
      data => {
        console.log("Updated Bot: " + JSON.stringify(data));
      },
      error => console.log("ERROR ::" + error)
    );
  }

  duplicateTopic(topic: Topic){
    // let dupTopic: Topic = JSON.parse(JSON.stringify(topic));
    // let nameList = dupTopic.name.split("_");
    // let last = parseInt(nameList[nameList.length-1];
    //
    // if (last){
    //   last+=1;
    // }
    // else{
    //
    // }
    // this.updateTopicList(dupTopic);
  }

  toggleTopicPopup(i){
    this.topicBoxesMin[i] = !this.topicBoxesMin[i];
  }

  gotoTopicQuestions(topic: Topic){
    window.scroll(0,0);
    this.smartChatModel.currentBot.stepConfig='editQuestions';
    this.smartChatModel.currentTopic = topic;
    this.router.navigate(['./topic-questions'], { relativeTo: this.route });
  }

  gotoTopicAnswers(topic: Topic){
    window.scroll(0,0);
    this.smartChatModel.currentBot.stepConfig='editAnswers';
    this.smartChatModel.currentTopic = topic;
    this.router.navigate(['./topic-answers'], { relativeTo: this.route });
  }

  gotoTopicStepConfig(breadCrumb: String){
    console.log("Navigate to: " + breadCrumb);
    if (breadCrumb === "Create Topic"){
      this.smartChatModel.currentBot.stepConfig = 'createNewTopic';
      this.router.navigate(['./'], { relativeTo: this.route });
    }
    else if (breadCrumb === "Topic Name"){
      this.smartChatModel.currentBot.stepConfig='nameTopic';
      this.router.navigate(['./topic-name'], { relativeTo: this.route });
    }
    else if (breadCrumb === "Edit Questions"){
      this.smartChatModel.currentBot.stepConfig='editQuestions';
      this.router.navigate(['./topic-questions'], { relativeTo: this.route });
    }
    else if (breadCrumb === "Edit Answer"){
      this.smartChatModel.currentBot.stepConfig='editAnswers';
      this.router.navigate(['./topic-answers'], { relativeTo: this.route });
    }
  }
}
