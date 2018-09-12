import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Response } from "../../model/response.model";
import { Topic } from "../../model/topic.model";
import * as _ from "lodash";

@Component({
  selector: 'chat-simulator',
  templateUrl: './chat-simulator.component.html',
  styleUrls: ['./chat-simulator.component.scss']
})
export class ChatSimulatorComponent implements OnInit{

  private _topicList: Topic[];
  conversationList = [];
  constructor() { }

  ngOnInit() {
    this.updateTopicList();
  }

  get topicList(){
    return this._topicList;
  }

  @Input()
  set topicList(topicList: Topic[]) {
    this._topicList = topicList;
    this.updateTopicList()
  }

  updateTopicList(){
    this.conversationList=[];
    let chatSetUser: [number, string];
    let chatSetBot: [number, string];
    for (let i in this.topicList) {
     let topic = this.topicList[i];
     let response = _.get(topic, "answers[0]", {});
     let userQuestion = _.get(topic, "questions[0]", "[Please Select Topic Questions]");
     let chatBotAnswer = _.get(topic, "answers[0].attachment.type", this.getResponseType(response));
     chatSetUser = [0, userQuestion];
     chatSetBot = [1, chatBotAnswer];
     this.conversationList.push(chatSetUser);
     this.conversationList.push(chatSetBot);
   }
  }

  getResponseType(response: Response){
    //figure out the current response type
    let responseType='[Please Select Topic Response]';
    if(_.get(response,"text")){
      responseType='text';
    }
    if(_.get(response,"attachment.type",'') == "template"){
      responseType=response.attachment.payload.template_type;
    }
    else if(_.get(response,"attachment.type",'')!=""){
      responseType="media";
    }
    return responseType;
  }
}
