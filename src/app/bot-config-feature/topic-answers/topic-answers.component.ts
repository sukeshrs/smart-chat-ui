import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { Topic } from '../../model/topic.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Response } from '../../model/response.model';
import { Attachment } from '../../model/topic/attachment.model';
import { ResponseGenericTypeComponent} from '../response-generic-type/response-generic-type.component';
import { ResponseButtonTypeComponent} from '../response-button-type/response-button-type.component';
import { ResponseTextTypeComponent} from '../response-text-type/response-text-type.component';
import { ResponseMediaTypeComponent} from '../response-media-type/response-media-type.component';
import * as _ from 'lodash';

@Component({
  selector: 'topic-answers',
  templateUrl: './topic-answers.component.html',
  styleUrls: ['./topic-answers.component.scss']
})
export class TopicAnswersComponent implements OnInit {

  @ViewChild(ResponseGenericTypeComponent)
  private genericComponent: ResponseGenericTypeComponent;

  @ViewChild(ResponseButtonTypeComponent)
  private buttonComponent: ResponseButtonTypeComponent;

  @ViewChild(ResponseTextTypeComponent)
  private textComponent: ResponseTextTypeComponent;

  @ViewChild(ResponseMediaTypeComponent)
  private mediaComponent: ResponseMediaTypeComponent;


  response: Response;
  topic: Topic;
  responseType: string;
  navigationSubscription;
  messageSubscription;

  constructor(
    private smartChatModel: SmartChatModel,
    private route: ActivatedRoute,
    private router: Router) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.initilizeInvites();
        }
      });
      this.messageSubscription=this.smartChatModel.receiveMessage().subscribe( message =>{
        if(message=="save-bot"){
          this.updateAnswer(null);
          this.smartChatModel.sendTopic(this.topic, message);
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
    if (this.messageSubscription) {
       this.messageSubscription.unsubscribe();
    }
  }

  //set all the variables
  initilizeInvites() {
    //if page refreshed
    if(!this.smartChatModel.currentTopic){
      this.smartChatModel.retrieveSessionData();
    }
    this.topic= this.smartChatModel.currentTopic;
    this.smartChatModel.storeSessionData("currentTopic", this.topic);
    this.responseType='';
    if(!_.get(this.topic,"answers[0]")){
      this.topic.answers=[{}];

    }
    this.response=_.get(this,"topic.answers[0]");

    //figure out the current response type
    if(_.get(this.response,"text")){
      this.responseType='text';
    }
    if(_.get(this.response,"attachment.type",'') == "template"){
      this.responseType=this.response.attachment.payload.template_type;
    }
    else if(_.get(this.response,"attachment.type",'')!=""){
      this.responseType="media";
    }

    console.log("Current Topic: " + JSON.stringify(this.topic));
    console.log("Current Bot: " + JSON.stringify(this.smartChatModel.currentBot));

  }

  submitResponse(answer: Response){
    this.updateAnswer(answer);
    this.smartChatModel.currentBot.stepConfig='createNewTopic';
    this.smartChatModel.sendTopic(this.topic, "save-bot");
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  updateAnswer(answer: Response){
    if(!answer){
      if(this.responseType=="text" && this.textComponent){
        answer=this.textComponent.getAnswer();
      }
      else if(this.responseType=="button" && this.buttonComponent){
        answer=this.buttonComponent.getAnswer();
      }
      else if(this.responseType=="media" && this.mediaComponent){
        answer=this.mediaComponent.getAnswer();
      }
      else if(this.responseType=="generic" && this.genericComponent){
        answer=this.genericComponent.getAnswer();
      }
    }
    this.topic.answers[0]=answer;
    this.smartChatModel.sendTopic(this.topic, "update-bot");
  }
}
