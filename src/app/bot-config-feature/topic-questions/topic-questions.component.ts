import { Component, OnInit } from '@angular/core';
import { Topic } from '../../model/topic.model';
import { SmartChatModel } from "../../model/smart-chat-model.service";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'topic-questions',
  templateUrl: './topic-questions.component.html',
  styleUrls: ['./topic-questions.component.scss']
})
export class TopicQuestionsComponent implements OnInit {

  topic: Topic;
  question: string;
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
    window.scroll(0,0);
    //if page refreshed
    if(!this.smartChatModel.currentTopic){
      this.smartChatModel.retrieveSessionData();
    }
    this.topic = this.smartChatModel.currentTopic;
    this.smartChatModel.storeSessionData("currentTopic", this.topic);

    if (!this.topic.questions) {
      this.topic.questions = [];
    }
    this.question = "";
    console.log("Current Topic: " + JSON.stringify(this.topic));
    console.log("Current Bot: " + JSON.stringify(this.smartChatModel.currentBot));
  }

  public gotoTopicAnswers(){
    this.addQuestion();
    this.smartChatModel.currentBot.stepConfig='editAnswers';
    this.router.navigate(['../topic-answers'], { relativeTo: this.route });
  }

  public addQuestion() {
    if (this.question) {
      let questions = this.topic.questions;
      questions.push(this.question);
      this.question = "";
      this.topic.questions = this.removeDuplicates(questions);
      this.smartChatModel.sendTopic(this.topic, 'update-bot');
      console.log("Questions: " + JSON.stringify(questions));
    }
  }

  public removeQuestion(i: number) {
    this.topic.questions.splice(i,1);
    this.smartChatModel.sendTopic(this.topic, 'update-bot');
  }

  private removeDuplicates(questions: String[]): String[] {
    return Array.from(new Set(questions));
  }

}
