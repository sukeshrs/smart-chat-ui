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
    let chatSetUser: [String, String];
    let chatSetBot: [Response, String];
    for (let i in this.topicList) {
     let topic = this.topicList[i];
     let response = _.get(topic, "answers[0]", {});
     let userQuestion = (_.isArray(topic.questions) && topic.questions.length) ? topic.questions[topic.questions.length - 1] : '...';
     let responseType = this.getResponseType(response);
     chatSetUser = [userQuestion, "user"];
     chatSetBot = [response, responseType];
     this.conversationList.push(chatSetUser);
     this.conversationList.push(chatSetBot);
   }
  }

  getResponseType(response: Response){
    //figure out the current response type

    let responseType='';

    if(_.get(response,"text")){
      responseType="text";
    }
    if(_.get(response,"attachment.type",'') == "template"){
      let template=response.attachment.payload.template_type;
      responseType=template;
    }
    else if(_.get(response,"attachment.type",'')!=""){
      responseType=response.attachment.type;
    }
    return responseType;
  }
}
