import { Component, OnInit, ViewChild } from '@angular/core';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { Topic } from '../../model/topic.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Response } from '../../model/response.model';
import { Attachment } from '../../model/topic/attachment.model';
import { ResponseGenericTypeComponent} from '../response-generic-type/response-generic-type.component';
import { ResponseButtonTypeComponent} from '../response-button-type/response-button-type.component';
import { ResponseTextTypeComponent} from '../response-text-type/response-text-type.component';
import { ResponseMediaTypeComponent} from '../response-media-type/response-media-type.component';

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
    //TODO: workaround for setting null values
    if(!this.topic.answers){
      let newResponse: Response ={
        attachment: null,
        text: ''
      };
      this.topic.answers = [];
      this.topic.answers.push(newResponse);
    }
    this.response=this.topic.answers[0];

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
    }

    //figure out the current response type
    if(this.response.attachment.type=="template"){
      this.responseType=this.response.attachment.payload.template_type;
    }
    else if(this.response.attachment.type!=""){
      this.responseType="media";
    }
    if(this.response.text && this.response.text!=""){
      this.responseType='text';
    }

    console.log("Current Topic: " + JSON.stringify(this.topic));
    console.log("Current Bot: " + JSON.stringify(this.smartChatModel.currentBot));

  }

  submitResponse(){
    this.smartChatModel.currentBot.stepConfig='createNewTopic';
    this.smartChatModel.sendTopic(this.topic);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  updateAnswer(answer: Response){
    if(!answer){
      if(this.responseType=="text"){
        answer=this.textComponent.getAnswer();
      }
      else if(this.responseType=="button"){
        answer=this.buttonComponent.getAnswer();
      }
      else if(this.responseType=="media"){
        answer=this.mediaComponent.getAnswer();
      }
      else if(this.responseType=="generic"){
        answer=this.genericComponent.getAnswer();
      }
    }
    this.topic.answers[0]=answer;
    this.submitResponse();
  }
}
