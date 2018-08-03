import { Component, OnInit } from '@angular/core';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { BotConfigRepository } from "../../model/bot-config-repository.model";
import { Topic } from '../../model/topic.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '../../model/response.model';
import { Attachment } from '../../model/topic/attachment.model';

@Component({
  selector: 'topic-answers',
  templateUrl: './topic-answers.component.html',
  styleUrls: ['./topic-answers.component.scss']
})
export class TopicAnswersComponent implements OnInit {

  public response: Response;
  public topic: Topic;
  public responseType: string;
  public text: string;
  botConfig: BotConfigRepository;

  constructor(
    private smartChatModel: SmartChatModel,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    window.scroll(0,0);
    this.topic= this.smartChatModel.currentTopic;

    if(!this.topic.answers){
      let newResponse: Response;
      newResponse ={
        attachment: {
          payload: {
            buttons: [],
            template_type : ""
          },
          type: ''},
        text: ""
      };
      this.topic.answers = [];
      this.topic.answers.push(newResponse);
    }
    this.response=this.topic.answers[0]
    this.responseType=this.response.attachment.payload.template_type;
    if(this.responseType=="text"){
      this.text=this.response.text;
    }
    else{
      this.text=this.response.attachment.payload.text;
    }
    console.log("Current Topic: " + JSON.stringify(this.topic));
    console.log("Current Bot: " + JSON.stringify(this.smartChatModel.currentBot));
  }

  submitAnswer(textResponse: string){
    this.response.attachment.payload.template_type=this.responseType;
    if(this.responseType=="text"){
      this.response.text=textResponse;
      this.response.attachment.payload.text="";
    }
    else{
      this.response.text="";
      this.response.attachment.payload.text=textResponse;
    }
    this.smartChatModel.currentBot.stepConfig='createNewTopic';
    this.smartChatModel.sendTopic(this.topic);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onChangeResponseType(responseType: string){

    if (responseType == "button"){
      this.response.attachment.payload.template_type=responseType;
      this.response.attachment.type="template";
      this.text=this.response.attachment.payload.text;
    }
    else{
      this.response.attachment.payload.buttons=[];
      this.text=this.response.text;
    }
  }
}
