import { Component, OnInit } from '@angular/core';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { BotConfigRepository } from "../../model/bot-config-repository.model";
import { Topic } from '../../model/topic.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Response } from '../../model/response.model';
import { Attachment } from '../../model/topic/attachment.model';

@Component({
  selector: 'topic-answers',
  templateUrl: './topic-answers.component.html',
  styleUrls: ['./topic-answers.component.scss']
})
export class TopicAnswersComponent implements OnInit {

  response: Response;
  topic: Topic;
  responseType: string;
  text: string;
  botConfig: BotConfigRepository;
  navigationSubscription;

  constructor(
    private smartChatModel: SmartChatModel,
    private route: ActivatedRoute,
    private router: Router) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.initilizeInvites();
        }
      });
    }

  ngOnInit() {
    this.initilizeInvites();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }

  //set all the variables
  initilizeInvites() {
    this.topic= this.smartChatModel.currentTopic;
    this.responseType='';
    if(!this.topic.answers){
      let newResponse: Response ={
        attachment: null,
        text: ''
      };
      this.topic.answers = [];
      this.topic.answers.push(newResponse);
    }
    this.response=this.topic.answers[0]

    //TODO: workaround for setting null values
    if (!this.response.attachment){
      this.response.attachment={
        type: '',
        payload: null}
    }

    if (!this.response.attachment.payload){
      this.response.attachment.payload={
        template_type:'',
        text:''
      }
    }else{
      this.responseType=this.response.attachment.payload.template_type;
    }

    if(this.response.text!=''){
      this.responseType='text';
    }
    //switch response according to type
    this.onChangeResponseType(this.responseType);

    console.log("Current Topic: " + JSON.stringify(this.topic));
    console.log("Current Bot: " + JSON.stringify(this.smartChatModel.currentBot));

  }

  submitAnswer(textResponse: string){
    if(this.responseType=="text"){
      this.response.text=textResponse;
      this.response.attachment=null;
    }
    else if(this.responseType=="button"){
      this.response.attachment.payload.buttons=this.smartChatModel.currentButtons;
      this.response.attachment.payload.elements=[];
    }
    else if(this.responseType=="media"){
      this.response.attachment.payload.buttons=[];
      this.smartChatModel.currentElements[0].buttons=this.smartChatModel.currentButtons;
      this.response.attachment.payload.elements=this.smartChatModel.currentElements;
    }

    if(this.responseType!="text"){
      this.response.text="";
      this.response.attachment.payload.text=textResponse;
      this.response.attachment.type="template";
      this.response.attachment.payload.template_type=this.responseType;
    }
    this.smartChatModel.currentBot.stepConfig='createNewTopic';
    this.smartChatModel.sendTopic(this.topic);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onChangeResponseType(responseType: string){

    this.response.attachment.payload.template_type=responseType;
    if (responseType == "button"){
      this.smartChatModel.currentButtons=this.response.attachment.payload.buttons;
      this.text=this.response.attachment.payload.text;
    }
    else if (responseType == "media"){
      this.smartChatModel.currentElements=this.response.attachment.payload.elements;
      this.smartChatModel.currentButtons=[];
      if(this.smartChatModel.currentElements !=null && this.smartChatModel.currentElements.length !=0){
        this.smartChatModel.currentButtons=this.smartChatModel.currentElements[0].buttons;
      }
    }
    else if (responseType == "text"){
      this.text=this.response.text;
    }
  }
}
